import { User } from "./types";
import { Post } from "./types";
import { db } from "./firebase";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export const addUser = async (user: User) => {
  const docRef = await addDoc(collection(db, 'users'), user);

  return docRef.id;
};

export const getUser = async (userid: string) => {
};

export const addPost = async (post: Post) => {
  const docRef = await addDoc(collection(db, 'posts'), post)
  return docRef.id;
};

export const updateUser = async (userid: string, newData: Partial<User>): Promise<void> => {
  const userRef = doc(db, 'users', userid);

  try {
    await updateDoc(userRef, newData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deletePost = async (postid: string) => {
  const postRef = doc(db, 'posts', postid);

  try {
    await deleteDoc(postRef);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const filterPostsByCourse = async (course: string): Promise<Post[]> => {
  const postsQuery = query(collection(db, 'posts'), where('course', '==', course));
  const snapshot = await getDocs(postsQuery);
  const filteredCourses: Post[] = [];
  snapshot.forEach((doc) => {
    filteredCourses.push(doc.data() as Post);
  });
  return filteredCourses;
};

export const filterPostsByAvailability = async (course: string, availability: string[]): Promise<Post[]> => {
  const postsQuery = query(collection(db, 'posts'), where('course', '==', course));
  const snapshot = await getDocs(postsQuery);
  const filteredPosts: Post[] = [];
  snapshot.forEach((doc) => {
    const postData = doc.data() as Post;
    if (availability.some((avail) => postData.availabilities?.includes(avail))) {
      filteredPosts.push(postData);
    }
  });
  return filteredPosts;
};
