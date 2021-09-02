# Component State, Event Handlers
- Go back to React part1 and use new example:
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

## Component Helper Functions
- Expand Hello component to guess year of birth of person greeted:
```javascript
const Hello = (props) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear()
        return yearNow - props.age
    }

    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}
```
- Directly access props passed to Hello component.
- We are basically defining functions within functions.
    - Defined helper function inside another function that defines behavior of our component.

## Destructuring
- Destructure values from objects and arrays upon assignment.
- We have reference to the data passed to components as props.name and props.age.
- Because `props` is an object:
```javascript
props = {
    name: 'Arto Hellas',
    age: 35,
}
```
- Assign the values of the properties directly into two variables `name` and `age`.
```javascript
const Hello = (props) => {
    const name = props.name
    const age = props.age

    const bornYear = () => new Date.getFullyear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear}</p>
        </div>
    )
}
```
- Destructuring makes assignment of variables even easier.
```javascript
const Hello = (props) => {
    const { name, age } = props
    const bornYear = () => new Date.getFullyear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear}</p>
        </div>
    )
}
```
- Take destructuring a step further:
```javascript
const Hello = ({ name, age }) => {
    const bornYear = () => new Date.getFullyear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear}</p>
        </div>
    )
}
```
- Props passed to component are directly destructured into the variables `name` and `age`.
- We assign the values of the properties directly to variables by destructuring the props object that is passed to the component function as a parameter.

## Page Re-rendering
- Pages remain the same after initial rendering.
- What if we wanted to create counter where value increased as a function of time or at click of a button.
- `App.js` below:
```javascript
import React from 'react'

const App = (props) => {
    const {counter} = props
    return (
        <div>{counter}</div>
    )
}

export default App
```
- `index.js` below:
```javascript
import ReactDOM from 'react-dom'
import App from './App'

let counter = 1

ReactDOM.render(
    <App counter={counter} />,
    document.getElementById('root')
)
```
- Reload the browser to get new content.
- `App` component is given the value of counter via the `counter` prop.
- Component then renders that value to the screen.
- What happens when value of `counter` changes?
- Even if we add the next code, the component won't re-render.
```javascript
counter += 1
```
- The component can re-render by calling `ReactDOM.render` method again.
```javascript
let counter = 1
const refresh = () => {
    ReactDOM.render(<App counter={counter} />,
    document.getElementById('root')))
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
```
- Re-rendering command wrapped inside of `refresh` function.
- The values 1, 2, and 3 appear on the screen. This happens so fast that you cannot notice values 1 and 2.
- We can instead re-render in an interval (1 second).
```javascript
setInterval(() => {
    refresh()
    counter += 1
}, 1000)
```
However, making many calls to `ReactDOM.render` method is not a good way to re-render components.

## Stateful Component
- Our components till now did not contain any state that could change during the component lifecycle.
- Add state to our `App` component with React's `state hook`.
- `index.js` below:
```javascript
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
```
- `App.js` below:
```javascript
import React, { useState } from 'react'

const App = () => {
    const [ counter, setCounter ] = useState(0)

    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return (
        <div>{counter}</div>
    )
}

export default App
```
- In first row, the file imports the `useState` function.
- Function call adds state to the component and initializes it with zero.
- Function returns an array that has two items.
- Assign items to variables `counter` and `setCounter` by using the destructuring assignment syntax.
- `counter` is assigned initial value of `state` which is zero.
- `setCounter` is assigned to a function that will be use to modify the state.
- `setTimeout` is called with two parameters.
    - First is the function to invoke after however many seconds the second parameter is.
- When `setCounter` is called, React re-renders the component.
    - The function body of the component function gets re-executed.
- Every time `setCounter` modifies the state it causes the component to re-render.