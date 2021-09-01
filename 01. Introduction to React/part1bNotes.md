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
