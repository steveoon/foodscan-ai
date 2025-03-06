import { Image, StyleSheet, Platform, useColorScheme } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Colors from "@bacons/apple-colors";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
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
          styles.card,
          { backgroundColor: isDark ? "#252525" : "#F5F5F5" },
        ]}
      >
        <ThemedText type="subtitle" style={{ color: primaryColor }}>
          当前主题模式
        </ThemedText>
        <ThemedView style={styles.themeIndicator}>
          <ThemedView
            style={[
              styles.themeCircle,
              { backgroundColor: isDark ? "#FFFFFF" : "#000000" },
            ]}
          />
          <ThemedText style={{ color: secondaryColor }}>
            {isDark ? "深色模式" : "浅色模式"}
          </ThemedText>
        </ThemedView>
        <ThemedText>
          系统当前使用的是
          <ThemedText type="defaultSemiBold" style={{ color: primaryColor }}>
            {isDark ? "深色" : "浅色"}
          </ThemedText>
          主题。 FoodScan AI 会自动适配系统主题设置。
        </ThemedText>

        <ThemedView style={styles.themeToggleContainer}>
          <ThemeToggleButton size={28} showLabel={true} />
          <ThemedText style={styles.themeToggleHint}>
            点击上方按钮可以在浅色/深色/系统三种模式间切换
          </ThemedText>
          <ThemedText
            style={{ color: secondaryColor, fontSize: 12, marginTop: 4 }}
          >
            当前设置:{" "}
            {theme === "system"
              ? "跟随系统"
              : theme === "light"
              ? "浅色模式"
              : "深色模式"}
          </ThemedText>
        </ThemedView>
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
          点击
          <ThemedText type="defaultSemiBold" style={{ color: accentColor }}>
            扫描
          </ThemedText>
          标签页， 拍摄或上传食物图片，获取详细的营养分析。
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
          您可以在系统设置中切换深色/浅色模式，应用界面会自动适配。
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
  themeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },
  themeCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  themeToggleContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  themeToggleHint: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});
