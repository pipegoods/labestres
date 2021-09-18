// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREABSE_APIKEY,
  authDomain: process.env.REACT_APP_FIREABSE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREABSE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREABSE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREABSE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREABSE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;