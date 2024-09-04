import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import uuid from "react-native-uuid";
import RenderHtml from "react-native-render-html";

import { Message, RecipieDetails } from "../ChatScreen";

type MessageItemProps = {
  message: Message | RecipieDetails;
  addToMessages: (message: Message) => void;
};

const tagsStyles: any = {
  body: {
    color: "white",
  },
  a: {
    color: "green",
  },
};

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  addToMessages,
}) => {
  const { width } = useWindowDimensions();

  if ("title" in message) {
    const msg = message as RecipieDetails;
    const source = { html: msg.instructions };
    return (
      <View style={styles.recipieContainer}>
        <Text style={styles.recipieTitle}>{msg.title}</Text>
        <RenderHtml
          source={source}
          contentWidth={width}
          tagsStyles={tagsStyles}
        />
        <View style={styles.ingredientsContainer}>
          {msg.ingredients.map((ingredient) => {
            return (
              <View key={ingredient.id} style={styles.ingreadientChip}>
                <Text style={styles.botText}>{ingredient.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  const msg = message as Message;

  const handleOptionPress = () => {
    const newMessage: Message = {
      ...message,
      id: uuid.v4().toString(),
      from: "user",
    };
    addToMessages(newMessage);
  };

  if (msg.from === "user") {
    return (
      <View style={styles.userMessageContainer}>
        <Text style={styles.userText}>{msg.text}</Text>
      </View>
    );
  } else if (msg.from === "bot") {
    return (
      <TouchableOpacity
        style={styles.botMessageContainer}
        onPress={handleOptionPress}
      >
        <Text style={styles.botText}>{(message as Message).text}</Text>
      </TouchableOpacity>
    );
  }

  return;
};

const styles = StyleSheet.create({
  recipieContainer: {
    backgroundColor: "rgb(62, 62, 62)",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "100%",
    marginVertical: 5,
    gap: 10,
  },
  recipieTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-evenly",
  },
  ingreadientChip: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
  },
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
