import { z } from "zod";

/** Product options shown in the sales form (verified Midrift families + sub-products). */
export const timeframes = [
  "As soon as possible",
  "Within 1 week",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "Just planning",
  "Not sure yet",
] as const;

export const quantityUnits = ["pieces", "square metres", "metres", "cubic metres", "units", "pallets", "trips / loads"] as const;

export const contactMethods = ["whatsapp", "phone", "email"] as const;
export type ContactMethod = (typeof contactMethods)[number];

export const deliveryModes = ["delivery", "collection"] as const;
export const deliveryModeLabels: Record<(typeof deliveryModes)[number], string> = {
  delivery: "Deliver to my site",
  collection: "I will collect from the yard",
};

export const siteAccessOptions = [
  "Large lorry / tipper can reach the site",
  "Only small vehicles (pickup / canter) can reach",
  "Restricted access — please call me",
  "Not sure",
] as const;

export const offloadingOptions = ["Yes, we need offloading help", "No, we will offload", "Not sure"] as const;

/** Token timing rules from the Reatech Web Studio contact API docs. */
export const TOKEN_MIN_AGE_MS = 3_000;
export const TOKEN_MAX_AGE_MS = 60 * 60 * 1000;

export type TokenTiming = "ok" | "too_early" | "expired" | "missing";
export function checkTokenTiming(issuedAt: number | undefined, now: number): TokenTiming {
  if (!issuedAt || !Number.isFinite(issuedAt)) return "missing";
  const age = now - issuedAt;
  if (age < TOKEN_MIN_AGE_MS) return "too_early";
  if (age > TOKEN_MAX_AGE_MS) return "expired";
  return "ok";
}

/** Reatech's documented contact endpoint requires an email address. */
export function isReatechEligible(email: string | null | undefined) {
  return !!email && z.string().email().safeParse(email).success;
}

/** Splits a Kenyan phone into Reatech's phone_country_code + phone_number. */
export function splitPhone(raw: string): { code: string; number: string } {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+254")) return { code: "+254", number: digits.slice(4) };
  if (digits.startsWith("254")) return { code: "+254", number: digits.slice(3) };
  if (digits.startsWith("0")) return { code: "+254", number: digits.slice(1) };
  if (digits.startsWith("+")) return { code: "", number: digits };
  return { code: "+254", number: digits };
}

const optText = (max: number) => z.union([z.string().trim().max(max), z.literal("")]).optional();

export const attributionSchema = z
  .object({
    page: optText(200),
    product: optText(120),
    cta: optText(80),
    referrer: optText(300),
    landingPage: optText(200),
    utm_source: optText(100),
    utm_medium: optText(100),
    utm_campaign: optText(150),
    utm_term: optText(150),
    utm_content: optText(150),
  })
  .partial();
export type Attribution = z.infer<typeof attributionSchema>;

