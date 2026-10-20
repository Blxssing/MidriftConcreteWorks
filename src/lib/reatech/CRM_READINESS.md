# CRM Customers integration readiness — 20 October 2026

## Decision

Blocked by missing vendor documentation/access. Do not add a CRM endpoint,
payload, webhook receiver, guessed customer matching logic, or success status.
This review changed documentation only. Existing local quotes, MID-QR references,
Forms sync, WhatsApp/email/PDF handoffs, duplicate protection, and unpublished
save-failure diagnostics remain unchanged.

## Supported evidence

- Both supplied `We_now_have_the_official_Web_Studio_API_pasted*.md` files were
  readable through `/tmp/user-uploads`. Lines 5–17 specify workspace REA000595,
  `https://midrift-concrete-works-2.reatech360.com/api/web`, the server-only
  `REATECH_API_KEY`, and both required authentication headers.
- Their lines 32–46 document contact token/country-code/contact endpoints,
  required email and token protections, and explicitly distinguish contact
  acceptance from CRM confirmation. Lines 69–74 require additional CRM docs.
  Neither file defines customer search/create, matching, permissions,
  idempotency, Forms-to-Customers automation, or a CRM webhook contract.
- `reatech.server.ts` implements only token GET and contact POST. Its pinned
  destination, redirect refusal, server-only key and durable request claims
  remain intact. `sync.server.ts` explicitly treats contact acceptance as Forms
  submission, not customer creation.
- `quotes.functions.ts` saves first and preserves a successful receipt when
  optional sync fails. Local idempotency/duplicate checks do not establish
  CRM-side duplicate guarantees. Existing CRM confirmation is separate from
  Forms sync; no customer-search/create adapter is present.
- Accessible workspace connections include no Reatech connection for reading
  account automation settings. No authenticated Reatech settings access was
  established. The existing secret alone does not document CRM permissions.
- Public research found the official homepage, <https://reatech360.com/>, which
  describes CRM/customer capabilities but provides no discovered integration
  contract for this task. Marketing is not endpoint documentation. Private
  account-only capabilities may exist; native automation is unverified, not
  ruled out.
- Earlier recorded tests returned token HTTP 200 and contact HTTP 201; the user
  reported MID-QR-2026-0018 visible in Web Studio Forms. These are historical
  evidence, not new tests or proof of a CRM Customers record. The earlier 403
  audit is historical and does not establish current access failure.

## Smallest supported next step

Send Reatech support this request:

> For Midrift workspace REA000595, please confirm and document a supported
> Web Studio Forms → CRM Customers automation that preserves the Forms entry,
> matches or creates a customer using normalized email/phone, and retains the
> website MID-QR reference where supported. If available, provide its setup
> steps, permissions, match/conflict rules, duplicate/retry behavior, phone-only
> support, and a way to confirm the resulting customer ID. Do not enable or
> backfill it until we approve any record changes or notifications.
>
> If native automation is unavailable, provide the official customer search and
> create/upsert API contract: exact tenant-specific URL/methods, authentication
> and whether our existing Web Studio key has the required scopes, required
> fields, response/customer ID schema, normalization and ambiguous-match rules,
> idempotency/concurrency guarantees, reference-link fields, rate limits,
> retry/error rules, notification side effects, and sandbox access. For a
> webhook alternative, include event payload, delivery/retry rules, signature
> verification and replay protection, and the supported customer-write method.

No new credential is requested unless the vendor documents that one is needed;
any required credential must be configured through secure project secrets.

## Implementation and verification gates

Only after an exact supported contract is supplied: approve a focused plan,
implement server-only customer matching with ambiguity protection and documented
idempotency, and retain local-save success independently of CRM failure. Record
CRM outcomes/retryability separately from Forms outcomes; only store confirmed
customer IDs, and use MID-QR as the visitor's safe support reference. If native
automation handles this instead, website code may be unnecessary, but customer
confirmation still needs documented evidence.

Offline contract tests should cover normalized email/phone, phone-only requests,
multiple-match conflicts, concurrent retries, preserved Forms submission and
local receipts on CRM failure, and no secret/PII logging. After explicit approval,
use the vendor sandbox first; approve one controlled website-form test separately
if sandbox verification is unavailable. Confirm local quote, Forms entry and
customer ID independently through documented reads or an authorized account
user. Do not trigger WhatsApp/email or publish without separate approval.

## Checks performed in this review

- All 26 existing offline tests passed across quote rules, saved receipts,
  documented Reatech authentication and durable request capacity; persistence,
  external sync and HTTP calls in those tests are mocked.
- Existing preview `/contact` returned HTTP 200; no form was opened/submitted.
- Existing route metadata coverage was inspected. No application source changed,
  no manual build/typecheck ran, and the mounted automatic build log was absent;
  HTTP 200 is not a fresh full-build result.
- No Reatech API calls, quote submissions, production record writes, migrations,
  messages, secrets exposure, or publishing/deployment occurred.