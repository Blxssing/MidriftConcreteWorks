<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Reatech360 calls live only in `src/lib/reatech/*.server.ts`, pin the verified workspace destination, refuse redirects, and use only documented Web Studio endpoints; keys stay server-side to prevent accidental credential forwarding.
- Every application Reatech request claims durable database capacity with atomic one-second spacing and fails closed, so parallel worker instances respect the per-key rate limit without in-memory counters.
- Quote leads are saved to `quote_requests` before any external sync; sync outcome is tracked separately from CRM-lead confirmation so a later CRM adapter can be added without changing the form.
- Staff permissions come from `user_roles` (admin, sales, operations) checked inside server functions; operations views never select customer contact columns.
- All quote entry points open the single shared `QuoteDialog` flow.
- Offline quote handler regressions use `vitest.quotes.config.ts` with mocked persistence and Reatech, because Start's normal transform replaces handlers with RPC stubs; no test may submit to a live service.
- Quote failures log only correlation IDs, fixed stages and sanitized database codes; optional sync and client analytics must not invalidate a saved receipt, so diagnostics never expose customer data.
