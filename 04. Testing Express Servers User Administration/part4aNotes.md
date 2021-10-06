# Structure of Backend Application & Introduction to Testing
- Continue to work on Notes Backend from part 3.

## Project Structure
- Modify structure of our project to adhere to Node.js best practices.
- We end up with the following structure:
```
- index.js
- app.js
- build
    - ...
- controllers
    - note.js
- models
    - note.js
- package-lock.json
- package.json
-utils
    - config.js
    - logger.js
    - middleware.js
```
- We've been using `console.log` and `console.error` to print info.
- Bad way to do things.
- Separate printing to its own module `utils/logger.js`.
```javascript
const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}
```
- Logger has two functions:
    1. `info` for printing normal log messages.
    2. `error` for error messages.
- Extracting logging into own module is a good thing.
- If we wanted to write logs to a file or send them to an external logging service we would have to only make changes to one place.
- Contents of `index.js` gets simplified to:
```javascript
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
```
- `index.js` only imports the actual application from the `app.js` file and then starts the app.
- The `info` function of the logger module is used for the console printout telling the application is running.
- Handling of environment variables is extracted into a separate `utils/config.js` file:
```javascript
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}
```
- Other parts of the app can access the environment variables by importing the configuration module:
```javascript
const config = require('./utils/config')

logger.info(`Server running on port ${config.PORT}`)
```
- Route handlers moved into dedicated module.
- Event handlers for routes are referred to as `controllers`, so we create a new `controllers` directory.
- All routes related to notes are now in `notes.js` module under `controllers` directory.
- Content of `notes.js` is below:
```javascript
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter
```
- Almost an exact copy of our `index.js` file.
- Few changes.
- We create a new `router` object:
```javascript
const notesRouter = require('express').Router()

// ...

module.exports = notesRouter
```
- Module exports router to be available to anyone using the module.
- All routes now defined for router object.
- Paths in route handler have been shortened.
- Previously, we had:
```javascript
app.delete('/api/notes/:id', (request, response) => {
```
- In the current version, we have:
```javascript
notesRouter.delete('/:id', (request, response) => {
```
- Express manual provides explanation of the router objects:
    - A router object is an isolated instance of middleware and routes. You can think of it as a "mini-application", capable of performing middleware and routing functions. Every Express application has a built-in app router.
- The router is a `middleware` that can be used for defining "related routes" in a single place, typically placed in own module.
- The `app.js` file that creates the application takes router into use as below:
```javascript
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)
```
- Router we defined before is used **if** the URL of the request starts with `/api/notes`.
- Because of this, `notesRouter` object must only define the relative parts of the routes (the empty path `/` or the parameter `/:id`).
- Our `app.js` now looks like:
```javascript
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```
- File has different middlware.
- One is the `notesRouter` that is attached to `/api/notes` path.
- Custom middleware moved to new `utils/middleware.js` module:
```javascript
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
```
- Responsibility of making connection to database is given to `app.js` module.
- The `note.js` file under `models` folder only defines the Mongoose schema for notes.
```javascript
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
```
- To recap, directory structure should be looking like this:
```
- index.js
- app.js
- build
    - ...
- controllers
    - note.js
- models
    - note.js
- package-lock.json
- package.json
-utils
    - config.js
    - logger.js
    - middleware.js
```
- Once application grows in size, it's best to separate things into their own module to make things easier.
- No specific structure or file naming convention required for Express apps.
- Ruby on Rails does require it though.

## Testing Node Applications
- Automated testing is very important!
- Look at unit tests.
- Our app is simple so it does not really make sense to use unit tests.
- Create a new file `utils/for_testing.js` and write a few functions that we can use for test writing practice:
```javascript
const palindrome = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.reduce(reducer, 0) / array.length
}

module.exports = {
    palindrome,
    average
}
```
- The `average` function uses the array `reduce` method.
- To be more familiar, watch first three videos from `Functional JavaScript` series:
    - `https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84`
