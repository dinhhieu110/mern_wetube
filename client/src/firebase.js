// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5wA_7sXAYzb0aTRYFSJAKC5HfojwyRBo",
  authDomain: "video-907b3.firebaseapp.com",
  projectId: "video-907b3",
  storageBucket: "video-907b3.appspot.com",
  messagingSenderId: "655755078205",
  appId: "1:655755078205:web:caee3777e3b56c372c5854",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
