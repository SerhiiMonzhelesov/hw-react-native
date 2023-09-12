import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config";
import { nanoid } from "@reduxjs/toolkit";
import { Comment } from "../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/selectors";
import { getDataStorageThunk } from "../redux/Thunks/postsThunk";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const urlImage = route.params.data.urlImage;
  const postId = route.params.id;

  // console.log("CommentScreen", userId);
  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("date")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), commentId: doc.id });
      });

      setAllComments(comments);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSendComment = async () => {
    if (!comment) {
      return Alert.alert("Введіть текст в поле для коментаря!");
    }
    const date = new Date();
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const commentDate = date.toLocaleDateString("ukr-UKR", optionsDate);
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      userId,
      date: Date.now().toString(),
      time: commentDate,
    });
    setComment("");
    dispatch(getDataStorageThunk("posts"));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-170}
      >
        <View style={styles.container}>
          <View style={styles.imgThumb}>
            <Image
              source={{
                uri: `${urlImage}`,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.commentsWrapper}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={{ width: 343 }}
            >
              {allComments?.map((comment) => {
                return <Comment key={nanoid()} comment={comment} />;
              })}
            </ScrollView>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Коментувати..."
              multiline={true}
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
            />
            <Pressable style={styles.iconSend} onPress={handleSendComment}>
              <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  imgThumb: {
    width: 343,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 32,
  },
  image: { width: 343, height: 240 },
  commentsWrapper: {
    width: 343,
    height: 282,
    marginTop: 32,
  },
  inputWrapper: {
    position: "absolute",
    left: 25,
    bottom: 16,
    width: 343,
    marginTop: 32,
    alignItems: "center",
  },

  commentInput: {
    width: 343,
    minHeight: 50,
    backgroundColor: "#00000008",
    borderRadius: 100,
    padding: 15,
    alignItems: "center",
    alignSelf: "center",
  },

  iconSend: {
    position: "absolute",
    top: 12,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});
