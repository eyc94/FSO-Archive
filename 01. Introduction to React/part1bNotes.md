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