import { StyleSheet, Text, View } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Text>COMMENTS</Text>
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
