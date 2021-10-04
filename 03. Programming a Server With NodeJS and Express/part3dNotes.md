# Validation and ESLint
- Usually constraints we want to apply to data stored in our app's database.
- App should not accept notes that have a missing or empty `content` property.
- Validity of note is checked:
```javascript
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
})
```
- If note has no `content` property, respond to request with status code 400 bad request.
- Can use `validation` functionality in Mongoose instead.
- Can define validation rules for each field in schema:
```javascript
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
})
```
- `content` required to be 5 characters long (minimum).
- `date` is required.
- No constraints to `important` field.
    - Definition in schema has not changed.
- `minLength` and `required` validators are built-in and provided by Mongoose.
- Can create new validators with custom validator functionality by Mongoose.
- Operation throws an exception if we try to store an object in the database that breaks constraint.
- Change handler for creating new note so it passes any potential exceptions to error handler middleware:
```javascript
app.post('/api/notes', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save()
        .then(savedNote => {
            response.json(savedNote.toJSON())
        })
        .catch(error => next(error))
})
```
- Expand error handler to deal with these validation errors:
```javascript
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
```

## Promise Chaining
- Many route handlers changed response data into right format by implicitly calling `toJSON` method from `response.json`.
- We can also do this explicitly by calling `toJSON` on the object passed as a parameter to `then`:
```javascript
app.post('/api/notes', (request, response, next) => {
    // ...

    note.save()
        .then(savedNote => {
            response.json(savedNote.toJSON())
        })
        .catch(error => next(error))
})
```
- Accomplish the same in a cleaner way with `promise chaining`:
```javascript
app.post('/api/notes', (request, response, next) => {
    // ...

    note
        .save()
        .then(savedNote => {
            return savedNote.toJSON()
        })
        .then(savedAndFormattedNote => {
            response. json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})
```
- In first `then`, we receive `savedNote` object returned by Mongoose and format it.
- Result of operation is returned.
- `then` method of promise returns a promise.
    - We can access the formatted note by registering a new callback function with the `then` method.
- Clean up code with arrow function syntax:
```javascript
app.post('/api/notes', (request, response, next) => {
    // ...

    note
        .save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
            response. json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})
```
- Promise chaining does not provide much of a benefit.
- Situation changes if there needs to be many asynchronous operations that had to be done in sequence.
- Next part we will learn about `async/await` syntax in JS.

## Deploying the Database Backend to Production
- Application works almost as-is in Heroku.
- Need to generate new production build of frontend due to changes in frontend.
- Environment variables defined in dotenv will only be used when the backend is not in `production mode` (Heroku).
- We defined environment variables for development in `.env`.
- Environment variable that defines the database URL in production should be set to Heroku with the `heroku config:set` command:
```
heroku config:set MONGODB_URI=mongodb+srv://sample_user_1:<password>@first-example.5nttp.mongodb.net/note-app?retryWrites=true&w=majority
```
- If there are errors, put single quotation marks around URL.

## Lint
- Important tool called `lint`.
    - Genericallly, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.
- Can use IDEs like NetBeans for Java.
    - Can check for compile errors.
    - Static analysis tools.
- For JS, current leading tool for static analysis is `ESlint`.
    - `https://eslint.org/`.
- Install `ESlint` as a development dependency to the backend.
```
npm install eslint --save-dev
```
- Initialize a default ESlint configuration with:
```
node_modules/.bin/eslint --init
```
- Answer all the questions:
```
How would you like to use ESLint? To check syntax, find problems, and enforce code style
What type of modules does your project use? CommonJS (require/exports)
Which framework does your project use? None of these
Does your project use TypeScript? No
Where does your code run? Node
How would you like to define a style for your project? Answer questions about your style
What format do you want your config file to be in? JavaScript
What style of indentation do you use? Spaces
What quotes do you use for strings? Single
What line endings do you use? Unix
Do you require semicolons? No
```
- Configuration is saved in the `.eslintrc.js` file:
```javascript
module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
            'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error': 'always'
    ],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ]
    }
}
```
- Change rule for indentation so it is 2 spaces:
```javascript
"indent": [
    "error",
    2
],
```
- Inspecting and validating a file like `index.js` is like this:
```
node_modules/.bin/eslint index.js
```
- Recommended to create a separate `npm script` for linting:
```json
{
    // ...
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        // ...
        "lint": "eslint ."
    },
    // ...
}
```
- Run `npm run lint` to check every file in the project.
- Files in the `build` directory is checked when the command gets run.
    - We do NOT want this to happen!
    - Create a `.eslintignore` file in project root and add to contents:
```
build
```
- Better alternative to executing linter from command line is to configure `eslint-plugin` to the editor that runs linter continuously.
- See errors in code immediately.
- See plugin Visual Studio ESLint:
    `https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint`.
- Errors underlined in red.
- ESlint has a lot of rules that are easy to take into use by editing `.eslintrc.js` file.
- Add `eqeqeq` to warn us if equality is checked with anything but the triple equals operator.
- Add under `rules` field in the file:
```javascript
{
    // ...
    'rules': {
        // ...
        'eqeqeq': 'error',
    },
}
```
- Add few more changes.
- Prevent unnecessary trailing spaces at end of lines.
- Require a space before and after curly braces.
- Demand a consistent use of whitespaces in function parameters of array functions.
```javascript
{
    // ...
    'rules': {
        // ...
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'array-spacing': [
            'error', { 'before': true, 'after': true }
        ]
    },
}
```
- One default configuration takes predetermined rules into use:
```javscript
'extends': 'eslint:recommended',
```
- This includes a rule that warns about `console.log` commands.
- Disable a rule by defining its "value" as 0 in config file.
    - Do this to the `no-console` rule.
```javascript
{
    // ...
    'rules': {
        // ...
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'array-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    },
}
```
- When making changes to `.eslintrc.js`, run the linter again from command line.
- Many companies have ESlint configuration defined.
- Many follow Airbnb's JS style guide:
    - `https://github.com/airbnb/javascript`