import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCo988Q0ncrorkWsT7bGpsSznkrrvh2b_I",
  authDomain: "test-11933.firebaseapp.com",
  projectId: "test-11933",
  storageBucket: "test-11933.appspot.com",
  messagingSenderId: "1012630499157",
  appId: "1:1012630499157:web:c76a279fe62d857b0dc9dc",
  measurementId: "G-ZENVXTPGEZ"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



