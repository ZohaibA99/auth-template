// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjyDTTfxeX7RSY7fgfXCEnyOONrGQy1H0",
  authDomain: "mern-auth-8136c.firebaseapp.com",
  projectId: "mern-auth-8136c",
  storageBucket: "mern-auth-8136c.appspot.com",
  messagingSenderId: "592572197223",
  appId: "1:592572197223:web:17ad6206e63800fb27e7c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);