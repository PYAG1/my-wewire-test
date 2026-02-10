import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeArea = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const Container = safeArea ? SafeAreaView : View;

  return <Container style={[{ backgroundColor }, style]} {...otherProps} />;
}
