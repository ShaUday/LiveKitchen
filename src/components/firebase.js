// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4WOP4egeBV-DvPLyFnm3Z_8N3Y0jFnoI",
  authDomain: "ecom-26b70.firebaseapp.com",
  projectId: "ecom-26b70",
  storageBucket: "ecom-26b70.appspot.com",
  messagingSenderId: "653037079846",
  appId: "1:653037079846:web:7b6bc5f79b3333800985e7",
  measurementId: "G-QRX70MJFJ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
