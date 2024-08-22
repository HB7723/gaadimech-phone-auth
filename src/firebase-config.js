// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPulIzOQ26Iq-g_GOzWUfEpdb8n8tpSLA",
  authDomain: "gaadimech-main.firebaseapp.com",
  projectId: "gaadimech-main",
  storageBucket: "gaadimech-main.appspot.com",
  messagingSenderId: "546658190170",
  appId: "1:546658190170:web:79b447962c79e60f156963",
  measurementId: "G-X620BVDEWW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
