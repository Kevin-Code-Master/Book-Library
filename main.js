// addBookForm = Button for bringing up the popup form for book information
// closeAddBookForm = The x for closing the pop up for adding book information
// bookLibrary constructor function
const title = document.getElementById('bookTitle')
const author = document.getElementById('author')
const pages = document.getElementById('pageNumber')
const read = document.getElementById('pagesRead')
function BookLibrary(title, author, pages, read, status) {
    this.title = title.value;
    this.author = author.value;
    this.pages = pages.value;
    this.read = read.value;
    this.status = status.value;
}
// creates book from Book Constructor, adds to library
let myLibrary =[];
let newBook;

function addBookToLibrary() {
    event.preventDefault();
    addBookForm.style.display = 'none';

    newBook = new BookLibrary(title, author, pages, read, status)
    myLibrary.push(newBook);
    setData();  //saves updated array in local storage
    render(); 
    form.reset();
}
//Creates book visual in browser
function render() {
    const display = document.getElementById('books-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i< myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}
//creats book DOM elements, to use in render();
function createBook(item) {
    const library = document.querySelector('#books-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const pagesReadDiv = document.createElement('div');
    const statusDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    
    
    
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = `Title: ${item.title}`;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = `Author: ${item.author}`;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = `Number of Pages: ${item.pages}`;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    pagesReadDiv.textContent = `Pages read: ${item.read}`;
    pagesReadDiv.classList.add('pagesRead');
    bookDiv.appendChild(pagesReadDiv);

    if(item.read.value === item.pages.value) {
        item.read.textContent = item.pages.value;
    }
    else {
        item.read.textContent = `Not Completed`
    }

    statusDiv.textContent = `Status: ${item.status}`;
    pageDiv.classList.add('status');
    bookDiv.appendChild(statusDiv);

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);
    
    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData()
        render();
    });


};
// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.myLibrary) {
        render();
    }
    else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();


// const Hobbit = new bookLibrary("The Hobbit", "John", "Tolkien", 128, "read");
// const rationalMale = new bookLibrary("The Rational Male", "Rollo", "Tomassi", 900, "not yet read")

// Button for adding book information
const addBookButton = document.getElementById('add');
addBookButton.addEventListener('click', () => {
    addBookForm.setAttribute('style','width: 406px; height: 550px; margin:auto; display:block; position:relative; top:0; left:0px;opacity:1;')});

// For closing the window for adding book information
const addBookForm = document.getElementById("book-info");
const closeAddBookForm = document.getElementById('close');
closeAddBookForm.addEventListener('click', () => addBookForm.style.display = 'none');

const addBtn = document.querySelector('#submit');
addBtn.addEventListener('click', addBookToLibrary);