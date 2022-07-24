// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-SiuRa6J7wvy4tCVgY353SohayEi6l_I",
  authDomain: "enigma-4c4b9.firebaseapp.com",
  projectId: "enigma-4c4b9",
  storageBucket: "enigma-4c4b9.appspot.com",
  messagingSenderId: "926017753099",
  appId: "1:926017753099:web:07f7f1bb7562e670f4b70e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
