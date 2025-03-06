import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";

// 主题类型
type ThemeType = "light" | "dark" | "system";

// 主题状态接口
interface ThemeState {
  // 状态
  theme: ThemeType;

  // 操作
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;

  // 计算属性
  getCurrentTheme: (systemTheme: ColorSchemeName) => "light" | "dark"; // 获取实际应用的主题
}

// 创建主题状态store
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => {
      return {
        // 初始状态
        theme: "system",

        // 设置主题
        setTheme: (theme) => set({ theme }),

        // 切换主题（在三种状态之间循环）
        toggleTheme: () => {
          const currentTheme = get().theme;
          // light -> dark -> system -> light
          const newTheme =
            currentTheme === "light"
              ? "dark"
              : currentTheme === "dark"
              ? "system"
              : "light";
          set({ theme: newTheme });
        },

        // 获取当前实际应用的主题
        getCurrentTheme: (systemTheme) => {
          const theme = get().theme;
          // 如果是系统主题，则返回系统当前的主题
          if (theme === "system") {
            return systemTheme === "dark" ? "dark" : "light";
          }
          // 否则返回用户设置的主题
          return theme;
        },
      };
    },
    {
      // 持久化配置
      name: "foodscan-theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
