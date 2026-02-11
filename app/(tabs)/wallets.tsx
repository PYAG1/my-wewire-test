import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { sizes } from "@/constants/dimensions";
import { FontFamilies } from "@/constants/fonts";
import { Colors } from "@/constants/theme";
import { useWallets } from "@/context/wallet-context";
import WalletCard from "@/features/home/wallet-card";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { formatCurrency } from "@/lib/utils";
import { SearchNormal1 } from "iconsax-react-nativejs";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

export default function WalletsScreen() {
  const { wallets } = useWallets();
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const filteredWallets = wallets.filter((wallet) => {
    const query = searchQuery.toLowerCase();
    return (
      wallet.name.toLowerCase().includes(query) ||
      wallet.currency.toLowerCase().includes(query)
    );
  });

  return (
    <ThemedView safeArea style={styles.container}>
      <View style={styles.header}>
        <ThemedText
          type="title"
          style={{ fontFamily: FontFamilies.fraunces.semiBold }}
        >
          Wallets
        </ThemedText>
        <ThemedText style={{ color: colors.textSecondary, fontSize: 16 }}>
          {wallets.length} {wallets.length === 1 ? "wallet" : "wallets"}
        </ThemedText>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: colors.inputBorder,
          },
        ]}
      >
        <SearchNormal1 size={20} color={colors.placeholder} />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: colors.text,
              backgroundColor: colors.backgroundSecondary,
            },
          ]}
          placeholder="Search by name or currency..."
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredWallets.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: "center",
            }}
          >
            No wallets match your search
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={filteredWallets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WalletCard
              title={item.name}
              amount={formatCurrency(item.balance, item.currency)}
              fullWidth
              currency={item.currency}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizes.marginSize.small,
    borderRadius: sizes.marginSize.small,
    borderWidth: 1,
    marginBottom: sizes.marginSize.medium,
    height: 50,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  listContent: {
    paddingBottom: sizes.marginSize.medium,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: sizes.marginSize.large,
  },
});
