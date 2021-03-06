# Node.js and Express
- Focus shifts to the backend.
    - Implementing functionality on the server side of the stack.
- Building backend on top of NodeJS.
- Mentioned before that browsers don't all support the newest version of JS.
    - So, code running in browser must be `transpiled` with `babel`.
- JS running in the background is different.
    - Newest version of Node supports a large majority of latest features of JS.
    - We can use latest features without transpiling code.
- Goal is to implement a backend that works with the notes app from part 2.
- Start with basics by implementing a "hello world" application.
- Notice that apps and exercises in this part are not all React apps.
    - We will not use the `create-react-app` utility for initializing the project for this app.
- Go to a directory.
    - Create new template for our application with `npm init` command.
    - Result is an automatically generated `package.json` file at the project root.
        - Contains information about project.
```json
{
    "name": "backend",
    "version": "0.0.1",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "EC",
    "license": "MIT"
}
```
- File defines, for example, the entry point of the application which is `index.js`.
- Make a change to the `scripts` object.
```json
{
    "name": "backend",
    "version": "0.0.1",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "EC",
    "license": "MIT"
}
```
- Create the first version of our app by adding an `index.js` file to the root of the project.
```javascript
console.log('hello world')
```
- Can run program directly with Node from the command line:
```
node index.js
```
- Or run it as an `npm script`:
```
npm start
```
- The `start` script works because we defined it in the `package.json` file.
```json
{
    // ...
    "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    // ...
}
```
- Even though `node index.js` works, we should get used to executing tasks as `npm scripts`.
- By default, `package.json` file also defines another commonly used npm script called `npm test`.
- Since our project does not yet have a testing library, the `npm test` command executes the following command:
```
echo "Error: no test specified" && exit 1
```

## Simple Web Server
- Change the application into a web server by editing the `index.js` file:
```javascript
const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```
- We can open our app by visiting `http://localhost:3001`.
    - The page will display "Hello World".
- Server works the same way regardless of the last part of the URL.
    - `http://localhost:3001/foo/bar` displays the same content.
- Take a closer look at the first line of code:
```javascript
const http = require('http')
```
- Application imports Node's built-in 'web server' module.
- This is like what we did on our browser-side code.
```javascript
import http from 'http'
```
- Code that runs in the browser uses ES6 modules.
- Modules defined using `export` and `import`.
- NodeJS uses `CommonJS` modules.
    - Reason is that Node ecosystem had a need for modules before JS supported them in the language specs.
- CommonJS modules function almost exactly like ES6 modules.
- The next chunk of code is:
```javascript
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
})
```
- Code uses the `createServer` method of the `http` module to create a new web server.
- An `event handler` is registered to the server.
    - Called every time an HTTP request is made to server's address `http://localhost:3001`.
- Request is responded to with status code 200, Content-Type header set to text/plain, and content of the site to be returned set to Hello World.
- The last rows make app listen on port that is defined.
- Purpose of the backend server of this course is to offer raw data in the JSON format to the frontend.
- Change server to return a hardcoded list of notes in the JSON format.
```javascript
const http = require('http')

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only Javascript',
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: "2019-05-30T19:20:14.298Z",
        important: true
    },
]

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```
- Restart server and refresh page.
- `application/json` value in the `Content-Type` header tells the receiver that the data is in the JSON format.
- The `notes` array gets transformed into JSON with `JSON.stringify(notes)` method.

## Express
- Implementing our server code with Node's built-in `http` web server is okay.
- Not ideal when application grows in size because it's cumbersome.
- Many libraries have been made to help make it easier to do server-side development with Node.
- The most popular library intended for this purpose is `express`.
- Define `express` as a project dependency:
```
npm install express
```
- The dependency is also added to our `package.json` file.
```json
{
    // ...
    "dependencies": {
        "express": "^4.17.1"
    }
}
```
- The source code for the dependency is installed to the `node_modules` folder in the root of the project.
- There are other dependencies other than express installed in there.
- The contents of the folder are the dependencies of express along with the dependencies of its dependencies, and so forth.
    - This is called `transitive dependencies`.
- The version 4.17.1 of express was installed here.
- What does the caret `^` mean?
```json
"express": "^4.17.1"
```
- The versioning model used in npm is called `semantic versioning`.
- The caret in front of `^4.17.1` means that when, and if, a dependency of a project gets updated, the version will be at least 4.17.1.
    - Installed version can also be one with a larger `patch` number (last number).
    - Can have a larger `minor` number (middle number).
    - The `major` version (first number) of the library must be the same.
