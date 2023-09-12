export const selectUserName = (state) => state.user.userName;
export const selectUserId = (state) => state.user.userId;
export const selectUserEmail = (state) => state.user.email;

export const selectPosts = (state) => state.posts.posts;
export const selectIsCountCommentChange = (state) =>
  state.posts.setIsCountCommentChange;
