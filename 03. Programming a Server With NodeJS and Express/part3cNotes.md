# Saving Data to MongoDB
- Few ways of debugging Node apps.

## Debugging Node Applications
- Console logging is a good way to debug, but there are other methods.
- Debugging Node apps is more difficult than debugging JS running in your browser.

#### Visual Studio Code
- The Visual Studio Code debugger is useful sometimes.
- Launch by clicking `Debug` tab and `Start Debugging`.
- App should not be running in another console or the port will already be in use.

#### Chrome Dev Tools
- Debugging also possible with Chrome developer console by starting app with command:
```
node --inspect index.js
```
- Access debugger by clicking green icon (node logo).
- `Sources` tab can be used to set breakpoints where the execution of code will be paused.

#### Question Everything
- Soon our app will have a database along with frontend and backend.
- It'll get trickier.
- When app does not work, find the source.
- Be systematic. Question everything and eliminate all possibilities one by one.
    - Postman, debuggers, and experience helps.
- Worst strategy is to continue writing code.
- Stop and fix.

## MongoDB
- We need a database to store notes indefinitely.
- Most courses use relational databases.
- We use MongoDB (called `document database`).
    - `https://www.mongodb.com/`
- Document databases differ from relational databases in how they organize data and the query languages they support.
- Usually categorized under the `NoSQL` term.
- Read chapter on `collections`.
    - `https://docs.mongodb.com/manual/core/databases-and-collections/`.
    - MongoDB stores data records as `documents` (specifically `BSON` documents) which are gathered together in `collections`.
    - Database stores one or more collections of documents.
    - A `document` is a record in a MongoDB `collection` and the basic unit of data in MongoDB.
    - Documents are analogous to JSON objects but exist in the database in a more type-rich format known as `BSON`.
    - `BSON` is a serialization format used to store documents and make remote procedure calls in MongoDB.
        - BSON is a binary representation of JSON.
- Read chapter on `documents`.
    - `https://docs.mongodb.com/manual/core/document/`.
    - MongoDB stores data records as BSON documents.
    - BSON contains more data types than JSON.
    - MongoDB documents are composed of field-and-value pairs and have the following structure:
    ```bson
        field1: value1,
        field2: value2,
        field3: value3,
        ...
        fieldN: valueN
    ```
    - Value of field can be any of BSON data types.
        - This includes other documents, arrays, arrays of documents.
- Naturally, you can install and run MongoDB on your own computer.
- However, internet is full of Mongo database services that you can use.
- Preferred MongoDB provider in this course is `MongoDB Atlas`.
    - Link: `https://www.mongodb.com/cloud/atlas`.
- After creating account and logging in, Atlas recommends creating a cluster (or create database for newer versions).
    - Create a Shared Cluster.
    - Choose AWS as provider.
    - Choose Oregon as region.
    - Create cluster. (This process will take a few minutes to finish).
- Use `database access` tab for creating user credentials for the database.
    - Not the same as when you're logging in to MongoDB Atlas.
    - These will be used for your app to connect to the database.
    - Authentication Method is **Password**.
    - Enter a username and password.
    - Allow to **Read and write to any database**.
- Define the IP addresses that are allowed access to the database.
    - Go to `Network Access`.
    - Click on `Add IP Address`.
    - For simplicity, we will allow access from all IP address by clicking on `Allow Access From Anywhere`.
- Go back to the `Databases` tab and click `Connect`.
    - Choose `Connect your application`.
    - The view now shows the `MongoDB URI`, which is the address of the database that we will supply to the MongoDB client library we will add to our app.
    - Address looks like: `mongodb+srv://fullstack:<PASSWORD>@cluster0-ostce.mongodb.net/test?retryWrites=true`
- We are ready to use database.
- Could use database directory from our JS code with the `official MongoDB Node.js driver` library.
    - Very cumbersome.
- We instead use `Mongoose` library that offers higher level API.
    - `Mongoose` is an `object document mapper (ODM)`.
    - Saving JS objects as Mongo documents is straightforward with this library.
- Install Mongoose:
```
npm install mongoose
```
- Let's not add code dealing with Mongo to backend just yet.
- Let's make a practice application by creating a new file `mongo.js`.
```javascript
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://sample_user_1:${password}@first-example.5nttp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})
```
- The MongoDB URI may be different from the example depending on region and whatnot.
- Code assumes the password will be passed as command line parameter.
- This password was the credentials we created in MongoDB Atlas.
- Access the parameter like:
```javascript
const password = process.argv[2]
```
- Mongo will add a new document to the database.
- If you created password with special characters, you need to `URL encode` that password.
    - For example, '!' becomes '%21'.
