# Fundamentals of Web Apps

- Always keep the Developer Console open on your web browser.
- On Mac, press `F12` or `option-cmd-i` to open it.
- On Windows or Linux, press `F12` or `ctrl-shift-i` to open it.
    - Go to the Network tab and check the `Disable Cache` and `Preserve Log` checkboxes.

## HTTP GET
- Server and browser communicate using HTTP protocol.
- Network tab shows how the browser and server communicate.
- When page is refreshed:
    1. Browser fetches the content of page from the server.
    2. Downloads the image.
- Can click them to get more information.
    - General
        - Shows the requested URL.
        - Request type.
        - Request status code.
    - Response Headers
        - The content-type shows us what the response's format is.
        - The time of the response.
        - Browsers use this information to render things to the screen.
        - Response tab
            - Shows response data.

## Traditional Web Applications
- This course uses Node.js and Express to create web servers.

## Document Object Model (DOM)
- Represent HTML elements as a tree.
- API which enables programmatic modification of the element trees of web pages.

## AJAX
- Asynchronous JavaScript and XML.
- Enabled fettching of content to web pages using JavaScript included within HTML, without the need to rerender the page.

## JavaScript Libraries
- jQuery.
- AngularJS.
    - By Google.
    - Popularity plummeted after announcing that support for version 1 will end and Angular 2 will not be backwards compatible with the first version.
- React & Redux.
    - By Facebook.
    - Implementing browser-side logic of web-applications.
- VueJS.
