/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// 主色调
const primaryLight = "#36D1A8";
const primaryDark = "#2AB090";

// 辅助色
const secondaryYellow = "#FFE082";
const secondaryBlue = "#81D4FA";
const secondaryOrange = "#FFAB91";
const secondaryPink = "#F8BBD0";

export const Colors = {
  light: {
    // 基础颜色
    text: "#333333",
    textSecondary: "#757575",
    textTertiary: "#9E9E9E",
    background: "#FFFFFF",
    backgroundSecondary: "#F5F5F5",

    // 主题色
    primary: primaryLight,
    primaryGradientStart: "#36D1A8",
    primaryGradientEnd: "#1E9E85",

    // 辅助色
    yellow: secondaryYellow,
    blue: secondaryBlue,
    orange: secondaryOrange,
    pink: secondaryPink,

    // 界面元素
    tint: primaryLight,
    icon: "#687076",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryLight,

    // 卡片和按钮
    card: "#FFFFFF",
    button: primaryLight,
    buttonText: "#FFFFFF",

    // 阴影
    shadow: "rgba(54, 209, 168, 0.15)",
  },
  dark: {
    // 基础颜色
    text: "#ECEDEE",
    textSecondary: "#B8BDC2",
    textTertiary: "#9BA1A6",
    background: "#151718",
    backgroundSecondary: "#1E2022",

    // 主题色
    primary: primaryDark,
    primaryGradientStart: "#2AB090",
    primaryGradientEnd: "#1A8A70",

    // 辅助色 (深色模式下稍微暗化)
    yellow: "#D4B56C",
    blue: "#6BAFD3",
    orange: "#D4917A",
    pink: "#CF9EAF",

    // 界面元素
    tint: primaryDark,
    icon: "#9BA1A6",
    tabIconDefault: "#687076",
    tabIconSelected: primaryDark,

    // 卡片和按钮
    card: "#1E2022",
    button: primaryDark,
    buttonText: "#FFFFFF",

    // 阴影
    shadow: "rgba(0, 0, 0, 0.3)",
  },
};