- View current state of database from the MongoDB Atlas from `Collections` in the `Overview` tab.
- As view shows, the `document` matching the note has been added to the `notes` collection in the `myFirstDatabase` database.
- We can give our database a better name.
- We can change the name of database from the URI:
```
mongodb+srv://sample_user_1:<password>@first-example.5nttp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
- Replace the `myFirstDatabase` above with the new name.
- Destroy `myFirstDatabase`.
- Change name of database to `note-app` instead.
```
mongodb+srv://sample_user_1:<password>@first-example.5nttp.mongodb.net/note-app?retryWrites=true&w=majority
```
- Run code again.
- Data is now in the right database.
- There is the `Create Database` functionality to create new databases from the website.
    - This is not necessary.
    - MongoDB Atlas automatically creates a new database when an app tries to connect to a database that does not exist yet.

## Schema
- After making connection to database, we define `schema` for a note and the matching `model`.
```javascript
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```
- We first define the `schema` of a note stored in the `noteSchema` variable.
- The schema tells Mongoose how the note objects are stored in the database.
- In the `Note` model definition, the first "Note" parameter is the singular name of the model.
- Name of the collection will be the lowercased plural `notes`.
    - Mongoose convention is to automatically name collections as the plural (notes) when the schema refers to them in the singular (Note)
- Document databases like Mongo are `schemaless`.
    - Database does not care about the structure of the data that is stored in the database.
    - Can store documents with completely different fields in the same collection.
- Idea behind Mongoose is that data stored in the database is given a `schema at the level of the app` that defines the shape of the documents stored in any given collection.

## Creating and Saving Objects
- Next, the app creates a new note object with the help of the `Note` model:
```javascript
const note = new Note({
    content: 'HTML is easy',
    date: new Date(),
    important: false,
})
```
- Models are `constructor functions` that create new JS objects based on provided parameters.
- Object is created with model's constructor function.
    - They have all properties of the model.
    - They also have methods for saving the object to the database.
- Saving object to database happens with `save` method.
    - Can be provided with an event handler with the `then` method.
```javascript
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})
```
- When object is saved to database, the event handler provided to `then` gets called.
- Event handler closes database connection with `mongoose.connection.close()`.
- If connection is not closed, program will never finish its execution.
- The `result` parameter of event handler is not that interesting when we're storing one object to database.
    - Can print it to see what it looks like though.
- Save a few more notes by modifying the data in code and executing the program again.

## Fetching Objects From The Database
- Comment code for generating new notes and replace with:
```javascript
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
```
- When code is executed, program prints all the notes stored in the database.
- Objects are retrieved from the database with the `find` method of the `Note` model.
- Parameter of the method is an object expressing search conditions.
- Since parameter is an empty object `{}`, we get all of the notes stored in the `notes` collection.
- Search conditions adhere to Mongo search query `syntax`.
- We could restrict our search to only include important notes like:
```javascript
Note.find({ important: true }).then(result => {
    // ...
})
```

## Backend Connected To Database
- We can start using Mongo in our application.
- Copy and paste Mongoose definitions to the `index.js` file:
```javascript
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = `mongodb+srv://sample_user_1:${password}@first-example.5nttp.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```
- Change handler for fetching all notes to the following form:
```javascript
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})
```
- Verify in the browser that the backend works for displaying all of the documents.
    - Go to localhost:3001/api/notes
- The frontend assumes that every object has a unique id in the `id` field.
- We do not want to return the mongo versioning field `__v` to the frontend.
- One way is to format objects returned by Mongoose by modifing the `toJSON` method of the schema.
    - This is used on all instances of the models produced with that schema.
```javascript
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
```
- The `_id` property looks like a string but it is an object.
- The `toJSON` method transforms it into a string just to be safe.
- Respond to the HTTP request with a list of objects formatted with the `toJSON` method.
```javascript
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})
```
- `notes` variable is assigned to an array of objects returned by Mongo.
- When response is sent in JSON format, the `toJSON` method of each object in the array is called automatically by the `JSON.stringify` method.

## Database Configuration Into Its Own Module
- Extract Mongoose specific code into its own module.
- Add new folder called `models` and add a file called `note.js`.
```javascript
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
```
- Defining Node `modules` differs from the way of defining `ES6 modules` in part 2.
- Public interface of the module is defined by setting a value to the `module.exports` variable.
    - Set the value to be the `Note` model.
    - The other things in the module like `mongoose` or `url` will not be accessible or visible to users of the module.
    - Importing is done by adding to `index.js`.
