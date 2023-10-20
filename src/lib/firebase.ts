/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpiecbea0cfI8hi2jughPUA9hV9O3Vfcs",
  authDomain: "auth-app-e21d2.firebaseapp.com",
  projectId: "auth-app-e21d2",
  storageBucket: "auth-app-e21d2.appspot.com",
  messagingSenderId: "990208090387",
  appId: "1:990208090387:web:e69330d7e414fb72d4fae6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();