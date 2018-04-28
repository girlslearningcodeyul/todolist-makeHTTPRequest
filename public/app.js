// Remember: no copy pasting!

// Controlled input. This is similar to what you did in react.
function inputChanged() {
    this.setState({ formInput: event.target.value });
}

// Don't try to understand the body of this function. You just 
// need to understand what each parameter represents
function makeHTTPRequest(meth, url, body, cb) {
    fetch(url, {
        body: body,
        method: meth
    })
        .then(response => response.text())
        .then(responseBody => cb ? cb(responseBody) : undefined)
}

// We're going to try and stick with React's way of doing things
let state = { items: ["buy milk", "go to store"], formInput: "" }

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

function sendItemToServer(item) {
    // This function is so short it could be inlined
    let cb = (itemsFromServer) => {
        let parsedItems = JSON.parse(itemsFromServer)
        setState({ items: parsedItems })
    }
    makeHTTPRequest('POST', '/addItem', JSON.stringify(item), cb)
}

// When you submit the form, it sends the item to the server
function submitForm() {
    event.preventDefault();
    sendItemToServer(state.formInput);
}

// When the client starts he needs to populate the list of items
function getAllItems() {
    let cb = (itemsFromServer) => {
        let parsedItems = JSON.parse(itemsFromServer)
        setState({ items: parsedItems })
    }
    makeHTTPRequest('GET', '/items', undefined, cb)
}

// We define a function and then call it right away. I did this to structure the file.
getAllItems();