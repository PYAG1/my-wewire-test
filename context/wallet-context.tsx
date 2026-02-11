import { MOCK_TRANSACTIONS, MOCK_WALLETS } from "@/constants/data";
import { Transaction, Wallet, WalletContextType } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallets, setWallets] = useState<Wallet[]>(MOCK_WALLETS);
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);

  const addWallet = useCallback((wallet: Omit<Wallet, "id">) => {
    const newWallet: Wallet = {
      ...wallet,
      id: Date.now().toString(),
    };
    setWallets((prev) => [...prev, newWallet]);
    return newWallet.id;
  }, []);

  const value = useMemo(
    () => ({
      wallets,
      transactions,
      addWallet,
    }),
    [wallets, transactions, addWallet],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallets(): WalletContextType {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallets must be used within a WalletProvider");
  }

  return context;
}
