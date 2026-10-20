import { createServerFn } from "@tanstack/react-start";

/**
 * Called when the quote form opens. Fetches a Reatech form token server-side
 * (the API key never reaches the browser). Unverified with Reatech: whether
 * tokens may be fetched server-side — failures are returned, not thrown, so
 * the quote form always keeps working.
 */
export const getReatechFormToken = createServerFn({ method: "POST" }).handler(async () => {
  const { fetchContactToken, isReatechConfigured } = await import("./reatech.server");
  if (!isReatechConfigured()) return { status: "not_configured" as const };
  const t = await fetchContactToken();
  if (!t.ok) {
    console.warn("[reatech] token fetch failed", t.code, t.status ?? "");
    return { status: "unavailable" as const };
  }
  return { status: "ok" as const, token: t.token, issuedAt: t.issuedAt };
});
