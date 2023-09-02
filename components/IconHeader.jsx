import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function IconHeader({ routeName, name }) {
  const navigation = useNavigation();

  let nameIcon, pathForNavigation, iconStyle;

  if (routeName === "Публікації") {
    nameIcon = "log-out";
    pathForNavigation = () => navigation.navigate("Registration");
    iconStyle = { marginRight: 16 };
  } else if (
    routeName === "Створити публікацію" ||
    routeName === "Коментарі" ||
    routeName === "Мапа"
  ) {
    nameIcon = "arrow-left";
    pathForNavigation = () => navigation.navigate("Публікації");
    iconStyle = { marginLeft: 16 };
  } else if (name === "Профіль") {
    nameIcon = "log-out";
    pathForNavigation = () => navigation.navigate("Registration");
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
