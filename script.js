
const myLibrary = [];

function Book(title, author, pages, read=false) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `ID: ${this.id}\n${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "finished reading." : "not read yet."}`;
}

function addBookToLibrary(title, author, pages, read=false) {
  // take params, create a book then store it in the array
    const book = new Book(title, author, pages, read);
    myLibrary.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false)
addBookToLibrary("Blindness", "Some guy", 111, false)
addBookToLibrary("The Lord Of The Rings", "J.R.R Tolkien", 391, true)
console.log(myLibrary)
