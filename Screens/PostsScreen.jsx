import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ navigation }) {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardImgThumb}>
          {route.params ? (
            <Image
              source={{
                uri: `${route.params.pathImage}`,
              }}
              style={styles.image}
            />
          ) : null}
        </View>
        <Text style={styles.cardText}>
          {route.params ? route.params.namePhoto : "Назва..."}
        </Text>
        <View style={styles.cardDescription}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Коментарі")}
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
              <Feather name="message-circle" size={24} color="#BDBDBD" />
            </View>
            <Text style={{ color: "#BDBDBD" }}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              route.params
                ? navigation.navigate("Мапа", route.params.coords)
                : null
            }
          >
            <View style={styles.fieldLocation}>
              <View style={{ width: 24, height: 24 }}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </View>
              <Text style={{ color: "#BDBDBD", marginLeft: 4 }}>
                {route.params ? route.params.address : "Місцевість..."}
              </Text>
            </View>
          </TouchableOpacity>
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
  image: { width: 343, height: 240 },
  fieldLocation: {
    height: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
