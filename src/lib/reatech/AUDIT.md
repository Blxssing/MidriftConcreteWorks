# Official Web Studio audit — 20 October 2026

## Configuration and security
- Verified destination: `https://midrift-concrete-works-2.reatech360.com/api/web`, workspace `REA000595`.
- Credentials remain in server-only `REATECH_API_KEY`, sent with `X-Api-Key` and `X-Reatech-Id`. Stale destination overrides are ignored; redirects are refused.
- Every application outbound request requires an atomic database claim, spaced by at least one second across all worker instances (at most 60 requests per minute). Capacity denial/database failures fail closed. This controls this website's requests only; other applications sharing the key need coordinated limits.
- Rate limiter migration: `drizzle/migrations/0003_reatech_outbound_rate_limit.sql`. Internal table has RLS, service-role-only grants, and restricted RPC execution. No customer rows or previous migrations deleted.
- Required email, empty honeypot and form token validated before contact POST. Shared quote timing retains >=3 seconds and <=1 hour, and phone-only enquiries remain locally saved without external submission.

## Live results
All requests used the workspace-specific host and both authentication headers. Audit requests were spaced at least 1.15 seconds apart, did not follow redirects, and retained no raw bodies or personal data.

| Endpoint | Actual HTTP result |
| --- | --- |
| GET /contact/token | 403 |
| GET /contact/country-codes | 403 |
| GET /products | 403 |
| GET /blog | 403 |
| GET /team | 403 |
| GET /testimonial | 403 |
| GET /faq | 403 |
| GET /pages | 403 |
| GET /client-logos | 403 |
| GET /portfolio | 403 |
| GET /career | 403 |
| POST /contact | Not attempted: token retrieval failed |

No endpoint succeeded. Token response was a JSON error object with string fields `type`, `title`, `detail`, `instance`, `error_name`, `error_category`, `ray_id`, `timestamp`, `zone`, `what_you_should_do`, `footer`; numeric fields `status`, `error_code`; boolean fields `cloudflare_error`, `retryable`, `owner_action_required`. Other GETs returned JSON error objects, not content records. Values have deliberately been omitted. These results do not establish whether the API key is accepted by the upstream application; Reatech must diagnose the workspace access/edge rejection.

## Capability boundaries and blockers
- Request Reatech to resolve HTTP 403 for this exact workspace host and permit server-side API access; then rerun token and a clearly labelled controlled contact submission.
- Newsletter token/subscription paths, methods, payload and timing rules were not included in the uploaded document. No guessed requests were made.
- Content response fields, pagination, filters and actual records remain unverified; current catalogue and site sections were not replaced.
- CRM lead confirmation/quotation/order/inventory/invoice/payment/POS need official endpoint schemas, authentication scopes, sandbox/access, idempotency, error/rate-limit rules, and signed webhook documentation. A contact success must never imply CRM confirmation.
- Owner account identification is still needed for the existing guarded one-time admin bootstrap; existing staff permissions remain unchanged.

## Verification
- 18 automated tests passed: workspace/header isolation, redirect refusal, stale override protection, capacity failures, required email/honeypot, phone-only persistence eligibility, token boundaries, consent and pricing rules.
- Latest automatic application build: OK.
- Contact-page quotation dialog opened normally; no browser runtime errors. No new quote/contact data was submitted during this audit. Full save/retry flow was not rerun; existing quote persistence was not modified.
- Required route metadata gaps were filled without visual changes.
- Nothing published or deployed.

## Later CRM-readiness review — 20 October 2026

See `CRM_READINESS.md` for the documentation-only investigation, vendor request,
and approval gates. Later historical token/contact tests returned 200/201 and the
user confirmed MID-QR-2026-0018 in Forms; the 403 results above are the earlier
audit, not a current access diagnosis. No supported customer search/create or
Forms-to-Customers automation contract was accessible. No live requests or
application changes were made during the CRM-readiness review; 26 offline tests
passed. CRM Customers creation remains blocked and unconfirmed.