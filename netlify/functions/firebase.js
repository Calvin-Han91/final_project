const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyB0t5Np3sIhLMZxYOchAXa-kiPsXWQw4dw",
  authDomain: "kiei-451-final-project-132c0.firebaseapp.com",
  projectId: "kiei-451-final-project-132c0",
  storageBucket: "kiei-451-final-project-132c0.appspot.com",
  messagingSenderId: "528618092567",
  appId: "1:528618092567:web:0a5f9a300bea592f458452"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase