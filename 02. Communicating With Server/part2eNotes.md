# Adding Styles to React App
- Look at how we can add styles to a React application.
- Several ways of doing so, but we look at one method.
- First, we add CSS to our app the old-school way: in a single file without using the CSS preprocessor.
- Add `index.css` file under the `src` directory.
- Add to application by importing it in the `index.js` file.
```javascript
import './index.css'
```
- Add this to the CSS file:
```css
h1 {
    color: green;
}
```
- CSS rules comprise of `selectors` and `declarations`.
- Selectors define which elements the rules should be applied to.
- Selector above is `h1`, which matches all `h1` tags in the application.
- Declaration sets the `color` property to the value green.
- One CSS rule can have many number of properties.
- Modify the rule above to define a font style as `italic`.
```css
h1 {
    color: green;
    font-style: italic;
}
```
- We can match elements by using different types of CSS selectors.
- If we wanted to target each note with our styles, we could use the `li` selector.
    - This is because all notes are wrapped inside `li` tags.
```javascript
const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'make not important'
        : 'make important';
    
    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}
```
- Add the following rule to style sheet.
```css
li {
    color: grey;
    padding-top: 3px;
    font-size: 15px;
}
```
- Using element types for making CSS rules can be bad because there can be other `li` tags we do not want our styles on.
- If we want styling to be specifically to notes, we should use a class selector.
- In HTML, classes are defined by value of `class` attribute.
```html
<li class="note">some text...</li>
```
- In React, we have to use the `className` attribute instead of `class` attribute.
- Make changes to `Note` component:
```javascript
const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'make not important'
        : 'make important';
    
    return (
        <li className='note'>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}
```
- Class selectors are defined with `.classname` syntax.
```css
.note {
    color: grey;
    padding-top: 3px;
    font-size: 15px;
}
```

## Improved Error Message
- Implement error message as its own component.
```javascript
const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}
```
- If value of `message` prop is `null`, then nothing is rendered to the screen.
- In other cases, the message gets rendered inside of a div element.
- Add a new piece of state called `errorMessage` to the `App` component.
    - Initialize it with some error message so we can immediately test it.
```javascript
const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    // ...

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            // ...
        </div>
    )
}
```
- Add style that suits an error message:
```css
.error {
    color: red;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    magrin-bottom: 10px;
}
```
- Add logic for displaying the error message.
- Change `toggleImportanceOf` function:
```javascript
const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...notes, important: !note.important }

    noteService
        .update(changedNote).then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
            setErrorMessage(
                `Note ${note.content} was already removed from server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            setNotes(notes.filter(n => n.id !== id))
        })
}
```
- We add an error message to the `errorMessage` state.
- We set a timer to set `errorMessage` to `null` after 5 seconds.

## Inline Styles
- React makes it possible to write styles directly in code as `inline styles`.
- Any React component or element can be provided with a set of CSS properties as a JS object through the `style` attribute.
- CSS in JS is different than normal CSS files.
- Say we wanted to give an element the color green and italic font that's 16 pixels in size.
- This is CSS:
```css
{
    color: green;
    font-style: italic;
    font-size: 16px;
}
```
- This is React inline:
```javascript
{
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
}
```
- Every CSS property is defined as a separate property of JS object.
- Numeric values can be defined as integers.
- CSS has hyphenated. React is camelCase.
- Add a bottom block to application by creating a `Footer` component and define the following inline styles.
```javascript
const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
        </div>
    )
}

const App = () => {
    // ...

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            // ...

            <Footer />
        </div>
    )
}
```
- Inline style has limitations.
    - `pseudo-classes` cannot be used straightforwardly.
- Inline styles is typically against React conventions.
- Best practice to separate CSS from content (HTML) and functionality (JS).
- React philosophy is actually the polar opposite.
    - Separation of CSS, HTML, and JS did not scale well in large applications.
    - A React component defines the HTML for structuring the content, JS functions for functionality, and styling.
    - All in one place.
    - This is to create individual components that are as independent and reusable as possible.