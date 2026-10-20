# Roadmap — Reatech360 integration (first production increment)

- [ ] Shared quote flow (QuoteDialog + /contact) with delivery/vehicle/consent/attribution fields
- [ ] Phone-only leads saved, Reatech sync marked skipped (pending email)
- [ ] Server-only Reatech client: GET /contact/token, POST /contact, timing rules, no PII logs
- [ ] Migration: quote_requests columns, idempotency, sync status, integration_events, roles sales/operations
- [ ] Admin area /admin/leads with role-based views (admin, sales, operations) + manual retry
- [ ] No fake pricing — "quotation required"; document future pricing rules
- [ ] Tests for rules; build check
- [ ] BLOCKED (user): add REATECH_API_KEY in Project Settings → Secrets
- [ ] BLOCKED (user): first admin bootstrap
