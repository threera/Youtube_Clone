
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAvaNejkef4N9JamJNicoK0Ump1p8z2ARc",
  authDomain: "video-8e91b.firebaseapp.com",
  projectId: "video-8e91b",
  storageBucket: "video-8e91b.appspot.com",
  messagingSenderId: "492745143864",
  appId: "1:492745143864:web:ec2ba1813a0ea320e998cd",
  measurementId: "G-PWXHXHZ9VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider()
export default analytics
