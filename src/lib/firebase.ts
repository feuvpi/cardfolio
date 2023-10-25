
/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpiecbea0cfI8hi2jughPUA9hV9O3Vfcs", // this is a public project id, not security issue
  authDomain: "auth-app-e21d2.firebaseapp.com",
  projectId: "auth-app-e21d2",
  storageBucket: "auth-app-e21d2.appspot.com",
  messagingSenderId: "990208090387",
  appId: "1:990208090387:web:e69330d7e414fb72d4fae6"
};

// Initialize Firebase
let fb;
if ( getApps().length <1 ) {
  fb = initializeApp(firebaseConfig);
} else {
  fb = getApps()[0];
}
export const app = fb
//export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();



/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    console.log(auth)
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user); 
    });
    console.log(unsubscribe())
    return () => unsubscribe();

  });
  console.log("aqui2")
  return {
    subscribe,
  };
}

export const user = userStore();