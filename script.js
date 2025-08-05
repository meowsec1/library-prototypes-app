
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
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement("p");
        bookPages.textContent = book.pages;

        const bookRead = document.createElement("p");
        if (book.read) {
            bookRead.textContent = 'Finished reading!';
        }
        else {
            bookRead.textContent = 'Not yet read!';
        }


        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.setAttribute("data-index-number", book.id);

        bookCard.innerHTML += `<svg class="remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`;
        bookCard.innerHTML += `<svg class="read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" /></svg>`;
        
        const removeBtn = bookCard.querySelector(".remove");
        const readBtn = bookCard.querySelector(".read");

        removeBtn.addEventListener("click", function(){
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == book.id) {
                    myLibrary.splice(i, 1);
                    bookCard.remove();
                }
            }
        })

        readBtn.addEventListener("click", function(){
            book.read = !book.read;
            bookCard.querySelector("p:nth-of-type(4)").textContent = book.read ? 'Finished reading!' : 'Not yet read!';
        })

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
    addBookForm.reset();
});



addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("Blindness", "Some guy", 111, false);
addBookToLibrary("The Lord Of The Rings", "J.R.R Tolkien", 391, true);

console.log(myLibrary);

displayBooks(myLibrary);


