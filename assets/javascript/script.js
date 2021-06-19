const tableBody = document.querySelector("tbody");
const titleInput = document.querySelector("#book-name");
const authorInput = document.querySelector("#author-name");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read-or-not");
const submitButton = document.querySelector("#submit");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Gets library from local storage

function getLibrary() {
    const library = localStorage.getItem("library");
    if(!library) {
        return [];
    }
    const libraryParsed = JSON.parse(library);
    return libraryParsed;
}

// Adds new book to library in local storage

function addBookToLibrary(book) {
    const library = getLibrary();
    library.push(book);
    localStorage.setItem("library", JSON.stringify(library));
}

// Creates new book using Book constructor

function createBook(event) {
    event.preventDefault();
    let title = titleInput.value.trim();
    let author = authorInput.value.trim();
    let pages = pagesInput.value.trim();
    let read;
    if (readInput.value == "read") {
        read = "✔️";
    } else {
        read = "❌";
    }
    let book = new Book(title, author, pages, read)
    addBookToLibrary(book); 
    displayBooks();
}

submitButton.addEventListener("click", createBook);
function createTableData(book, prop) {
    let td = document.createElement("td");
    td.textContent = book[prop];
    return td;
}

function displayBooks() {
    const myLibrary = getLibrary();
    tableBody.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let bookEntry = document.createElement("tr");
        tableBody.appendChild(bookEntry);
        const book = myLibrary[i];
        const entries = [
            createTableData(book, "title"),
            createTableData(book, "author"), 
            createTableData(book, "pages"), 
            createTableData(book, "read"),
        ];
        
        let deleteEntry = document.createElement("td");
        bookEntry.appendChild(deleteEntry);
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button")
        deleteButton.setAttribute("value", "X")
        deleteButton.setAttribute("class", "delete-button");


        // Turns entries array into comma separated values
        bookEntry.append(...entries, deleteEntry);
        deleteEntry.appendChild(deleteButton);
        
    }
}

displayBooks();
