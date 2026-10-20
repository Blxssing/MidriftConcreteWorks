# Roadmap — Reatech360 integration

- [ ] Correct workspace-specific API address, secure rate limiting, and regression tests
- [ ] Audit official contact/content endpoints and report redacted response structures; newsletter paths require documentation
- [ ] Verify tests and current application build; do not publish

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
