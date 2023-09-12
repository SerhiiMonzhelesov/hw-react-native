import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../config";
import { Alert } from "react-native";
import { collection, getCountFromServer, getDocs } from "firebase/firestore";

export const getDataStorageThunk = createAsyncThunk(
  "posts/getDataStorageThunk",
  async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, `${collectionName}`));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// export const getCountCommentsThunk = createAsyncThunk(
//   "posts/getCountCommentsThunk",
//   async (postId) => {
//     try {
//       const commentsPost = collection(db, "posts", postId, "comments");
//       const snapshot = await getCountFromServer(commentsPost);
//       console.log("PostThunk count", snapshot.data().count);
//       return snapshot.data().count;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
