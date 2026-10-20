import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchContactToken, postContact } from "./reatech.server";

vi.mock("./rate-limit.server", () => ({ claimReatechRequest: vi.fn().mockResolvedValue(true) }));
import { claimReatechRequest } from "./rate-limit.server";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.mocked(claimReatechRequest).mockResolvedValue(true);
});

describe("Reatech workspace authentication", () => {
  it("uses REA000595 and the server secret together on both documented endpoints", async () => {
    vi.stubEnv("REATECH_API_KEY", "test-only-credential");
    vi.stubEnv("REATECH_WORKSPACE_ID", "");
    vi.stubEnv("REATECH_API_BASE_URL", "");
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({ form_token: "test-form-token" }))
      .mockResolvedValueOnce(Response.json({ id: "test-contact-ref" }, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    const token = await fetchContactToken();
    expect(token.ok).toBe(true);
    const result = await postContact({ name: "Integration Test", email: "integration-test@example.com", message: "Controlled test", website: "", form_token: "test-form-token" });
    expect(result).toEqual({ ok: true, status: 201, submissionRef: "test-contact-ref" });
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      "https://midrift-concrete-works-2.reatech360.com/api/web/contact/token",
      "https://midrift-concrete-works-2.reatech360.com/api/web/contact",
    ]);
    for (const [, options] of fetchMock.mock.calls) {
      expect(options.headers["X-Reatech-Id"]).toBe("REA000595");
      expect(options.headers["X-Api-Key"]).toBe("test-only-credential");
      expect(options.redirect).toBe("error");
    }
  });

  it("never propagates provider error text that may echo credentials", async () => {
    vi.stubEnv("REATECH_API_KEY", "test-only-credential");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ message: "test-only-credential" }, { status: 401 })));
    expect(await fetchContactToken()).toEqual({ ok: false, code: "http_error", status: 401, message: "HTTP 401" });
  });

  it("does not send requests when the durable rate limiter denies capacity", async () => {
    vi.stubEnv("REATECH_API_KEY", "test-only-credential");
    vi.mocked(claimReatechRequest).mockResolvedValue(false);
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await fetchContactToken()).toMatchObject({ ok: false, code: "rate_limited" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects phone-only contacts and nonempty honeypots before making any request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const payload = { name: "Test", email: "", message: "Test submission", website: "" as const, form_token: "test-token" };
    expect(await postContact(payload)).toMatchObject({ ok: false, code: "invalid_payload" });
    expect(await postContact({ ...payload, email: "test@example.com", website: "spam" as "" })).toMatchObject({ ok: false, code: "invalid_payload" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("ignores stale destination overrides to keep credentials on the verified workspace", async () => {
    vi.stubEnv("REATECH_API_KEY", "test-only-credential");
    vi.stubEnv("REATECH_WORKSPACE_ID", "REA000582");
    vi.stubEnv("REATECH_API_BASE_URL", "https://example.com");
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ form_token: "test-token" }));
    vi.stubGlobal("fetch", fetchMock);
    await fetchContactToken();
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://midrift-concrete-works-2.reatech360.com/api/web/contact/token");
    expect(fetchMock.mock.calls[0]?.[1].headers["X-Reatech-Id"]).toBe("REA000595");
  });
});