import type { Attribution } from "./quote-shared";

const KEY = "midrift:first-touch";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Records first-touch landing page, referrer and UTM params once per session. */
export function captureFirstTouch() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Record<string, string> = {
      landingPage: window.location.pathname.slice(0, 200),
      referrer: document.referrer.slice(0, 300),
    };
    for (const k of UTM) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 150);
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function getAttribution(extra: { page?: string; product?: string; cta?: string }): Attribution {
  let first: Record<string, string> = {};
  try {
    first = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  } catch {
    /* ignore */
  }
  const out: Attribution = { ...first };
  if (extra.page) out.page = extra.page.slice(0, 200);
  if (extra.product) out.product = extra.product.slice(0, 120);
  if (extra.cta) out.cta = extra.cta.slice(0, 80);
  return out;
}
