import React, { useState, useEffect } from 'react';
import "./User.css"
import bear from "../assets/tutorme.svg"
import { auth, db } from "../../../backend/firebase";
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { User as FirebaseUser } from "firebase/auth";
import Post from "../components/Post";

interface User {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
}

interface PostData {
  userid: string;
  course: string;
  availabilities: string[];
  description: string;
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser: FirebaseUser | null = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setUser(userData);
          setPhone(userData.phone); // Set initial phone number
        } else {
          const newUser = {
            name: currentUser.displayName || "Anonymous",
            email: currentUser.email || "No email",
            phone: "",
            imageUrl: currentUser.photoURL || bear
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      }
    };

    checkUser();
  }, []);

  const updateUserDetails = async () => {
    if (auth.currentUser) {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          phone: phone // Only update the phone number
        });

        alert('Phone number updated successfully!');
      } catch (error) {
        console.error('Failed to update phone number:', error);
        alert('Failed to update phone number.');
      }
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const currentUser: FirebaseUser | null = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setUser(userData);
          setPhone(userData.phone);
        } else {
          const newUser = {
            name: currentUser.displayName || "Anonymous",
            email: currentUser.email || "No email",
            phone: "",
            imageUrl: currentUser.photoURL || bear
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      }
    };

    const fetchPosts = async () => {
      if (auth.currentUser) {
        const postsRef = collection(db, "posts"); // Assuming 'posts' is the name of the collection
        const q = query(postsRef, where("userid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => doc.data() as PostData);
        setPosts(fetchedPosts);
      }
    };

    checkUser();
    fetchPosts();
  }, []);


  if (!user) return <div>Please login first!</div>;

  return (
    <div className='user-page'>
      <h1 className="hero">User Dashboard</h1>
      <img src={user.imageUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <h2>{user.name}</h2>
      <div className='email' style={{ marginBottom: "1em" }}>
        <label htmlFor="email">Email:</label>
        <div>{user.email}</div>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="phone" >Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <button onClick={updateUserDetails}>Update Phone Number</button>
      <div className="full-width-container">
        <div className='post-list'>
          <h2>Your Posts:</h2>
          {posts.map((post, index) => (
            <div style={{ marginBottom: "2em" }}>
              <Post
                key={index}
                title={post.course}
                description={post.description}
                posterName={user.name}
                posterEmail={user.email}
                availabilities={post.availabilities}
                course={post.course}
                classCode="N/A"

              />
            </div>

          ))}
        </div>

      </div>
    </div>
  );
};


export default UserPage;
