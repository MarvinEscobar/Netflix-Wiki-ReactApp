import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXJ30skDymLebBaMQuvMiJ6z2ZdBbIo6k",
  authDomain: "netflix-wiki-firebase.firebaseapp.com",
  projectId: "netflix-wiki-firebase",
  storageBucket: "netflix-wiki-firebase.appspot.com",
  messagingSenderId: "364667910845",
  appId: "1:364667910845:web:aa6b4dd67ce3c6df3655d4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
