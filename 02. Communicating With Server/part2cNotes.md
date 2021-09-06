# Getting Data From Server
- We have only worked on "frontend" (browser) functionality.
- Backend is in the third part of this course.
- Familiarize with how code executing in browser communicates with backend.
- We use a tool called `JSON Server` to act as our server.
- Create a file called `db.json` in the root directory of project:
```javascript
{
    "notes": [
        {
            "id": 1,
            "content": "HTML is easy",
            "date": "2019-05-30T17:30:31.098Z",
            "important": true
        },
        {
            "id": 2,
            "content": "Browser can execute only JavaScript",
            "date": "2019-05-30T18:39:34.091Z",
            "important": false
        },
        {
            "id": 3,
            "content": "GET and POST are the most important methods of HTTP protocol",
            "date": "2019-05-30T19:20:14.298Z",
            "important": true
        }
    ]
}
```
- You can install JSON Server globally using:
```
npm install -g json-server
```
- Global installation requires admin privileges.
- Global installation is not necessary.
- From root of app, run the `json-server` using command `npx`:
```
npx json-server --port 3001 --watch db.json
```
- `json-server` starts running on port 3000 by default.
    - The app created by `create-react-app` uses port 3000, so we use 3001.
- Navigate to `http://localhost:3001/notes`.
    - `json-server` serves the notes we previously wrote in JSON format.
- The idea from here on would be to add notes to the server.
    - Saving to json-server.
- React code fetches the notes from the server and renders them to screen.
- When new note is added, the React code sends it to the server to make the new note persist in memory.
- `json-server` stores all data in `db.json` file, which resides on server.
    - Real world: data would be stored in a database.
    - `json-server` is a handy tool that allows the use of server-side functionality in the development phase without the need to program any of it.