```javascript
const Note = require('./models/note')
```
- `Note` variable is assigned to the same object that the module defines.
- The way the connection is made is different too:
```javascript
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
```
- Address of database is passed to the application via the `MONGODB_URI` environment variable.
- We have ways to handle successful and unsuccessful connection attempts.
    - They both log messages to the user.
- Many ways to define the value of an environment variable.
- One way is to define it when app is started:
```
MONGODB_URI=address_here npm run dev
```
- A more sophisticated way is to use `dotenv` library.
```
npm install dotenv
```
- To use library, we create a `.env` file at the root of the project.
- The environment variables are defined inside of the file:
```
MONGODB_URI='mongodb+srv://sample_user_1:password@first-example.5nttp.mongodb.net/note-app?retryWrites=true&w=majority'
PORT=3001
```
- We also hardcoded the port of the server into the `PORT` environment variable.
- `.env` files should be ignored right away in `.gitignore` file.
- Environment variables in `.env` can be used by `require('dotenv').config()`.
- You can reference them in your code just like you would reference normal environment variables, `process.env.MONGODB_URI`.
- Change `index.js`:
```javascript
require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

// ...

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```
- Import to import `dotenv` before `note` model.

## Using Database In Route Handlers
- Next, change the rest of the backend functionality to use database.
- Creating new note is like this:
```javascript
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})
```
- Note objects are created with `Note` constructor function.
- Response is sent inside the callback function for the `save` operation.
    - This ensures that response is sent only if the operation is successful.
    - Error handling is discussed later.
- The `savedNote` parameter in the callback is the saved and newly created note.
- Data sent back in the response is the formatted version created with `toJSON` method.
```javascript
response.json(savedNote)
```
- Using Mongoose's `findById` method, fetching individual notes gets changed into:
```javascript
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})
```

## Verifying Frontend and Backend Integration
- Good idea to test backend first with the browser, Postman or VS Code REST Client.
- Try to create a new note.
- Next, it is a good idea to test that the frontend works with the backend.
- Highly inefficient to test things exclusively through the frontend.
- Integrate frontend and backend one functionality at a time.
- First, test fetching of all the notes from the database and test it through the backend endpoint in the browser.
- Next, verify the frontend works with new backend.
- Then, we move on to the next feature.

## Error Handling
- When visiting the URL of a note with an id that does not actually exist, the response is `null`.
- Change behavior so if note with id does not exist, the server responds to request with the HTTP status code 404 not found.
- Implement a simple `catch` block to handle cases where the promise returned by the `findById` method is rejected.
```javascript
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).end()
        })
})
```
- If no matching object is found in the database, the value of `note` will be `null` and `else` block is executed.
    - Results in response with status code 404 not found.
    - If promise returned by `findById` is rejected, response will have the status code 500 internal server error.
    - Console shows more detail about error.
- We have one more error situation.
- We are trying to fetch a note with a wrong kind of `id`.
    - This means that an `id` that does not match the mongo identifier format.
- Given malformed id as an argument, the `findById` method throws an error causing the returned promise to be rejected.
- This causes the callback function in `catch` block to be called.
- Make adjustment to `catch` block:
```javascript
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})
```
- If format of id is incorrect, we end up in error handler defined in `catch` block.
- Status code is 400 Bad Request.

## Moving Error Handling Into Middleware
- Sometimes better to implement all error handling in a single place.
- Change the handler for the `/api/notes/:id` route so that it passes the error forward with the `next` function.
- `next` function is passed to handler as third parameter.
```javascript
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
```
- Error that is passed forwards is given to `next` function as a parameter.
- If `next` was called with no parameter, then execution moves onto the next route or middleware.
- If the `next` was called with a parameter, then the execution will continue to the `error handler middleware`.
- Express `error handlers` are middleware that are defined with a function that accepts four parameters.
- Error handler looks like:
```javascript
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    
    next(error)
}

// This has to be the last loaded middleware.
app.use(errorHandler)
```
- Error handler checks if error is a `CastError` exception.
    - We know that the error was caused by an invalid object id for Mongo.
- Error handler will send a response to the browser with the response object passed as a parameter.
- In all other error situations, the middleware passes the error forward to the default Express error handler.
- Error handling middleware must be last to be loaded.

## The Order Of Middleware Loading
- Execution order of middleware is the same as the order they are loaded into express with the `app.use` function.
- It is important to be careful when definining middleware.
- Correct order:
```javascript
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.post('/api/notes', (request, response) => {
    const body = request.body
    // ...
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoint.
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    // ...
}

// Handler of requests with result to errors.
app.use(errorHandler)
```
- The json-parser middleware should be among the very first middleware loaded into Express
- Important that the middleware for handling unsupported routes is next to last middleware loaded into Express, just before error handler.