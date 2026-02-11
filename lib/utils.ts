import { CurrencyInfo } from "@/types";
import { Currency } from "./schemas";

export const CURRENCY_CONFIG: Record<Currency, CurrencyInfo> = {
  USD: {
    value: "USD",
    label: "US Dollar",
    symbol: "$",
    countryCode: "us",
  },
  EUR: {
    value: "EUR",
    label: "Euro",
    symbol: "€",
    countryCode: "eu",
  },
  GBP: {
    value: "GBP",
    label: "British Pound",
    symbol: "£",
    countryCode: "gb",
  },
};

export const CURRENCY_OPTIONS = Object.values(CURRENCY_CONFIG);

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_CONFIG[currency]?.symbol ?? "$";
}

export function formatCurrency(amount: string, currency: Currency): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol} ${amount}`;
}

export function getCountryCode(currencyCode: string): string {
  return CURRENCY_CONFIG[currencyCode as Currency]?.countryCode ?? "us";
}
