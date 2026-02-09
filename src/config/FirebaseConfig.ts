import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN-Deo-Ne-8RWFT2FA1iAmJMiXiu5pYuE",
  authDomain: "projeto-crudreactnative.firebaseapp.com",
  databaseURL: "https://projeto-crudreactnative-default-rtdb.firebaseio.com",
  projectId: "projeto-crudreactnative",
  storageBucket: "projeto-crudreactnative.firebasestorage.app",
  messagingSenderId: "849553729310",
  appId: "1:849553729310:web:3ae9285afbda15c6570b0f",
  measurementId: "G-PWWXQ0Y1KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);