# Getting Data From Server
- We have only worked on "frontend" (browser) functionality.
- Backend is in the third part of this course.
- Familiarize with how code executing in browser communicates with backend.
- We use a tool called `JSON Server` to act as our server.
- Create a file called `db.json` in the root directory of project:
```json
{
    "notes": [
        {
            "id": 1,
            "content": "HTML is easy",
            "date": "2019-05-30T17:30:31.098Z",
            "important": true
        },
        {
            "id": 2,
            "content": "Browser can execute only JavaScript",
            "date": "2019-05-30T18:39:34.091Z",
            "important": false
        },
        {
            "id": 3,
            "content": "GET and POST are the most important methods of HTTP protocol",
            "date": "2019-05-30T19:20:14.298Z",
            "important": true
        }
    ]
}
```
- You can install JSON Server globally using:
```
npm install -g json-server
```
- Global installation requires admin privileges.
- Global installation is not necessary.
- From root of app, run the `json-server` using command `npx`:
```
npx json-server --port 3001 --watch db.json
```
- `json-server` starts running on port 3000 by default.
    - The app created by `create-react-app` uses port 3000, so we use 3001.
- Navigate to `http://localhost:3001/notes`.
    - `json-server` serves the notes we previously wrote in JSON format.
- The idea from here on would be to add notes to the server.
    - Saving to json-server.
- React code fetches the notes from the server and renders them to screen.
- When new note is added, the React code sends it to the server to make the new note persist in memory.
- `json-server` stores all data in `db.json` file, which resides on server.
    - Real world: data would be stored in a database.
    - `json-server` is a handy tool that allows the use of server-side functionality in the development phase without the need to program any of it.

## The Browser As A Runtime Environment
- Fetch already existing notes to our React app from `http://localhost:3001/notes`.
- We learned back then how to fetch data using `XMLHttpRequest` or HTTP request made using an XHR object.
    - No longer recommended.
    - Browsers support the `fetch` method based on `promises`.
- A reminder of what **NOT** to do:
```javascript
const xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText)
        // handle the response that is saved in variable data
    }
}

xhttp.open('GET', '/data.json', true)
xhttp.send()
```
- We register an `event handler` to the xhttp object representing the HTTP request.
    - This will be called by the JavaScript runtime whenever the state of the `xhttp` object changes.
    - If change in state means the response to request has arrived, the data is handled accordingly.
- Code in event handler is defined before request sent to server.
    - Will be executed at a later point in time.
- Code does not execute synchronously (top to bottom).
- JavaScript engines (runtime environments) follow `asynchronous model`.
    - This requires all IO-operations to be executed as non-blocking.
    - Code execution continues immediately after calling an IO function, without waiting for it to return.
- When async operation is completed, the JS engine calls the event handler registered to that operation.
- JS engines are `single-threaded` meaning they cannot execute code in parallel.
    - Requirement therefore to use a non-blocking model for IO operations.
    - Otherwise, browser freezes during the fetching of data from server.
- If a code takes a long time to execute, browser gets stuck.
- What the heck is the event loop anyway?
    `https://www.youtube.com/watch?v=8aGhZQkoFbQ`
- Possible for parallelized code with `web workers`.

# NPM
- Fetching data from server.
- We can use promise based function `fetch` to pull data from server.
- We will instead use `axios` library to communicate between the browser and the server.
    - Like fetch, but is pleasant to use.
    - Helps us get familiar with add external libraries (`npm packages`) to React projects.
- Practically all JS projects defined using node package manager (npm).
    - Projects created using `create-react-app` also follow the npm format.
    - `package.json` file is an indicator the project uses npm.
- Example of `package.json`:
```json
{
    "name": "part2-notes",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "@testing-library/jest-dom": "^5.11.9",
        "@testing-library/react": "^11.2.3",
        "@testing-library/user-event": "^12.6.0",
        "react": "^17.0.1",
        "react-dom": "^17.0.1",
        "react-scripts": "4.0.1",
        "web-vitals": "^0.2.4"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": [
        "react-app",
        "react-app/jest"
        ]
    },
    "browserslist": {
        "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
        ],
        "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
        ]
    }
}
```
- `dependencies` part is the most important because it defines what `dependencies` (external libraries) the project has.
- Install axios:
```
npm install axios
```
- `npm` commands should always be run in project root directory.
    - The root directory is where `package.json` is.
- Axios should now be included:
```json
{
    "dependencies": {
        "@testing-library/jest-dom": "^5.11.9",
        "@testing-library/react": "^11.2.3",
        "@testing-library/user-event": "^12.6.0",
        "axios": "^0.21.1",
        "react": "^17.0.1",
        "react-dom": "^17.0.1",
        "react-scripts": "4.0.1",
        "web-vitals": "^0.2.4"
    },
    // ...
}
```
- The library code is now downloaded to `node_modules` directory.
- Install `json-server` as a development dependency (only used during development):
```
npm install json-server --save-dev
```
- Make addition to `scripts` part of `package.json`:
```json
{
    // ... 
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "server": "json-server --port 3001 --watch db.json"
    },
}
```
- We can now start json-server with:
```
npm run server
```
- There is a difference between the two `npm install` statements:
```
npm install axios
npm install json-server --save-dev
```
- `axios` is installed as a runtime dependency of the app because the execution of the program requries existence of the library.
- `json-server` is installed as a development dependency `--save-dev` because the program itself does not require it.
    - Used to help during software development.

