// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb_1hFO41gKUDB1UAk_vbgV_SSkqnCKes",
  authDomain: "twitter-clone-123de.firebaseapp.com",
  projectId: "twitter-clone-123de",
  storageBucket: "twitter-clone-123de.appspot.com",
  messagingSenderId: "879395464148",
  appId: "1:879395464148:web:9f32d794eef7ebc8e9ac41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
