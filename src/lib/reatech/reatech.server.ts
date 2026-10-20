/**
 * Server-only client for the DOCUMENTED Reatech360 Web Studio contact API.
 * Only GET /contact/token and POST /contact are implemented. No CRM, quote,
 * invoice, inventory, payment or POS endpoints exist here on purpose.
 *
 * Never log request bodies (they contain PII) or the API key.
 */
const DEFAULT_BASE = "https://enterprise-technologies.reatech360.com/api/web";
const DEFAULT_WORKSPACE = "REA000582";
const TIMEOUT_MS = 10_000;

export type ReatechError = { ok: false; code: "not_configured" | "http_error" | "network_error" | "bad_response"; status?: number; message: string };

function config() {
  const apiKey = process.env["REATECH_API_KEY"];
  const workspace = process.env["REATECH_WORKSPACE_ID"] || DEFAULT_WORKSPACE;
  const base = (process.env["REATECH_API_BASE_URL"] || DEFAULT_BASE).replace(/\/$/, "");
  return { apiKey, workspace, base };
}

export function isReatechConfigured() {
  return !!config().apiKey;
}

async function call(path: string, init: RequestInit): Promise<{ ok: true; status: number; body: unknown } | ReatechError> {
  const { apiKey, workspace, base } = config();
  if (!apiKey) return { ok: false, code: "not_configured", message: "Reatech API key is not configured" };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${base}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        "X-Api-Key": apiKey,
        "X-Reatech-Id": workspace,
      },
    });
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    if (!res.ok) {
      const msg =
        body && typeof body === "object" && "message" in body && typeof (body as { message: unknown }).message === "string"
          ? String((body as { message: string }).message).slice(0, 200)
          : `HTTP ${res.status}`;
      return { ok: false, code: "http_error", status: res.status, message: msg };
    }
    return { ok: true, status: res.status, body };
  } catch (e) {
    return { ok: false, code: "network_error", message: e instanceof Error && e.name === "AbortError" ? "Request timed out" : "Network error" };
  } finally {
    clearTimeout(timer);
  }
}

/** Finds a token string in an unverified response shape. */
function pickToken(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const candidates = [b["form_token"], b["token"], (b["data"] as Record<string, unknown> | undefined)?.["form_token"], (b["data"] as Record<string, unknown> | undefined)?.["token"]];
  return candidates.find((c): c is string => typeof c === "string" && c.length > 0);
}

export async function fetchContactToken(): Promise<{ ok: true; token: string; issuedAt: number } | ReatechError> {
  const res = await call("/contact/token", { method: "GET" });
  if (!res.ok) return res;
  const token = pickToken(res.body);
  if (!token) return { ok: false, code: "bad_response", status: res.status, message: "Token not found in response" };
  return { ok: true, token, issuedAt: Date.now() };
}

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  phone_country_code?: string;
  phone_number?: string;
  subject?: string;
  company?: string;
  website: "";
  form_token: string;
};

export async function postContact(payload: ContactPayload): Promise<{ ok: true; status: number; submissionRef?: string } | ReatechError> {
  const res = await call("/contact", { method: "POST", body: JSON.stringify(payload) });
  if (!res.ok) return res;
  // Response shape is not documented; keep any id it returns as an opaque ref.
  let submissionRef: string | undefined;
  if (res.body && typeof res.body === "object") {
    const b = res.body as Record<string, unknown>;
    const d = (b["data"] ?? {}) as Record<string, unknown>;
    const id = b["id"] ?? b["reference"] ?? d["id"] ?? d["reference"];
    if (typeof id === "string" || typeof id === "number") submissionRef = String(id).slice(0, 100);
  }
  return { ok: true, status: res.status, ...(submissionRef ? { submissionRef } : {}) };
}
