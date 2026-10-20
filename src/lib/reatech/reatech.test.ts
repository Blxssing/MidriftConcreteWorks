import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchContactToken, postContact } from "./reatech.server";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
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
      "https://enterprise-technologies.reatech360.com/api/web/contact/token",
      "https://enterprise-technologies.reatech360.com/api/web/contact",
    ]);
    for (const [, options] of fetchMock.mock.calls) {
      expect(options.headers["X-Reatech-Id"]).toBe("REA000595");
      expect(options.headers["X-Api-Key"]).toBe("test-only-credential");
    }
  });

  it("never propagates provider error text that may echo credentials", async () => {
    vi.stubEnv("REATECH_API_KEY", "test-only-credential");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ message: "test-only-credential" }, { status: 401 })));
    expect(await fetchContactToken()).toEqual({ ok: false, code: "http_error", status: 401, message: "HTTP 401" });
  });
});