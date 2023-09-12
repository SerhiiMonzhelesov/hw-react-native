import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../redux/Thunks/userThunk";

export default function IconHeader({ routeName, name }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let nameIcon, pathForNavigation, iconStyle;

  if (routeName === "Публікації") {
    nameIcon = "log-out";
    iconStyle = { marginRight: 16 };
    pathForNavigation = () => {
      dispatch(logoutThunk());
      navigation.navigate("Login");
    };
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
    pathForNavigation = () => {
      dispatch(logoutThunk());
      navigation.navigate("Login");
    };
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
