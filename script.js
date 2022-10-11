const openModal = document.querySelectorAll('[data-modal-target]');
const closeModal = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const readButton = document.getElementsByClassName('if-read')
const submit = document.getElementById('submit')
const author = document.getElementById('card-author')
const title = document.getElementById('card-title')
const pages = document.getElementById('card-pages')
const cardholder = document.querySelector('.cardholder')

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
//


//
let array = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }}

//   const book1 = new Book("The Hobbit", "JRR Tolkien", "256 pages")
//   const book2 = new Book("Song of Ice and Fire", "George RR Martin", "3,000 pages")
//   const book3 = new Book("Begin to Code with JAvascript", "Rob Miles", "500 pages")

function addBook(e) {
    e.preventDefault()
    let title = document.querySelector('input[name=title]').value
    let author = document.querySelector('input[name=author-name]').value
    let pages = document.querySelector('input[name=pages]').value
    let read = document.querySelector('select[name=read-status]').value
    let book = new Book(title, author, pages, read)
    array.push(book)
    console.log(array)
    makeNewCard(book)
}

submit.addEventListener('click', addBook);

function makeNewCard(book) {
    let newCard = document.createElement('div');
    newCard.className = "card";
    cardholder.appendChild(newCard)
    //
    let cardReadStatus = document.createElement('button')
    cardReadStatus.className="if-read"
    // cardReadStatus.textContent= "Not Read"
    newCard.appendChild(cardReadStatus)
    //
    let cardAuthor = document.createElement('p')
    cardAuthor.id = "card-author"
    cardAuthor.textContent = `${book.author}`
    newCard.appendChild(cardAuthor)
    //
    let cardTitle = document.createElement('p')
    cardTitle.id = "card-title"
    cardTitle.textContent = `${book.title}`
    newCard.appendChild(cardTitle)
    //
    let cardPages = document.createElement('p')
    cardPages.id = "card-pages"
    cardPages.textContent = `${book.pages}`
    newCard.appendChild(cardPages)
    //
    let newDiv = document.createElement('div')
    newDiv.innerHTML = '<span id="close-button" onclick="this.parentNode.parentNode.remove(); return false;">&times;</span>'
    newCard.appendChild(newDiv)

    Array.from(readButton).forEach(button => {button.addEventListener('click', (e) => {
        e.target.classList.toggle('active')
    })})

    check(book)
}

function check(book) {
    let toggleButton = document.querySelector('.if-read')
    if (book.read === "true") {
        console.log(true)
        toggleButton.textContent = "Read"
        toggleButton.classList.add('active')}
    if (book.read === "false") {
        console.log(false)
        toggleButton.textContent = "Not Read"
        toggleButton.classList.remove('active')
    }
}