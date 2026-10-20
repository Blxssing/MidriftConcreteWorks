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
- Reatech360 calls live only in `src/lib/reatech/*.server.ts` and use only documented Web Studio endpoints (GET /contact/token, POST /contact); keys stay server-side.
- Quote leads are saved to `quote_requests` before any external sync; sync outcome is tracked separately from CRM-lead confirmation so a later CRM adapter can be added without changing the form.
- Staff permissions come from `user_roles` (admin, sales, operations) checked inside server functions; operations views never select customer contact columns.
- All quote entry points open the single shared `QuoteDialog` flow.
