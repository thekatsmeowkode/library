const openModal = document.querySelectorAll('[data-modal-target]');
const closeModal = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const readButton = document.querySelector('.if-read')
const submit = document.getElementById('submit')
const author = document.getElementById('card-author')
const title = document.getElementById('card-title')
const pages = document.getElementById('card-pages')

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
readButton.addEventListener('click', (e) => {
    e.target.classList.toggle('active')
})

//
let array = []

function Book(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

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
}

submit.addEventListener('click', addBook);

array.forEach(function() {
    let newCard = document.createElement('div');
    newCard.className = "card";
    
})