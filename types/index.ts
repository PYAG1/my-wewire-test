export interface Wallet {
  id: string;
  name: string;
  currency: string;
  balance: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  description: string;
  amount: string;
  date: string;
}

export interface WalletContextType {
  wallets: Wallet[];
  addWallet: (wallet: Omit<Wallet, "id">) => void;
}
