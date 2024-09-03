import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DummyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DummyScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 40, 40)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
