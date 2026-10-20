# Roadmap — Reatech360 integration

- [x] Shared quote flow (QuoteDialog + /contact) with delivery/vehicle/consent/attribution fields
- [x] Phone-only leads saved, Reatech sync marked skipped (no email)
- [x] Server-only Reatech client (token GET + contact POST, timing rules, no PII logs)
- [x] Migrations: staff roles, sync status, idempotency, integration_events
- [x] Staff area /admin/leads (admin, sales, operations) + manual retry
- [x] No fake pricing — "quotation required"; rules documented in src/lib/pricing.ts
- [x] Tests + build
- [ ] BLOCKED (user): add REATECH_API_KEY in Project Settings → Secrets
- [ ] BLOCKED (user): name the first admin account for one-time bootstrap
- [ ] BLOCKED (Reatech): CRM lead/quote/stock/invoice/payment/order API docs
