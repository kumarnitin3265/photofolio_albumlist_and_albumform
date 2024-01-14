// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnaz6jsJu6CQY7UjxtM1LjoNz2a26n9_U",
  authDomain: "photo-folio-c31a6.firebaseapp.com",
  projectId: "photo-folio-c31a6",
  storageBucket: "photo-folio-c31a6.appspot.com",
  messagingSenderId: "928307433811",
  appId: "1:928307433811:web:d1ff1712e2a525104211a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);