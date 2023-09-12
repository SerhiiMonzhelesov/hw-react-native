import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Alert } from "react-native";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCTifUFdaQX5GHGAAvhWqj-Q_E7Avj2g3c",
  authDomain: "hwreact-native.firebaseapp.com",
  databaseURL: "https://hwreact-native-default-rtdb.firebaseio.com",
  projectId: "hwreact-native",
  storageBucket: "hwreact-native.appspot.com",
  messagingSenderId: "790620226954",
  appId: "1:790620226954:web:c23fadc85f0b936450b473",
  measurementId: "G-TT5P3VYJ86",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

// export const registerDB = async ({ email, password }) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     throw error;
//   }
// };

// export const loginDB = async ({ email, password }) => {
// try {
// const credentials = await signInWithEmailAndPassword(auth, email, password);
// console.log(credentials.user);
//     return credentials.user;
//   } catch (error) {
//     if (error.code === "auth/wrong-password") {
//       Alert.alert("Неправильний пароль");
//     } else if (error.code === "auth/user-not-found") {
//       Alert.alert("Користувача не знайдено");
//     } else {
//       console.error("Помилка входу:", error);
//     }
//   }
// };

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};
