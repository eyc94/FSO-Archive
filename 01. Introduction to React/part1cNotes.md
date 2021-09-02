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