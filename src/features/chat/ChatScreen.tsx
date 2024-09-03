import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from "react-native";
import { ChatInput } from "./components/ChatInput";

export type Message = {
  id: number;
  text: string;
  from: "user" | "bot";
};

export const ChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Pressable
          style={{ flexGrow: 1, backgroundColor: "" }}
          onPress={() => Keyboard.dismiss()}
        />
        <ChatInput />
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
