// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTcKutWNHEreqE6q1mm3AgAkDUcn6x_go",
  authDomain: "mehrabstudy.firebaseapp.com",
  projectId: "mehrabstudy",
  storageBucket: "mehrabstudy.firebasestorage.app",
  messagingSenderId: "991598494491",
  appId: "1:991598494491:web:b36000f44a756f464509be",
  measurementId: "G-NCLES6G3CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app)