import { sizes } from "@/constants/dimensions";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
    Pressable,
} from "react-native";
import { Eye, EyeSlash } from "iconsax-react-nativejs";

interface RenderInputProps {
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  fieldError?: FieldError | string;
}

export interface InputProps extends TextInputProps {
  label?: string;
  error?: FieldError | string;
  control?: Control<any>;
  name?: string;
  rules?: any;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      control,
      name,
      rules,
      leftIcon,
      rightIcon,
      containerStyle,
      style,
      ...textInputProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const colorScheme = useColorScheme() ?? "light";
    const colors = Colors[colorScheme];

    const isPasswordInput = textInputProps.secureTextEntry;

    function getErrorMessage(err?: FieldError | string) {
      if (!err) return undefined;
      return typeof err === "string" ? err : err.message;
    }

    function getBorderColor(hasError: boolean) {
      if (hasError) return colors.inputBorderError;
      if (isFocused) return colors.primary;
      return colors.inputBorder;
    }

    function togglePasswordVisibility() {
      setIsPasswordVisible(!isPasswordVisible);
    }

    function renderInput({
      value,
      onChange,
      onBlur,
      fieldError,
    }: RenderInputProps = {}) {
      const currentError = fieldError || error;
      const errorMessage = getErrorMessage(currentError);
      const hasError = !!currentError;

      return (
        <View style={[styles.container, containerStyle]}>
          {label && (
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          )}
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: getBorderColor(hasError),
              },
              hasError && styles.inputContainerError,
            ]}
          >
            {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
            <TextInput
              ref={ref}
              {...textInputProps}
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.backgroundSecondary,
                },
                leftIcon ? styles.inputWithLeftIcon : undefined,
                (rightIcon || isPasswordInput) ? styles.inputWithRightIcon : undefined,
                style,
              ]}
              placeholderTextColor={colors.placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                setIsFocused(false);
                onBlur?.();
              }}
              onFocus={(e) => {
                setIsFocused(true);
                textInputProps.onFocus?.(e);
              }}
              secureTextEntry={isPasswordInput && !isPasswordVisible}
            />
            {isPasswordInput ? (
              <Pressable onPress={togglePasswordVisibility} style={styles.iconContainer}>
                {isPasswordVisible ? (
                  <Eye size={20} color={colors.placeholder} />
                ) : (
                  <EyeSlash size={20} color={colors.placeholder} />
                )}
              </Pressable>
            ) : (
              rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>
            )}
          </View>
          {errorMessage && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errorMessage}
            </Text>
          )}
        </View>
      );
    }

    if (control && name) {
      return (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value }, fieldState }) =>
            renderInput({ value, onChange, onBlur, fieldError: fieldState.error })
          }
        />
      );
    }

    return renderInput({});
  },
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    marginBottom: sizes.marginSize.medium,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  inputContainerError: {
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    marginLeft: 8,
  },
  inputWithRightIcon: {
    marginRight: 8,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
