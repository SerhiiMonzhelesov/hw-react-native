import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonRegistration from "./ButtonRegistration";
import { useFormik } from "formik";
import * as Yup from "yup";

export default RegistrationForm = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(5).max(12).required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      navigation.navigate("Home");
    },
    validationSchema: validationSchema,
  });

  const isFormValid =
    Object.keys(formik.errors).length === 0 &&
    Object.keys(formik.values).length !== 0;

  return (
    <View style={styles.form} onSubmit={formik.handleSubmit}>
      <TextInput
        name="login"
        placeholder="Логін"
        style={[
          styles.input,
          {
            borderColor: formik.errors.login
              ? "red"
              : loginFocused
              ? "#FF6C00"
              : "#E8E8E8",
            backgroundColor: loginFocused ? "#FFF" : "#F6F6F6",
          },
        ]}
        onFocus={() => setLoginFocused(true)}
        onBlur={() => {
          setLoginFocused(false);
          formik.handleBlur("login");
        }}
        value={formik.values.login}
        onChangeText={formik.handleChange("login")}
        error={Boolean(formik.errors.login)}
      />
      <TextInput
        name="email"
        placeholder={"Адреса електронної пошти"}
        style={[
          styles.input,
          {
            borderColor: formik.errors.email
              ? "red"
              : emailFocused
              ? "#FF6C00"
              : "#E8E8E8",
            backgroundColor: emailFocused ? "#FFF" : "#F6F6F6",
          },
        ]}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => {
          setEmailFocused(false);
          // formik.errors.email ? Alert.alert("ERROR") : null;
        }}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        keyboardType="email-address"
        error={Boolean(formik.errors.email)}
      />

      <View style={{ marginBottom: 27 }}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: formik.errors.password
                ? "red"
                : passwordFocused
                ? "#FF6C00"
                : "#E8E8E8",
              backgroundColor: passwordFocused ? "#FFF" : "#F6F6F6",
            },
          ]}
          name="password"
          placeholder="Пароль"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => {
            setPasswordFocused(false);
            formik.handleBlur("password");
          }}
          secureTextEntry={!showPassword}
          error={Boolean(formik.errors.password)}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Text style={styles.toggleText}>
            {showPassword ? "Приховати" : "Показати"}
          </Text>
        </TouchableOpacity>
      </View>
      <ButtonRegistration
        onPress={formik.handleSubmit}
        nameScreen="registration"
        isFormValid={isFormValid}
      />
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
