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