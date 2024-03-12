import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-354e3.firebaseapp.com",
  projectId: "mern-blog-354e3",
  storageBucket: "mern-blog-354e3.appspot.com",
  messagingSenderId: "1095784357745",
  appId: "1:1095784357745:web:4aba3eb3ef0a08b79e20d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);