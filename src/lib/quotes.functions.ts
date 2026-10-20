import { createServerFn } from "@tanstack/react-start";
import { quoteSchema, mapsLinkFor, buildWhatsAppMessage, buildEmailSubject, buildEmailBody, deliveryModeLabels } from "./quote-shared";
import type { QuoteInput, QuoteRecord } from "./quote-shared";

/**
 * Saves a sales lead FIRST, then attempts the Reatech contact submission.
 * Idempotent on `idempotencyKey`: retries/double-clicks return the same
 * reference. Nothing is sent to WhatsApp/email automatically.
 */
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((data: QuoteInput) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) throw new Error("Invalid submission");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const quantityLabel = data.notSureQuantity
      ? "Not sure yet"
      : data.quantity
        ? `${data.quantity} ${data.unit ?? "pieces"}`.trim()
        : undefined;
    const mapsLink = mapsLinkFor(data.lat ?? null, data.lng ?? null, data.locationText);

    let row: { id: string; reference: string; reatech_sync_status: string } | null = null;

    if (data.idempotencyKey) {
      const { data: byKey } = await supabaseAdmin
        .from("quote_requests")
        .select("id, reference, reatech_sync_status")
        .eq("idempotency_key", data.idempotencyKey)
        .maybeSingle();
      row = byKey;
    }

    if (!row) {
      const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
      const { count } = await supabaseAdmin
        .from("quote_requests")
        .select("id", { count: "exact", head: true })
        .eq("phone", data.phone)
        .gte("created_at", since);
      if ((count ?? 0) >= 5) throw new Error("Too many requests. Please contact us directly.");

      const dupSince = new Date(Date.now() - 3 * 60 * 1000).toISOString();
      const { data: existing } = await supabaseAdmin
        .from("quote_requests")
        .select("id, reference, reatech_sync_status")
        .eq("phone", data.phone)
        .eq("product", data.product)
        .eq("location_text", data.locationText)
        .gte("created_at", dupSince)
        .limit(1)
        .maybeSingle();
      row = existing;
    }

    if (!row) {
      const { data: inserted, error } = await supabaseAdmin
        .from("quote_requests")
        .insert({
          idempotency_key: data.idempotencyKey ?? null,
          full_name: data.fullName,
          company: data.company || null,
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
          delivery_mode: data.deliveryMode,
          site_access: data.siteAccess || null,
          offloading_needed: data.offloading || null,
          timeframe: data.timeframe || null,
          notes: data.notes || null,
          source_page: data.sourcePage || null,
          attribution: data.attribution ?? {},
          consent_contact: true,
          consent_marketing: !!data.consentMarketing,
          consent_at: new Date().toISOString(),
          reatech_sync_status: data.email ? "pending" : "skipped_no_email",
        })
        .select("id, reference, reatech_sync_status")
        .single();
      if (error || !inserted) {
        // Unique key race: another request with the same key just won.
        if (data.idempotencyKey) {
          const { data: again } = await supabaseAdmin
            .from("quote_requests")
            .select("id, reference, reatech_sync_status")
            .eq("idempotency_key", data.idempotencyKey)
            .maybeSingle();
          row = again;
        }
        if (!row) throw new Error("Could not save your request");
      } else {
        row = inserted;
      }
    }

    // Lead is saved. Reatech failures never affect the customer's result.
    let syncStatus = row.reatech_sync_status;
    if (syncStatus !== "submitted") {
      try {
        const { syncQuoteToReatech } = await import("./reatech/sync.server");
        syncStatus = await syncQuoteToReatech(row.id, { formToken: data.formToken, tokenIssuedAt: data.tokenIssuedAt });
      } catch {
        console.warn("[reatech] sync threw for a saved quote");
      }
    }

    const record: QuoteRecord = {
      reference: row.reference,
      fullName: data.fullName,
      ...(data.company ? { company: data.company } : {}),
      phone: data.phone,
      ...(data.email ? { email: data.email } : {}),
      product: data.product,
      ...(quantityLabel ? { quantityLabel } : {}),
      locationText: data.locationText,
      ...(mapsLink ? { mapsLink } : {}),
      deliveryMode: deliveryModeLabels[data.deliveryMode],
      ...(data.siteAccess ? { siteAccess: data.siteAccess } : {}),
      ...(data.offloading ? { offloading: data.offloading } : {}),
      ...(data.timeframe ? { timeframe: data.timeframe } : {}),
      ...(data.notes ? { notes: data.notes } : {}),
    };

    return {
      reference: row.reference,
      syncStatus,
      whatsappMessage: buildWhatsAppMessage(record),
      emailSubject: buildEmailSubject(record),
      emailBody: buildEmailBody(record),
    };
  });