## Axios and Promises
- json-server assumed to be running on port 3001.
- Use 2 terminal windows to run the app and server at the same time.
- use `import` statement to use library.
- Add this to `index.js`:
```javascript
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
```
- Open `http://localhost:3000` and the dev console.
- You should see something printed there.
- When `index.js` changes, React does not notice automatically.
    - You must manually refresh.
    - You can make React notice automatically.
        - Create a file called `.env` in the root of project and add the line:
```
FAST_REFRESH=false
```
- Restart app.
- Axios' `get` method returns a `promise`.
    - **A Promise is an object representing the eventual completion or failure of an asynchronous operation**.
- A `Promise` is an object that represents an asynchronous operation.
- Promise can have 3 states:
    1. The promise is `pending`: It means that the final value (on of the next two) is not available yet.
    2. The promise is `fulfilled`: It means the operation has completed and the final value is available, meaning successful operation. Sometimes called `resolved`.
    3. The promise is `rejected`: It means that an error prevented the final value from being determined, meaning failed operation.
- First operation is `fullfilled` representing a successful request.
- Second operation is `rejected`. We were trying to make an HTTP GET request to an address that does not exist.
- If we want access to the result of the operation represented by promise, we must register an event handler to the promise.
    - Achieved by `then` method.
```javascript
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
    console.log(response)
})
```
- The JS runtime environment calls the callback function registered by `then` method providing it with a `response` as a parameter.
    - `response` object has all data related to the response of an HTTP GET request.
        - `data`, `status code`, and `headers`.
- Storing promise in variable is not necessary like we did above. Chaining is more common.
```javascript
axios.get('http://localhost:3001/notes').then(response => {
    const notes = response.data
    console.log(notes)
})
```
- The callback function takes the response data and stores in variable and prints it.
- This is a more readable way to chain method calls:
```javascript
axios
    .get('http://localhost:3001/notes')
    .then(response => {
        const notes = response.data
        console.log(notes)
    })
```
- Data returned by server is plain text (one long string).
- Axios still able to parse data into JS array because server specified data format as `application/json; charset=utf-8`.
- Can now use data fetched from server.
- Try and request notes from our local server and render them, first as the `App` component.
    - This approach has issues because we are rendering the entire `App` component only when we successfully get a response.
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
    const notes = response .data
    ReactDOM.render(
        <App notes={notes} />,
        document.getElementById('root')
    )
})
```
- This method is sometimes acceptable.
- Let's instead move fetching of data inside `App` component.
    - It's not immediately obvious *where* we place `axios.get` in the component.

## Effect-hooks
- We learned `state hooks`.
- We now look at `effect hooks`.
    - The `Effect Hook` lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
- Effect hooks are the right tool to use when fetching data from server.
- Remove fetching of data from `index.js`.
```javascript
ReactDOM.render(<App />, document.getElementById('root'))
```
- Change `App.js` as follows:
```javascript
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }, [])
    console.log('render', notes.length, 'notes')

    // ...
}
```
- These logs clarify the progression of the expression.
- This is printed to console:
```
render 0 notes
effect
promise fulfilled
render 3 notes
```
- The body of the function defining the component is executed and component render for first time.
- `render 0 notes` is printed meaning data has not been fetched from server yet.
- The function inside the effect is executed immediately after rendering.
- "effects" is then printed to the console.
- `axios.get` initiates fetching of data from server and registers an event handler.
- When data arrives from server, the JS runtime calls the registered function as the event handler.
- Prints "promise fulfilled" and stores the notes received from the server into the state using the function `setNotes(response.data)`.
- A call to a state-updating function triggers re-rendering of the component.
    - `render 3 notes` is printed as a result.
    - Notes fetched from the server are rendered to the screen.
- Let's rewrite the code a bit differently:
```javascript
const hook = () => {
    console.log('effect')
    axios
        .get('http://localhost:3001/notes')
        .then(response => {
            console.log('promise fulfilled')
            setNotes(response.data)
        })
}

useEffect(hook, [])
```
- `useEffect` takes two parameters:
    1. A function (the `effect` itself).
        - By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
        - The effect is *always* run after the component has been rendered.
        - We only want to execute the effect along with the first render.
    2. Used to specify how often the effect is run. If empty array `[]`, then the effect is only run along with the first render of the component.
- Could have written code this way:
```javascript
useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
        console.log('promise fulfilled')
        setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
}, [])
```
- When adding notes, we still cannot add to server.

## The Development Runtime Environment
- Following image shows the makeup of the application we have so far:
![alt text](https://github.com/eyc94/Full-Stack-Open/images/application_makeup.png "Image of application makeup")