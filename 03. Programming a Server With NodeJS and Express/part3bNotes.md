# Deploying App To Internet
- Connect frontend we made in part 2 to our own backend.
    - Start server from part3a.
    - Start app from part2e (now copied into part3b).
- In the previous part, the frontend asked for the list of notes from the `json-server` we had as a backend.
    - The address was `http://localhost:3001/notes`.
- Backend has different URL structure now.
    - The address is now `http://localhost:3001/api/notes`.
- Change attribute `baseUrl` in `src/services/notes.js` like so:
```javascript
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// ...

export default { getAll, create, update }
```
- The frontend's GET request now does not work for some reason.
- Some errors in console about CORS policy.