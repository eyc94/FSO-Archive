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

## Component
- The `App.js` file now defines a **React component** with the name App.
- The last line of the `index.js` file renders the App component's content into the div-element defined in the file `public/index.html`.
    - This div-element has an id value of 'root'.
- The `public/index.html` file does not have any HTML markup visible to browser.
- Best practice to render content defined as React components.
- The App component rendered as a div tag which wraps a p tag containing text.
- Component defined as a JavaScript function.
- Function assigned to constant variable called `App`.
- Function defining component may contain any JavaScript code.
- If function contains one expression, we can use shorthand. If it contains more, we have to explicitly write the return statement.
```javascript
const App = () => {
    console.log('Hello from component')
    return (
        <div>
            <p>Hello world</p>
        </div>
    )
}
```
- The code above prints the text to the console.
- We can render dynamic content inside of a component.
```javascript
const App = () => {
    const now = new Date()
    const a = 10
    const b = 20

    return (
        <div>
            <p>Hello world, it is {now.toString()}</p>
            <p>
                {a} plus {b} is {a + b}
            </p>
        </div>
    )
}
```
- Any JavaScript code is evaluated within the curly braces.
- Result of this evaluation is embedded into defined place in the HTML produced by the component.

## JSX
- Looks like React components are returning HTML, but it is not.
- Layout of React components written using JSX.
- Dealing with a way to write JavaScript.
- JSX returned by React components is compiled into JavaScript.
- After compiling, we App actually looks like below.
```javascript
const App = () => {
    const now = new Date()
    const a = 10
    const b = 20
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p', null, 'Hello world, it is ', now.toString()
        ),
        React.createElement(
            'p', null, ' plus ', b, ' is ', a + b
        )
    )
}
```
- Babel is handling the compiling.
- Projects created with `create-react-app` are configured to compile automatically.
- JSX is like HTML but JSX you can embed dynamic content by writing appropriate JavaScript in curly braces.
    - Like a templating engine.
    - Like XML because every tag needs to be closed.
    - For example the newline in HTML and JSX are show below.
```html
<br>
```
```javascript
<br />
```

## Multiple Components
- Modify `App.js` as follows.
- Import and export left out to make compact, but still needed.
```javascript
const Hello = () => {
    return (
        <div>
            <p>Hello world</p>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <h1>Greetings</h1>
            <Hello />
            <Hello />
            <Hello />
        </div>
    )
}
```
- We define a new component named `Hello` and place it inside our `App` component.
- A component can also be used multiple times as shown above.
- A convention is that the `root component` is called `App`.

## Props: Passing Data To Components
- Pass data to components using `props`.
- Modify `Hello` component.
```javascript
const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}</p>
        </div>
    )
}
```
- Parameter called `props`.
    - Parameter receives an object which has fields corresponding to all the "props" the user of the component defines.
- Props are defined like below.
```javascript
const App = () => {
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="George" />
            <Hello name="Daisy" />
        </div>
    )
}
```
- Prop values can be hard coded or results of JavaScript expressions.
    - If value of prop is JavaScript, it must be wrapped in curly braces.
- Use two props below.
```javascript
const Hello = (props) => {
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    )
}

const App = () => {
    const name = 'Peter'
    const age = 10

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
        </div>
    )
}
```
- We passed values of variables, result of expression, and regular strings as props.

## Some Notes
- React component names must be capitalized.
- Content of React component needs to contain **one root element**.
    - Instead of a root elemnt, we can return an **array** of components
    - This is ugly though.
- We can use `fragments` instead by wrapping elements to be returned by empty element.
```javascript
const App = () => {
    const name = 'Peter'
    const age = 10

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />
        </>
    )
}
```
- DOM generated by React no longer contains the extra div-element.