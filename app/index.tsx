import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { sizes } from "@/constants/dimensions";
import { FontFamilies } from "@/constants/fonts";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(tabs)");
  };

  return (
    <ThemedView style={styles.container} safeArea>
      <View style={styles.welcomeSection}>
        <Logo hideText style={{ marginBottom: sizes.marginSize.small }} />
        <ThemedText
          style={{
            fontFamily: FontFamilies.fraunces.regular,
            fontSize: 35,
            lineHeight: 40,
          }}
        >
          Welcome Back
        </ThemedText>
        <ThemedText type="default">Enter your details to sign in</ThemedText>
      </View>

      <View>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={handleLogin} style={styles.button}>
          Login
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.marginSize.large,
    justifyContent: "center",
  },
  welcomeSection: {
    flexDirection: "column",
    gap: 4,
    marginBottom: sizes.marginSize.large,
  },
  button: {
    marginTop: sizes.marginSize.medium,
  },
});
