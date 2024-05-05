import React, { useState, useEffect } from 'react';
import "./User.css"
import bear from "../assets/tutorme.svg"
import { auth, db } from "../../../backend/firebase";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { User as FirebaseUser } from "firebase/auth";

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

  // const updateUserDetails = async () => {
  //   if (user && auth.currentUser) {
  //     try {
  //       const response = await fetch(`/api/user/${auth.currentUser.uid}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           name: user.name,
  //           email: user.email,
  //           phone: user.phone,
  //           profileUrl: user.imageUrl
  //         })
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.text();  // or response.json() if your server responds with JSON in errors
  //         throw new Error(`HTTP error! status: ${response.status}, Error: ${errorData}`);
  //       }

  //       const data = await response.json();
  //       alert(data.message);
  //     } catch (error) {
  //       console.error('Failed to update user:', error.message);
  //       alert(`Failed to update user: ${error.message}`);
  //     }
  //   }
  // };
  const updateUserDetails = async () => {
    if (user && auth.currentUser) {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: user.name,
          email: user.email,
          phone: user.phone,
          imageUrl: user.imageUrl
        });

        alert('User details updated successfully!');
      } catch (error) {
        console.error('Failed to update user:', error);
        alert('Failed to update user.');
      }
    }
  };


  if (!user) return <div>Please login first!</div>;

  return (
    <div className='user-page'>
      <h1 className="hero">User Dashboard</h1>
      <img src={user.imageUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <h2>{user.name}</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
      </div>
      <button onClick={updateUserDetails}>Update Details</button>
    </div>
  );
};

export default UserPage;
