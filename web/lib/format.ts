const DEFAULT_CURRENCY = "INR";

const currencySymbols: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

/**
 * Format a price for display. Use across product cards, detail page, and RFQ.
 */
export function formatPrice(
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  options?: { decimals?: number }
): string {
  const decimals = options?.decimals ?? 2;
  const symbol = currencySymbols[currency] ?? currency + " ";
  return `${symbol}${Number(amount).toFixed(decimals)}`;
}
