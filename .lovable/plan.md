# Midrift x Reatech360 Integration Plan

## What exists today (inspected)
- Two quote entry points: `QuoteDialog.tsx` (multi-step popup, used by every "Request a Quote" button via `QuoteProvider`) and `QuoteForm.tsx` on /contact (WhatsApp-only, does NOT save to the database).
- `submitQuoteRequest` server function (`src/lib/quotes.functions.ts`) saves to `quote_requests` first, with a honeypot, a 5-per-15-min phone rate limit and a 3-minute duplicate check, then returns a `MID-QR-YYYY-XXXX` reference plus WhatsApp/email drafts and a PDF.
- Database: `quote_requests` (status enum new → won/lost; admin-only read/update, no public insert), `user_roles` + `has_role()`. Sign-in at /auth (Google/Apple/Microsoft). No admin screen yet.
- No Reatech code, no secrets for it, no `/api` routes.
- Stack note: this is a TanStack Start app. Server work runs in server functions / server routes on the same deployment, not Supabase Edge Functions. The "secure server-side function" you asked for will be built that way — same security outcome (keys stay server-only), and it fits how the project already works.

## Confirmed vs. not confirmed
Implementable now (documented):
- `GET /contact/token`, `POST /contact` with `X-Api-Key` + `X-Reatech-Id: REA000582`.
- Published-content read endpoints (e.g. products) — read-only, optional.

Not assumed / blocked on Reatech:
- Whether a contact submission becomes a CRM lead (and how to query its status/ID).
- Any lead, quotation, invoice, inventory/stock, payment, order or POS endpoint.
- Response shape of `POST /contact` (ID returned? error codes? rate limits?), and whether token fetch must come from the visitor's browser/IP or may come from our server.

## Phase 1 — Secure Reatech contact bridge (now)
- Secrets: `REATECH_API_KEY` (you add it in Settings → Secrets), `REATECH_WORKSPACE_ID=REA000582`, base URL as config.
- `src/lib/reatech/client.server.ts`: tiny server-only HTTP client (headers, timeout, typed errors). Never imported by browser code.
- `src/lib/reatech/contact.functions.ts`:
  - `getContactToken` — server fn the form calls on load; returns `{ token, issuedAt }` only.
  - Token freshness enforced on our side too: reject < 3 s or > 60 min before calling Reatech; auto-refresh token if the form sits open near expiry.
- Mapping of a Midrift quote to the documented contact fields: `name`, `email`, `phone_country_code` (+254 default), `phone_number`, `subject` ("Quotation Request — MID-QR-…"), `company`, `message` (structured text block with product, quantity, delivery, vehicle needs, reference, source), `website` = "" , `form_token`.
- Blocker: `email` is required by Reatech, but many Kenyan buyers only give a phone. Options: make email required in the form, or send to Reatech only when email exists (others stay local + WhatsApp). Needs your decision.

## Phase 2 — Upgraded product quotation flow (now)
Extend the existing `QuoteDialog` (keep the look) and replace the /contact `QuoteForm` with the same flow so both paths save leads.
Steps: Product → Quantity → Delivery → Contact → Review & consent → Status.
- Product (prefilled from product page), quantity + unit / "not sure".
- Delivery: location text + map pin (existing picker), required-by timeframe, new vehicle/delivery needs: delivery vs. self-collection, site access (lorry/tipper OK, small vehicle only, unknown), offloading help needed, preferred delivery window.
- Contact: name, company, phone, email, preferred response channel (WhatsApp/phone/email), preferred staff (existing list).
- Consent checkbox (required): agree to be contacted about this request + privacy note; optional marketing opt-in kept separate.
- Source attribution: page path, product slug, CTA placement, UTM params, referrer, first-touch landing page (stored in sessionStorage).
- Validation: shared Zod schema client + server (update `src/lib/quote-shared.ts`).
- Spam: honeypot, Reatech token timing, existing phone rate limit plus IP-hash rate limit.
- Clear states: saving → saved (reference shown) → "Sent to sales system" / "Saved, syncing" / error with retry + WhatsApp fallback. Existing WhatsApp/email/PDF handoff stays.

