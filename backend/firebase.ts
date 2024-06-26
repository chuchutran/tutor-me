// // import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
// import serviceAccount from "./service_account.json";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import firebase from "./firebaseConfig.json"


const firebaseConfig = {
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential!.accessToken;
    // The signed-in user info.
    // const user = result.user;

  }).catch((error) => {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.customData.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export { app, provider, signInWithGooglePopup, auth, db }

/**import { db } from "./firebase";```*/
