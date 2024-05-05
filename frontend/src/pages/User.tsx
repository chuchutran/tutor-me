import React, { useState, useEffect, ChangeEvent } from 'react';
import "./User.css"
import bear from "../assets/tutorme.svg"
import { auth } from "../../../backend/firebase";

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
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Assuming the Firebase user object includes these fields directly or you fetch them from a database
        setUser({
          name: currentUser.displayName || "Anonymous",
          email: currentUser.email || "No email",
          phone: "123-456-7890", // Example, you might want to fetch this from a database
          imageUrl: currentUser.photoURL || bear
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle changes to the email input
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, email: event.target.value });
    }
  };

  // Handle changes to the phone input
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, phone: event.target.value });
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
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={user.phone}
          onChange={handlePhoneChange}
        />
      </div>
    </div>
  );
};

export default UserPage;
