import { initializeApp } from 'firebase/app';
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, addDoc, setDoc, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-TL0B7NGL5K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const googleProvider  = new GoogleAuthProvider()
export const storage = getStorage(app)
export {
  app,

  auth,
  db,
  addDoc,
  setDoc,
  collection
};