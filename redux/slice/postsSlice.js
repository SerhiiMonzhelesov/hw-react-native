import { createSlice } from "@reduxjs/toolkit";
import {
  getCountCommentsThunk,
  getDataStorageThunk,
} from "../Thunks/postsThunk";

const initialState = {
  posts: null,
  isCountCommentChange: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // setIsCountCommentChange(state, payload) {
    //   state.isCountCommentChange = payload;
    // },
  },

  extraReducers: (builder) =>
    builder.addCase(getDataStorageThunk.fulfilled, (state, { payload }) => {
      state.posts = payload;
    }),
});

// export const { setIsCountCommentChange } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
