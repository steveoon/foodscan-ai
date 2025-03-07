import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

// 这是一个空白页面，用于占位，实际不会显示
export default function DummyScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>摄像头页面</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
