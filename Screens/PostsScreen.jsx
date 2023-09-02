import { StyleSheet, Text, View } from "react-native";

export default function PostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardImgThumb}>
          <Text>IMAGE</Text>
        </View>
        <Text style={styles.cardText}>Ліс</Text>
        <View style={styles.cardDescription}>
          <Text
            style={{ color: "grey" }}
            onPress={() => navigation.navigate("Коментарі")}
          >
            comment
          </Text>
          <Text
            style={{ color: "grey" }}
            onPress={() => navigation.navigate("Мапа")}
          >
            location
          </Text>
        </View>
      </View>
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
});
