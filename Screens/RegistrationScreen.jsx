import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RegistrationForm from "../components/RegistrationForm";
import { AntDesign } from "@expo/vector-icons";
import RegistrationFormFormik from "../components/RegistrationFormFormik";

export default function RegistrationScreen({ navigation }) {
  const handleUpdatePhoto = () => {
    return console.log("change Photo");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-144}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/photobg.png")}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.registerContainer}>
              <View style={styles.wrapperPhoto}>
                <TouchableOpacity onPress={handleUpdatePhoto}>
                  <AntDesign name="pluscircleo" size={24} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              {/* <RegistrationForm navigation={navigation} /> */}
              <RegistrationFormFormik navigation={navigation} />
            </View>
          </ImageBackground>
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  registerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    maxHeight: 549,
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  wrapperPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    left: 136,
    borderRadius: 12,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto_500",
    fontStyle: "normal",
    fontSize: 30,
    marginBottom: 33,
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