- Update the dependencies of our project:
```
npm update
```
- If we start working on project on another computer, we can install up-to-date dependencies of the project defined in the `package.json` file:
```
npm install
```
- If `major` number of a dependency does not change, the newer versions should be `backwards compatible`.
    - If our app uses version 4.99.175 of express in the future, then all code implemented in this part would still work without making changes to the code.
    - Version 5.0.0 may contain changes that would make our app no longer work.

## Web and Express
- Go back to application and make these changes:
```javascript
const express = require('express')
const app = express()

let notes = [
    ...
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const PORT = 3001
app.list(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```
- To get new version of app to use, we have to restart app.
- In the beginning, we are importing `express` which is now a function.
    - This is used to create an express application stored in the variable `app`.
```javascript
const express = require('express')
const app = express()
```
- Next, define two `routes` to the app.
- First one defines event handler used to handle HTTP GET requests made to the app's root:
```javascript
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
```
- Event handler accepts two parameters:
    - First is the `request` parameter that contains all of the information of the HTTP request.
    - Second is the `response` parameter used to define how the request is responded to.
- The request is answered by using the `send` method of the `response` object.
- Calling the method makes server respond to HTTP request by sending a response containing the string `<h1>Hello World!</h1>`.
    - Parameter is a string.
    - Express automatically sets value of `Content-Type` to `text/html`.
    - Status code of response defaults to 200.
- Second route defines an event handler that handles HTTP GET requests made to the `notes` path of the application.
```javascript
app.get('/api/notes', (request, response) => {
    response.json(notes)
})
```
- Request is responded to with the `json` method of the `response` object.
- Calling the method will send the notes array passed to it as a JSON formatted string.
- Express automatically sets `Content-Type` header to `application/json`.
- Take a look at the data sent in the JSON format.
- Earlier versions where we were only using Node, we transform the data into JSON format with `JSON.stringify` method.
```javascript
response.end(JSON.stringify(notes))
```
- No longer required with express because it happens automatically.
- JSON is a string and not a JS object like the value assigned to `notes`.

## Nodemon
- We have to restart the app to see changes we made to it.
- Pressing `Ctrl-C` is very cumbersome.
- Solution is `nodemon`:
    - Nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.
- Install `nodemon` by defining it as a `development dependency` with the command:
```
npm install --save-dev nodemon
```
- Contents of `package.json` will also change:
```json
{
    // ...
    "dependencies": {
        "express": "^4.17.1",
    },
    "devDependencies": {
        "nodemode": "^2.0.7"
    }
}
```
- If you made a mistake, you can just manually change it to the above.
- By development dependencies, we are talking about tools that are needed only during the development of the app.
    - Like testing or automatically restarting the application.
    - Not needed when the app is run in production mode on the production server (e.g. Heroku).
- Start our application with `nodemon` like:
```
node_modules/.bin/nodemon index.js
```
- Changes to application code now cause the server to restart automatically.
- Browser still has to be manually refreshed.
- Unlike React, we do not have the `hot reload` functionality to auto reload the browser.
- Let's define a dedicated `npm script` in the `package.json` file.
```json
{
    // ..
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    // ..
}
```
- In the script, no need to specify `node_modules/.bin/nodemon` path to nodemon.
    - This is because `npm` automatically knows to search for the file from that directory.
- Can now start server in development mode with:
```
npm run dev
```
- Unlike `start` and `test` scripts, we have to add `run` to the command.

## REST
- Expand app to provide same RESTful HTTP API as `json-server`.
- Representational State Transfer, aka `REST`, was introduced in 2000.
    - It is an architectural style meant for building scalable web apps.
    - Concern ourselves with how RESTful APIs are typically understood in web apps.
- It was mentioned that things like notes are called `resources`.
    - Each resource has an associated URL which is the resource's unique address.
    - One convention is to create unique address for resources by combining the name of resource type and resource's unique identifier.
- Assume root URL is `www.example.com/api`.
    - Assume resource type of note to be `notes`.
    - Address of a note resource with id of 10 has the unique address of `www.example.com/api/notes/10`.
- URL for the entire collection of all note resources is `www.example.com/api/notes`.
- Can execute different operations on resources.
    - Operation to be executed is defined by the HTTP `verb`.

|URL|verb|functionality|
|---|---|---|
|notes/10|GET|fetches a single resource|
|notes|GET|fetches all resources in the collection|
|notes|POST|creates a new resource based on the request data|
|notes/10|DELETE|removes the identified resource|
|notes/10|PUT|replaces the entire identified resource with the request data|
|notes/10|PATCH|replaces a part of the identified resource with the request data|

