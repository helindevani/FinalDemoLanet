// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxZiowRmEKy48jbLzRjUPcibF9sSkzBxA",
  authDomain: "refillsmart-59b9d.firebaseapp.com",
  projectId: "refillsmart-59b9d",
  storageBucket: "refillsmart-59b9d.appspot.com",
  messagingSenderId: "385094691529",
  appId: "1:385094691529:web:7a83116616c16fabf47b18",
  measurementId: "G-5919513J9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);