import Logo from "@/components/ui/logo";
import { sizes } from "@/constants/dimensions";
import { FontFamilies } from "@/constants/fonts";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getCountryCode } from "@/lib/utils";
import { WalletCardProps } from "@/types";
import { Text, View, ViewStyle } from "react-native";
import CountryFlag from "react-native-country-flag";

export default function WalletCard({
  title,
  amount,
  fullWidth = false,
  currency,
}: Readonly<WalletCardProps>) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const cardStyle: ViewStyle = {
    width: fullWidth ? "100%" : sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.2,
    borderRadius: sizes.marginSize.medium,
    padding: sizes.marginSize.medium + 5,
    borderWidth: 1,
    marginBottom: fullWidth ? sizes.marginSize.small : 0,
    borderColor: colors.inputBorder,
    backgroundColor: colors.backgroundSecondary,
  };

  return (
    <View style={cardStyle}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
        {currency ? (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <CountryFlag isoCode={getCountryCode(currency)} size={20} />
          </View>
        ) : (
          <Logo hideText height={20} />
        )}
      </View>
      <Text
        style={{
          fontSize: 32,
          fontFamily: FontFamilies.fraunces.semiBold,
          marginTop: sizes.marginSize.medium,
          color: colors.text,
        }}
      >
        {amount}
      </Text>
    </View>
  );
}
