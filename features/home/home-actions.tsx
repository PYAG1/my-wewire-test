import { ThemedText } from "@/components/themed-text";
import { ICON_SIZE } from "@/constants/data";
import { sizes } from "@/constants/dimensions";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { router } from "expo-router";
import {
  ArrowDown,
  ArrowUp,
  CardAdd,
  ExportSquare,
  ImportSquare,
} from "iconsax-react-nativejs";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function HomeActions() {
  const backgroundColor = useThemeColor({}, "background");
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");

  const actions = [
    {
      id: "buy",
      label: "Buy",
      icon: ImportSquare,
      onPress: () => console.log("Buy pressed"),
    },
    {
      id: "sell",
      label: "Sell",
      icon: ExportSquare,
      onPress: () => console.log("Sell pressed"),
    },
    {
      id: "add-wallet",
      label: "Add Wallet",
      icon: CardAdd,
      onPress: () => router.push("/add-wallet"),
    },
    {
      id: "receive",
      label: "Receive",
      icon: ArrowDown,
      onPress: () => console.log("Receive pressed"),
    },
    {
      id: "send",
      label: "Send",
      icon: ArrowUp,
      onPress: () => console.log("Send pressed"),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionItem}
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: backgroundSecondary },
            ]}
          >
            <action.icon size={ICON_SIZE} color={Colors.light.text} />
          </View>
          <ThemedText style={styles.label}>{action.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizes.marginSize.small,
    paddingBottom: sizes.marginSize.medium,
    width: "100%",
  },
  actionItem: {
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24, // Circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB", // Light gray border like screenshot
  },
  label: {
    fontSize: sizes.fontSize[1], // 12
    fontWeight: "500",
  },
});
