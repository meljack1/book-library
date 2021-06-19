const tableBody = document.querySelector("tbody");
const titleInput = document.querySelector("#book-name");
const authorInput = document.querySelector("#author-name");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read-or-not");
const submitButton = document.querySelector("#submit");

// Book constructor function to make new books

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
    if (!titleInput.value || !authorInput.value || !pagesInput.value){
        alert("Please ensure all fields are full!");
        return;
    }
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    if (pagesInput.value < 1 || isNaN(pagesInput.value)){
        alert("Please input a valid whole number!");
        return;
    }
    const pages = pagesInput.value.trim();
    let read;
    if (readInput.value == "read") {
        read = "✔️";
    } else {
        read = "❌";
    }
    let book = new Book(title, author, pages, read)

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.value = "read";
    
    addBookToLibrary(book); 
    displayBooks();
    buttonEventListeners();
}

// Creates new td for reach property in the book object

function createTableData(book, prop) {
    let td = document.createElement("td");
    td.textContent = book[prop];
    td.setAttribute("class", prop);
    return td;
}

// Displays all the books on the page

function displayBooks() {
    const library = getLibrary();
    tableBody.textContent = "";
    for (let i = 0; i < library.length; i++) {
        let bookEntry = document.createElement("tr");
        bookEntry.setAttribute("id", i);
        tableBody.appendChild(bookEntry);
        const book = library[i];
        const entries = [
            createTableData(book, "title"),
            createTableData(book, "author"), 
            createTableData(book, "pages"), 
            createTableData(book, "read"),
        ];
        
        let deleteEntry = document.createElement("td");
        deleteEntry.textContent = "❌"
        deleteEntry.setAttribute("class", "delete");

        // Turns entries array into comma separated values
        bookEntry.append(...entries, deleteEntry);
    }
}

displayBooks();

// Delete button functionality 

function deleteEntry(a) {
    const library = getLibrary();
    const bookEntry = document.getElementById(a);
    bookEntry.remove(); 
    library.splice(a, 1);
    localStorage.setItem("library", JSON.stringify(library));
    displayBooks();
    buttonEventListeners();
}

// Toggles book to be read or not

function toggleRead(a) {
    const library = getLibrary();
    const book = library[a];
    if (book.read == "✔️") {
        book.read = "❌";
    } else {
        book.read = "✔️";
    }; 
    localStorage.setItem("library", JSON.stringify(library));
    displayBooks();
    buttonEventListeners();
}

function buttonEventListeners(){
    const deleteButtons = document.querySelectorAll(".delete");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', deleteEntry.bind(this, i), false);
    }
    const readButtons = document.querySelectorAll(".read");
    for (let i = 0; i < readButtons.length; i++) {
        readButtons[i].addEventListener('click', toggleRead.bind(this, i), false);
    }
}

buttonEventListeners();

// Adds new book when submit button is pressed 

submitButton.addEventListener("click", createBook);
 