## Phase 3 — Reliable delivery, idempotency, event log (now)
Migration (one file):
- `quote_requests` add: `idempotency_key uuid unique`, `company`, `delivery_mode`, `site_access`, `offloading_needed`, `delivery_window`, `consent_contact bool`, `consent_marketing bool`, `consent_at`, `attribution jsonb`, `sync_status` enum (`pending`, `sent`, `failed`, `skipped`), `sync_attempts int`, `last_sync_at`, `external_ref text`.
- New `integration_events`: id, quote_request_id, provider ('reatech_contact', later 'reatech_crm'), operation, request summary (no secrets, PII minimised), http status, outcome, error, created_at. Admin-only RLS + grants.
- Flow: browser generates idempotency key per form session and keeps a draft in localStorage (survives refresh/offline); server upserts on the key (double-click / retry never duplicates) → saves lead first → calls Reatech → records event → updates `sync_status`. Lead is never lost if Reatech fails.
- Retry: server route `src/routes/api/public/reatech-retry.ts` protected by `LOVABLE_CRON_SECRET`, run every 10 min, retries `failed`/`pending` with backoff (max ~6 attempts). Reatech token expiry handled by fetching a fresh token server-side — subject to the Phase 1 blocker.

## Phase 4 — Admin sync status (now)
- `src/routes/_authenticated/admin.leads.tsx` (+ managed `_authenticated/route.tsx`): admin-only list of quote requests with status, sync badge, attempts, last error, "Retry sync" and status change. Access via `has_role(..., 'admin')`; no nav link, reached after sign-in at /auth.
- Needs: which account(s) should be admin.

## Phase 5 — CRM adapter seam (structure now, wiring later)
- `src/lib/integrations/lead-sink.ts`: interface `LeadSink { submit(lead) ; getStatus?(ref) }`.
- `ReatechContactSink` (Phase 1) implemented; `ReatechCrmSink` stub that returns `skipped` until documented. The site and database only talk to the interface, so adding real CRM endpoints later means one new file plus a config switch.
- Optional: read published products from Web Studio to compare with the local catalogue (no automatic overwrite).

## CRM readiness requirements (ask Reatech for)
- Lead: create/update endpoint, dedupe key (phone/email/our reference), lead ID returned, status read, source/owner assignment fields, custom fields for product/quantity/delivery.
- Quotation: create quote for lead, line items (SKU, unit, qty, price), PDF/link, status callback.
- Stock/inventory: per-product availability endpoint or webhook, units, update frequency.
- Invoice/payment: invoice creation, M-Pesa/payment status webhook with signing secret.
- Orders/delivery: order creation from accepted quote, delivery scheduling status.
- General: auth model per endpoint, rate limits, error format, sandbox environment, webhook signing, data-retention/privacy terms.
Until these exist, quotations, stock, invoices, payments and orders stay manual (WhatsApp/PDF as today).

## Blockers / decisions needed
1. `REATECH_API_KEY` value.
2. Email required for Reatech submissions? (affects phone-only leads)
3. Can `/contact/token` be fetched server-side, or must it be tied to the visitor? Response format of `POST /contact`.
4. Admin account email(s).
5. Consent/privacy wording approval (I will draft it; it is invented copy until you confirm).

## Technical file list
- New: `src/lib/reatech/client.server.ts`, `src/lib/reatech/contact.functions.ts`, `src/lib/integrations/lead-sink.ts`, `src/lib/attribution.ts`, `src/routes/api/public/reatech-retry.ts`, `src/routes/_authenticated/route.tsx`, `src/routes/_authenticated/admin.leads.tsx`, `src/lib/quote-shared.test.ts`.
- Edited: `src/lib/quote-shared.ts`, `src/lib/quotes.functions.ts`, `src/components/site/QuoteDialog.tsx`, `src/components/site/QuoteForm.tsx` (becomes wrapper of the shared flow), `src/routes/contact.tsx`.
- Migration: quote_requests columns + sync enum + `integration_events` table, grants, RLS; cron schedule for retry route.
- Tests: token timing (reject < 3 s, > 60 min), idempotent resubmit returns same reference, consent required.
