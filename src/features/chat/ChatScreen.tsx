import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, FlatList } from "react-native";
import { ChatInput } from "./components/ChatInput";
import { ChatListHeader } from "./components/ChatListHeader";
import { MessageItem } from "./components/MessageItem";

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

  const ListHeaderComponent = () => {
    return <ChatListHeader isLoading={isLoading} />;
  };

  const renderMessages = ({ item }: { item: Message }) => {
    return <MessageItem message={item} />;
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
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={{ paddingHorizontal: 10 }}
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
