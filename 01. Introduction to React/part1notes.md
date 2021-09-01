# Introduction to React
- React library.
- Make a simple React application and know the core concepts.
- Easiest way is to use tool called `create-react-app`.
    - `https://github.com/facebook/create-react-app`
- Create an application called `part1` and navigate to its directory

```
$ npx create-react-app part1
$ cd part1
```
- Run the application
```
$ npm start
```
- By default, app runs in localhost port 3000.
    - `http://localhost:3000`
    - Default browser launches automatically.
- Code for application is in the `src` folder.
- Simplify `index.js` file like below.
```javascript
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
```
- Simplify `App.js` file like below.
```javascript
import React from 'react'
const App = () => {
    <div>
        <p>Hello world</p>
    </div>
}
export default App
```
- Delete `App.css`, `App.test.js`, `logo.svg`, `setupTests.js`, and `reportWebVitals.js`.