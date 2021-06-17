function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if(read) {
            return `${title} by ${author}, ${pages} pages, read`
        } else {
            return `${title} by ${author}, ${pages} pages, not read yet`
        }
    }
}

const OT1 = new Book("Toaru Majutsu no Index Volume 1", "Kamachi Kazuma", 312, true);

console.log(OT1.info());
