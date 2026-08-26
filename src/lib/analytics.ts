/**
 * Lightweight, provider-agnostic conversion tracking.
 *
 * Events are sent to whichever providers are configured (Google Analytics or
 * PostHog via connector env vars), always pushed to `window.dataLayer`, and
 * counted locally so conversions can be inspected even before a provider is
 * connected (`window.midriftConversions()` in the browser console).
 */

export type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: TrackProps) => void };
    midriftConversions?: () => Record<string, number>;
  }
}

const COUNTS_KEY = "midrift:conversions";

function bumpLocalCount(event: string) {
  try {
    const raw = localStorage.getItem(COUNTS_KEY);
    const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
    counts[event] = (counts[event] ?? 0) + 1;
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
  } catch {
    /* storage unavailable — ignore */
  }
}

/** Record a conversion / interaction event. Safe to call during SSR (no-op). */
export function track(event: string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  const payload = { ...props, page_path: window.location.pathname };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  window.gtag?.("event", event, payload);
  window.posthog?.capture(event, payload);
  bumpLocalCount(event);
}

/** Classify an outbound link into a conversion channel. */
export function channelFor(href: string): "whatsapp" | "phone" | "email" | "catalog" | null {
  if (!href) return null;
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("wa.me/c/")) return "catalog";
  if (href.includes("wa.me") || href.includes("api.whatsapp.com")) return "whatsapp";
  return null;
}

let started = false;

/**
 * Boots analytics: loads GA/PostHog when configured and auto-captures every
 * WhatsApp / phone / email click anywhere on the site via event delegation.
 */
export function initAnalytics() {
  if (typeof window === "undefined" || started) return;
  started = true;

  const gaId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as string | undefined;
  if (gaId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }

  const phKey = import.meta.env["VITE_LOVABLE_CONNECTOR_POSTHOG_API_KEY"] as string | undefined;
  if (phKey) {
    const region = (import.meta.env["VITE_LOVABLE_CONNECTOR_POSTHOG_REGION"] as string) || "eu";
    const host = region === "us" ? "https://us.i.posthog.com" : "https://eu.i.posthog.com";
    import("posthog-js")
      .then((m) => {
        m.default.init(phKey, { api_host: host, capture_pageview: false });
        window.posthog = m.default;
      })
      .catch(() => undefined);
  }

  document.addEventListener(
    "click",
    (e) => {
      const el = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      const channel = channelFor(href);
      if (!channel) return;
      track(`contact_${channel}_click`, {
        channel,
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 60),
        location: el.closest("[data-cta-zone]")?.getAttribute("data-cta-zone") ?? "page",
      });
    },
    { capture: true },
  );

  window.midriftConversions = () => {
    try {
      return JSON.parse(localStorage.getItem(COUNTS_KEY) || "{}");
    } catch {
      return {};
    }
  };
}

/** Page view for client-side route changes. */
export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", { page_path: path });
  window.posthog?.capture("$pageview", { path });
}
