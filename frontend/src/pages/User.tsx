import React, { useState, useEffect } from 'react';
import "./User.css"
import bear from "../assets/tutorme.svg"
import { auth, db } from "../../../backend/firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User as FirebaseUser } from "firebase/auth";


// Define an interface for the user type
interface User {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser: FirebaseUser | null = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUser(docSnap.data() as User);
        } else {
          const newUser = {
            name: currentUser.displayName || "Anonymous",
            email: currentUser.email || "No email",
            phone: "",  // Default or prompt for a phone number?
            imageUrl: currentUser.photoURL || bear
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      }
    };

    checkUser();
  }, []);

  if (!user) return <div>Please login first!</div>;

  return (
    <div className='user-page'>
      <h1 className="hero">User Dashboard</h1>
      <img src={user.imageUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <h2>{user.name}</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={user.email} readOnly />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={user.phone} readOnly />
      </div>
    </div>
  );
};

export default UserPage;
