# A More Complex State, Debugging React Apps

## Complex State
- Our previous app state only was a single integer.
- More complex state?
- Easiest and best way to do this is to use `useState` function multiple times to create separate "pieces" of state.
- We create two pieces of state for the application named `left` and `right` that both get initial value of 0.
```javascript
const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    return (
        <div>
            {left}
            <button onClick={() => setLeft(left + 1)}>
                left
            </button>
            <button onClick={() => setRight(right + 1)}>
                right
            </button>
            {right}
        </div>
    )
}
```
- `setLeft` and `setRight` are used to update the states.
- Component's state can be any type.
    - We can do the same by saving click count of left and right in an object.
```javascript
const App = () => {
    const [clicks, setClicks] = useState({
        left: 0, right: 0
    })

    const handleLeftClick = () => {
        const newClicks = {
            left: clicks.left + 1,
            right: clicks.right
        }
        setClicks(newClicks)
    }

    const handleRightClick = () => {
        const newClicks = {
            left: clicks.left,
            right: clicks.right + 1
        }
        setClicks(newClicks)
    }

    return (
        <div>
            {clicks.left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {clicks.right}
        </div>
    )
}
```
- Component now only has a single state.
- Event handlers have to take care of changing the entire application state.
- Can use `object spread` syntax to make it more neat.
```javascript
const handleLeftClick = () => {
    const newClicks = {
        ...clicks,
        left: clicks.left + 1
    }
    setClicks(newClicks)
}

const handleRightClick = () => {
    const newClicks = {
        ...clicks,
        right: clicks.right + 1
    }
    setClicks(newClicks)
}
```
- Creates a new object that has copies of all the properties in `clicks` object.
- Specifying a particular property will change it however.
- We can also just not assign object to a variable in the event handlers and we can do this:
```javascript
const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 })
```
- It is **forbidden** to mutate state directly like so:
```javascript
const handleLeftClick = () => {
    clicks.left++
    setClicks(clicks)
}
```
- Changing state has to be done by setting the state to a new object.

## Handling Arrays
- Add piece of state containing an array `allClicks` that remembers every click in the app.
```javascript
const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}
            <p>{allClicks.join(' ')}</p>
        </div>
    )
}
```
- Every click stored in state called `allClicks` which is initially empty.
- When left button clicked, we add 'L' to the array.
- When right button clicked, we add 'R' to the array.
- The `concat` method does not mutate the existing array. It returns a new copy with the item added to it.
- Do NOT use the `push` method because it mutates the array.
- We call the `join` method on the `allClicks` array that joins all items into a single string separated by the string passed in as the argument.
    - The string in this case is empty string.

## Conditional Rendering
- Make new `History` component to handle rendering of clicking history.
```javascript
const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const App = () => {
    // ...

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}
            <History allClicks={allClicks} />
        </div>
    )
}
```
- Behavior of component depends on if you clicked a button or not.
- If you did not click, the `allClicks` array is empty. The component renders instructions.
- If you did, it just shows the clicking history.
- This is called **conditional rendering**.
- Use `Button` component defined earlier.
```javascript
const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text='left' />
            <Button handleClick={handleRightClick} text='right' />
            {right}
            <p>{allClicks.join(' ')}</p>
        </div>
    )
}
```

## Old React
- We use `state hook` to add state to our React components.
    - Available v16.8.0 onwards.
- Before new versions, state had to be defined as `class` components, using class syntax.

## Debugging React Applications
- Large part of time spent on reading and debugging code.
- Good practices and tools are important.
- Keep the developer console open at all times.
- Using the `console.log` method is a good way of debugging.
    - Log the `props` parameter to see what the component is taking in.
    - To log to console, we must not use shortcuts like destructuring. Make it less compact.
- When using `console.log`, don't combine `objects` with the `+` operator. Separate them with commas like so:
```javascript
console.log('props value is', props)
```
- You can pause the execution of your app code in the dev console by writing the command `debugger` anywhere in your code.
- Debugger also allows executing code line by line with controls found on the right side of `Sources` tab.
- Can also add breakpoints in the `Sources` tab without writing the command `debugger`.
- Inspect component variables in `Scope` section.
- Add this React Developer Tools extension to Chrome:
    - `https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi`
    - Adds new `Components` tab to the dev tools.
    - Can view React elements, state, and props.
    - Shows the state of hooks in the order of their definition.

## Rules of Hooks
- The `useState` and `useEffect` functions must not be called from inside a loop, a conditional expression, or any place that is not a function defining a component.
```javascript
const App = () => {
    // these are ok
    const [age, setAge] = useState(0)
    const [name, setName] = useState('Juha Tauriainen')

    if (age > 10) {
        // This does not work!
        const [foobar, setFoobar] = useState(null)
    }

    for (let i = 0; i < age; i++) {
        // This is not good!
        const [rightWay, setRightWay] = useState(false)
    }

    const notGood = () => {
        // This is not good!
        const [x, setX] = useState(-1000)
    }

    return (
        // ...
    )
}
```

## Event Handling Revisited
- Revisit topic of event handling.
- Assume out app has this `App` component.
```javascript
const App = () => {
    const [value, setValue] = useState(10)

    return (
        <div>
            {value}
            <button>reset to zero</button>
        </div>
    )
}
```
- We want to reset `value` to 0 when we click the button.
- We have to add an `event handler`.
- Event handlers must be a function or a reference to a function.
    - Every other type will not work.
    - We also cannot have a function "call" be an event handler.
- One solution is this:
```javascript
<button onClick={() => console.log('clicked the button')}>
    button
</button>
```
- Event handler is a function defined using arrow function syntax.
- Calling this function happens when button is clicked.
- Reset like this:
```javascript
<button onClick={() => setValue(0)}>button</button>
```
- Defining event handlers directly in attribute of button is not the *best* idea.
- Event handlers can be defined in a separate place.
```javascript
const App = () => {
    const [value, setValue] = useState(10)

    const handleClick = () => {
        console.log('clicked the button')
        setValue(0)
    }

    return (
        <div>
            {value}
            <button onClick={handleClick}>button</button>
        </div>
    )
}
```