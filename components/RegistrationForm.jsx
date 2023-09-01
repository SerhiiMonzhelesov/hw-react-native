import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonRegistration from "./ButtonRegistration";

export default RegistrationForm = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginChange = (text) => {
    setLogin(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    const dataSubmit = {
      login,
      email,
      password,
    };
    console.log(dataSubmit);
    Alert.alert(
      `login: ${dataSubmit.login}, email: ${dataSubmit.email}, password: ${dataSubmit.password}`
    );
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: loginFocused ? "#FF6C00" : "#E8E8E8",
            backgroundColor: loginFocused ? "#FFF" : "#F6F6F6",
          },
        ]}
        onFocus={() => setLoginFocused(true)}
        onBlur={() => setLoginFocused(false)}
        placeholder="Логін"
        value={login}
        onChangeText={handleLoginChange}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: emailFocused ? "#FF6C00" : "#E8E8E8",
            backgroundColor: emailFocused ? "#FFF" : "#F6F6F6",
          },
        ]}
        placeholder="Адреса електронної пошти"
        value={email}
        onChangeText={handleEmailChange}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        keyboardType="email-address"
      />
      <View style={{ marginBottom: 27 }}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: passwordFocused ? "#FF6C00" : "#E8E8E8",
              backgroundColor: passwordFocused ? "#FFF" : "#F6F6F6",
            },
          ]}
          placeholder="Пароль"
          value={password}
          onChangeText={handlePasswordChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Text style={styles.toggleText}>
            {showPassword ? "Приховати" : "Показати"}
          </Text>
        </TouchableOpacity>
      </View>
      <ButtonRegistration onPress={handleSubmit} nameScreen="registration" />

      <Text style={{ marginTop: 16, color: "#1B4371" }}>
        Вже є аккаунт?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ textDecorationLine: "underline" }}
        >
          Увійти
        </Text>
      </Text>
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
    borderWidth: 1,
    padding: 16,
    width: 343,
    borderRadius: 8,
    borderWidth: 1,
  },
  toggleText: {
    color: "#1B4371",
    textDecorationLine: "none",
    position: "absolute",
    top: -47,
    right: 28,
  },
});
