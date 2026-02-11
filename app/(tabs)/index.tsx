import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { sizes } from "@/constants/dimensions";
import { FontFamilies } from "@/constants/fonts";
import { useWallets } from "@/context/wallet-context";
import HomeActions from "@/features/home/home-actions";
import TransactionItem from "@/features/home/transaction-item";
import WalletCard from "@/features/home/wallet-card";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { wallets, transactions } = useWallets();
  const router = useRouter();

  return (
    <ThemedView safeArea style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: sizes.marginSize.medium }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <ThemedText type="title" style={{ fontWeight: "400" }}>
              Hello,
            </ThemedText>
            <ThemedText
              type="title"
              style={{ fontFamily: FontFamilies.fraunces.semiBold }}
            >
              Desmond
            </ThemedText>
          </View>
          <ThemedText style={{ color: "gray", fontSize: 18 }}>
            Welcome to your dashboard
          </ThemedText>
        </View>
        <View style={{ marginBottom: sizes.marginSize.small }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            <WalletCard title="TOTAL WALLET BALANCE" amount="$5,230.75" />
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                title={wallet.name}
                amount={formatCurrency(wallet.balance, wallet.currency)}
                currency={wallet.currency}
                onPress={() =>
                  router.navigate({
                    pathname: "/wallets/[id]",
                    params: { id: wallet.id },
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
        <HomeActions />

        <View>
          <ThemedText
            type="subtitle"
            style={{ fontWeight: "400", marginBottom: sizes.marginSize.small }}
          >
            Recent Transactions
          </ThemedText>
          <View>
            {transactions.slice(0, 5).map((transaction) => (
              <TransactionItem
                key={transaction.id}
                description={transaction.description}
                amount={transaction.amount}
                date={transaction.date}
                walletId={transaction.walletId}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.marginSize.medium,
    gap: 10,
  },
  cardsContainer: {
    gap: sizes.marginSize.small,
    paddingRight: sizes.marginSize.medium,
  },
});
