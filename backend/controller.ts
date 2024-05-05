import { User } from "./types";
import { Post } from "./types";
import { db } from "./firebase";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export const addUser = async (user: User) => {
    const docRef = await addDoc(collection(db, 'users'), user);

    return docRef.id;
};

export const getUser = async (userid: string) => {
    const userRef = doc(db, 'users', userid);
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
        return docSnapshot.data() as User;
    } else {
        return null;
    }
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


export const updatePost = async (postid: string, newData: Partial<Post>): Promise<void> => {
    const postRef = doc(db, 'posts', postid);

    try {
        await updateDoc(postRef, newData);
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};
