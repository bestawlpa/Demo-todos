import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyCMfW-vzJiOaRsTfXWk7k4W8YRhITPsz1E",
  authDomain: "todos-66723.firebaseapp.com",
  projectId: "todos-66723",
  storageBucket: "todos-66723.appspot.com",
  messagingSenderId: "791705895966",
  appId: "1:791705895966:web:67357e2bafc54615451a0f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

