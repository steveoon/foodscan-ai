import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Colors from "@bacons/apple-colors";
import { useThemeStore } from "@/hooks/useThemeStore";

interface ThemeToggleButtonProps {
  size?: number;
  showLabel?: boolean;
  style?: any;
}

export function ThemeToggleButton({
  size = 24,
  showLabel = false,
  style,
}: ThemeToggleButtonProps) {
  // 获取系统主题
  const systemTheme = useColorScheme();

  // 使用Zustand store获取主题状态和方法
  const theme = useThemeStore((state) => state.theme);
  const currentTheme = useThemeStore((state) =>
    state.getCurrentTheme(systemTheme)
  );
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // 根据当前主题设置图标和颜色
  const isDark = currentTheme === "dark";

  // 根据当前主题模式选择图标
  let iconName: "sunny" | "moon" | "phone-portrait" = "sunny";
  switch (theme) {
    case "light":
      iconName = "sunny";
      break;
    case "dark":
      iconName = "moon";
      break;
    case "system":
      iconName = "phone-portrait";
      break;
  }

  // 设置背景色和图标颜色
  const backgroundColor = isDark ? "#333333" : "#F0F0F0";
  let iconColor;
  switch (theme) {
    case "light":
      iconColor = Colors.systemYellow;
      break;
    case "dark":
      iconColor = Colors.systemIndigo;
      break;
    case "system":
      iconColor = Colors.systemBlue;
      break;
    default:
      iconColor = Colors.systemYellow;
  }

  // 获取主题模式的文本标签
  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "浅色模式";
      case "dark":
        return "深色模式";
      case "system":
        return `跟随系统 (${isDark ? "深色" : "浅色"})`;
      default:
        return "";
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor,
            width: size * 1.8,
            height: size * 1.8,
            borderRadius: size * 0.9,
          },
        ]}
        onPress={toggleTheme}
        activeOpacity={0.7}
      >
        <Ionicons name={iconName} size={size} color={iconColor} />
      </TouchableOpacity>

      {showLabel && (
        <Text style={[styles.label, { color: isDark ? "#FFFFFF" : "#000000" }]}>
          {getThemeLabel()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
  },
});
