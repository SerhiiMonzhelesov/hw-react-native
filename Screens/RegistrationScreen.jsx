import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RegistrationFormFormik from "../components/RegistrationFormFormik";
import PhotoUser from "../components/PhotoUser";

export default function RegistrationScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-170}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/photobg.png")}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.registerContainer}>
              <PhotoUser />
              <Text style={styles.title}>Реєстрація</Text>
              {/* <RegistrationForm navigation={navigation} /> */}
              <RegistrationFormFormik navigation={navigation} />
            </View>
          </ImageBackground>
        </View>
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
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto_500",
    fontStyle: "normal",
    fontSize: 30,
    marginBottom: 33,
  },
});
