import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function PhotoUser() {
  const handleUpdatePhoto = () => {
    return console.log("change Photo");
  };

  return (
    <View style={styles.wrapperPhoto}>
      <TouchableOpacity onPress={handleUpdatePhoto}>
        <AntDesign name="pluscircleo" size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    left: 136,
    borderRadius: 12,
  },
  icon: {
    position: "absolute",
    bottom: -104,
    right: -12,
    color: "#FF6C00",
    backgroundColor: "white",
    borderRadius: 50,
  },
});
