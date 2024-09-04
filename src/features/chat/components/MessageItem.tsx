import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Message } from "../ChatScreen";

type MessageItemProps = {
  message: Message;
};

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  if (message.from === "user") {
    return (
      <View style={styles.userMessageContainer}>
        <Text style={styles.userText}>{message.text}</Text>
      </View>
    );
  }

  return <View />;
};

const styles = StyleSheet.create({
  userMessageContainer: {
    backgroundColor: "green",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "85%",
    marginLeft: "auto",
    marginVertical: 10,
  },
  userText: {
    color: "white",
    fontSize: 16,
  },
});
