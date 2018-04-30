// Remember: no copy pasting!

// Controlled input. This is similar to what you did in react.

// The body property of the object passed as the second argument of fetch is optional
// Don't forget, GET requests never have a body
// cb is a function that takes a string as a parameter. That parameter is the HTTP response body. If it happens to be a string that follows the JSON format, you'll need to parse it using JSON.parse.

function inputChanged() {
    setState({ formInput: event.target.value });
}

function reverse() {
    let cb = (response) => {
        setState({ items: state.items.reverse() })
    }

    fetch('/reverse', {
        method: 'GET'
    })
        .then(response => response.text())
        .then(cb)
}

function inputCleared() {
    let cb = (response) => {
        console.log(response);
        setState({ items: [] });
    } //the callback will only happen after the server sent  a response
    fetch('/clearItems', {
        method: 'GET'
    })
        .then(response => response.text())
        .then(cb)
}

// Don't try to understand the body of this function. You just 
// need to understand what each parameter represents
// function makeHTTPRequest(meth, path, body, cb) {
//     fetch(path, {
//         body: body,
//         method: meth
//     })
//         .then(response => response.text())
//         .then(responseBody => cb ? cb(responseBody) : undefined)
// }

// We're going to try and stick with React's way of doing things
let state = { items: [], formInput: "" }

// Calling rerender changes the UI to reflect what's in the state

function rerender() {
    let inputElement = document.getElementById('inp');
    inputElement.value = state.formInput; // you can ignore this line

    let d = document.getElementById("items");
    d.innerHTML = '';
    state.items.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        d.appendChild(li)
    })
}

// Our good friend setState paying us a visit from ReactVille
function setState(newState) {
    if (newState.items) state.items = newState.items;
    if (newState.formInput) state.formInput = newState.formInput;
    rerender();
}

// When the client starts he needs to populate the list of items
// function getAllItems() {
//     let cb = (itemsFromServer) => {
//         let parsedItems = JSON.parse(itemsFromServer)
//         setState({ items: parsedItems })
//     }
//     makeHTTPRequest('GET', '/items', undefined, cb)
// }

function sendItemToServer(item) {
    // This function is so short it could be inlined
    let cb = (itemsFromServer) => {
        let parsedItems = JSON.parse(itemsFromServer)
        setState({ items: parsedItems })
    }
    fetch('/addItem', {
        body: JSON.stringify(item),
        method: 'POST'
    })
    fetch('/items', {
        method: 'GET'
    })
        .then(response => response.text())
        .then(cb)
}

// When you submit the form, it sends the item to the server
function submitForm() {
    event.preventDefault();
    sendItemToServer(state.formInput);
    setState(state.formInput = "") //clear the form after the submit button is pressed
}

// We define a function and then call it right away. I did this to structure the file.
//getAllItems();
