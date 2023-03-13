import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTcU_KouUOlLKjvjHc9eH_KqGjC1kHnAk",
  authDomain: "chat-app-37ca8.firebaseapp.com",
  projectId: "chat-app-37ca8",
  storageBucket: "chat-app-37ca8.appspot.com",
  messagingSenderId: "1013992851956",
  appId: "1:1013992851956:web:5f44bc27783ba54ec791a1",
  measurementId: "G-QW5ST8CHB6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
