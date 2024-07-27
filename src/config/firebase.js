import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXfOjS6cIXjIDRJU7PidAJsiMRIkXUzcs",
  authDomain: "learning-firebase-b2bfb.firebaseapp.com",
  projectId: "learning-firebase-b2bfb",
  storageBucket: "learning-firebase-b2bfb.appspot.com",
  messagingSenderId: "1050648992862",
  appId: "1:1050648992862:web:a2ea433efa43d1534b68cf",
  measurementId: "G-YL1L7B54TV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
