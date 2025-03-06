import { StyleSheet, TouchableOpacity, Modal } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeStore } from "@/hooks/useThemeStore";
import { useColorScheme as useRNColorScheme } from "react-native";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as AppleColors from "@bacons/apple-colors";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const systemTheme = useRNColorScheme();
  const currentTheme = useThemeStore((state) =>
    state.getCurrentTheme(systemTheme)
  );
  const isDark = currentTheme === "dark";
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  // 主题设置模态框状态
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  // 主题显示文本
  const getThemeText = () => {
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
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">我的</ThemedText>
      </ThemedView>

      {/* 用户信息卡片 - 简单占位版本 */}
      <ThemedView style={styles.userCard}>
        <IconSymbol
          name="person.fill"
          size={50}
          color={isDark ? Colors.dark.primary : Colors.light.primary}
        />
        <ThemedText style={styles.username}>用户名</ThemedText>
      </ThemedView>

      {/* 设置列表 - 简单占位版本 */}
      <ThemedView style={styles.settingsContainer}>
        <ThemedText style={styles.sectionTitle}>设置</ThemedText>

        {/* 主题设置 */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setThemeModalVisible(true)}
        >
          <ThemedView style={styles.settingItemLeft}>
            {theme === "light" ? (
              <Ionicons
                name="sunny"
                size={24}
                color={AppleColors.systemYellow}
              />
            ) : theme === "dark" ? (
              <Ionicons
                name="moon"
                size={24}
                color={AppleColors.systemIndigo}
              />
            ) : (
              <Ionicons
                name="phone-portrait"
                size={24}
                color={AppleColors.systemBlue}
              />
            )}
            <ThemedText style={styles.settingLabel}>主题设置</ThemedText>
          </ThemedView>
          <ThemedView style={styles.settingItemRight}>
            <ThemedText style={styles.settingValue}>
              {getThemeText()}
            </ThemedText>
            <IconSymbol
              name="chevron.right"
              size={20}
              color={
                isDark ? Colors.dark.textTertiary : Colors.light.textTertiary
              }
            />
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      {/* 主题设置模态框 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView
            style={[
              styles.modalContent,
              { backgroundColor: isDark ? "#1E2022" : "#FFFFFF" },
            ]}
          >
            <ThemedView style={styles.modalHeader}>
              <ThemedText type="subtitle">主题设置</ThemedText>
              <TouchableOpacity onPress={() => setThemeModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.themeOptions}>
              {/* 浅色模式选项 */}
              <TouchableOpacity
                style={[
                  styles.themeOption,
                  theme === "light" && {
                    borderColor: Colors[colorScheme || "light"].primary,
                    backgroundColor: isDark
                      ? "rgba(54, 209, 168, 0.1)"
                      : "rgba(54, 209, 168, 0.1)",
                  },
                ]}
                onPress={() => setTheme("light")}
              >
                <ThemedView style={styles.themeOptionContent}>
                  <Ionicons
                    name="sunny"
                    size={28}
                    color={AppleColors.systemYellow}
                  />
                  <ThemedText style={styles.themeOptionText}>
                    浅色模式
                  </ThemedText>
                </ThemedView>
                {theme === "light" && (
                  <ThemedView
                    style={[
                      styles.themeSelectedIndicator,
                      {
                        backgroundColor: Colors[colorScheme || "light"].primary,
                      },
                    ]}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </ThemedView>
                )}
              </TouchableOpacity>

              {/* 深色模式选项 */}
              <TouchableOpacity
                style={[
                  styles.themeOption,
                  theme === "dark" && {
                    borderColor: Colors[colorScheme || "light"].primary,
                    backgroundColor: isDark
                      ? "rgba(54, 209, 168, 0.1)"
                      : "rgba(54, 209, 168, 0.1)",
                  },
                ]}
                onPress={() => setTheme("dark")}
              >
                <ThemedView style={styles.themeOptionContent}>
                  <Ionicons
                    name="moon"
                    size={28}
                    color={AppleColors.systemIndigo}
                  />
                  <ThemedText style={styles.themeOptionText}>
                    深色模式
                  </ThemedText>
                </ThemedView>
                {theme === "dark" && (
                  <ThemedView
                    style={[
                      styles.themeSelectedIndicator,
                      {
                        backgroundColor: Colors[colorScheme || "light"].primary,
                      },
                    ]}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </ThemedView>
                )}
              </TouchableOpacity>

              {/* 跟随系统选项 */}
              <TouchableOpacity
                style={[
                  styles.themeOption,
                  theme === "system" && {
                    borderColor: Colors[colorScheme || "light"].primary,
                    backgroundColor: isDark
                      ? "rgba(54, 209, 168, 0.1)"
                      : "rgba(54, 209, 168, 0.1)",
                  },
                ]}
                onPress={() => setTheme("system")}
              >
                <ThemedView style={styles.themeOptionContent}>
                  <Ionicons
                    name="phone-portrait"
                    size={28}
                    color={AppleColors.systemBlue}
                  />
                  <ThemedView style={{ flex: 1 }}>
                    <ThemedText style={styles.themeOptionText}>
                      跟随系统
                    </ThemedText>
                    <ThemedText style={styles.themeOptionDesc}>
                      当前系统使用{isDark ? "深色" : "浅色"}模式
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                {theme === "system" && (
                  <ThemedView
                    style={[
                      styles.themeSelectedIndicator,
                      {
                        backgroundColor: Colors[colorScheme || "light"].primary,
                      },
                    ]}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </ThemedView>
                )}
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.themePreview}>
              <ThemedText style={styles.themePreviewText}>预览</ThemedText>
              <ThemeToggleButton size={32} showLabel={false} />
            </ThemedView>

            <TouchableOpacity
              style={[
                styles.closeButton,
                { backgroundColor: Colors[colorScheme || "light"].primary },
              ]}
              onPress={() => setThemeModalVisible(false)}
            >
              <ThemedText style={styles.closeButtonText}>确定</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 20,
  },
  userCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150, 150, 150, 0.2)",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  settingValue: {
    fontSize: 14,
    opacity: 0.6,
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  themeOptions: {
    marginTop: 10,
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
    marginBottom: 12,
  },
  themeOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  themeOptionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  themeOptionDesc: {
    fontSize: 12,
    marginLeft: 12,
    opacity: 0.6,
  },
  themeSelectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  themePreview: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  themePreviewText: {
    fontSize: 16,
    marginBottom: 10,
    opacity: 0.7,
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
