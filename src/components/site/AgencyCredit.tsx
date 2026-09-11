import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

/** Official Enterprise Tech website — the single destination for every agency link. */
export const AGENCY_NAME = "Enterprise Tech";
export const AGENCY_URL = "https://enterprisetechnologiessolutions.com/";

type Placement = "footer" | "homepage" | "case_study" | "contact";

function onAgencyClick(placement: Placement) {
  track("agency_attribution_click", { placement, agency: AGENCY_NAME });
}

/** Base link: new tab, nofollow, accessible label, existing focus ring. */
export function AgencyLink({
  placement,
  className,
  children,
  label,
}: {
  placement: Placement;
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <a
      href={AGENCY_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={label ?? `${AGENCY_NAME} — opens in a new tab`}
      onClick={() => onAgencyClick(placement)}
      className={cn("underline-offset-4 transition-colors hover:underline", className)}
    >
      {children}
    </a>
  );
}

/** Sitewide one-line footer attribution. */
export function AgencyAttributionLine({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-ink-foreground/55", className)}>
      Website designed &amp; developed by{" "}
      <AgencyLink placement="footer" className="font-semibold text-ink-foreground/80 hover:text-accent">
        {AGENCY_NAME}
      </AgencyLink>
    </p>
  );
}

/** Slightly more prominent technology-partner block for the lower footer. */
export function AgencyPartnerBlock({ className }: { className?: string }) {
  return (
    <div className={cn("border-t border-hairline-invert pt-10", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow text-ink-foreground/60">Digital technology partner</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-foreground/75">
            Digital experience designed and developed by {AGENCY_NAME}.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-foreground/50">
            Websites • Software • AI • Automation • Digital Systems
          </p>
        </div>
        <AgencyLink
          placement="footer"
          label={`Explore ${AGENCY_NAME} — opens in a new tab`}
          className="inline-flex w-fit items-center rounded-full border border-hairline-invert px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-foreground/80 no-underline hover:border-accent hover:text-accent hover:no-underline"
        >
          Explore {AGENCY_NAME} →
        </AgencyLink>
      </div>
    </div>
  );
}

/**
 * Quiet in-page credit used on the homepage and the contact page.
 * Small type, generous whitespace, no card.
 */
export function AgencyCreditStrip({
  placement,
  text = `Digital experience by ${AGENCY_NAME}`,
  cta,
  className,
}: {
  placement: Placement;
  text?: string;
  cta?: string;
  className?: string;
}) {
  return (
    <section aria-label={`${AGENCY_NAME} technology partner credit`} className={cn("py-12 md:py-16", className)}>
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="border-t border-hairline pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{text}</p>
          <AgencyLink
            placement={placement}
            label={`${AGENCY_NAME} — ${cta ?? "visit website"}, opens in a new tab`}
            className="mt-3 inline-block text-sm font-semibold text-foreground hover:text-accent"
          >
            {cta ?? "Technology That Moves Business Forward →"}
          </AgencyLink>
        </div>
      </div>
    </section>
  );
}
