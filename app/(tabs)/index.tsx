import { Image, StyleSheet, Platform, useColorScheme } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Colors from "@bacons/apple-colors";
import { useThemeStore } from "@/hooks/useThemeStore";

export default function HomeScreen() {
  // 获取系统主题
  const systemTheme = useColorScheme();

  // 使用Zustand store获取主题状态
  const theme = useThemeStore((state) => state.theme);
  const currentTheme = useThemeStore((state) =>
    state.getCurrentTheme(systemTheme)
  );
  const isDark = currentTheme === "dark";

  // 使用Apple标准颜色
  const primaryColor = isDark ? Colors.systemBlue : Colors.systemBlue;
  const secondaryColor = isDark ? Colors.secondaryLabel : Colors.secondaryLabel;
  const accentColor = isDark ? Colors.systemOrange : Colors.systemOrange;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">欢迎使用 FoodScan AI!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView
        style={[
          styles.stepContainer,
          {
            borderLeftColor: primaryColor,
            borderLeftWidth: 3,
            paddingLeft: 12,
          },
        ]}
      >
        <ThemedText type="subtitle">扫描食物</ThemedText>
        <ThemedText>
          点击底部导航栏中的
          <ThemedText type="defaultSemiBold" style={{ color: accentColor }}>
            相机按钮
          </ThemedText>
          ，拍摄或上传食物图片，获取详细的营养分析。
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[
          styles.stepContainer,
          {
            borderLeftColor: primaryColor,
            borderLeftWidth: 3,
            paddingLeft: 12,
          },
        ]}
      >
        <ThemedText type="subtitle">查看历史记录</ThemedText>
        <ThemedText>
          您的所有扫描记录都会被保存，方便您随时查看和比较。
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1A3A4A" : "#E1F5FE" },
        ]}
      >
        <ThemedText type="subtitle" style={{ color: accentColor }}>
          提示
        </ThemedText>
        <ThemedText>
          您可以在"我的"页面中进行主题设置，切换深色/浅色模式。
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 8,
  },
});
