import { Tabs } from "expo-router";
import { Platform, TouchableOpacity, StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// 自定义中间按钮组件
function CameraButton() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.cameraButtonContainer}>
      <TouchableOpacity
        style={[
          styles.cameraButton,
          { backgroundColor: Colors[colorScheme ?? "light"].primary },
        ]}
        onPress={() => {
          // 稍后实现摄像头页面
          console.log("相机按钮点击");
          // 临时弹出提示
          alert("相机功能即将上线！");
        }}
      >
        <IconSymbol size={30} name="camera.fill" color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
          height: 70,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      {/* 中间的摄像头按钮 */}
      <Tabs.Screen
        name="dummy"
        options={{
          title: "",
          tabBarIcon: () => null,
          tabBarButton: () => <CameraButton />,
        }}
        listeners={{
          tabPress: (e) => {
            // 阻止默认导航行为
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "我的",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cameraButtonContainer: {
    position: "relative",
    alignItems: "center",
    height: 70,
  },
  cameraButton: {
    position: "absolute",
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
