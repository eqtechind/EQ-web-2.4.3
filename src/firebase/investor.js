// firebase/investor.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

const Config = {
    apiKey: "AIzaSyA6cWfST7hNWqNXmyof2SKh-9V7KjmRaM0",
    authDomain: "signup-investors.firebaseapp.com",
    projectId: "signup-investors",
    storageBucket: "signup-investors.firebasestorage.app",
    messagingSenderId: "339304905712",
    appId: "1:339304905712:web:c6dd8ed56a9e3c753e7b35"
};

// Initialize Firebase with a named app
const investorApp = initializeApp(Config, 'investor');
const auth = getAuth(investorApp);
const googleProvider = new GoogleAuthProvider();

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, googleProvider };
