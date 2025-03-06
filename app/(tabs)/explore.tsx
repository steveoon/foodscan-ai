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

  const modalStyles = StyleSheet.create({
    closeIconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDark
        ? "rgba(150, 150, 150, 0.15)"
        : "rgba(150, 150, 150, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    themeOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(150, 150, 150, 0.15)",
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    themePreview: {
      marginTop: 24,
      marginBottom: 24,
      alignItems: "center",
      padding: 20,
      borderRadius: 16,
      backgroundColor: isDark
        ? "rgba(45, 45, 50, 0.3)"
        : "rgba(240, 240, 240, 0.7)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    gradientButton: {
      backgroundColor: isDark ? "#2AB090" : "#36D1A8",
      paddingVertical: 14,
      alignItems: "center",
      borderRadius: 16,
    },
  });

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
              {
                backgroundColor: isDark
                  ? "rgba(40, 42, 45, 0.95)"
                  : "rgba(245, 245, 245, 0.95)",
              },
            ]}
          >
            <ThemedView style={styles.modalHeader}>
              <ThemedText type="subtitle">主题设置</ThemedText>
              <TouchableOpacity
                style={modalStyles.closeIconButton}
                onPress={() => setThemeModalVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={22}
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
                  modalStyles.themeOption,
                  {
                    backgroundColor: isDark
                      ? "rgba(255, 204, 0, 0.08)"
                      : "rgba(255, 204, 0, 0.12)",
                  },
                  theme === "light" && {
                    borderColor: Colors[colorScheme || "light"].primary,
                    backgroundColor: isDark
                      ? "rgba(54, 209, 168, 0.15)"
                      : "rgba(255, 204, 0, 0.2)",
                  },
                ]}
                onPress={() => setTheme("light")}
              >
                <ThemedView style={styles.themeOptionContent}>
                  <ThemedView
                    style={[
                      styles.themeIconContainer,
                      { backgroundColor: "rgba(255, 189, 60, 0.25)" },
                    ]}
                  >
                    <Ionicons
                      name="sunny"
                      size={28}
                      color={AppleColors.systemYellow}
                    />
                  </ThemedView>
                  <ThemedText style={styles.themeOptionText}>
                    浅色模式
                  </ThemedText>
                </ThemedView>
                {theme === "light" && (
                  <ThemedView
                    style={[
                      styles.themeSelectedIndicator,
                      {
                        backgroundColor: isDark ? "#2AB090" : "#36D1A8",
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
                  modalStyles.themeOption,
                  {
                    backgroundColor: isDark
                      ? "rgba(94, 92, 230, 0.1)"
                      : "rgba(94, 92, 230, 0.08)",
                  },
                  theme === "dark" && {
                    borderColor: Colors[colorScheme || "light"].primary,
                    backgroundColor: isDark
                      ? "rgba(94, 92, 230, 0.2)"
                      : "rgba(94, 92, 230, 0.15)",
                  },
                ]}
                onPress={() => setTheme("dark")}
              >
                <ThemedView style={styles.themeOptionContent}>
                  <ThemedView
                    style={[
                      styles.themeIconContainer,
                      { backgroundColor: "rgba(94, 92, 230, 0.25)" },
                    ]}
                  >
                    <Ionicons
                      name="moon"
                      size={28}
                      color={AppleColors.systemIndigo}
                    />
                  </ThemedView>
                  <ThemedText style={styles.themeOptionText}>
                    深色模式
                  </ThemedText>
                </ThemedView>
                {theme === "dark" && (
                  <ThemedView
                    style={[
                      styles.themeSelectedIndicator,
                      {
                        backgroundColor: isDark ? "#2AB090" : "#36D1A8",
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
                  modalStyles.themeOption,
                  {
                    backgroundColor: isDark
                      ? "rgba(10, 132, 255, 0.08)"
                      : "rgba(10, 132, 255, 0.06)",
                  },
                  theme === "system" && {
                    borderColor: Colors[colorScheme || "light"].primary,
                    backgroundColor: isDark
                      ? "rgba(10, 132, 255, 0.2)"
                      : "rgba(10, 132, 255, 0.15)",
                  },
                ]}
                onPress={() => setTheme("system")}
              >
                <ThemedView style={styles.themeOptionContent}>
                  <ThemedView
                    style={[
                      styles.themeIconContainer,
                      { backgroundColor: "rgba(10, 132, 255, 0.25)" },
                    ]}
                  >
                    <Ionicons
                      name="phone-portrait"
                      size={28}
                      color={AppleColors.systemBlue}
                    />
                  </ThemedView>
                  <ThemedView style={{ flex: 1, backgroundColor: "null" }}>
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
                        backgroundColor: isDark ? "#2AB090" : "#36D1A8",
                      },
                    ]}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </ThemedView>
                )}
              </TouchableOpacity>
            </ThemedView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setThemeModalVisible(false)}
            >
              <ThemedView style={modalStyles.gradientButton}>
                <ThemedText style={styles.closeButtonText}>确定</ThemedText>
              </ThemedView>
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "null",
  },
  themeOptions: {
    marginTop: 16,
    backgroundColor: "null",
  },
  themeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  themeOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "null",
  },
  themeOptionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  themeOptionDesc: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.6,
    backgroundColor: "null",
  },
  themeSelectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  themePreviewText: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  closeButton: {
    borderRadius: 16,
    marginTop: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
