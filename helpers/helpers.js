import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config";
import { collection, getCountFromServer } from "firebase/firestore";

export default function uriToBlob(pathImage) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", pathImage, true);
    xhr.send(null);
  });
}

export async function saveImageToStorage(pathImage) {
  //   const bytes = await uriToBlob(pathImage);
  //   await uploadBytes(
  //     ref(storage, `postsImage / ${bytes._data.blobId}`),
  //     bytes
  //   ).catch((error) => {
  //     console.log(error);
  //   });

  //   return getDownloadURL(ref(storage, `postsImage / ${bytes._data.blobId}`));
  const bytes = await uriToBlob(pathImage);
  const storageRef = ref(storage, `postsImage/${bytes._data.blobId}`);

  try {
    // Завантаження байтів в Firebase Storage
    await uploadBytes(storageRef, bytes);

    // Отримати URL завантаженого зображення
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully. Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// export const getCommentsCount = async (postId) => {
//   try {
//     const commentsPost = collection(db, "posts", postId, "comments");
//     const snapshot = await getCountFromServer(commentsPost);

//     return snapshot.data().count;
//   } catch (error) {
//     console.log(error);
//   }
// };
