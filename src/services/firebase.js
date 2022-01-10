import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCLqD8ooQY6FNF3oiAy7i7r0QdbpFNYkI8",
    authDomain: "grupo-leti-fd84e.firebaseapp.com",
    projectId: "grupo-leti-fd84e",
    storageBucket: "grupo-leti-fd84e.appspot.com",
    messagingSenderId: "688564448697",
    appId: "1:688564448697:web:e25673406163cb40365a68",
    measurementId: "G-9NS559N5MM"
})