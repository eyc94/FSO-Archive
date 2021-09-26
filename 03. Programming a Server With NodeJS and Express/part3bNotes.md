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
- Add a file called `Procfile` to the project's root to tell Heroku how to start the app.
```
web: npm start
```
- Change definition of the port our app uses at the bottom of the `index.js` file:
```javascript
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```
- We are using the port defined in `environment variable` `PORT` or port 3001 if `PORT` is undefined.
- Heroku configures app port based on environment variable.
- Create Git repo and add `.gitignore` with:
```
node_modules
```
- Create Heroku app with `heroku create`.
- Commit your code to the repo and move it to Heroku with `git push heroku main`.
- App should work if everything went well.
- If not, issue can be found by reading heroku logs with `heroku logs`.
    - Best way is `heroku logs -t` which prints logs to console whenever something happens on the server.
- If you are deploying from a git repo where your code is not on the main branch (i.e. if you are altering the notes repo from last lesson) you will need to run `git push heroku HEAD:master`.
- If you have already done a push to heroku, you may need to run `git push heroku HEAD:main --force`.
- Frontend works with backend on Heroku.
    - Check by changing backend's address on the frontend to be the backend's address in Heroku instead of `http://localhost:3001`.
- How do we deploy frontend to internet? We have a lot of options and we will go through one of them next.

## Frontend Production Build
- We have been running React code in `development mode`.
    - Here, the app is configured to give clear error messages, immediately render code changes to the browser, and so on.
- When app is deployed, we must create a `production build` or a version of the app that is optimized for production.
- Production build of apps created with `create-react-app` can be created with `npm run build`.
- Run this command from root of frontend project.
- This creates a folder called `build`.
    - This contains the only HTML file of our application: `index.html`.
    - This folder contains another folder called `static`.
    - `Minified` version of our app's JS code will be generated to the `static` directory.
        - `Minified` means process of removing all unnecessary characters from the source code without changing functionality.
    - Even though the application code is in multiple files, all JS will be minified into one file.
    - All code from all of the app's dependencies will also be minified into this single file.
    - Minified code note very readable.
    - Beginning of code looks like below:
```javascript
!function(e){function r(r){for(var n,f,i=r[0],l=r[1],a=r[2],c=0,s=[];c<i.length;c++)f=i[c],o[f]&&s.push(o[f][0]),o[f]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(p&&p(r);s.length;)s.shift()();return u.push.apply(u,a||[]),t()}function t(){for(var e,r=0;r<u.length;r++){for(var t=u[r],n=!0,i=1;i<t.length;i++){var l=t[i];0!==o[l]&&(n=!1)}n&&(u.splice(r--,1),e=f(f.s=t[0]))}return e}var n={},o={2:0},u=[];function f(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,f),t.l=!0,t.exports}f.m=e,f.c=n,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})
```

## Serving Static Files From The Backend
- One way to deploy frontend:
    - Copy the production build (the `build` folder) to the root of the backend repo.
    - Configure the backend to show the frontend's `main page`. (the file `build/index.html`) as its main page.
- Copy production build of frontend to the root of the backend.
- Run this copy command (Mac/Linux) from the frontend directory:
```
cp -r build ../notes-backend
```
- If using Windows, use `copy` or `xcopy` command.
- To make express show `static content`, the page `index.html` and JS it fetches, we need a middleware from express called `static`.
```javascript
app.use(express.static('build'))
```
- Whenever express getts an HTTP GET request, it will first check if the `build` folder contains a file corresponding to the request's address.
- If a correct file is found, express will return it.
- Now, HTTP GET requests to the address `www.serversaddress.com/index.html` or `www.serversaddress.com` will show the React frontend.
- GET requests to the address `www.serversaddress.com/api/notes` will be handled by the backend's code.
- Both the frontend and backend are at the same address, so we can declare `baseUrl` as a relative URL.
    - Leave out part declaring the server.
```javascript
import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// ...
```
- After this change, we create a new production build.
- Copy the build to the root of the backend repo.
- App can now be used from the `backend` address: `http://localhost:3001`.
- App now works exactly like a `single-page app`.
- When we use a browser to go to `http://localhost:3001`, the server returns the `index.html` file from the `build` folder.
- Summarized content:
```html
<head>
    <meta charset="utf-8"/>
    <title>React App</title>
    <link href="/static/css/main.f9a47af2.chunk.css" rel="stylesheet">
</head>
<body>
    <div id="root"></div> 
    <script src="/static/js/1.578f4ea1.chunk.js"></script>
    <script src="/static/js/main.104ca08d.chunk.js"></script>
</body>
</html>
```
- The file above contains instructions to fetch a CSS stylesheet defining styles of the app.
- Has two script tags which instruct the browser to get JS code of the app.
- React code gets notes from the server address `http://localhost:3001/api/notes` and renders them to the screen.
- Communication between server and the browser is seen in the `Network` tab of dev console.
- Setup ready for product deployment looks like:

![alt text](https://github.com/eyc94/Full-Stack-Open/blob/master/images/build_deployment_diagram.png "Setup after product deployment")

- Unlike when running app in a development environment, everything is now in the same node/express-backend that runs in localhost:3001.
- When browser goes to the page, `index.html` is rendered.
- This causes the browser to get the product version of the React app.
- Once it starts to run, it fetches the json-data from the address localhost:3001/api/notes.

## The Whole App To Internet
- After making sure the production version of the apps works locally, commit production build of frontend to the backend repo.
- Push the code to Heroku again.
- App works great but changing the importance of notes still needs to be fixed.
- Our app saves notes to variable.
    - If app crashes or restarts, all data disappears.
    - App needs database.
- Go through a few things before introducing database.
- Setup is now this:

![alt text](https://github.com/eyc94/Full-Stack-Open/blob/master/images/heroku_deployment.png "Setup after heroku deployment")

- The `node/express-backend` now resides in Heroku server.
- When the root address that is of the form `https://<name of app>.herokuapp.com/` is accessed, browser loads and executes the React app that fetches the json-data from the Heroku server.