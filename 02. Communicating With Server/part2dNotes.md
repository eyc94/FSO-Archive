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