// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwnT562FqnAY7GfV9F2pUWkdEvB3dWjpo",
  authDomain: "fileshare-2006c.firebaseapp.com",
  projectId: "fileshare-2006c",
  storageBucket: "fileshare-2006c.appspot.com",
  messagingSenderId: "866683615493",
  appId: "1:866683615493:web:c0caaa04bd565bba585f6c",
  measurementId: "G-3VX7ZS25ZT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
