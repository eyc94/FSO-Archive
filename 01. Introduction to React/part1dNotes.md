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