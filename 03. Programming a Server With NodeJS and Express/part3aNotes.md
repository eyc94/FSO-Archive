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