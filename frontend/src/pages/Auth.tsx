import { useEffect, useState } from 'react';
import { signInWithGooglePopup, auth } from "../../../backend/firebase";
import { User } from "firebase/auth"; // Import the User type from Firebase Auth
import "./Auth.css"
import g from "../assets/G.png"


const AuthPage = () => {
  const [user, setUser] = useState<User | null>(null); // Explicitly type the user state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id='auth-page'>
      <h1 className="hero">{user ? `Hello, ${user.displayName || "User"}` : "Login"}</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "2em"
      }}> {user ? "You are currently logged in!" : "Please sign in first"}</div>
      {user ? (
        <div className="signout">
          <button style={{ color: 'black' }} onClick={() => auth.signOut()}>Sign out</button>
        </div>

      ) : (
        <div className="signin">
          <img src={g} alt="Google sign-in" style={{ marginRight: '10px', height: '30px' }} />
          <button style={{ color: 'black' }} onClick={signInWithGooglePopup}>Sign in with Google</button>
        </div>
      )}

    </div>
  );
};

export default AuthPage;