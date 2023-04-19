// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk_-XYtYlLzdP6iYj42sM50-ckgT9MmDI",
  authDomain: "twitter-clone-26070.firebaseapp.com",
  projectId: "twitter-clone-26070",
  storageBucket: "twitter-clone-26070.appspot.com",
  messagingSenderId: "1050206690948",
  appId: "1:1050206690948:web:75cfe735b2ff5f750b6cd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
