/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";

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

// -- interfaces

interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  published: boolean;
  links: any[];
  projects: ProjectData[];
}

interface ProjectData {
  id: string; // Adicionar um campo 'id' para o identificador único
  title: string;
  description: string;
  tags: string[];
  imageUrls: string[];
  userId: string;
}


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
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @param  {any} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}



export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
  if ($user) {
    const userDocRef = doc(db, `users/${$user.uid}`);
    const userProjectsCollectionRef = collection(userDocRef, 'projects');

    const unsubscribe = onSnapshot(userDocRef, (userDocSnapshot) => {
      const userData = userDocSnapshot.data() as UserData | undefined;

      if (userData) {
        userData.projects = [];

        onSnapshot(userProjectsCollectionRef, (projectsSnapshot) => {
          projectsSnapshot.forEach((projectDoc) => {
            const projectData = projectDoc.data() as ProjectData;
            userData.projects.push(projectData);
          });
          
          set(userData);
          console.log(userData.projects)
        });
      } else {
        set(null);
      }
    });

    return unsubscribe;
  } else {
    set(null); 
  }
});


export const projectData: Readable<ProjectData[] | null> = derived(user, ($user, set) => {
  let unsubscribe: () => void;

  if ($user) {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('userID', '==', $user.uid));

    const { subscribe } = writable<ProjectData[] | null>(null, (set) => {
      unsubscribe = onSnapshot(q, (snapshot) => {
        const projects: ProjectData[] = [];
        snapshot.forEach((doc) => {
          projects.push(doc.data() as ProjectData);
        });
        set(projects);
      });
    });

    return () => unsubscribe();
  } else {
    set(null);
  }
});