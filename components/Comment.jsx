import { Image, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/selectors";

export const Comment = ({ comment }) => {
  const idCurrentUser = useSelector(selectUserId);
  // console.log("Comment component", comment);
  return (
    <View style={styles.commentWrapper}>
      <View
        style={{
          flexDirection:
            comment.userId === idCurrentUser ? "row-reverse" : "row",
          marginBottom: 24,
        }}
      >
        {/* <Image source={{ uri: avatar }} style={styles.avatar} /> */}
        <View style={styles.avatar}></View>
        <View
          style={
            comment.userId === idCurrentUser
              ? styles.userComment
              : styles.comment
          }
        >
          <Text style={styles.text}>{comment.comment}</Text>
          <Text
            style={{
              ...styles.date,
              textAlign: comment.userId === idCurrentUser ? "left" : "right",
            }}
          >
            {comment.time}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrapper: {
    flex: 1,
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
    backgroundColor: "grey",
  },
  comment: {
    flex: 1,
    marginLeft: 16,

    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  userComment: {
    marginRight: 16,
    flex: 1,

    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  text: {
    fontFamily: "Roboto_400",
    fontSize: 13,
    color: "#212121",
  },
  date: {
    marginTop: 8,
    fontFamily: "Roboto_400",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
