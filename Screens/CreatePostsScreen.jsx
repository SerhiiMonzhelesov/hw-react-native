import { StyleSheet, Text, View } from "react-native";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <Text>Create POST</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
