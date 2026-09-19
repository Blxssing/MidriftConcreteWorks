import { useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Reveal } from "@/components/site/Reveal";

/** Official Enterprise Tech website — the single destination for every agency link. */
export const AGENCY_NAME = "Enterprise Tech";
export const AGENCY_URL = "https://enterprisetechnologiessolutions.com/";

type Placement = "footer" | "agency_cta" | "menu" | "homepage" | "contact" | "case_study";

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
      className={cn("transition-colors", className)}
    >
      {children}
    </a>
  );
}

/** Animated developer mark shared by the footer, CTA and menu signature. */
export function AgencyDeveloperIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "agency-icon agency-float inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent",
        className,
      )}
      aria-hidden="true"
    >
      <Code2 className="size-5" strokeWidth={1.8} />
    </span>
  );
}

/** The single sitewide developer signature in the lower footer. */
export function AgencyAttribution({ className }: { className?: string }) {
  return (
    <AgencyLink
      placement="footer"
      label={`Digital experience by ${AGENCY_NAME} — opens in a new tab`}
      className={cn(
        "agency-signature group block min-h-11 rounded-2xl border border-transparent p-4 no-underline md:p-5",
        className,
      )}
    >
      <span className="flex items-center gap-4">
        <AgencyDeveloperIcon />
        <span className="min-w-0 flex-1">
          <span className="eyebrow block text-ink-foreground/60">Digital experience by</span>
          <span className="agency-name mt-1 block w-fit font-display text-xl font-semibold text-ink-foreground">
            {AGENCY_NAME}
          </span>
          <span className="mt-1 block text-xs text-ink-foreground/58">Technology • Strategy • Solutions</span>
        </span>
        <span className="agency-arrow inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline-invert text-accent">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </span>
      <span className="mt-4 flex items-center gap-2 pl-[3.75rem] text-[11px] font-bold uppercase tracking-[0.12em] text-ink-foreground/75">
        Explore {AGENCY_NAME}
        <span className="agency-inline-arrow text-accent" aria-hidden="true">→</span>
      </span>
    </AgencyLink>
  );
}

function agencyCopy(pathname: string) {
  if (pathname === "/") {
    return {
      eyebrow: "Digital experience by Enterprise Tech",
      title: "Technology • Strategy • Solutions",
      body: "Technology That Moves Business Forward.",
      placement: "homepage" as const,
    };
  }
  if (pathname.startsWith("/products") || pathname === "/catalogue") {
    return {
      eyebrow: "Digital technology partner",
      title: "Need a digital experience for your products?",
      body: "Build a focused product platform that helps customers discover, decide and enquire.",
      placement: "agency_cta" as const,
    };
  }
  if (pathname.startsWith("/projects")) {
    return {
      eyebrow: "Digital technology partner",
      title: "Want your projects presented this professionally?",
      body: "Turn your work into a clear, credible digital experience.",
      placement: "agency_cta" as const,
    };
  }
  if (pathname === "/about" || pathname === "/team") {
    return {
      eyebrow: "Digital technology partner",
      title: "Build a stronger digital presence for your business.",
      body: "Strategy, design and technology working as one system.",
      placement: "agency_cta" as const,
    };
  }
  if (pathname === "/contact") {
    return {
      eyebrow: "Digital technology partner",
      title: "Ready to build your next digital system?",
      body: "Enterprise Tech creates websites, software and digital systems for growing businesses.",
      placement: "contact" as const,
    };
  }
  return {
    eyebrow: "Digital technology partner",
    title: "Need a digital system like this?",
    body: "Build a website, software or digital system that moves your business forward.",
    placement: "agency_cta" as const,
  };
}

/** Secondary agency CTA rendered once by the shared page shell. */
export function AgencyCTA() {
  const { pathname } = useLocation();
  if (pathname === "/resources/midrift-digital-transformation") return null;
  const copy = agencyCopy(pathname);

  return (
    <section aria-label="Enterprise Tech digital technology partner" className="bg-background px-4 py-10 md:px-10 md:py-14">
      <Reveal className="mx-auto w-full max-w-[1400px]">
        <div className="agency-cta-surface relative isolate overflow-hidden rounded-3xl border border-hairline bg-card px-5 py-8 md:px-10 md:py-10">
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-3xl items-start gap-4 md:gap-6">
              <AgencyDeveloperIcon className="mt-1 size-12 md:size-14" />
              <div className="min-w-0">
                <p className="eyebrow text-muted-foreground">{copy.eyebrow}</p>
                <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {copy.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{copy.body}</p>
              </div>
            </div>
            <AgencyLink
              placement={copy.placement}
              label={`Explore ${AGENCY_NAME} — opens in a new tab`}
              className="agency-cta-button group inline-flex min-h-11 w-fit shrink-0 items-center gap-3 rounded-full border border-foreground/25 bg-foreground px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-background no-underline"
            >
              Explore {AGENCY_NAME}
              <ArrowUpRight className="agency-arrow size-4" aria-hidden="true" />
            </AgencyLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Small developer signature below the mobile menu's primary actions. */
export function AgencyMenuSignature() {
  return (
    <div className="border-t border-hairline pt-4">
      <AgencyLink
        placement="menu"
        label={`Digital experience by ${AGENCY_NAME} — opens in a new tab`}
        className="agency-menu-signature group flex min-h-11 items-center gap-3 rounded-2xl px-3 py-3 no-underline active:scale-[0.98]"
      >
        <AgencyDeveloperIcon className="size-10 rounded-xl" />
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Digital experience by</span>
          <span className="agency-name block w-fit text-sm font-semibold text-foreground">{AGENCY_NAME}</span>
        </span>
        <ArrowUpRight className="agency-arrow size-4 shrink-0 text-accent" aria-hidden="true" />
      </AgencyLink>
    </div>
  );
}