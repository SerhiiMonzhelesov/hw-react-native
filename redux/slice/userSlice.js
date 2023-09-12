import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk } from "../Thunks/userThunk";
import { Alert } from "react-native";

const initialState = {
  userId: null,
  userName: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers: {

  // },

  extraReducers: (builder) =>
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.userName = payload.displayName;
        state.email = payload.mail;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.id;
        state.userName = payload.name;
        state.email = payload.email;
      })
      .addCase(loginThunk.rejected, () => {
        Alert.alert("Wrong credentials");
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.userId = null;
        state.userName = null;
        state.email = null;
      }),
});

export const userReducer = userSlice.reducer;
