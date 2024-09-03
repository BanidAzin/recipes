import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Router } from "./src/router";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
