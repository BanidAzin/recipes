import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const ChatInput: React.FC = () => {
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

  const handleSendMessage = () => {};

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
          textAlignVertical="top"
          style={styles.input}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Animated.View style={[styles.sendButtonContainer, sendButtonStyle]}>
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[micButtonStyle]}>
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={20} color="white" />
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
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    maxHeight: 120,
    color: "white",
  },
  sendButtonContainer: {
    position: "absolute",
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "green",
  },
  micButton: {
    borderColor: "green",
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
});
