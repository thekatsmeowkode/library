import { initializeApp} from 'firebase/app';
var firebase = require('firebase');
var firebaseui = require('firebaseui');
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc} from 'firebase/firestore/lite'
import {getAuth} from 'firebase/auth'
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

const firebaseConfig = {
    apiKey: "AIzaSyBJsvFKHr3agdq2Fu4SNAyk53hGuyi0RQ4",
    authDomain: "todolist-9d800.firebaseapp.com",
    projectId: "todolist-9d800",
    storageBucket: "todolist-9d800.appspot.com",
    messagingSenderId: "930080224034",
    appId: "1:930080224034:web:5dd5952cb72ed245332b7b"
  };

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: [
          'https://www.googleapis.com/auth/contacts.readonly'
        ],
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account'
        }
      }
    ],
    // Other config options...
  });

  // Is there an email link sign-in?
if (ui.isPendingRedirect()) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  // This can also be done via:
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }


  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    let read = document.querySelector('input[name=checkbox]').checked ? true : false
    //add to firebase server
    const ref = doc(db, "books", `${title}`).withConverter(bookConverter);
    await setDoc(ref, new Book(title, author, pages, read));
    //render to DOM
    let book = new Book(title, author, pages, read)
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
    newDiv.innerHTML = '<span id="close-button" class="deleteButton" >&times;</span>'
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
    inputElement.classList.add('dynamicCheckbox')
    inputElement.checked = (book.read ? true : false)
    inputElement.addEventListener('click', function() {
        if (book.read == false) {return inputElement.checked == false}
        else {inputElement.checked == true}
    })
    readDiv.appendChild(read)
    readDiv.appendChild(inputElement)
    newCard.appendChild(readDiv)
    //
   updateDeleteBookListeners()
   updateCheckboxListener()
}

function reset() {
    document.querySelector('#user-form').reset()
    let modal = document.getElementById('modal')
    modal.classList.remove('active');
    overlay.classList.remove('active')
}

function updateDeleteBookListeners() {
[...document.querySelectorAll('.card')].forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteButton'))
        {
        let parent = e.target.parentNode.parentNode
        let cardTitle = parent.querySelector('#card-title').textContent
        deleteBook(cardTitle)
        item.remove()
        return false}
    })})}

function updateCheckboxListener() {
    [...document.querySelectorAll('.dynamicCheckbox')].forEach(box => {
        let cardTitle = box.parentNode.parentNode.querySelector('#card-title').textContent
        box.addEventListener('change', (e) => {
        if (box.checked === false) {callUpdate(cardTitle, false)}
        else {callUpdate(cardTitle, true)}})})
}

async function callUpdate(title, bool) {
    let bookRef = doc(db, "books", title)
    await updateDoc(bookRef, {read:bool})
}

async function deleteBook(cardTitle) {
    await deleteDoc(doc(db, "books", cardTitle))
}
