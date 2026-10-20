/**
 * Indicative pricing rules. Intentionally EMPTY: Midrift has not supplied
 * approved prices, so every request shows "quotation required".
 *
 * Future configurable rules (all must be approved by staff before use):
 * - base unit price per product + unit
 * - quantity breaks (e.g. >= 1,000 pieces → lower unit price)
 * - delivery distance bands from the Nakuru yard
 * - vehicle type (tipper / lorry / canter) and offloading surcharge
 * - negotiated or exceptional prices always require staff approval
 */
export type PriceRule = {
  product: string;
  unit: string;
  unitPriceKes: number;
  minQuantity?: number;
  approved: boolean;
};

export const priceRules: PriceRule[] = [];

export type Estimate =
  | { kind: "quotation_required" }
  | { kind: "indicative"; totalKes: number; unitPriceKes: number };

export function estimatePrice(
  product: string,
  unit: string | undefined,
  quantity: number | undefined,
  rules: PriceRule[] = priceRules,
): Estimate {
  if (!quantity || quantity <= 0 || !unit) return { kind: "quotation_required" };
  const rule = rules
    .filter((r) => r.approved && r.product === product && r.unit === unit && quantity >= (r.minQuantity ?? 0))
    .sort((a, b) => (b.minQuantity ?? 0) - (a.minQuantity ?? 0))[0];
  if (!rule) return { kind: "quotation_required" };
  return { kind: "indicative", unitPriceKes: rule.unitPriceKes, totalKes: rule.unitPriceKes * quantity };
}
