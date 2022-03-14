import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyAK0ByD-G1DwybaITRv2YJ8y-n-0UU2Ccc",
    authDomain: "grupoleti.firebaseapp.com",
    projectId: "grupoleti",
    storageBucket: "grupoleti.appspot.com",
    messagingSenderId: "1033976483209",
    appId: "1:1033976483209:web:b016bc439ebb4392d42558",
    measurementId: "G-TG6HCC9WZN"
})