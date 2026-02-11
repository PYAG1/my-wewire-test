import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sizes } from "@/constants/dimensions";
import { FontFamilies } from "@/constants/fonts";
import { Colors } from "@/constants/theme";
import { useWallets } from "@/context/wallet-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AddWalletSchema, Currency } from "@/lib/schemas";
import { CURRENCY_OPTIONS } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { CloseCircle } from "iconsax-react-nativejs";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AddWallet() {
  const { addWallet } = useWallets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string; currency: Currency }>({
    resolver: zodResolver(AddWalletSchema),
    defaultValues: {
      name: "",
      currency: "USD" as Currency,
    },
  });

  async function onSubmit(data: { name: string; currency: Currency }) {
    const newWalletId = addWallet({
      name: data.name,
      currency: data.currency,
      balance: "0.00",
    });
    router.replace({
      pathname: "/wallets/[id]",
      params: { id: newWalletId },
    });
  }

  console.log(watch());

  return (
    <ThemedView safeArea style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText
            type="title"
            style={{ fontFamily: FontFamilies.fraunces.semiBold }}
          >
            Add Wallet
          </ThemedText>
          <ThemedText style={{ color: colors.textSecondary, fontSize: 16 }}>
            Create a new wallet
          </ThemedText>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <CloseCircle size={28} color={colors.text} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
          <Input
            control={control}
            name="name"
            label="Wallet Name"
            placeholder="e.g. Savings, Travel, Main"
            autoCapitalize="words"
          />

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Currency</Text>

            <Controller
              control={control}
              name="currency"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={[styles.picker, { color: colors.text }]}
                  dropdownIconColor={colors.placeholder}
                >
                  <Picker.Item
                    label="Select currency"
                    value=""
                    enabled={false}
                    color={colors.placeholder}
                  />
                  {CURRENCY_OPTIONS.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={`${option.label} (${option.value})`}
                      value={option.value}
                      color={colors.text}
                    />
                  ))}
                </Picker>
              )}
            />
            {errors.currency && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.currency.message}
              </Text>
            )}
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            style={styles.submitButton}
          >
            Create Wallet
          </Button>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.marginSize.large,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: sizes.marginSize.large,
  },
  form: {
    gap: sizes.marginSize.medium,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  picker: {
    margin: 0,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    marginTop: sizes.marginSize.medium,
  },
});