export const quoteSchema = z.object({
  idempotencyKey: z.string().uuid().optional(),
  fullName: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  company: optText(100),
  phone: z
    .string()
    .trim()
    .min(9, "Enter a valid phone number")
    .max(20, "Enter a valid phone number")
    .regex(/^[0-9+()\s-]+$/, "Phone can only contain digits, spaces, + ( ) -"),
  email: z.union([z.string().trim().email("Enter a valid email address").max(150), z.literal("")]).optional(),
  preferredContact: z.enum(contactMethods),
  product: z.string().trim().min(2, "Select the product you need").max(120),
  quantity: z
    .union([z.string().trim().max(20, "Quantity is too long").regex(/^[0-9.,]*$/, "Quantity must be a number"), z.literal("")])
    .optional(),
  unit: z.string().trim().max(30).optional(),
  notSureQuantity: z.boolean().optional(),
  deliveryMode: z.enum(deliveryModes).default("delivery"),
  siteAccess: z.union([z.enum(siteAccessOptions), z.literal("")]).optional(),
  offloading: z.union([z.enum(offloadingOptions), z.literal("")]).optional(),
  locationText: z.string().trim().min(2, "Tell us where to deliver").max(160, "Location is too long"),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  timeframe: z.string().trim().max(40).optional(),
  notes: z.union([z.string().trim().max(1000, "Please keep details under 1000 characters"), z.literal("")]).optional(),
  sourcePage: z.string().trim().max(120).optional(),
  attribution: attributionSchema.optional(),
  consentContact: z.literal(true, {
    errorMap: () => ({ message: "Please agree so our team can contact you about this request" }),
  }),
  consentMarketing: z.boolean().optional(),
  /** Reatech form token issued when the form opened (never the API key). */
  formToken: z.string().max(2000).optional(),
  tokenIssuedAt: z.number().optional(),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteParsed = z.output<typeof quoteSchema>;

export function mapsLinkFor(lat?: number | null, lng?: number | null, text?: string | null) {
  if (typeof lat === "number" && typeof lng === "number") {
    return `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
  }
  if (text) return `https://www.google.com/maps?q=${encodeURIComponent(text)}`;
  return undefined;
}

export type QuoteRecord = {
  reference: string;
  fullName: string;
  company?: string | undefined;
  phone: string;
  email?: string | undefined;
  product: string;
  quantityLabel?: string | undefined;
  locationText: string;
  mapsLink?: string | undefined;
  deliveryMode?: string | undefined;
  siteAccess?: string | undefined;
  offloading?: string | undefined;
  timeframe?: string | undefined;
  notes?: string | undefined;
};

export function quoteLines(r: QuoteRecord) {
  const out: string[] = [];
  out.push(`Request ID: ${r.reference}`, "", `Customer: ${r.fullName}`);
  if (r.company) out.push(`Company: ${r.company}`);
  out.push(`Phone: ${r.phone}`);
  if (r.email) out.push(`Email: ${r.email}`);
  out.push("", "Product:", r.product);
  if (r.quantityLabel) out.push("", "Quantity:", r.quantityLabel);
  if (r.deliveryMode) out.push("", "Delivery / collection:", r.deliveryMode);
  out.push("", "Project / Delivery Location:", r.locationText);
  if (r.mapsLink) out.push("", "Google Maps Location:", r.mapsLink);
  if (r.siteAccess) out.push("", "Site access:", r.siteAccess);
  if (r.offloading) out.push("", "Offloading:", r.offloading);
  if (r.timeframe) out.push("", "Required timeframe:", r.timeframe);
  if (r.notes) out.push("", "Additional details:", r.notes);
  out.push("", "Please assist me with the quotation, availability and delivery details.");
  return out;
}

/** WhatsApp draft — never sent automatically, the customer presses send. */
export function buildWhatsAppMessage(r: QuoteRecord) {
  return ["Hello Midrift Concrete Works 👋", "", "I'd like to request a quotation.", "", ...quoteLines(r), "", "Thank you."].join("\n");
}

/**
 * Visitor-facing status. Only "submitted" (Forms API accepted with 2xx)
 * may claim the request reached the sales inbox in Reatech360.
 */
export function quoteReceiptMessage(syncStatus: string) {
  if (syncStatus === "submitted") {
    return "Your quotation request has been saved and delivered to our sales team's inbox.";
  }
  if (syncStatus === "skipped_no_email") {
    return "Your quotation request has been saved on our website. As no email was provided, please also send it to a salesperson below so they can follow up quickly.";
  }
  return "Your quotation request has been saved on our website, but we couldn't confirm delivery to our sales inbox yet. Our team will still see it — to be safe, please also send it to a salesperson below.";
}

export function buildEmailSubject(r: QuoteRecord) {
  return `Quotation Request — ${r.reference}`;
}

export function buildEmailBody(r: QuoteRecord) {
  return [
    "Hello Midrift Concrete Works Team,",
    "",
    "I would like to request a quotation.",
    "",
    ...quoteLines(r),
    "",
    "Kind regards,",
    r.fullName,
  ].join("\n");
}
