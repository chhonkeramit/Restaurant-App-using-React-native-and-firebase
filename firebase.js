import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4_qOjh9ATKs1-CDZvDpBX3kbW22az7ZE",
    authDomain: "restaurant-app-2b2df.firebaseapp.com",
    projectId: "restaurant-app-2b2df",
    storageBucket: "restaurant-app-2b2df.appspot.com",
    messagingSenderId: "1072193217724",
    appId: "1:1072193217724:web:de5b7a136bcf19cc73dcb9"
  };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

const fireDB = app.firestore();

export { auth, fireDB };