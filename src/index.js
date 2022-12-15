import { initializeApp} from 'firebase/app';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import stylesheet from './styles.css'
const openModal = document.querySelectorAll('[data-modal-target]');
const closeModal = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const submit = document.getElementById('submit')
const author = document.getElementById('card-author')
const title = document.getElementById('card-title')
const pages = document.getElementById('card-pages')
const cardholder = document.querySelector('.cardholder')
const form = document.querySelector('#user-form')
const input = document.querySelector('input')
const dummy = document.querySelector('#dummy')

const firebaseConfig = {
    apiKey: "AIzaSyBJsvFKHr3agdq2Fu4SNAyk53hGuyi0RQ4",
    authDomain: "todolist-9d800.firebaseapp.com",
    projectId: "todolist-9d800",
    storageBucket: "todolist-9d800.appspot.com",
    messagingSenderId: "930080224034",
    appId: "1:930080224034:web:5dd5952cb72ed245332b7b"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getBooks(db) {
    const bookCol = collection(db, 'books');
    const bookSnapshot = await getDocs(bookCol);
    const bookList = bookSnapshot.docs.map(doc => doc.data());
    console.log(bookList)
    return bookList;
  }

  dummy.addEventListener('click', () => getBooks(db))

openModal.forEach(button => 
    {button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModalFunction(modal)
    })})

function openModalFunction(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active')
}

closeModal.forEach(button =>
    {button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModalFunction(modal)
    })})

function closeModalFunction(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => closeModalFunction(modal))
})

let array = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    toString() {return this.title + ', ' + this.author + ', ' + this.pages + ', ' + this.read}
}

// const book1 = new Book("The Hobbit", "JRR Tolkien", "256 pages")
// const book2 = new Book("Song of Ice and Fire", "George RR Martin", "3,000 pages")
// const book3 = new Book("Begin to Code with JAvascript", "Rob Miles", "500 pages")

// Firestore data converter
const bookConverter = {
    toFirestore: (book) => {
        return {
            title: book.title,
            author: book.author,
            pages: book.pages,
            read: book.read
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Book(data.title, data.author, data.pages, data.read);
    }
};

async function addBook(e) {
    let title = document.querySelector('input[name=title]').value
    let author = document.querySelector('input[name=author-name]').value
    let pages = document.querySelector('input[name=pages]').value
    let read = document.querySelector('input[name=checkbox]').checked

    const ref = doc(db, "books", `${title}`).withConverter(bookConverter);
    await setDoc(ref, new book(title, author, pages, read));

    let book = new Book(title, author, pages, read)
    array.push(book)
    makeNewCard(book)
    reset()
}

submit.addEventListener('click', (e) => {
    let isValid = form.checkValidity()
    if (!isValid) {
        console.log('error')}
    if (isValid) {
        e.preventDefault()
        addBook(e)}}
    );

input.addEventListener('change', (e) => {
    const isValid = e.target.reportValidity()
    e.target.setAttribute('aria-invalid', !isValid)
})

function makeNewCard(book) {
    //
    let newCard = document.createElement('div');
    newCard.className = "card";
    cardholder.appendChild(newCard)
    //
    let newDiv = document.createElement('div')
    newDiv.classList.add('close-card')
    newDiv.innerHTML = '<span id="close-button" onclick="this.parentNode.parentNode.remove(); return false;">&times;</span>'
    newCard.appendChild(newDiv)
    //
    let cardTitle = document.createElement('p')
    cardTitle.id = "card-title"
    cardTitle.textContent = `${book.title}`
    newCard.appendChild(cardTitle)
    //
    let cardAuthor = document.createElement('p')
    cardAuthor.id = "card-author"
    cardAuthor.textContent = `${book.author}`
    newCard.appendChild(cardAuthor)
    //
    let cardPages = document.createElement('p')
    cardPages.id = "card-pages"
    cardPages.textContent = `${book.pages}`
    newCard.appendChild(cardPages)
    //
    let readDiv = document.createElement('div')
    readDiv.classList.add('readDiv')
    let read = document.createElement('p')
    read.textContent="Read?"
    const inputElement = document.createElement('input')
    inputElement.type = 'checkbox'
    inputElement.classList.add('checkbox')
    inputElement.checked = (book.read ? true : false)
    inputElement.addEventListener('click', function() {
        if (book.read == false) {return inputElement.checked == false}
        else {inputElement.checked == true}
    })
    readDiv.appendChild(read)
    readDiv.appendChild(inputElement)
    newCard.appendChild(readDiv)
    //
   
}

function reset() {
    document.querySelector('#user-form').reset()
    let modal = document.getElementById('modal')
    modal.classList.remove('active');
    overlay.classList.remove('active')
}

//function 