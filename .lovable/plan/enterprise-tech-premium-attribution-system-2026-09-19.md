# Enterprise Tech premium attribution system

## Goal
Upgrade the existing agency credit into a polished, secondary signature while preserving Midrift’s design, navigation, SEO, sales actions, forms, and page structure.

## What will change
- Replace the current footer credit and partner block with one reusable premium attribution treatment featuring the Lucide `Code2` icon, agency positioning, animated underline, arrow movement, and a restrained glass/elevation response.
- Add one reusable `AgencyCTA` between page content and the shared footer, so it appears consistently on every major page without editing page metadata or navigation order.
- Adapt the CTA’s short prompt by page type: homepage, products, projects, about, contact, and general pages.
- Add a compact `AgencyMenuSignature` below the mobile menu’s main actions, separated by a subtle divider and excluded from normal navigation items.
- Consolidate all Enterprise Tech links and click tracking through the existing agency-link helper, using the exact agency URL, new-tab behavior, `noopener noreferrer nofollow`, and the requested placement values.
- Remove the older homepage/contact-only credit strips to prevent duplicate agency promotions while retaining the case-study attribution and resources link.

## Visual and motion treatment
- Use only the existing Midrift semantic colors, typography, glass styles, and Lucide library.
- Add lightweight CSS animations for a slow icon float/breathe treatment and subtle surface movement, plus 200–400ms hover/focus interactions.
- Use the existing scroll-reveal component for the shared CTA’s 600–800ms entrance.
- Keep all decorative motion disabled under `prefers-reduced-motion`; links remain fully understandable without animation.
- Maintain 44px minimum practical tap targets, visible keyboard focus, controlled text wrapping, and no horizontal overflow.

## Technical details
- Extend `AgencyCredit.tsx` into focused reusable pieces: developer icon, footer attribution, global CTA, and menu signature.
- Render the global CTA once in the shared page shell immediately before `SiteFooter` and derive copy from the current pathname.
- Insert the menu signature within the existing mobile menu without changing the navigation data or ordering.
- Add narrowly scoped agency animation utilities to `src/styles.css`; no new dependencies.

## Verification
- Check homepage, product, project, contact, resources, and case-study pages at desktop, tablet, mobile, and small-mobile widths.
- Verify exact outbound URL, tracking placement, focus order, reduced-motion behavior, 44px tap areas, text wrapping, and zero horizontal overflow.
- Confirm the mobile menu, quote form, WhatsApp actions, product links, and project links still work.
- Check browser console and page errors after interactions.
