import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonRegistration from "./ButtonRegistration";
import { Feather } from "@expo/vector-icons";

export default CreatePostForm = ({
  namePhoto,
  pathImage,
  address,
  handleDeletePost,
  handleNamePhotoChange,
  navigation,
  coords,
}) => {
  const handleSubmit = () => {
    const dataSubmit = {
      namePhoto,
      pathImage,
    };

    handleDeletePost();
    navigation.navigate("Публікації", {
      namePhoto,
      pathImage,
      address,
      coords,
    });
  };
  const isFormValid = namePhoto && address && pathImage;

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={namePhoto}
        onChangeText={handleNamePhotoChange}
        keyboardType="default"
      />

      <TouchableOpacity onPress={() => console.log("locate")}>
        <View style={styles.fieldLocation}>
          <View style={{ width: 24, height: 24, position: "absolute" }}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </View>
          {address ? (
            <Text style={styles.fieldLocationText}>{address}</Text>
          ) : (
            <Text style={styles.fieldLocationText}>Місцевість...</Text>
          )}
        </View>
      </TouchableOpacity>
      <ButtonRegistration
        onPress={handleSubmit}
        nameScreen="Створити публікацію"
        isFormValid={isFormValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    padding: 15,
    paddingLeft: 0,
    width: 343,
    fontSize: 16,
  },
  fieldLocation: {
    height: 50,
    width: 343,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    padding: 15,
    paddingLeft: 28,
    marginBottom: 32,
    fontSize: 16,
  },
  fieldLocationText: {
    color: "#BDBDBD",
    fontFamily: "Roboto_400",
    fontSize: 16,
  },
  toggleText: {
    color: "#1B4371",
    textDecorationLine: "none",
    position: "absolute",
    top: -50,
    right: 28,
  },
});
