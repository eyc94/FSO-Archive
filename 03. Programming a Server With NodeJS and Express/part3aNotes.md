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