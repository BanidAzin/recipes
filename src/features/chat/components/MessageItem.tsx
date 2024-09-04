import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";

import { Message } from "../ChatScreen";

type MessageItemProps = {
  message: Message;
  addToMessages: (message: Message) => void;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  addToMessages,
}) => {
  const handleOptionPress = () => {
    const newMessage: Message = {
      ...message,
      id: uuid.v4().toString(),
      from: "user",
    };
    addToMessages(newMessage);
  };

  if (message.from === "user") {
    return (
      <View style={styles.userMessageContainer}>
        <Text style={styles.userText}>{message.text}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.botMessageContainer}
      onPress={handleOptionPress}
    >
      <Text style={styles.botText}>{message.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userMessageContainer: {
    backgroundColor: "green",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "85%",
    marginLeft: "auto",
    marginVertical: 5,
  },
  userText: {
    color: "white",
    fontSize: 16,
  },
  botMessageContainer: {
    backgroundColor: "rgb(62, 62, 62)",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "85%",
    marginVertical: 5,
  },
  botText: {
    color: "white",
    fontSize: 16,
  },
});
