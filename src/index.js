import { initializeApp } from "firebase/app";
import stylesheet from "./styles.css";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";
import { GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'

const openModal = document.querySelectorAll("[data-modal-target]");
const closeModal = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const submit = document.getElementById("submit");
const cardholder = document.querySelector(".cardholder");
const form = document.querySelector("#user-form");
const input = document.querySelector("input");
const loginButton = document.querySelector(".login-button");
const signupButton = document.querySelector(".signup-button");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

const firebaseConfig = {
  apiKey: "AIzaSyBJsvFKHr3agdq2Fu4SNAyk53hGuyi0RQ4",
  authDomain: "todolist-9d800.firebaseapp.com",
  projectId: "todolist-9d800",
  storageBucket: "todolist-9d800.appspot.com",
  messagingSenderId: "930080224034",
  appId: "1:930080224034:web:5dd5952cb72ed245332b7b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");
const provider = new GoogleAuthProvider();

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);

const loginEmailPassword = async () => {
  const loginEmail = email.value;
  const loginPassword = password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    //need to add function that shows user readable error message
  }
};

loginButton.addEventListener("click", loginEmailPassword);

const createAccount = async () => {
  const loginEmail = email.value;
  const loginPassword = password.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    //need to add function that shows user readable error message
  }
};

signupButton.addEventListener("click", createAccount);

//   signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

//   initApp = function() {
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         // User is signed in.
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var uid = user.uid;
//         var phoneNumber = user.phoneNumber;
//         var providerData = user.providerData;
//         user.getIdToken().then(function(accessToken) {
//           document.getElementById('sign-in-status').textContent = 'Signed in';
//           document.getElementById('sign-in').textContent = 'Sign out';
//           document.getElementById('account-details').textContent = JSON.stringify({
//             displayName: displayName,
//             email: email,
//             emailVerified: emailVerified,
//             phoneNumber: phoneNumber,
//             photoURL: photoURL,
//             uid: uid,
//             accessToken: accessToken,
//             providerData: providerData
//           }, null, '  ');
//         });
//       } else {
//         // User is signed out.
//         document.getElementById('sign-in-status').textContent = 'Signed out';
//         document.getElementById('sign-in').textContent = 'Sign in';
//         document.getElementById('account-details').textContent = 'null';
//       }
//     }, function(error) {
//       console.log(error);
//     });
//   };

//   window.addEventListener('load', function() {
//     initApp()
//   });

//   var uiConfig = {
//     signInSuccessUrl: '<url-to-redirect-to-on-success>',
//     signInOptions: [
//       // Leave the lines as is for the providers you want to offer your users.
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID
//     ],
//     // tosUrl and privacyPolicyUrl accept either url string or a callback
//     // function.
//     // Terms of service url/callback.
//     tosUrl: '<your-tos-url>',
//     // Privacy policy url/callback.
//     privacyPolicyUrl: function() {
//       window.location.assign('<your-privacy-policy-url>');
//     }
//   };

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });

//       signInWithCustomToken(auth, token)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           // ...
//         });

//         signOut(auth).then(() => {
//             // Sign-out successful.
//           }).catch((error) => {
//             // An error happened.
//           });

openModal.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModalFunction(modal);
  });
});

function openModalFunction(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

closeModal.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModalFunction(modal);
  });
});

function closeModalFunction(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => closeModalFunction(modal));
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toString() {
    return (
      this.title + ", " + this.author + ", " + this.pages + ", " + this.read
    );
  }
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
      read: book.read,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Book(data.title, data.author, data.pages, data.read);
  },
};

async function addBook(e) {
  let title = document.querySelector("input[name=title]").value;
  let author = document.querySelector("input[name=author-name]").value;
  let pages = document.querySelector("input[name=pages]").value;
  let read = document.querySelector("input[name=checkbox]").checked
    ? true
    : false;
  //add to firebase server
  const ref = doc(db, "books", `${title}`).withConverter(bookConverter);
  await setDoc(ref, new Book(title, author, pages, read));
  //render to DOM
  let book = new Book(title, author, pages, read);
  makeNewCard(book);
  reset();
}

submit.addEventListener("click", (e) => {
  let isValid = form.checkValidity();
  if (!isValid) {
    console.log("error");
  }
  if (isValid) {
    e.preventDefault();
    addBook(e);
  }
});

input.addEventListener("change", (e) => {
  const isValid = e.target.reportValidity();
  e.target.setAttribute("aria-invalid", !isValid);
});

function makeNewCard(book) {
  //
  let newCard = document.createElement("div");
  newCard.className = "card";
  cardholder.appendChild(newCard);
  //
  let newDiv = document.createElement("div");
  newDiv.classList.add("close-card");
  newDiv.innerHTML =
    '<span id="close-button" class="deleteButton" >&times;</span>';
  newCard.appendChild(newDiv);
  //
  let cardTitle = document.createElement("p");
  cardTitle.id = "card-title";
  cardTitle.textContent = `${book.title}`;
  newCard.appendChild(cardTitle);
  //
  let cardAuthor = document.createElement("p");
  cardAuthor.id = "card-author";
  cardAuthor.textContent = `${book.author}`;
  newCard.appendChild(cardAuthor);
  //
  let cardPages = document.createElement("p");
  cardPages.id = "card-pages";
  cardPages.textContent = `${book.pages}`;
  newCard.appendChild(cardPages);
  //
  let readDiv = document.createElement("div");
  readDiv.classList.add("readDiv");
  let read = document.createElement("p");
  read.textContent = "Read?";
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.classList.add("dynamicCheckbox");
  inputElement.checked = book.read ? true : false;
  inputElement.addEventListener("click", function () {
    if (book.read == false) {
      return inputElement.checked == false;
    } else {
      inputElement.checked == true;
    }
  });
  readDiv.appendChild(read);
  readDiv.appendChild(inputElement);
  newCard.appendChild(readDiv);
  //
  updateDeleteBookListeners();
  updateCheckboxListener();
}

function reset() {
  document.querySelector("#user-form").reset();
  let modal = document.getElementById("modal");
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function updateDeleteBookListeners() {
  [...document.querySelectorAll(".card")].forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("deleteButton")) {
        let parent = e.target.parentNode.parentNode;
        let cardTitle = parent.querySelector("#card-title").textContent;
        deleteBook(cardTitle);
        item.remove();
        return false;
      }
    });
  });
}

function updateCheckboxListener() {
  [...document.querySelectorAll(".dynamicCheckbox")].forEach((box) => {
    let cardTitle =
      box.parentNode.parentNode.querySelector("#card-title").textContent;
    box.addEventListener("change", (e) => {
      if (box.checked === false) {
        callUpdate(cardTitle, false);
      } else {
        callUpdate(cardTitle, true);
      }
    });
  });
}

async function callUpdate(title, bool) {
  let bookRef = doc(db, "books", title);
  await updateDoc(bookRef, { read: bool });
}

async function deleteBook(cardTitle) {
  await deleteDoc(doc(db, "books", cardTitle));
}
