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