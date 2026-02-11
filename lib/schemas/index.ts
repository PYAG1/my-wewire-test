import { z } from "zod";

export const CurrencyEnum = z.enum(["USD", "EUR", "GBP"]);
export const AddWalletSchema = z.object({
  name: z.string().min(2, "Wallet name must be at least 2 characters"),
  currency: CurrencyEnum,
});

export type AddWalletFormData = z.infer<typeof AddWalletSchema>;
export type Currency = z.infer<typeof CurrencyEnum>;
