import { Colors } from "@/constants/theme";
import { sizes } from "@/constants/dimensions";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const isDisabled = disabled || isLoading;

  function getVariantStyles() {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
      case "secondary":
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: colors.primary,
        };
    }
  }

  function getSizeStyles() {
    switch (size) {
      case "small":
        return {
          paddingVertical: 8,
          paddingHorizontal: sizes.marginSize.small,
        };
      case "medium":
        return {
          paddingVertical: 12,
          paddingHorizontal: sizes.marginSize.medium,
        };
      case "large":
        return {
          paddingVertical: 16,
          paddingHorizontal: sizes.marginSize.large,
        };
    }
  }

  function getTextColor() {
    if (variant === "outline") {
      return colors.primary;
    }
    return "white";
  }

  function handlePress(event: any) {
    if (!isDisabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      pressableProps.onPress?.(event);
    }
  }

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        isDisabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      onPress={handlePress}
      {...pressableProps}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
