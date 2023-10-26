/* eslint-disable @typescript-eslint/no-explicit-any */

import { CLIENT_EMAIL, PRIVATE_KEY, PROJECT_ID } from '$env/static/private'
import pkg from 'firebase-admin';
//import * as admin from 'firebase-admin';



// admin.initializeApp({
//        credential: pkg.credential.cert({
//         projectId: PROJECT_ID,
//         clientEmail: CLIENT_EMAIL,
//          privateKey: PRIVATE_KEY,
//        })})//add to here

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: PROJECT_ID,
      clientEmail: CLIENT_EMAIL,
      privateKey: PRIVATE_KEY,
    }),
  });
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase Admin Error: ', err.stack)
  }
}

import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';


export const adminDB = getFirestore();
export const adminAuth = getAuth();