import { StyleSheet, TouchableOpacity, Modal } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeStore } from "@/hooks/useThemeStore";
import { useColorScheme as useRNColorScheme } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as AppleColors from "@bacons/apple-colors";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

// 主题选项组件
function ThemeOption({
  theme,
  currentTheme,
  optionType,
  onSelect,
}: {
  theme: "light" | "dark" | "system";
  currentTheme: "light" | "dark";
  optionType: "light" | "dark" | "system";
  onSelect: () => void;
}) {
  const colorScheme = useColorScheme();
  const isDark = currentTheme === "dark";

  // 根据选项类型设置样式和图标
  let backgroundColor = "";
  let selectedBg = "";
  let iconBg = "";
  let icon: "sunny" | "moon" | "phone-portrait" = "sunny";
  let label = "";
  let description: string | undefined;

  switch (optionType) {
    case "light":
      backgroundColor = isDark
        ? "rgba(255, 204, 0, 0.08)"
        : "rgba(255, 204, 0, 0.12)";
      selectedBg = isDark
        ? "rgba(54, 209, 168, 0.15)"
        : "rgba(255, 204, 0, 0.2)";
      iconBg = "rgba(255, 189, 60, 0.25)";
      icon = "sunny";
      label = "浅色模式";
      break;
    case "dark":
      backgroundColor = isDark
        ? "rgba(94, 92, 230, 0.1)"
        : "rgba(94, 92, 230, 0.08)";
      selectedBg = isDark
        ? "rgba(94, 92, 230, 0.2)"
        : "rgba(94, 92, 230, 0.15)";
      iconBg = "rgba(94, 92, 230, 0.25)";
      icon = "moon";
      label = "深色模式";
      break;
    case "system":
      backgroundColor = isDark
        ? "rgba(10, 132, 255, 0.08)"
        : "rgba(10, 132, 255, 0.06)";
      selectedBg = isDark
        ? "rgba(10, 132, 255, 0.2)"
        : "rgba(10, 132, 255, 0.15)";
      iconBg = "rgba(10, 132, 255, 0.25)";
      icon = "phone-portrait";
      label = "跟随系统";
      description = `当前系统使用${isDark ? "深色" : "浅色"}模式`;
      break;
  }

  const getIconColor = () => {
    switch (optionType) {
      case "light":
        return AppleColors.systemYellow;
      case "dark":
        return AppleColors.systemIndigo;
      case "system":
        return AppleColors.systemBlue;
      default:
        return AppleColors.systemBlue; // 默认颜色
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.themeOption,
        { backgroundColor },
        theme === optionType && {
          borderColor: Colors[colorScheme || "light"].primary,
          backgroundColor: selectedBg,
        },
      ]}
      onPress={onSelect}
    >
      <ThemedView style={styles.themeOptionContent}>
        <ThemedView
          style={[styles.themeIconContainer, { backgroundColor: iconBg }]}
        >
          <Ionicons name={icon} size={28} color={getIconColor()} />
        </ThemedView>
        <ThemedView style={{ flex: 1 }}>
          <ThemedText style={styles.themeOptionText}>{label}</ThemedText>
          {description && (
            <ThemedText style={styles.themeOptionDesc}>
              {description}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
      {theme === optionType && (
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
  );
}

// 主题设置模态框组件
function ThemeSettingsModal({
  visible,
  onClose,
}: { visible: boolean; onClose: () => void }) {
  const systemTheme = useRNColorScheme();
  const currentTheme = useThemeStore((state) =>
    state.getCurrentTheme(systemTheme),
  );
  const isDark = currentTheme === "dark";
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
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
              onPress={onClose}
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
            <ThemeOption
              theme={theme}
              currentTheme={currentTheme}
              optionType="light"
              onSelect={() => setTheme("light")}
            />

            <ThemeOption
              theme={theme}
              currentTheme={currentTheme}
              optionType="dark"
              onSelect={() => setTheme("dark")}
            />

            <ThemeOption
              theme={theme}
              currentTheme={currentTheme}
              optionType="system"
              onSelect={() => setTheme("system")}
            />
          </ThemedView>

          <ThemedView style={modalStyles.themePreview}>
            <ThemedText style={styles.themePreviewText}>预览</ThemedText>
            <ThemeToggleButton size={32} showLabel={false} />
          </ThemedView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <ThemedView style={modalStyles.gradientButton}>
              <ThemedText style={styles.closeButtonText}>确定</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

export default function ProfileScreen() {
  const systemTheme = useRNColorScheme();
  const currentTheme = useThemeStore((state) =>
    state.getCurrentTheme(systemTheme),
  );
  const isDark = currentTheme === "dark";
  const theme = useThemeStore((state) => state.theme);

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
      <ThemeSettingsModal
        visible={themeModalVisible}
        onClose={() => setThemeModalVisible(false)}
      />
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
  },
  themeOptions: {
    marginTop: 16,
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
  },
  themeOptionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  themeOptionDesc: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.6,
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
