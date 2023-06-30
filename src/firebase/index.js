// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtHuT6kprvEXHvlCuYyJ5GAvOKYRVsFdo",
  authDomain: "mytodolist-95.firebaseapp.com",
  projectId: "mytodolist-95",
  storageBucket: "mytodolist-95.appspot.com",
  messagingSenderId: "497562446045",
  appId: "1:497562446045:web:5ef18e42c191f79b5a9334",
  measurementId: "G-58SHLV45BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    db
}