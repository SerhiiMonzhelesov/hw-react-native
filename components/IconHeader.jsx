import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function IconHeader({ name, navigation }) {
  let nameIcon, pathForNavigation, iconStyle;

  if (name === "logout") {
    nameIcon = "log-out";
    pathForNavigation = () => navigation.navigate("Registration");
    iconStyle = { marginRight: 16 };
  } else if (name === "go-back") {
    nameIcon = "arrow-left";
    pathForNavigation = () => navigation.navigate("Публікації");
    iconStyle = { marginLeft: 16 };
  }

  return (
    <TouchableOpacity
      style={[styles.icon, iconStyle]}
      onPress={pathForNavigation}
    >
      <Feather name={nameIcon} size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
