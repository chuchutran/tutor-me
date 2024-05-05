// // import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./service_account.json";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1_B6ae524zd30BL8U6zzxKIwnphCY3U8",
  authDomain: "tutor-me-1e7ff.firebaseapp.com",
  projectId: "tutor-me-1e7ff",
  storageBucket: "tutor-me-1e7ff.appspot.com",
  messagingSenderId: "805343527979",
  appId: "1:805343527979:web:f3e2ae2b2a5e13659cd66e"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('UID:', user.uid);
    console.log('Display Name:', user.displayName);
    console.log('Email:', user.email);
    console.log('Photo URL:', user.photoURL);
    console.log
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export { app, provider, signInWithGooglePopup }

/**import { db } from "./firebase";```*/
