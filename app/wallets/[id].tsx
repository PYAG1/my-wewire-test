import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { sizes } from "@/constants/dimensions";
import { useWallets } from "@/context/wallet-context";
import HomeActions from "@/features/home/home-actions";
import TransactionItem from "@/features/home/transaction-item";
import WalletCard from "@/features/home/wallet-card";
import { formatCurrency } from "@/lib/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "iconsax-react-nativejs";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function WalletDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { wallets, transactions } = useWallets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const wallet = wallets.find((w) => w.id === id);
  const walletTransactions = transactions.filter((t) => t.walletId === id);

  if (!wallet) {
    return (
      <ThemedView safeArea style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>
        </View>
        <View style={styles.errorContainer}>
          <ThemedText style={{ fontSize: 16, textAlign: "center" }}>
            Wallet not found
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView safeArea style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.cardContainer}>
          <WalletCard
            title={wallet.name}
            amount={formatCurrency(wallet.balance, wallet.currency)}
            fullWidth
            currency={wallet.currency}
          />
        </View>

        <HomeActions />

        <View style={styles.transactionsSection}>
          <ThemedText
            type="subtitle"
            style={{ fontWeight: "400", marginBottom: sizes.marginSize.small }}
          >
            Recent Transactions
          </ThemedText>
          {walletTransactions.length === 0 ? (
            <View style={styles.emptyState}>
              <ThemedText
                style={{
                  fontSize: 16,
                  color: colors.textSecondary,
                  textAlign: "center",
                }}
              >
                No recent transactions
              </ThemedText>
            </View>
          ) : (
            <View>
              {walletTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  description={transaction.description}
                  amount={transaction.amount}
                  date={transaction.date}
                  walletId={transaction.walletId}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.marginSize.medium,
  },
  header: {
    marginBottom: sizes.marginSize.medium,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  cardContainer: {
    marginBottom: sizes.marginSize.small,
  },
  transactionsSection: {
    marginTop: sizes.marginSize.medium,
  },
  emptyState: {
    paddingVertical: sizes.marginSize.large * 2,
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
