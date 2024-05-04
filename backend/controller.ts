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

export const updateProfile = async (userid: string, profileUrl: string) => {
    const docRef = db.collection('users').doc(userid);

    try {
        await docRef.update({
            profileUrl: profileUrl
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const deletePost = async (postid: string) => {
    const docRef = db.collection('posts').doc(postid);

    try {
        await docRef.delete();
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}