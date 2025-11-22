// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZuNGMkyJ8D3jaCaGAnC5EM5Xml_g2Jfw",
  authDomain: "quietmap-3a7ec.firebaseapp.com",
  projectId: "quietmap-3a7ec",
  storageBucket: "quietmap-3a7ec.firebasestorage.app",
  messagingSenderId: "14407821572",
  appId: "1:14407821572:web:0b25cf8f3cb5fdda748851",
  measurementId: "G-JSN5KTWEG8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);