- Uniform interface.
    - A consistent way of defining interfaces that makes it possible for systems to operate.

## Fetching a Single Resource
- Expand our app so it offers a REST interface for operating on individual notes.
- Create a `route` for fetching a single resource.
- Unique address we will use for an individual note is of the form `notes/10`, where the number is the identifier.
- Define `parameters` in express using the colon syntax:
```javascript
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note  = notes.find(note => note.id === id)
    response.json(note)
})
```
- `app.get('/api/notes/:id', ...)` will handle all HTTP GET requests that are of the form `/api/notes/SOMETHING`, where `SOMETHING` is an abitrary string.
- The `id` parameter in the route of a request can be accessed through the `request` object.
```javascript
const id = request.params.id
```
- The `find` method is used to find the note with an id that matches the parameter.
- Note is then returned to the sender of the request.
- When we first go to `http://localhost:3001/api/notes/1`, we see an empty page. Use console.log to see why.
```javascript
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    const note  = notes.find(note => note.id === id)
    console.log(note)
    response.json(note)
})
```
- We see that the `id` parameter is used.
- The `note` is not found however.
- Let's also add console.log inside the comparison function passed to the `find` method.
```javascript
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note  = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
    })
    console.log(note)
    response.json(note)
})
```
- The output is the following
```
1 'number' '1' 'string' false
2 'number' '2' 'string' false
3 'number' '3' 'string' false
```
- The `id` variable contains a string. The ids of notes are integers.
- The triple equals considers values of different types when comparing. So, 1 is not '1'.
- Fix by changing the id from string to a number.
```javascript
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note  = notes.find(note => note.id === id)
    response.json(note)
})
```
- Now it works.
- There is another problem.
- When looking for a note with an id that does not exist, server responds with HTTP status code 200.
    - This means it succeeded.
- The reason is that `note` variable is set to `undefined` if no matching note is found.
- Handle it a better way. If no note is found, the server responds with status code 404 instead of 200.
```javascript
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note  = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})
```
- No data is sent with response, so we use `status` method for setting status.
- We use `end` method for responding to the request without sending any data.

## Deleting Resources
- Implement route for deleting resources.
- Happens by making an HTTP DELETE request.
```javascript
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
```
- If deleting is successful, we respond to request with status code `204 no content` and return no data with the response.
- No consensus on what status code to return when using DELETE on a resource that does not exist.
    - Only two options are 204 and 404.
    - For simplicity, use 204.

## Postman
- How do we test DELETE?
- HTTP GET requests are easy to make from the browser.
- We can write test code with JS for testing deletion, but it's not the best solution.
- Many tools exist for making testing of backends easier.
    - One is command line program `curl`.
    - However, we look at `Postman`.
- Install Postman.
    - Can install it in Linux Software manager.
- Go to Workspaces.
- Make a DELETE request to `http://localhost:3001/api/notes/1`.
    - This deletes the note with an id of 1.
- Go to `http://localhost:3001/notes` to see all the notes.
- When you restart the backend server, the note comes back.
    - This is because the notes in the application are only saved to memory.

## The Visual Studio Code REST Client
- If you use VSCode, you can use the VS Code `REST client` plugin instead of Postman.
- After installation, make directory at the root of application named `requests`.
    - Save all the REST client requests in the directory as files that end with the `.rest` extension.
- Create a new `get_all_notes.rest` file and define the request that fetches all notes.
```
GET http://localhost:3001/api/notes
```
- By clicking `Sent Request` text, the REST client will execute the HTTP request and response from the server is opened in the editor.

## The WebStorm HTTP Client
- If you use `IntelliJ WebStorm`, you can use builtin HTTP Client.
- Create new file with extension `.rest` and editor displays options to create and run your requests.
- Follow this guide: `https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html`

## Receiving Data
- Make it possible to add new notes to server.
- Use HTTP POST request to address `http://localhost:3001/api/notes`.
- Send all information for the new note in the request body in the JSON format.
- To access data easily, we need help of the express `json-parser`.
    - Use with command `app.use(express.json())`.
- Activate json-parser and implement initial handler for dealing with the HTTP POST requests.
```javascript
const express = require('express')
const app = express()

// ...

app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
})
```
- Event handler function can access data from the `body` property of the `request` object.
- Without json-parser, the `body` property is undefined.
    - json-parser takes the JSON data of a request, transforms it to JS object and attaches it to the `body` property of the `request` object before the route handler is called.
- The app just prints the received data to the console and sends it back in the response.
- Before proceeding, verify with Postman that data is actually received by the server.
    - Define URL, request type, define the data sent in the `body`.
    - Below is the data sent.
