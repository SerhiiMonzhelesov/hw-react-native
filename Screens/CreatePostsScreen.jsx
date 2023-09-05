import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import CreatePostForm from "../components/CreatePostForm";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [pathImage, setPathImage] = useState(null);
  const [namePhoto, setNamePhoto] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    (async () => {
      let { statusLocate } = await Location.requestForegroundPermissionsAsync();
      if (statusLocate !== "granted") return;
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleDeletePost = () => {
    setAddress(null);
    setPathImage(null);
    setNamePhoto("");
    console.log("delete post");
  };
  const handleNamePhotoChange = (text) => {
    setNamePhoto(text);
  };
  const takePictureAndCoords = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    // Отримання назви міста та країни
    let addressArray = await Location.reverseGeocodeAsync(coords);
    let address = "Адресу не знайдено";

    if (addressArray.length > 0) {
      const firstAddress = addressArray[0];
      const city = firstAddress.city || firstAddress.subregion;
      const country = firstAddress.country;
      address = `${city}, ${country}`;
    }
    // console.log(location);
    setCoords(coords);
    setAddress(address);
    // Фотозйомка та збереження фото
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log(uri);
      await MediaLibrary.createAssetAsync(uri);
      setPathImage(uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerCamera}>
          {pathImage ? (
            <Image
              source={{
                uri: `${pathImage}`,
              }}
              style={styles.image}
            />
          ) : (
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={styles.flipContainer}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-flip-outline"
                    size={24}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => takePictureAndCoords()}
                >
                  <View style={styles.takePhotoInner}>
                    <FontAwesome name="camera" size={24} color="#BDBDBD" />
                  </View>
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>
        <Text style={styles.text}>Завантажити фото</Text>
        <CreatePostForm
          pathImage={pathImage}
          address={address}
          handleDeletePost={handleDeletePost}
          handleNamePhotoChange={handleNamePhotoChange}
          namePhoto={namePhoto}
          navigation={navigation}
          coords={coords}
        />
        <TouchableOpacity
          style={styles.trashWrapper}
          onPress={handleDeletePost}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingTop: 32,
  },
  trashWrapper: {
    position: "absolute",
    bottom: 32,
    left: "41%",
    elevation: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
  },
  containerCamera: {
    width: 343,
    height: 240,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
    marginBottom: 8,
  },
  camera: {
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    width: 343,
  },

  flipContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },

  button: { alignSelf: "center" },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 343, height: 240 },
  text: {
    marginBottom: 32,
    marginLeft: 25,
    color: "#BDBDBD",
    fontFamily: "Roboto_400",
    fontSize: 16,
    alignSelf: "flex-start",
  },
});
