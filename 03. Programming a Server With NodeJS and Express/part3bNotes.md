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
- So what's going on? We can still access backend in the browser and from Postman without problems.

## Same Origin Policy and CORS
- Issue above is CORS (Cross-Origin Resource Sharing)
- According to Wikipedia:
    - Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notable Ajax requests, are forbidden by default by the same-origin security policy.
- For us, the problem is that JS code of an application that runs in a browser can only communicate with a server in the same `origin`.
- Our server is in localhost port 3001.
- Our frontend is in localhost port 3000.
- They do not have the same origin.
- CORS is a universal principle of the operation of web apps.
- We can allow requests from other `origins` by using Node's `cors` middleware.
- In backend repo, install `cors`:
```
npm install cors
```
- Use middleware and allow for requests from all origins:
```javascript
const cors = require('cors')

app.use(cors())
```
- Now frontend works!
- Functionality for changing importance of notes has not yet been implemented to the backend.
    - Read more about CORS: `https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS`
    - Read GitHub on cors middleware: `https://github.com/expressjs/cors`
- Setup of app is now:

![alt text](https://github.com/eyc94/Full-Stack-Open/blob/master/images/frontend_backend_diagram.png "Frontend and backend setup diagram")

- React app that runs in the browser fetches the data from node/express-server that is running in localhost:3001.

## Application To The Internet
- Our whole stack is ready.
- Move application to the internet.
- We will use `Heroku` for this.
    - Heroku documentation: `https://devcenter.heroku.com/articles/getting-started-with-nodejs`
