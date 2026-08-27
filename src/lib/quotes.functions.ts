import { createServerFn } from "@tanstack/react-start";
import { quoteSchema, mapsLinkFor, buildWhatsAppMessage, buildEmailSubject, buildEmailBody } from "./quote-shared";
import type { QuoteInput, QuoteRecord } from "./quote-shared";

/**
 * Saves a sales lead FIRST, then returns the reference plus the pre-filled
 * WhatsApp / email drafts. Nothing is ever sent automatically.
 */
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((data: QuoteInput) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot — silently reject bots without saving.
    if (data.website) throw new Error("Invalid submission");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const quantityLabel =
      data.notSureQuantity || !data.quantity
        ? data.notSureQuantity
          ? "Not sure yet"
          : undefined
        : `${data.quantity} ${data.unit ?? "pieces"}`.trim();

    const mapsLink = mapsLinkFor(data.lat ?? null, data.lng ?? null, data.locationText);

    // Rate limit: max 5 requests per phone number in 15 minutes.
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("phone", data.phone)
      .gte("created_at", since);
    if ((count ?? 0) >= 5) throw new Error("Too many requests. Please contact us directly.");

    // Duplicate protection: reuse an identical request from the last 3 minutes.
    const dupSince = new Date(Date.now() - 3 * 60 * 1000).toISOString();
    const { data: existing } = await supabaseAdmin
      .from("quote_requests")
      .select("reference")
      .eq("phone", data.phone)
      .eq("product", data.product)
      .eq("location_text", data.locationText)
      .gte("created_at", dupSince)
      .limit(1)
      .maybeSingle();

    let reference = existing?.reference;

    if (!reference) {
      const { data: inserted, error } = await supabaseAdmin
        .from("quote_requests")
        .insert({
          full_name: data.fullName,
          phone: data.phone,
          email: data.email || null,
          preferred_contact: data.preferredContact,
          product: data.product,
          quantity: data.notSureQuantity ? null : data.quantity || null,
          unit: data.notSureQuantity ? null : data.unit || null,
          location_text: data.locationText,
          location_lat: data.lat ?? null,
          location_lng: data.lng ?? null,
          maps_link: mapsLink ?? null,
          timeframe: data.timeframe || null,
          notes: data.notes || null,
          source_page: data.sourcePage || null,
        })
        .select("reference")
        .single();

      if (error || !inserted) throw new Error("Could not save your request");
      reference = inserted.reference;
    }

    const record: QuoteRecord = {
      reference,
      fullName: data.fullName,
      phone: data.phone,
      ...(data.email ? { email: data.email } : {}),
      product: data.product,
      ...(quantityLabel ? { quantityLabel } : {}),
      locationText: data.locationText,
      ...(mapsLink ? { mapsLink } : {}),
      ...(data.timeframe ? { timeframe: data.timeframe } : {}),
      ...(data.notes ? { notes: data.notes } : {}),
    };

    return {
      reference,
      whatsappMessage: buildWhatsAppMessage(record),
      emailSubject: buildEmailSubject(record),
      emailBody: buildEmailBody(record),
    };
  });
