import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, FlatList } from "react-native";
import uuid from "react-native-uuid";

import { ChatInput } from "./components/ChatInput";
import { ChatListHeader } from "./components/ChatListHeader";
import { MessageItem } from "./components/MessageItem";
import { useFetch } from "../../hooks/useFetch";
import { SEARCH_RECIPIE } from "../../utils/constants";

export type Message = {
  id: string;
  source_id?: string;
  text: string;
  from: "user" | "bot";
};

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { refetch, isLoading } = useFetch({
    endPoint: SEARCH_RECIPIE,
  });

  const addUserMessages = (message: Message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
    refetch({
      query: message.text,
      onSuccess: (data) => {
        addBotMessages(data);
      },
    });
  };

  const addBotMessages = (data: any) => {
    const messages = data.map((item: any) => ({
      id: uuid.v4().toString(),
      source_id: item.id,
      text: item.title,
      from: "bot",
    }));
    setMessages((prevMessages) => [...messages, ...prevMessages]);
  };

  const ListHeaderComponent = () => {
    return <ChatListHeader isLoading={isLoading} />;
  };

  const renderMessages = ({ item }: { item: Message }) => {
    return <MessageItem message={item} addToMessages={addUserMessages} />;
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
        <ChatInput isLoading={isLoading} addToMessages={addUserMessages} />
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
