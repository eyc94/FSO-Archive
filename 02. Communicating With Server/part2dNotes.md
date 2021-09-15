# Altering Data In Server
- When creating notes in our app, we want to store them in backend server.
- The `json-server` claims to be `REST` or `RESTful API`.
- The json-server does not exactly match definition of REST API.
    - Neither do most other APIs claiming to be RESTful.
- Next part looks at REST.
    - Important to familiarize ourselves with some of the conventions used by json-server and REST APIs in general.
    - We will take a look at conventional use of "routes", aka URLs and HTTP request types, in REST.

## REST
- We refer to individual data objects as `resources`.
- Every resource has a unique address associated with it - its URL.
- According to general convention used by json-server, we can locate an individual note at resource URL `notes/3`, where 3 is the id of the resource.
- HTTP GET request to the `notes` URL returns list of all notes.
- Creating new resource for storing a note done by making HTTP POST request to the `notes` URL.
    - Data for new note sent in the `body` of the request.
- The `json-server` requires all data to be sent in JSON format.
    - Request must contain the `Content-Type` request header with the value `application/json`.

## Sending Data to the Server
- Make the changes to the event handler responsible for creating a new note:
```javascript
addNote = event => {
    event.preventDefault()
    const noteObject = {
        content: newNote,
        date: new Date(),
        important: Math.random() < 0.5,
    }

    axios
        .post('http://localhost:3001/notes', noteObject)
        .then(response => {
            console.log(response)
        })
}
```
- Create new object but omit `id` because it's better to let server generate ids for our resources.
- Object sent to server using axios `post` method.
    - The event handler logs response that is sent back from server to console.
- New note is stored in the value of the `data` property of the `response` object.
- Data sent in POST request was a JS object. Axios automatically knew to set `Content-Type` to `application/json`.
- New note not yet rendered to screen.
    - Update state of `App` component when creating new note.
```javascript
addNote = event => {
    event.preventDefault()
    const noteObject = {
        content: newNote,
        date: new Date(),
        important: Math.random() < 0.5,
    }

    axios
        .post('http://localhost:3001/notes', noteObject)
        .then(response => {
            setNotes(notes.concat(response.data))
            setNewNotes('')
        })
}
```
- New note returned by backend is added to list of notes in our app's state using `setNotes`. The form is also reset.
- Remember that we use the `concat` method because we cannot mutate the component's original state.
- Go to `http://localhost:3001/notes` to see our notes actually sent.
- It's wiser to let the backend server generate timestamp for us.

## Changing the Importance of Notes
- Add button to every note that is used to toggle importance.
- Make changes to `Note` component:
```javascript
const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important'

    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}
```
- Button has event handler called `toggleImportance`.
- `App` component has `toggleImportanceOf` event handler function and passes to every `Note` component.
```javascript
const App = () => {
    const [notes, setNotes] = useState([]) 
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    // ...

    const toggleImportanceOf = (id) => {
        console.log('importance of ' + id + ' needs to be toggled')
    }

    // ...

    return (
        <div>
        <h1>Notes</h1>
        <div>
            <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
            </button>
        </div>      
        <ul>
            {notesToShow.map((note, i) => 
            <Note
                key={i}
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)}
            />
            )}
        </ul>
        // ...
        </div>
    )
}
```
- Notice every note has its own "unique" event handler function since the `id` of every not is unique.
- Notes in json-server backend can be changed in two different ways by making HTTP requests to the note's unique URL.
    - Either "replace" the entire note with an HTTP PUT request.
    - Or, change some of the note's properties with an HTTP PATCH request.
- Final form of the event handler is:
```javascript
const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !important }

    axios.put(url, changedNote).then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
}
```
- First line defines unique URL for each note based on its id.
- The array `find` method is used to find the note we want to modify.
    - Assign this to the `note` variable.
- Create a "new object" that is an exact copy of the old note, apart from the "important" property.
    - Code uses `object spread` syntax for creating new object.
        - `{ ...note }` creates a new object with copies of all properties from the `note` object.
        - When we add properties inside the curly braces after the spreaded object, `{ ...note, important: true }`, the value of the `important` property of the new object will be `true`.
        - In our example, the `important` property gets the negation of its previous value in the original object.
- Why did we decide to make a copy of the note object instead of just mutating the data?
    - The variable `note` is a reference to an item in the `notes` array in the component's state.
    - Recall we must never mutate state directly.
- The new object `changedNote` is a `shallow copy`.
    - This means the values of the new object are the same as the values of the old.
    - If the values of old object were also objects, the copied values in new object would reference same objects in old object.
- New note sent with PUT request to backend where it replaces old object.
- Callback function sets the component's `notes` state to a new array containing all items from the previous `notes` array, except for the old note which is replaced by the updated version in `response.data`.
    - Done with `map` method.
        - Creates a new array by mapping every item in old array into an item in new array.
        - We iterate through all notes.
        - If the note is not the one we're changing: `note.id !== id`, we copy the item from the old array into the new array.
        - If the note is what we're changing, the object returned by server is used `response.data`.

## Extracting Communication With The Backend Into a Separate Module
- `App` component now bloated.
- Extract backend server communication into its own module.
- Create a `src/services` folder and add a file called `notes.js`.
```javascript
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}
```
- Module returns an object that has three functions: `getAll`, `create`, `update`.
- Functions return the promises returned by axios methods.
- `App` component uses import to get access to module:
```javascript
import noteService from './services/notes'

const App = () => {
```
- The functions of the module can be used directly with the imported variable `noteService`.
```javascript
const App = () => {
    // ...
    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                setNotes(response.data)
            })
    }, [])

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...notes, important: !important }

        noteService
            .update(id, changedNote)
            .then(response => {
                setNotes(notes.map(note => note.id !== id ? note : response.data))
            })
    }

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
            })
    }
    
    // ...
}

export default App
```
- `App` component receives an object that contains the entire response for the HTTP request.
- `App` component only uses the `response.data` property of the response object.
- It would be much nicer to JUST get response data.
- We want to be able to set it like below.
```javascript
noteService
    .getAll()
    .then(initialNotes => {
        setNotes(initialNotes)
    })
```
- So how do we make the above possible?
- Change the `notes.js` file:
```javascript
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}
```
- No longer return the promise returned by axios directly.
- We return what we need.
- The modified `getAll` still returns a promise.
- When HTTP request works, the promise returns the data sent back in the response from backend.
- Update `App` component to work with changes made to module.
```javascript
const App = () => {
    // ...
    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...notes, important: !important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
    }

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }
    
    // ...
}

export default App
```

## Cleaner Syntax For Defining Object Literals
- The module that handles services exports a strange looking object:
```javascript
{
    getAll: getAll,
    create: create,
    update: update
}
```
- The labels on the left of colon are the `keys` of the object.
- The values on the right of the colon are `variables` defined in module.
- The names of keys and variables are the same, so we can make more compact:
```
{
    getAll,
    create,
    update
}
```
- So, we can simplify to one line in the `notes.js` file.
```javascript
export default { getAll, create, update }
```
- This shortcut introduced in ES6.
- For example, consider the variables below:
```javascript
const name = 'Leevi'
const age = 0
```
- Older JS versions have objects defined like:
```javascript
const person = {
    name: name,
    age: age
}
```
- The property fields and variable names are the same, so:
```javascript
const person = { name, age }
```