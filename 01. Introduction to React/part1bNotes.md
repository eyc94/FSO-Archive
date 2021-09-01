# JavaScript
- Name of JavaScript standard is ECMAScript.
    - Latest as of June 2021 is ES12 or ECMAScript 2021.
- Not all browsers support newest JavaScript features.
    - Lots of code is transpiled from newer versions to older versions of JavaScript.
    - Most popular way to transpile is `Babel`.
    - Transpilation is automatic in React apps created by `create-react-app`.
- Node.js is a JavaScript runtime environment.
- Code written in files with `.js` extension.
    - Code run by the command: `node name_of_file.js`.
- Can run JavaScript code in the Node console.
    - Pull up console by the command: `node`.

## Variables
- To define variables, there are a few ways:
```javascript
const x = 1
let y = 5

console.log(x, y)   // 1, 5 are printed.
y += 10
console.log(x, y)   // 1, 15 are printed.
y = 'sometext'
console.log(x, y)   // 1, sometext are printed.
x = 4               // Causes an error.
```
- `const` defines a value that can no longer be changed.
- `let` defines a normal variable.
- Type of variable can change.
    - `y` stores an integer initially and stores a string at the end.
- You can define variables using `var`.
    - Follow these links to learn more:
    - `https://medium.com/podiihq/javascript-variables-should-you-use-let-var-or-const-394f7645c88f`
    - `https://www.jstips.co/en/javascript/keyword-var-vs-let/`
    - `https://www.youtube.com/watch?v=sjyJBL5fkp8`

## Arrays
- Couple of examples below:
```javascript
const t = [1, -1, 3]

t.push(5)

console.log(t.length)   // 4 is printed.
console.log(t[1])       // -1 is printed.

t.forEach(value => {
    console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line.
})
```
- Contents of the array can be modified but the const cannot point to something different.
    - The array is an object.
- Variable will always point to the same object.
- Iterate through the items of array using `forEach`.
    - `forEach` receives a **function** defined using the array syntax as parameter.
    - `forEach` calls the function for each item in the array, passing the item as an argument.
- `push` adds item to the end of the array.
- Usual convention has it that you change values in an array.
- In React, it is preferable to use the method `concat`, which creates a new array with the old values and new item included.
```javascript
const t = [1, -1, 3]

const t2 = t.concat(5)

console.log(t)  // [1, -1, 3] is printed.
console.log(t2) // [1, -1, 3, 5] is printed.
```
- Below is the `map` method:
```javascript
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)     // [2, 4, 6] is printed.
```
- `map` creates a new array based off the old array.
- The function given as a parameter is used to create the new items.
    - The original value is multiplied by 2.
- `map` can also transform arrays into something different.
```javascript
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed.
```
- A new array containing strings of HTML using the map method.
- Individual items of an array are easy to assign to variables with `destructuring assignment`.
```javascript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)      // 1, 2 is printed.
console.log(rest)               // [3, 4, 5] is printed.
```
- `first` and `second` receive first two integers of the array.
- The remaining integers are "collected" into an array of their own assigned to variable called `rest`.

## Objects
- Different ways to define objects in JavaScript.
- Can use `object literals`.
```javascript
const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
}

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}

const object3 = {
    name: {
        first: 'Dan',
        last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}
```
- Values of the properties can be any types.
    - integers, strings, arrays, objects...
- Properties of objects are referenced using "dot" notation or brackets.
```javascript
console.log(object1.name)       // Arto Hellas is printed.
const fieldName = 'age'
console.log(object1[fieldName]) // 35 is printed.
```
- Can add properties to an object using dot notation or brackets.
```javascript
object1.address = 'Helsinki'
object1['secret number'] = 12341
```
- If the property has a space, we need to use bracket and not dot notation.
- Objects can also have methods.
- Objects can be defined using constructor functions like in Java's classes.

