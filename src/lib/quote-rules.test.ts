import { describe, expect, it } from "vitest";
import { checkTokenTiming, isReatechEligible, quoteSchema, splitPhone } from "./quote-shared";
import { estimatePrice } from "./pricing";

const base = {
  fullName: "Jane Doe",
  phone: "0712345678",
  preferredContact: "whatsapp" as const,
  product: "Cabro",
  locationText: "Nakuru",
  consentContact: true as const,
};

describe("quote rules", () => {
  it("rejects a Reatech token used under 3 seconds after issue", () => {
    expect(checkTokenTiming(1_000_000, 1_002_999)).toBe("too_early");
  });
  it("accepts a token at 3 seconds", () => {
    expect(checkTokenTiming(1_000_000, 1_003_000)).toBe("ok");
  });
  it("rejects a token older than 1 hour", () => {
    expect(checkTokenTiming(1_000, 1_000 + 60 * 60 * 1000 + 1)).toBe("expired");
  });
  it("accepts a token exactly one hour old", () => {
    expect(checkTokenTiming(1_000, 1_000 + 60 * 60 * 1000)).toBe("ok");
  });
  it("phone-only enquiries are not sent to Reatech", () => {
    expect(isReatechEligible("")).toBe(false);
    expect(isReatechEligible(null)).toBe(false);
    expect(isReatechEligible("a@b.co")).toBe(true);
  });
  it("phone-only enquiry is valid", () => {
    expect(quoteSchema.safeParse(base).success).toBe(true);
  });
  it("contact consent is required", () => {
    expect(quoteSchema.safeParse({ ...base, consentContact: false }).success).toBe(false);
  });
  it("honeypot must be empty", () => {
    expect(quoteSchema.safeParse({ ...base, website: "x" }).success).toBe(false);
  });
  it("splits Kenyan numbers", () => {
    expect(splitPhone("0791 502 707")).toEqual({ code: "+254", number: "791502707" });
    expect(splitPhone("+254791502707")).toEqual({ code: "+254", number: "791502707" });
  });
  it("no configured prices means quotation required", () => {
    expect(estimatePrice("Cabro", "square metres", 100)).toEqual({ kind: "quotation_required" });
  });
  it("unapproved price rules are never shown", () => {
    expect(
      estimatePrice("Cabro", "pieces", 10, [{ product: "Cabro", unit: "pieces", unitPriceKes: 50, approved: false }]),
    ).toEqual({ kind: "quotation_required" });
  });
});
