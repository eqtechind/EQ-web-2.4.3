// firebase/startup.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaaVZ1MhGzXtWDIZcNIhZqZ1CYumhWGys",
    authDomain: "auth-eq.firebaseapp.com",
    projectId: "auth-eq",
    storageBucket: "auth-eq.firebasestorage.app",
    messagingSenderId: "19283036099",
    appId: "1:19283036099:web:db3cd4a51a041d08b59f76"
};

// Initialize Firebase with a named app
const startupApp = initializeApp(firebaseConfig, 'startup');
const auth = getAuth(startupApp);
const googleProvider = new GoogleAuthProvider();

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, googleProvider };
