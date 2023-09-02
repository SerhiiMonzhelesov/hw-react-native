import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CreatePostsScreen() {
  const handleDeletePost = () => {
    console.log("delete post");
  };

  return (
    <View style={styles.container}>
      <Text>Create POST</Text>
      <TouchableOpacity style={styles.trashWrapper} onPress={handleDeletePost}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
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
  trashWrapper: {
    position: "absolute",
    bottom: 32,
    left: "45%",
    elevation: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
  },
});
