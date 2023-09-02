import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LoginForm from "../components/LoginForm";
import LoginFormFormik from "../components/LoginFormFormik";

export default LoginScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-236}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/photobg.png")}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.loginContainer}>
              <Text style={styles.title}>Увійти</Text>
              {/* <LoginForm navigation={navigation} /> */}
              <LoginFormFormik navigation={navigation} />
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    maxHeight: 489,
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 32,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto_500",
    fontStyle: "normal",
    fontSize: 30,
    fontStyle: "normal",
    marginBottom: 33,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
});