```json
{
    "content": "Postman is a good tool for testing REST apis",
    "important": true
}
```
- App will print the data we sent in the console.
- If you use VSCode REST plugin, you can send POST request with the REST client like this:
```
POST http://localhost:3001/api/notes
Content-Type: application/json

{
    "content": "Postman is a good tool for testing REST apis",
    "important": true
}
```
- The above is in a file called `create_note.rest`.
- Can add multiple requests in the same file using `###`.
```
GET http://localhost:3001/api/notes/

###
POST http://localhost:3001/api/notes/ HTTP/1.1
Content-Type: application/json

{
    "content": "Postman is a good tool for testing REST apis",
    "important": true
}
```
- When debugging, you can find out what headers have been set in the HTTP request.
- Use `get` method of the `request` object which can be used to get a value of single header.
- `request` object also has `headers` property containing all headers of a specific request.
- You can spot the missing `Content-Type` header if at a point in your code you print all of the request headers with `console.log(request.headers)`.
- Go back to app.
- Once app receives data correctly, we finalize the handling of the request:
```javascript
app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    
    const note = request.body
    note.id = maxId + 1

    notes = notes.concat(note)

    response.json(note)
})
```
- Need an ID for the new note.
- Grab the max id of the current notes list.
- The note that we are adding has an id of `maxId + 1`.
- This method not recommended.
- The POST request has a problem that we can add objects with any number of properties.
- Define that the `content` property may not be empty.
- The `important` and `date` properties will be given default values.
- All other properties discarded.
```javascript
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})
```
- Generating ID logic is in a separate function now.
- If received data is missing a value for `content` property, server will respond with status code `400 bad request`.
- Calling `return` is important because if we didn't, the bad note will get added to application.
- Generation of date is now done by server.
- If important is missing, it will default to `false`.
- What is happening in our ID generating function?
```javascript
Math.max(...notes.map(n => n.id))
```
- The `notes.map(n => n.id)` creates a new array that contains all the ids of the notes.
- `Math.max` returns the max value of the numbers that are passed to it.
- However, `notes.map(n => n.id)` is an `array` so it can't directly be given as a parameter to `Math.max`.
- The array can be transformed into individual numbers by using the "three dot" `spread` syntax `...`.

## About HTTP Request Types
- `HTTP standard` mentions two properties related to request types.
    - `safety` and `idempotence`.
- HTTP GET request should be `safe`:
    - In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe".
- Safety means executing request must not cause `side effects` in the server.
    - State of database must not change as a result of the request.
    - Response must only return data that already exists on the server.
- Nothing can guarantee a GET request is `safe`.
- Just a recommendation defined in the HTTP standard.
- Adhering to RESTful principles in our API makes GET requests used in a `safe` way.
- HTTP standard defines the request type `HEAD` to be safe.
- `HEAD` works exactly like `GET` but it does not return anything but the status code and response headers.
    - Response body will not be returned when you make a `HEAD` request.
- All HTTP requests except POST should be `idempotent`:
    - Methods can also have the property "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT, and DELETE share this property.
- If a request has side-effects, the result should be same regardless of how many times the request is sent.
- `idempotence` is also just a recommendation in the HTTP standard and not to be guaranteed based on the request type.
    - When our API adheres to RESTful principles, then GET, HEAD, PUT, and DELETE requests are used in a way they are idempotent.
- POST is neither `safe` nor `idempotent`.

## Middleware
- The express `json-parser` we used is called `middleware`.
- Middleware are functions that can be used to handle `request` and `response` objects.
- `json-parser` takes raw data from the requests that's stored in the `request` object, parses it to JS object, and assigns it to the `request` object as a new property `body`.
- Can have multiple middleware at the same time.
    - If you have more than one, they're executed one by one in the order that they were taken into use in express.
- Implement our own middleware that prints information about every request that is sent to the server.
- Middleware is a function that receives three parameters:
```javascript
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
```
- At end of function, the `next` function is called.
    - This yields control to the next middleware.
- Middleware is taken to use like:
```javascript
app.use(requestLogger)
```
- Middleware functions are called in the order that they're used with express server object's `use` method.
- `json-parser` is taken into use before `requestLogger` because otherwise `request.body` will not be initialized when the logger is executed!
- Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called.
- There are times we use middleware functions after routes. This means that we are defining middleware functions that are called if no route handles the HTTP request.
- Add the following middleware after our routes used to catch requests made to non-existent routes.
    - Middleware returns an error message in the JSON format.
```javascript
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```