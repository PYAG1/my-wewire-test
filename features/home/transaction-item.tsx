import { ThemedText } from "@/components/themed-text";
import { sizes } from "@/constants/dimensions";
import { FontFamilies } from "@/constants/fonts";
import { Colors } from "@/constants/theme";
import { useWallets } from "@/context/wallet-context";
import { getCurrencySymbol } from "@/lib/utils";
import { Transaction } from "@/types";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useMemo } from "react";
import { ArrowDown, ArrowUp } from "iconsax-react-nativejs";
import { StyleSheet, View } from "react-native";

type TransactionItemProps = Pick<
  Transaction,
  "description" | "amount" | "date" | "walletId"
>;

export default function TransactionItem({
  description,
  amount,
  date,
  walletId,
}: TransactionItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { wallets } = useWallets();

  const currencySymbol = useMemo(() => {
    const wallet = wallets.find((w) => w.id === walletId);
    return wallet ? getCurrencySymbol(wallet.currency) : "$";
  }, [wallets, walletId]);

  const isDeposit = !amount.startsWith("-");
  const displayAmount = isDeposit
    ? `+${currencySymbol}${amount}`
    : `-${currencySymbol}${amount.slice(1)}`;
  const amountColor = isDeposit ? "#16A34A" : "#DC2626";
  const iconBgColor = isDeposit ? "#DCFCE7" : "#FEE2E2";

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: iconBgColor,
            },
          ]}
        >
          {isDeposit ? (
            <ArrowDown
              size={20}
              color="#16A34A"
              style={{ transform: [{ rotate: "-45deg" }] }}
            />
          ) : (
            <ArrowUp
              size={20}
              color="#DC2626"
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          )}
        </View>
        <View>
          <ThemedText style={styles.description}>{description}</ThemedText>
          <ThemedText style={[styles.date, { color: colors.textSecondary }]}>
            {formattedDate}
          </ThemedText>
        </View>
      </View>
      <ThemedText
        style={[
          styles.amount,
          {
            color: amountColor,
            fontFamily: FontFamilies.fraunces.semiBold,
          },
        ]}
      >
        {displayAmount}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: sizes.marginSize.small,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
  },
  date: {
    fontSize: 13,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
  },
});
