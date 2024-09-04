import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  FlatList,
} from "react-native";
import { ChatInput } from "./components/ChatInput";

export type Message = {
  id: string;
  text: string;
  from: "user" | "bot";
};

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToMessages = (message: Message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
    setIsLoading(true);
  };

  const renderMessages = ({ item }: { item: Message }) => {
    if (item.from === "user") {
      return (
        <View
          style={{
            backgroundColor: "rgb(0, 132, 255)",
            padding: 10,
            margin: 5,
            borderRadius: 10,
          }}
        >
          <Text>{item.text}</Text>
        </View>
      );
    }

    return <View />;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <FlatList
          data={messages}
          renderItem={renderMessages}
          inverted
          keyExtractor={(item) => item.id}
        />
        <ChatInput isLoading={isLoading} addToMessages={addToMessages} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 40, 40)",
  },
});
