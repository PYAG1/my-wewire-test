import { Currency } from "@/lib/schemas";

export interface Wallet {
  id: string;
  name: string;
  currency: Currency;
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

export interface WalletCardProps {
  title: string;
  amount: string;
  fullWidth?: boolean;
  currency?: string;
}
