import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import PhotoUser from "../components/PhotoUser";
import IconHeader from "../components/IconHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectPosts, selectUserId } from "../redux/selectors";
import Post from "../components/Post";
import { nanoid } from "@reduxjs/toolkit";

export default function ProfileScreen({ route }) {
  const posts = useSelector(selectPosts);
  const userId = useSelector(selectUserId);
  const navigation = useNavigation();

  const { name } = route;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/photobg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.profileContainer}>
          <View style={styles.iconThumb}>
            <IconHeader name={name} navigation={navigation} />
          </View>
          <PhotoUser />
          <ScrollView>
            {posts &&
              posts
                ?.filter(
                  (post) => post.data.userId === userId
                  // <Post key={nanoid()} navigation={navigation} post={post} />
                )
                .map((post) => (
                  <Post key={nanoid()} navigation={navigation} post={post} />
                ))}
          </ScrollView>
          <View style={styles.thumb} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    maxHeight: 665,
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  iconThumb: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 22,
    right: 16,
  },
  thumb: { height: 80 },
});
