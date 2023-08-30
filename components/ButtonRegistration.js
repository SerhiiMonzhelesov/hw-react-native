import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default ButtonRegistration = ({ onPress, nameScreen }) => {
  const title = nameScreen === "login" ? "Увійти" : "Зареєструватися";
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 343,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textTransform: "none",
  },
});
