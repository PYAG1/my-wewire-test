import { Transaction, Wallet } from "@/types";

export const MOCK_WALLETS: Wallet[] = [
  {
    id: "1",
    name: "Main Wallet",
    currency: "USD",
    balance: "1250.00",
  },
  {
    id: "2",
    name: "Savings",
    currency: "EUR",
    balance: "3400.50",
  },
  {
    id: "3",
    name: "Travel",
    currency: "GBP",
    balance: "580.25",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    walletId: "1",
    description: "Coffee shop",
    amount: "-12.50",
    date: "2025-02-08",
  },
  {
    id: "t2",
    walletId: "1",
    description: "Salary",
    amount: "2500.00",
    date: "2025-02-01",
  },
  {
    id: "t3",
    walletId: "2",
    description: "Transfer in",
    amount: "500.00",
    date: "2025-02-07",
  },
  {
    id: "t4",
    walletId: "2",
    description: "Utility bill",
    amount: "-85.20",
    date: "2025-02-05",
  },
  {
    id: "t5",
    walletId: "3",
    description: "Hotel booking",
    amount: "-120.00",
    date: "2025-02-06",
  },
];
