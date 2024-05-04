import { User } from "./types";
import { Post } from "./types";
import { db } from "./firebase";

export const addUser = async (user: User) => {
    const docRef = await db.collection('users').add(user);
    return docRef.id;
};

export const getUser = async (userid: string) => {
};

export const addPost = async (post: Post) => {
    const docRef = await db.collection('posts').add(post);
    return docRef.id;
};
