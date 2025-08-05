
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
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(books) {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = '';

    for (const book of books) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const bookTitle = document.createElement("p");
        bookTitle.innerHTML = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.innerHTML = book.author;

        const bookPages = document.createElement("p");
        bookPages.innerHTML = book.pages;

        const bookRead = document.createElement("p");
        if (book.read) {
            bookRead.innerHTML = 'Finished reading!';
        }
        else {
            bookRead.innerHTML = 'Not yet read!';
        }

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);

        bookContainer.appendChild(bookCard);
    }

}


const newBookBtn = document.querySelector(".new-book");
const addBookForm = document.querySelector("form");

newBookBtn.addEventListener("click", function(){
    newBookBtn.classList.add("hide");
    addBookForm.classList.remove("hide");
})

addBookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    newBookBtn.classList.remove("hide");
    addBookForm.classList.add("hide");

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const finishedReading = document.querySelector('input[name="finished-reading"]:checked')?.value === "true";

    addBookToLibrary(title, author, pages, finishedReading);
    displayBooks(myLibrary);
});



addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("Blindness", "Some guy", 111, false);
addBookToLibrary("The Lord Of The Rings", "J.R.R Tolkien", 391, true);

console.log(myLibrary);

displayBooks(myLibrary);


