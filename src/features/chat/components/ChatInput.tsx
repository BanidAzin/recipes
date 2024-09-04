import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import uuid from "react-native-uuid";
import { Message } from "../ChatScreen";

type ChatInputProps = {
  isLoading: boolean;
  addToMessages: (message: Message) => void;
};

export const ChatInput: React.FC<ChatInputProps> = ({
  isLoading = false,
  addToMessages,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const translatePositionX = useSharedValue(0);

  const onInputChange = (text: string) => {
    setInputMessage(text);
    if (text.length === 0 && translatePositionX.value === 0) return;
    if (text.length > 0 && translatePositionX.value === 0) {
      translatePositionX.value = withTiming(1, { duration: 500 });
      return;
    }
    if (text.length === 0 && translatePositionX.value === 1) {
      translatePositionX.value = withTiming(0, { duration: 500 });
      return;
    }
  };

  const handleSendMessage = () => {
    setInputMessage("");
    Keyboard.dismiss();
    const message: Message = {
      id: uuid.v4().toString(),
      text: inputMessage.trim(),
      from: "user",
    };
    addToMessages(message);
  };

  const micButtonStyle = useAnimatedStyle(() => {
    const translateX = interpolate(translatePositionX.value, [0, 1], [0, 100]);
    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });

  const sendButtonStyle = useAnimatedStyle(() => {
    const scale = interpolate(translatePositionX.value, [0, 1], [0, 1]);
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onInputChange}
          value={inputMessage}
          multiline
          editable={!isLoading}
          textAlignVertical="top"
          style={[
            styles.input,
            isLoading && { opacity: 0.5, borderColor: "transparent" },
          ]}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Animated.View style={[styles.sendButtonContainer, sendButtonStyle]}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={20} color="white" disabled />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.micButtonContainer, micButtonStyle]}>
          <TouchableOpacity
            style={[styles.micButton, , isLoading && { opacity: 0.5 }]}
          >
            <Ionicons name="mic" size={20} color="white" disabled />
          </TouchableOpacity>
        </Animated.View>
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
    borderColor: "green",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    maxHeight: 120,
    color: "white",
  },
  sendButtonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "green",
  },
  micButtonContainer: {
    alignSelf: "flex-end",
  },
  micButton: {
    backgroundColor: "rgb(62, 62, 62)",
    borderColor: "green",
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
});
