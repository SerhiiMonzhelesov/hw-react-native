import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  doc,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";
import { useEffect, useState } from "react";
import { getDataStorageThunk } from "../redux/Thunks/postsThunk";
import { useDispatch } from "react-redux";

export default function Post({ navigation, post }) {
  const [commentsCount, setCommentsCount] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const postId = post.id;
  const { namePhoto, urlImage, coords, address, likes } = post.data;

  const getCommentsCount = async () => {
    try {
      const commentsPost = collection(db, "posts", postId, "comments");
      const snapshot = await getCountFromServer(commentsPost);

      setCommentsCount(snapshot.data().count);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressLike = async () => {
    if (isLike) {
      await updateDoc(doc(db, "posts", postId), {
        likes: likes ? likes - 1 : -1,
      });
      setIsLike(!isLike);
      dispatch(getDataStorageThunk("posts"));
      return;
    }
    await updateDoc(doc(db, "posts", postId), {
      likes: likes ? likes + 1 : 1,
    });
    setIsLike(!isLike);
    dispatch(getDataStorageThunk("posts"));
    return;
  };

  useEffect(() => {
    getCommentsCount();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.cardImgThumb}>
        <Image
          source={{
            uri: `${urlImage}`,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.cardText}> {namePhoto ? namePhoto : "Назва..."}</Text>
      <View style={styles.cardDescription}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Коментарі", post)}
          style={{ flexDirection: "row" }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              transform: [{ rotate: "270deg" }],
              marginRight: 6,
            }}
          >
            <Feather
              name="message-circle"
              size={24}
              color={commentsCount > 0 ? "#FF6C00" : "#BDBDBD"}
            />
          </View>
          <Text style={{ color: commentsCount > 0 ? "#FF6C00" : "#BDBDBD" }}>
            {commentsCount ? commentsCount : 0}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressLike}
          style={{ flexDirection: "row" }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              marginLeft: 27,
            }}
          >
            <Feather
              name="thumbs-up"
              size={24}
              color={likes > 0 ? "#FF6C00" : "#BDBDBD"}
            />
          </View>
          <Text
            style={{
              color: likes > 0 ? "#FF6C00" : "#BDBDBD",
              marginLeft: 6,
            }}
          >
            {likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Мапа", {
              coords,
              namePhoto,
            })
          }
        >
          <View style={styles.fieldLocation}>
            <View style={{ width: 26, height: 26 }}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
            </View>
            <Text style={{ color: "#BDBDBD", marginLeft: 4 }}>
              {address ? address : "Місцевість..."}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 343,
    height: 299,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    marginBottom: 34,
  },
  cardImgThumb: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    // justifyContent: "space-between",
    color: "grey",
  },
  image: { width: 343, height: 240 },
  fieldLocation: {
    height: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 25,
  },
});
