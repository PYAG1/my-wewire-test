import { Currency } from "./schemas";

export function getCurrencySymbol(currency: Currency): string {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "$";
  }
}

export function formatCurrency(amount: string, currency: Currency): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol} ${amount}`;
}

export const getCountryCode = (currencyCode: string) => {
  switch (currencyCode) {
    case "USD":
      return "us";
    case "EUR":
      return "eu";
    case "GBP":
      return "gb";
    default:
      return "us";
  }
};
