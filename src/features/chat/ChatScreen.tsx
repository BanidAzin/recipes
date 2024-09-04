import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, FlatList } from "react-native";
import uuid from "react-native-uuid";

import { ChatInput } from "./components/ChatInput";
import { ChatListHeader } from "./components/ChatListHeader";
import { MessageItem } from "./components/MessageItem";
import { useFetch } from "../../hooks/useFetch";
import { GET_RECIPE_INFORMATION, SEARCH_RECIPIE } from "../../utils/constants";

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

  const { refetch: fetchRecipieInfo, isLoading: loadingFetchRecipeInfo } =
    useFetch();

  const addUserMessages = (message: Message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
    if (message.source_id) {
      fetchRecipieInfo({
        mutationEndPoint: `${message.source_id}/${GET_RECIPE_INFORMATION}`,
        onSuccess: (data) => {
          const { id, title, instructions, extendedIngredients } = data;
          console.log({ id });
        },
      });
      return;
    }

    refetch({
      query: message.text,
      onSuccess: (data) => {
        console.log({ data });
        const { results } = data;
        addBotMessages(results);
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
    return <ChatListHeader isLoading={isLoading || loadingFetchRecipeInfo} />;
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
        <ChatInput
          isLoading={isLoading || loadingFetchRecipeInfo}
          addToMessages={addUserMessages}
        />
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
