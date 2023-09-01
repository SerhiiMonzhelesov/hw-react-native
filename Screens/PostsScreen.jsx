import { StyleSheet, Text, View } from "react-native";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <Text>POSTS</Text>
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
});
