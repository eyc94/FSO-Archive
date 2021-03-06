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

## Event Handling
- We talked about event handlers before.
- Change application so counter increase happens when user clicks a button.
    - Button elements support `mouse events`.
    - `click` is the most common.
    - `click` event can be triggered with the keyboard or a touch screen despite the name.
- Registering an event handler function to the `click` event is like this:
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0)

    const handleClick = () => {
        console.log('clicked')
    }

    return (
        <div>
            <div>{counter}</div>
            <button onClick={handleClick}>
                plus
            </button>
        </div>
    )
}
```
- The code above logs "clicked" to the console each time the button is pressed.
- Set the value of button's `onClick` attribute to reference `handleClick` function.
- The event handler function can also be defined directly in the value of `onClick` attribute like below:
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0)

    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => console.log('clicked')}>
                plus
            </button>
        </div>
    )
}
```
- We can increase value of counter by one and the component gets re-rendered.
```javascript
<button onClick={() => setCounter(counter + 1)}>
    plus
</button>
```
- Add button for reset counter.
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0)

    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => setCounter(counter + 1)}>
                plus
            </button>
            <button onClick={() => setCounter(0)}>
                zero
            </button>
        </div>
    )
}
```

## Event Handler is a Function
- Event handler defined like this:
```javascript
<button onClick={() => setCounter(counter + 1)}>
    plus
</button>
```
- `setCounter` function is called only when the user clicks the button.
- Should separate event handlers into separate functions and not define inside attribute values.
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)

    const setToZero = () => setCounter(0)

    return (
        <div>
            <div>{counter}</div>
            <button onClick={increaseByOne}>
                plus
            </button>
            <button onClick={setToZero}>
                zero
            </button>
        </div>
    )
}
```

## Passing State to Child Components
- Recommended to write React components that are small and reusable.
- Refactor so that our app has three smaller components.
    - One for displaying counter.
    - Two for buttons.
- Implement a `Display` component to display value of counter.
- **Best practice**:
    - Lift the state up in the component hierarchy.
    - Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.
- Place app's state in the `App` component and pass it down to the `Display` component through `props`.
```javascript
const Display = (props) => {
    return (
        <div>{props.counter}</div>
    )
}
```
- We only need to pass state of `counter` to component.
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Display counter={counter} />
            <button onClick={increaseByOne}>
                plus
            </button>
            <button onClick={setToZero}>
                zero
            </button>
        </div>
    )
}
```
- Make a `Button` component for the buttons of our app.
- Pass the event handler and title of the button through the component's props.
```javascript
const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}
```
- Our `App` component is now:
```javascript
const App = () => {
    const [ counter, setCounter ] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Display counter={counter} />
            <Button
                onClick={increaseByOne}
                text='plus'
            />
            <Button
                onClick={setToZero}
                text='zero'
            />
            <Button
                onClick={decreaseByOne}
                text='minus'
            />
        </div>
    )
}
```
- We have an easily reusable `Button` component.
- We can decrement the counter as well.
- Event handler passed to `Button` throught the `onClick` prop.
    - This convention of naming is suggested. But, it can be anything.

## Changes In State Cause Rerendering
- Once app starts, code in `App` is executed.
- This code uses a `useState` to create the application state, setting an initial value of `counter`.
- This component also contains the `Display` component which shows the counter's value, 0, and three `Button` components.
- The buttons all have event handlers used to change the state of the counter.
- When one button is clicked, event handler is executed.
- Event handler changes state of `App` component with `setCounter` function.
    - **Calling function which changes the state causes component to rerender**.

## Refactoring the Components
- We can destructure and simplify the `Display` component.
```javascript
const Display = ({ counter }) => {
    return (
        <div>{counter}</div>
    )
}
```
- Only contains one return statement so we can remove curly braces.
```javascript
const Display = ({ counter }) => <div>{counter}</div>
```
- Simplify the `Button` component as well.
```javascript
const Button = ({ onClick, text }) => {
    <button onClick={onClick}>
        {text}
    </button>
}
```