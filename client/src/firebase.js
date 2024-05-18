// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b5746.firebaseapp.com",
  projectId: "mern-blog-b5746",
  storageBucket: "mern-blog-b5746.appspot.com",
  messagingSenderId: "436156167330",
  appId: "1:436156167330:web:928b38300b99d64924d3fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);