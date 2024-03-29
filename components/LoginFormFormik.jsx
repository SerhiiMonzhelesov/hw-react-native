import { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/Thunks/userThunk";

export default LoginForm = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6).max(12).required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(loginThunk(values));
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
        nameScreen="login"
        isFormValid={isFormValid}
      />

      <Text style={{ marginTop: 16, color: "#1B4371" }}>
        Немає аккаунту?{" "}
        <Text
          onPress={() => navigation.navigate("Registration")}
          style={{ textDecorationLine: "underline" }}
        >
          Зареєструватися
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
  },
  toggleText: {
    color: "#1B4371",
    textDecorationLine: "none",
    position: "absolute",
    top: -50,
    right: 28,
  },
});