## Functions
- Whole process to define an arrow function is:
```javascript
const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}
```
- The function call is below:
```javascript
const result = sum(1, 5)
console.log(result)     // 6 is printed.
```
- We can exclude the parentheses if there is just a single parameter.
```javascript
const square = p => {
    console.log(p)
    return p * p
}
```
- If function contains a single expression, braces are not needed.
- Remove console printing.
```javascript
const square = p => p * p
```
- The short form above is handy when manipulating arrays (map method).
```javascript
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```
- **Function Declaration**.
```javascript
function product(a, b) {
    return a * b
}

const result = product(2, 6)
// result is now 12.
```
- **Function Expression**.
    - There is no need to give the function a name and the definition may reside among the rest of the code.
```javascript
const average = function(a, b) {
    return (a + b) / 2
}

const result = average(2, 5)
// result is now 3.5.
```

## Object Methods and "this"
- We are using React Hooks, so we do not need to define objects with methods.
- Just good to know.
- Arrow functions and functions defined with `function` vary when it comes to how they behave with the keyword `this` (referring to the object itself).
- Assign methods to objects like below:
```javascript
const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
        console.log('hello, my name is ' + this.name)
    },
}

arto.greet()    // "hello, my name is Arto Hellas" gets printed.
```
- Methods can be assigned to objects after its creation.
```javascript
const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
        console.log('hello, my name is ' + this.name)
    },
}

arto.growOlder = function() {
    this.age += 1
}

console.log(arto.age)   // 35 is printed.
arto.growOlder()
console.log(arto.age)   // 36 is printed.
```
- Modify the object like below:
```javascript
const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
        console.log('hello, my name is ' + this.name)
    },
    doAddition: function(a, b) {
        console.log(a + b)
    },
}

arto.doAddition(4, 1)       // 5 is printed.

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15) // 25 is printed.
```
- We can call the method the normal way.
- We can also assign the function to a variable and call it via the variable.
    - This is called a `method reference`.
- When we do the same thing with `greet`, there is a problem:
```javascript
arto.greet()        // "hello, my name is Arto Hellas" gets printed.

const referenceToGreet = arto.greet
referenceToGreet()  // "hello, my name is undefined" is printed.
```
- When calling methods through references, the method loses knowledge of what the original `this` was.
- Value of `this` is based on how the method is called.
- When calling method through reference, `this` becomes the **global object**.
- We avoid these issues by using "this-less" JavaScript.
- One way of `this` disappearing is when using the `setTimeout` function to call the `greet` function on the `arto` object.
```javascript
const arto = {
    name: 'Arto Hellas',
    greet: function() {
        console.log('hello, my name is ' + this.name)
    },
}

setTimeout(arto.greet, 1000)
```
- When `setTimeout` is called, it is the JavaScript engine that actually calls the method.
- `this` refers to the global object.
- The original `this` can be preserved using the `bind` method.
```javascript
setTimeoutt(arto.greet.bind(arto), 1000)
```
- Calling `arto.greet.bind(arto)` creates a new function where `this` points to Arto.
    - Doesn't matter how or where the method is called.
- Learn more about `this`:
    - `https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth`

## Classes
- No class mechanism like those in OOP languages.
- Features exist to simulate object-oriented classes.
- Define a "class" called Person and two Person objects.
```javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    greet() {
        console.log('hello, my name is ' + this.name)
    }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()
```
- The type of both objects is `Object`.
    - JavaScript types are only `Boolean`, `Null`, `Undefined`, `Number`, `String`, `Symbol`, `BigInt`, and `Object`.
- Learn more about classes below:
    - `https://github.com/petsel/not-awesome-es6-classes`
    - `https://rajaraodv.medium.com/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65`


## JavaScript Materials
- Mozilla's JavaScript Guide: `https://developer.mozilla.org/en-US/docs/Web/JavaScript`
- Read: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript`
- You-Dont-Know-JS Book: `https://github.com/getify/You-Dont-Know-JS`
- Javascript.info: `https://javascript.info/`