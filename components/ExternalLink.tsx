import { openBrowserAsync } from "expo-web-browser";
import type { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

type Props = {
  href: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ExternalLink({ href, children, style }: Props) {
  const handlePress = async () => {
    await openBrowserAsync(href);
  };

  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
}
