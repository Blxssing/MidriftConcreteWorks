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

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
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
  locationText: z.string().trim().min(2, "Tell us where to deliver").max(160, "Location is too long"),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  timeframe: z.string().trim().max(40).optional(),
  notes: z.union([z.string().trim().max(1000, "Please keep details under 1000 characters"), z.literal("")]).optional(),
  sourcePage: z.string().trim().max(120).optional(),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

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
  phone: string;
  email?: string | undefined;
  product: string;
  quantityLabel?: string | undefined;
  locationText: string;
  mapsLink?: string | undefined;
  timeframe?: string | undefined;
  notes?: string | undefined;
};

function lines(r: QuoteRecord) {
  const out: string[] = [];
  out.push(`Request ID: ${r.reference}`, "", `Customer: ${r.fullName}`, `Phone: ${r.phone}`);
  if (r.email) out.push(`Email: ${r.email}`);
  out.push("", "Product:", r.product);
  if (r.quantityLabel) out.push("", "Quantity:", r.quantityLabel);
  out.push("", "Project / Delivery Location:", r.locationText);
  if (r.mapsLink) out.push("", "Google Maps Location:", r.mapsLink);
  if (r.timeframe) out.push("", "Required timeframe:", r.timeframe);
  if (r.notes) out.push("", "Additional details:", r.notes);
  out.push("", "Please assist me with the quotation, availability and delivery details.");
  return out;
}

/** WhatsApp draft — never sent automatically, the customer presses send. */
export function buildWhatsAppMessage(r: QuoteRecord) {
  return [
    "Hello Midrift Concrete Works 👋",
    "",
    "I'd like to request a quotation.",
    "",
    ...lines(r),
    "",
    "Thank you.",
  ].join("\n");
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
    ...lines(r),
    "",
    "Kind regards,",
    r.fullName,
  ].join("\n");
}
