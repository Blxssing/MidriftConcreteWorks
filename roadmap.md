# Roadmap — Reatech360 integration

- [x] Urgent quote failure: inspected live logs/schema/read-only save window; protected saved receipts, isolated analytics, added safe stage/code diagnostics; 26 offline tests pass; preview build OK; dialog opens with RPC blocked; no submissions or publishing
- [ ] BLOCKED (production diagnosis): 12:17 calls have HTTP 200 but no error payload/log and no saved quote; need sanitized browser RPC error or new stage/code diagnostic after approved publication; no live retest authorized

- [x] Correct workspace-specific API address, secure durable rate limiting, and regression tests
- [x] Audit official contact/content endpoints and report redacted response structures in src/lib/reatech/AUDIT.md
- [x] Verify 18 tests, quote dialog opening, and current application build; not published
- [ ] BLOCKED (Reatech): workspace-specific endpoint access returns HTTP 403; token/contact retest needs access resolved
- [ ] BLOCKED (Reatech): official newsletter endpoint paths and subscription payload documentation

- [x] Shared quote flow (QuoteDialog + /contact) with delivery/vehicle/consent/attribution fields
- [x] Phone-only leads saved, Reatech sync marked skipped (no email)
- [x] Server-only Reatech client (token GET + contact POST, timing rules, no PII logs)
- [x] Migrations: staff roles, sync status, idempotency, integration_events
- [x] Staff area /admin/leads (admin, sales, operations) + manual retry
- [x] No fake pricing — "quotation required"; rules documented in src/lib/pricing.ts
- [x] Tests + build
- [x] REATECH_API_KEY configured as a server-only secret
- [x] Update Reatech workspace to REA000595; live token GET returned 200 and controlled contact POST returned 201; CRM creation unverified; not published
- [ ] BLOCKED (user): name the first admin account for one-time bootstrap
- [ ] BLOCKED (Reatech): CRM lead/quote/stock/invoice/payment/order API docs
