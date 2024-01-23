// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa0juCsNkJgTSOc35njX-6ezeTxgPb6d0",
  authDomain: "dataecomm.firebaseapp.com",
  projectId: "dataecomm",
  storageBucket: "dataecomm.appspot.com",
  messagingSenderId: "942334165273",
  appId: "1:942334165273:web:a9622d6ac68a74cd678588",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
