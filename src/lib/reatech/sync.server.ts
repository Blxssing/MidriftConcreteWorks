import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { checkTokenTiming, isReatechEligible, quoteLines, splitPhone, TOKEN_MIN_AGE_MS } from "@/lib/quote-shared";
import { fetchContactToken, isReatechConfigured, postContact } from "./reatech.server";

type SyncStatus = "pending" | "skipped_no_email" | "not_configured" | "submitted" | "failed";

async function logEvent(quoteId: string, operation: string, outcome: string, httpStatus?: number, detail?: string) {
  await supabaseAdmin.from("integration_events").insert({
    quote_request_id: quoteId,
    provider: "reatech_web_contact",
    operation,
    outcome,
    http_status: httpStatus ?? null,
    detail: detail ? detail.slice(0, 300) : null,
  });
}

/**
 * Sends one saved quote request to Reatech's documented POST /contact.
 * A 2xx means "contact API submitted" only — never "CRM lead created".
 * Safe to call repeatedly: already-submitted rows are skipped.
 */
export async function syncQuoteToReatech(
  quoteId: string,
  opts: { formToken?: string | undefined; tokenIssuedAt?: number | undefined; allowServerToken?: boolean } = {},
): Promise<SyncStatus> {
  const { data: q } = await supabaseAdmin.from("quote_requests").select("*").eq("id", quoteId).maybeSingle();
  if (!q) return "failed";
  if (q.reatech_sync_status === "submitted") return "submitted";

  const update = async (status: SyncStatus, error: string | null, ref?: string) => {
    await supabaseAdmin
      .from("quote_requests")
      .update({
        reatech_sync_status: status,
        reatech_last_error: error,
        reatech_last_attempt_at: new Date().toISOString(),
        reatech_attempts: (q.reatech_attempts ?? 0) + (status === "skipped_no_email" ? 0 : 1),
        ...(ref ? { reatech_submission_ref: ref } : {}),
      })
      .eq("id", quoteId);
  };

  if (!isReatechEligible(q.email)) {
    await update("skipped_no_email", null);
    await logEvent(quoteId, "contact_submit", "skipped_no_email");
    return "skipped_no_email";
  }
  if (!isReatechConfigured()) {
    await update("not_configured", "Reatech API key not configured");
    await logEvent(quoteId, "contact_submit", "not_configured");
    return "not_configured";
  }

  let token = opts.formToken;
  let issuedAt = opts.tokenIssuedAt;
  let timing = checkTokenTiming(token ? issuedAt : undefined, Date.now());

  if (timing === "too_early") {
    await update("failed", "Token used under 3 seconds after issue");
    await logEvent(quoteId, "contact_submit", "rejected_token_too_early");
    return "failed";
  }
  if (timing !== "ok") {
    if (!opts.allowServerToken) {
      await update("pending", timing === "expired" ? "Form token expired" : "No form token");
      await logEvent(quoteId, "contact_submit", `pending_token_${timing}`);
      return "pending";
    }
    // Staff retry: fetch a fresh token server-side, then honour the 3 s minimum.
    const t = await fetchContactToken();
    await logEvent(quoteId, "contact_token", t.ok ? "ok" : t.code, t.ok ? undefined : t.status, t.ok ? undefined : t.message);
    if (!t.ok) {
      await update("failed", `Token: ${t.message}`);
      return "failed";
    }
    token = t.token;
    issuedAt = t.issuedAt;
    await new Promise((r) => setTimeout(r, TOKEN_MIN_AGE_MS + 250));
    timing = "ok";
  }

  const phone = splitPhone(q.phone);
  const message = quoteLines({
    reference: q.reference,
    fullName: q.full_name,
    company: q.company ?? undefined,
    phone: q.phone,
    email: q.email ?? undefined,
    product: q.product,
    quantityLabel: q.quantity ? `${q.quantity} ${q.unit ?? ""}`.trim() : undefined,
    locationText: q.location_text,
    mapsLink: q.maps_link ?? undefined,
    deliveryMode: q.delivery_mode ?? undefined,
    siteAccess: q.site_access ?? undefined,
    offloading: q.offloading_needed ?? undefined,
    timeframe: q.timeframe ?? undefined,
    notes: q.notes ?? undefined,
  })
    .concat(["", `Preferred response: ${q.preferred_contact}`, `Source: ${q.source_page ?? "website"}`])
    .join("\n")
    .slice(0, 5000);

  const res = await postContact({
    name: q.full_name,
    email: q.email!,
    message,
    phone_country_code: phone.code,
    phone_number: phone.number,
    subject: `Quotation Request — ${q.reference}`,
    ...(q.company ? { company: q.company } : {}),
    website: "",
    form_token: token!,
  });

  if (res.ok) {
    await update("submitted", null, res.submissionRef);
    await logEvent(quoteId, "contact_submit", "submitted", res.status);
    return "submitted";
  }
  await update("failed", res.message);
  await logEvent(quoteId, "contact_submit", res.code, res.status, res.message);
  return "failed";
}
