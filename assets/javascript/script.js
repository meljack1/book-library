const tableBody = document.querySelector("tbody")
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if(read) {
            return `${title} by ${author}, ${pages} pages, read`
        } else {
            return `${title} by ${author}, ${pages} pages, not read yet`
        }
    };
}

function addBookToLibrary() {
    let title = prompt("What is the book's title?");
    let author = prompt("What is the book's author?");
    let pages = prompt("How many pages are in the book?");
    let read = confirm("Have you read the book?")
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++){
        let bookEntry = document.createElement("tr");
        tableBody.appendChild(bookEntry);

        let titleEntry = document.createElement("td");
        titleEntry.textContent = myLibrary[i].title;
        bookEntry.appendChild(titleEntry);
        let authorEntry = document.createElement("td");
        authorEntry.textContent = myLibrary[i].author;
        bookEntry.appendChild(authorEntry);
        let pagesEntry = document.createElement("td");
        pagesEntry.textContent = myLibrary[i].pages;
        bookEntry.appendChild(pagesEntry);
        let readEntry = document.createElement("td");
        readEntry.textContent = myLibrary[i].read;
        bookEntry.appendChild(readEntry);
    }
}

displayBooks();
