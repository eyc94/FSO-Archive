# Rendering a Collection, Modules
- Recap first

## console.log
- Good debugging method.
- Remember not to concatenate. Use the comma to separate.
```javascript
console.log('props value is', props)
```

## Protip: Visual Studio Code Snippets
- Easy to create shortcuts for generating commonly re-used portions of code.
    - Instructions here: `https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets`
- Useful, ready-made snippets can be found as VS Code plugins.
- One for `console.log()` can be made like so:
```
{
    "console.log": {
        "prefix": "clog",
        "body": [
            "console.log('$1')",
        ],
        "description": "Log output to console"
    }
}
```
- Visual Studio Code has a builtin snippet. Type `log` and hit enter.