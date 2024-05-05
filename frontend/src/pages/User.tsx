import React, { useState, ChangeEvent } from 'react';
import "./User.css"
import bear from "../assets/tutorme.svg"

// Define an interface for the user type
interface User {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const UserPage: React.FC = () => {
  // Initialize state with types
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    imageUrl: bear // Ensure you have a valid image URL here
  });

  // Handle changes to the email input
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: event.target.value });
  };

  // Handle changes to the phone input
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, phone: event.target.value });
  };

  return (
    <>
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
    </>

  );
};

export default UserPage;
