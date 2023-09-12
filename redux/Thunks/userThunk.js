import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";

export const registerThunk = createAsyncThunk(
  "user/registerThunk",
  async ({ login, email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        // photoURL: pathUserPhoto,
      });

      const { uid, displayName, mail, photoURL } = auth.currentUser;
      return { uid, displayName, mail, photoURL };
    } catch (error) {
      throw error;
    }
  }
  // async ({ email, password }) => {
  //   try {
  //     const credentials = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );

  //     return credentials.user.email;
  //   } catch (error) {
  //     if (error.code === "auth/wrong-password") {
  //       Alert.alert("Неправильний пароль");
  //     } else if (error.code === "auth/user-not-found") {
  //       Alert.alert("Користувача не знайдено");
  //     } else {
  //       console.error("Помилка входу:", error);
  //     }
  //   }
  // }
);

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async ({ email, password }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const dataUser = {
        name: credentials.user.displayName,
        email: credentials.user.email,
        id: credentials.user.uid,
      };
      return dataUser;
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Alert.alert("Неправильний пароль");
      } else if (error.code === "auth/user-not-found") {
        Alert.alert("Користувача не знайдено");
      } else {
        console.error("Помилка входу:", error);
      }
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logoutThunk",
  async (_, thunkApi) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
