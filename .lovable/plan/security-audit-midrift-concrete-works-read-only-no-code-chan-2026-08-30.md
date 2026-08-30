# Security Audit — Midrift Concrete Works (read-only, no code changed)

Scope audited: Next.js 16 App Router site (`app/`, `components/`, `lib/`), leftover Supabase client under `src/integrations/supabase/`, live backend (RLS, policies, grants, lead data), env/secrets, headers, dependencies, third-party links and analytics. Frameworks used: OWASP Top 10:2025, OWASP API Security Top 10:2023, Lovable security practices, AI-generated-app risk patterns.

## Headline result

The deployed site is a **static marketing site with no server functions, no API routes, no database calls, no file uploads and no authentication**. That removes most of the classic attack surface: no service-role usage in app code, no public server functions, no SSRF sinks, no SQL/injection sinks, no `dangerouslySetInnerHTML`, no user-controlled redirects. Dependency scan: no high/critical advisories. Supabase linter and security scanner: no findings.

The real risks are **data governance and a disconnected backend**, plus a stubbed contact form that will become the main attack surface the moment it is wired up.

## Findings

### 1. Live lead database holds real customer PII that no live code uses — HIGH (privacy / data minimisation)
`public.quote_requests` contains 10 rows (28–30 Aug 2026) with names, phone numbers, emails, delivery locations and free-text notes, created by the previous version of the app. The current site never reads or writes it. There is no retention or deletion policy, and no documented owner.
Why it matters: OWASP A02/A09 — retained personal data with no purpose, no lifecycle, and no monitored access path is pure liability under Kenya's Data Protection Act.
Remediation (safest): decide export-then-purge vs. keep. If keeping, add a retention window plus a scheduled purge, and document lawful basis; if not, export the leads to the sales team and delete the rows.

### 2. `.env` is not git-ignored — HIGH (secrets hygiene)
`.gitignore` only ignores `.env*.local`, so `.env` is tracked. It currently holds only PostHog connector values (a PostHog *public* project key, project id, region) — not fatal today, but the pattern guarantees the first real secret added lands in version control.
Remediation: ignore `.env` (keep `.env.example`), and treat any key ever committed as rotated-on-suspicion.

### 3. Contact form is a non-functional stub — HIGH (business logic; will become the top attack surface)
`app/contact/page.tsx` collects name, phone, email, product, quantity, location, date, notes and only calls `setSubmitted(true)`. No submission is sent, stored, or emailed. Every enquiry is silently lost.
When it is connected, it must be built with: server-side Zod validation (length + format on every field), a honeypot plus a per-phone/IP rate limit, no reflection of user input into HTML/emails without escaping, no PII in logs or analytics events, and the write performed by a server route — never by a browser-held privileged key.

### 4. Dead Supabase client that cannot run in this stack — MEDIUM
`src/integrations/supabase/client.ts` reads `import.meta.env.VITE_*`, which Next.js does not define. It is unused, un-imported, and would throw if ever imported. It also drags `@supabase/supabase-js` semantics into a project whose `package.json` does not list it.
Why it matters: dead auth/data code is the classic vibe-coded footgun — a later change imports it and ships a half-configured client.
Remediation: delete `src/integrations/supabase/` unless the backend is being reconnected deliberately.

### 5. Backend RLS is correct but effectively orphaned — MEDIUM (verify before reuse)
`quote_requests` and `user_roles` both have RLS enabled with admin-scoped policies via `has_role()`, and **no table grants exist for `anon` or `authenticated`**, so the Data API cannot reach either table at all. That is safe today, but it also means any future reconnect will fail confusingly and invite a rushed "grant everything" fix.
Remediation: when reconnecting, add narrow grants alongside policies (insert-only for the public write path, admin select), never a blanket grant, and confirm at least one admin exists in `user_roles`.

### 6. Canonical domain mismatch — MEDIUM (brand/phishing + SEO)
`app/layout.tsx` sets `metadataBase` and `openGraph.url` to `https://midrift.co.ke`, and the homepage footer links `hello@midrift.co.ke`, while the live property is `midriftconcreteworks.com`. If that other domain is not controlled by the company, previews and canonical hints point users at third-party space.
Remediation: point all canonical/OG/email references at the domain the business actually owns.

### 7. Security headers are good but incomplete — MEDIUM
`next.config.mjs` sets HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy` and a `Permissions-Policy`. Missing: **Content-Security-Policy** (the main XSS containment control), `frame-ancestors`, `Cross-Origin-Opener-Policy`, and `includeSubDomains`/`preload` on HSTS.
Remediation: add a CSP allowing self, Google Fonts, and the Vercel Analytics endpoint; start in report-only, then enforce. Add `frame-ancestors 'self'` and extend HSTS.

### 8. Third-party link hygiene — LOW
Only one of four `target="_blank"` links carries `rel="noopener"`; the rest use `rel="noreferrer"` alone. Modern browsers imply `noopener`, so this is hardening, not an exploitable hole.
Remediation: standardise on `rel="noopener noreferrer"` in `components/midrift-shell.tsx`, `app/page.tsx`, `app/contact/page.tsx`, `app/resources/page.tsx`.

### 9. Analytics privacy posture — LOW
`@vercel/analytics` loads in production only, which is good. PostHog connector values sit in `.env` but nothing loads PostHog. Keep it that way, and if analytics is expanded, never send phone/email/location values as event properties.

### 10. Items explicitly checked and found clean — INFO
No `dangerouslySetInnerHTML`, no `eval`, no raw HTML injection; no API routes, server actions or webhooks (so no CSRF-writable endpoint and nothing to authorize); no file uploads; no user-controlled `fetch` targets (no SSRF); no redirect helpers taking user input (no open redirect); no secrets in client bundles; `next` 16.3.0 and dependencies show no high/critical advisories; error handling exposes no stack traces because there is no server logic.

## Prioritised remediation plan

1. Git-ignore `.env`; confirm no real secret was ever committed (finding 2).
2. Decide and execute the fate of the 10 stored leads — export/purge plus a retention rule (finding 1).
3. Delete the dead Supabase client, or deliberately reconnect it with grants + policies + an admin user (findings 4, 5).
4. Correct the canonical domain and public email everywhere (finding 6).
5. Ship a Content-Security-Policy (report-only first) and strengthen HSTS (finding 7).
6. Wire the contact form to a real, server-validated, rate-limited endpoint — this is a feature build, and it is where the next audit should focus (finding 3).
7. Tidy `rel="noopener noreferrer"` (finding 8).

## Must fix before production

- `.env` git-ignored.
- Lead PII decision made (purge or documented retention).
- Canonical domain / contact email corrected — users currently see an address the site may not own.
- Either the contact form is connected securely, or the page stops implying an enquiry was received.

No exploit payloads are included; all findings are defensive and reproducible from the files named above.
