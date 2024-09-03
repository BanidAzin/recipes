import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ChatInput: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");

  const onInputChange = (text: string) => {
    setInputMessage(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onInputChange}
          value={inputMessage}
          multiline
          textAlignVertical="top"
          style={styles.input}
        />
      </View>
      <View style={styles.micIconContainer}>
        <Ionicons name="mic" size={20} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgb(40, 40, 40)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
  },
  inputContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  input: {
    backgroundColor: "rgb(62, 62, 62)",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    maxHeight: 120,
    color: "white",
  },
  micIconContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 10,
  },
});
