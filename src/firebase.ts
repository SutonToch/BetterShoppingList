import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4FC3TvS3Kt-pk1Vl52_vWN2cMKMkSh0c",
  authDomain: "bettershoppinglist-1167d.firebaseapp.com",
  databaseURL: "https://bettershoppinglist-1167d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bettershoppinglist-1167d",
  storageBucket: "bettershoppinglist-1167d.appspot.com",
  messagingSenderId: "551119044152",
  appId: "1:551119044152:web:b78978eb1649d0ef3b70cd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);