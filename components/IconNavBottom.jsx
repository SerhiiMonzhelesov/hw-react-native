import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function IconNavBottom({ routeName, name, focused }) {
  let iconComponent, background, width;

  if (name === "Створити публікацію") {
    background = routeName === "Профіль" ? "transparent" : "#FF6C00";
    width = routeName === "Профіль" ? 24 : 70;
    iconComponent = (
      <Feather
        name="plus"
        size={24}
        color={routeName === "Профіль" ? "rgba(33, 33, 33, 0.8)" : "#fff"}
      />
    );
  } else if (name === "Профіль") {
    background = focused ? "#FF6C00" : "transparent";
    width = focused ? 70 : 24;
    iconComponent = (
      <Feather
        name="user"
        size={24}
        color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
      />
    );
  } else {
    iconComponent = (
      <AntDesign name="appstore-o" size={24} color="rgba(33, 33, 33, 0.8)" />
    );
  }

  return (
    <View
      style={[
        styles.iconWrapper,
        {
          backgroundColor: background,
          width: width,
        },
      ]}
    >
      {iconComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",

    height: 40,
    borderRadius: 50,
  },
});
