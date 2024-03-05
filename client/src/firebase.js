// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a8fa5.firebaseapp.com",
  projectId: "mern-blog-a8fa5",
  storageBucket: "mern-blog-a8fa5.appspot.com",
  messagingSenderId: "271871493277",
  appId: "1:271871493277:web:e7793603091dfa13858074"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);