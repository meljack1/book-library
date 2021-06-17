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

