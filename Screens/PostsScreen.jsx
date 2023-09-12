import { StyleSheet, Text, View } from "react-native";

import Post from "../components/Post";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectUserEmail,
  selectUserId,
  selectUserName,
} from "../redux/selectors";
import { getDataStorageThunk } from "../redux/Thunks/postsThunk";
import { nanoid } from "@reduxjs/toolkit";

export default function PostsScreen({ navigation }) {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const posts = useSelector(selectPosts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!posts) {
      dispatch(getDataStorageThunk("posts"));
    }
  }, [posts]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerUser}>
          <View style={styles.userPhotoThumb}></View>
          <View style={styles.userDescrThumb}>
            <Text style={styles.userName}>
              {userName ? userName : "Ім'я користувача"}
            </Text>
            <Text style={styles.userEmail}>
              {userEmail ? userEmail : "Пошта користувача"}
            </Text>
          </View>
        </View>

        {posts &&
          posts?.map((post) => (
            <Post key={nanoid()} navigation={navigation} post={post} />
          ))}
      </ScrollView>
      <View style={styles.thumb} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  containerUser: {
    width: 343,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 32,
    gap: 8,
  },
  userPhotoThumb: {
    width: 60,
    height: 60,
    backgroundColor: "grey",
    borderRadius: 16,
    overflow: "hidden",
  },
  userDescrThumb: {
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flex-start",
  },
  userName: { color: "#212121", fontFamily: "Roboto_500", fontSize: 13 },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto_400",
    fontSize: 11,
  },
  card: {
    width: 343,
    height: 299,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  cardImgThumb: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",

    color: "#212121",
    fontFamily: "Roboto_500",
    fontSize: 16,
  },
  cardDescription: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "grey",
  },
  image: { width: 343, height: 240 },
  fieldLocation: {
    height: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  thumb: { height: 80 },
});
