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