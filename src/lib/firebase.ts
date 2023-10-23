
/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
//export const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();



function userStore(){
  let unsubscribe: () => void;

  // -- set AuthStore to null 
  if(!auth || !globalThis.window){
    console.log("unsubscribe")
    console.warn('Auth is not initialized or not in the browser');
    const { subscribe } = writable<User | null>(null);
    return {
    subscribe,
  }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
      
    });
    console.log(unsubscribe)
    return () => unsubscribe();
  });
  return { subscribe, };
}

export const user = userStore();