import { StyleSheet, Text, TextInput, View } from "react-native";
import ButtonRegistration from "./ButtonRegistration";
import { Feather } from "@expo/vector-icons";
import { db } from "../config";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectUserName } from "../redux/selectors";
import { saveImageToStorage } from "../helpers/helpers";
import { getDataStorageThunk } from "../redux/Thunks/postsThunk";

export default CreatePostForm = ({
  namePhoto,
  pathImage,
  address,
  handleDeletePost,
  handleNamePhotoChange,
  navigation,
  coords,
  country,
}) => {
  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);
  const isFormValid = namePhoto && address && pathImage;
  const dispatch = useDispatch();
  // const uploadImg = async () => {
  //   try {
  //     const response = await fetch(pathImage);
  //     const file = await response.blob();
  //     await uploadBytes(ref(storage, `photos/${file._data.blobId}`), file);
  //     const photoUrl = await getDownloadURL(
  //       ref(storage, `photos/${file._data.blobId}`)
  //     );
  //     return photoUrl;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const uploadPost = async () => {
    try {
      const urlImage = await saveImageToStorage(pathImage);

      await addDoc(collection(db, "posts"), {
        userId,
        userName,
        urlImage,
        namePhoto,
        address,
        coords,
        date: Date.now().toString(),
        country,
        likes: 0,
      });
      dispatch(getDataStorageThunk("posts"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    // uploadImg();
    uploadPost();

    handleDeletePost();
    navigation.navigate("Публікації");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={namePhoto}
        onChangeText={handleNamePhotoChange}
        keyboardType="default"
      />

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
