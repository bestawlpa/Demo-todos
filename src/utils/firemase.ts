import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC84dl-xKKEoW9P5SZONf943aJ66Z2cZ0Q",
  authDomain: "todo-list-77487.firebaseapp.com",
  projectId: "todo-list-77487",
  storageBucket: "todo-list-77487.appspot.com",
  messagingSenderId: "1015216424680",
  appId: "1:1015216424680:web:b59ed768944c84d85b2b5d"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);