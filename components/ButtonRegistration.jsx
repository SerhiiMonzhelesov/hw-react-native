import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ButtonRegistration({
  onPress,
  nameScreen,
  isFormValid,
}) {
  const title =
    nameScreen === "login"
      ? "Увійти"
      : nameScreen === "registration"
      ? "Зареєструватися"
      : "Опублікувати";
  return (
    <Pressable
      style={[styles.button, !isFormValid && styles.disabledButton]}
      onPress={onPress}
      disabled={!isFormValid}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 343,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "grey" },
  buttonText: {
    fontSize: 16,
    color: "white",
    textTransform: "none",
  },
});
