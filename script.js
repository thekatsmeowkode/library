const openModal = document.querySelectorAll('[data-modal-target]');
const closeModal = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const checkBox = document.get

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

function toggle() {
    const readButton = document.querySelector('#if-read');
    readButton.forEach(button => {button.addEventListener('click', () => {
        readButton.classList.toggle('active')
    })})}

let array = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    }

  const book1 = new Book("The Hobbit", "JRR Tolkien", "256 pages")
  const book2 = new Book("Song of Ice and Fire", "George RR Martin", "3,000 pages")
  const book3 = new Book("Begin to Code with JAvascript", "Rob Miles", "500 pages")
