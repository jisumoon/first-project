import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Post 생성
export const createPost = async (
  userId: string,
  title: string,
  content: string
): Promise<string | null> => {
  try {
    const postsCollectionRef = collection(db, `users/${userId}/posts`);

    // Firestore 문서 생성
    const docRef = await addDoc(postsCollectionRef, {
      title,
      content,
      createdAt: new Date(),
    });

    console.log("Created Post ID:", docRef.id); // Firestore가 생성한 ID
    return docRef.id; // Firestore에서 생성한 문서 ID 반환
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
};

// Post 수정
export const updatePost = async (
  userId: string,
  postId: string, // Firestore 문서 ID
  updatedContent: string
): Promise<boolean> => {
  try {
    const postDocRef = doc(db, `users/${userId}/posts/${postId}`); // Firestore 경로에 접근
    await updateDoc(postDocRef, {
      content: updatedContent,
      updatedAt: new Date(),
    });

    console.log("Updated Post:", postId);
    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    return false;
  }
};

// Post 삭제
export const deletePost = async (
  userId: string,
  postId: string // Firestore 문서 ID
): Promise<boolean> => {
  try {
    const postDocRef = doc(db, `users/${userId}/posts/${postId}`); // Firestore 경로에 접근
    await deleteDoc(postDocRef); // 문서 삭제
    console.log("Deleted Post:", postId);
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};