- Many different testing libraries or `test runners` for JS.
- We will be using a testing library developed and used internally by Facebook called `jest`.
    - `https://jestjs.io/`
- `jest` resembles the previous king `Mocha`:
    - `https://mochajs.org/`
- Jest works well for testing backends.
- Shines when testing React applications.
- Install Jest as a development dependency because we only use it during development.
```
npm install --save-dev jest
```
- Define the `npm script` `test` to execute tests with Jest and to report about the test with `verbose`:
```json
{
    // ...
    "scripts": {
        // ...
        "test": "jest --verbose"
    }
    // ...
}
```
- Jest requires that we specify that the execution environment is Node.
- Add the following to the end of `package.json`:
```json
{
    // ...
    "jest": {
        "testEnvironment": "node"
    }
}
```
- Alternatively, Jest can look for a configuration file with name `jest.config.js` where we can define the execution environment:
```javascript
module.exports = {
    testEnvironment: 'node',
}
```
- Create folder for our tests called `tests` and create a new file called `palindrome.test.js` with the following:
```javascript
const palindrome = require('../utils/for_testing').panlindrome

test('palindrome of a', () => {
    const result = palindrome('a')

    expect(result).toBe('a')
})

test('palindrome of react', () => {
    const result = palindrome('react')

    expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
    const result = palindrome('releveler')

    expect(result).toBe('releveler')
})
```
- The ESLint configurations complain about the `test` and `expect` commands in our test file.
- This is because configuration does not allow `globals`.
- Rid the complaint by adding `"jest": true` to the `env` property in `.eslintrc.js` file.
```javascript
module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true,
        'jest': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
    "rules": {
        // ...
    },
}
```
- The first row:
```javascript
const palindrome = require('../utils/for_testing').palindrome
```
- The test file imports function to be tested and assigns it to a variable called `palindrome`.
- Individual test cases defined in `test` function.
- First parameter is test description as a string.
- Second parameter is a function that defines the functionality for the test case.
- Functionality for second test case is like this:
```javascript
() => {
    const result = paldindrome('react')

    expect(result).toBe('tcaer')
}
```
- First, we run the code to be tested.
- Generate a palindrome for the string `react`.
- Verify the results with the `expect` function.
- `expect` wraps the resulting value into an object that offers a collection of `matcher` functions.
    - These can be used for verifying the correctness of the result.
- We are comparing two strings, so we can use `toBe` matcher.
    - `https://jestjs.io/docs/expect#tobevalue`
- All tests pass as expected.
- Jest expects that names of test files contain `.test`.
    - We will follow the convention of naming our test files with extension `.test.js`.
- Break the test to demonstrate how Jest has excellent error messages.
```javascript
test('palindrome of react', () => {
    const result = palindrome('react')

    expect(result).toBe('tkear')
})
```
- Add a few tests for the `average` function into a new file `tests/average.test.js`.
```javascript
const average = require('../utils/for_testing').average

describe('average', () => {
    test('of one value is the value itself', () => {
        expect(average([1])).toBe(1)
    })

    test('of many is calculated right', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })

    test('of empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})
```
- Test reveals function does not work properly with an empty array.
    - This is because dividing by zero results in `NaN`.
- Fixing function is easy:
```javascript
const average = array => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length
}
```
- If array length is 0, we return 0.
- Otherwise, use the `reduce` method to calculate average.
- Defined a `describe` block around the tests that was given the name `average`:
```javascript
describe('average', () => {
    // tests
})
```
- `describe` blocks used for grouping tests into logical collections.
- Test output of Jest uses the name of the `describe` block.
- `describe` blocks are necessary when we want to run some shared setup or teardown operations for a group of tests.
- One more thing to notice.
    - We wrote the tests in a compact way.
    - We did not assign the output of the function to a variable before testing.
```javascript
test('of empty array is zero', () => {
    expect(average([])).toBe(0)
})
```