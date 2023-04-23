// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAapbMyrSqqm3e0DlveQ-4XE3dIdLC0aGQ",
  authDomain: "tripper-87e56.firebaseapp.com",
  projectId: "tripper-87e56",
  storageBucket: "tripper-87e56.appspot.com",
  messagingSenderId: "1029069514939",
  appId: "1:1029069514939:web:f41d5892b7a57c62a1219e",
  measurementId: "G-6WTEKN06MF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)