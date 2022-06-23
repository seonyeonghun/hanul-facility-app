// Import the functions you need from the SDKs you need
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
// import { getFirestore} from '@firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  
  export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  export function logOut(){
    return signOut(auth);    
  }

  // Custom hook
  export function useAuth(){
    const [currentUser, setCurrentUser] = useState();
    useEffect(()=>{
      const unsub = onAuthStateChanged(auth, (user)=>{setCurrentUser(user)})
      return unsub;
    },[])
    return currentUser;
  }

