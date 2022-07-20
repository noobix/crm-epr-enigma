// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCykQIHDgqEPbou9ElhoBl75uZYBSNKs7o",
  authDomain: "crm-epr-enigma.firebaseapp.com",
  projectId: "crm-epr-enigma",
  storageBucket: "crm-epr-enigma.appspot.com",
  messagingSenderId: "342673836653",
  appId: "1:342673836653:web:764e0686d30b121d12cd64",
  measurementId: "G-MZ35B83FP9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
