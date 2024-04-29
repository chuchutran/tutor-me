// Backend Firebase Admin SDK Initialization
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";
import serviceAccount from "./service_account.json";
import withFirebaseAuth from 'react-with-firebase-auth';

const adminApp = initializeApp({
  credential: cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
    projectId: serviceAccount.project_id,
  }),
});
const adminDb = getAdminFirestore();
export { adminDb as db };

// Client-side Firebase Initialization
import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const clientApp = initializeClientApp({ /* your client config here */ });
const clientAuth = getAuth(clientApp);
const clientDb = getFirestore(clientApp);

const googleProvider = new GoogleAuthProvider();

const createComponentWithAuth: any = withFirebaseAuth({
  providers: { googleProvider },
  firebaseAppAuth: clientAuth as any,
});


const signInWithGoogle = () => {
  signInWithPopup(clientAuth, googleProvider);
};

const signOutFirebase = () => {
  signOut(clientAuth);
};

export {
  clientDb as dbClient,
  clientAuth as auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
};
