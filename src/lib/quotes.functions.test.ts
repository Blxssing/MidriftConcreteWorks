import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  responses: [] as unknown[],
  insert: vi.fn(),
  sync: vi.fn(),
  tables: vi.fn(),
}));
vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({ inputValidator: (validate: (data: unknown) => unknown) => ({
    handler: (handler: (args: { data: unknown }) => unknown) => (args: { data: unknown }) => handler({ data: validate(args.data) }),
  }) }),
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {
  from: (table: string) => {
    mocks.tables(table);
    const chain: Record<string, unknown> = {};
    for (const method of ["select", "eq", "gte", "limit", "maybeSingle", "single"]) chain[method] = () => chain;
    chain.insert = (value: unknown) => { mocks.insert(value); return chain; };
    chain.then = (resolve: (value: unknown) => unknown) => Promise.resolve(mocks.responses.shift()).then(resolve);
    return chain;
  },
} }));
vi.mock("./reatech/sync.server", () => ({ syncQuoteToReatech: mocks.sync }));

import { submitQuoteRequest } from "./quotes.functions";

const input = {
  fullName: "Offline unit test", phone: "000 000 0000", email: "integration-test@example.com",
  preferredContact: "whatsapp" as const, product: "Cabro", locationText: "TEST ONLY",
  consentContact: true as const,
};
const saved = { id: "offline-row", reference: "MID-QR-TEST", reatech_sync_status: "pending" };

beforeEach(() => {
  vi.clearAllMocks();
  mocks.responses.length = 0;
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
});

describe("local quote save is the success boundary (fully offline)", () => {
  it("returns the saved reference even if the downstream sync throws", async () => {
    mocks.responses.push({ count: 0 }, { data: null }, { data: saved });
    mocks.sync.mockRejectedValueOnce(new Error("provider unavailable"));
    const result = await submitQuoteRequest({ data: input });
    expect(result).toMatchObject({ ok: true, reference: "MID-QR-TEST", syncStatus: "pending" });
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.insert.mock.invocationCallOrder[0]).toBeLessThan(mocks.sync.mock.invocationCallOrder[0] ?? Infinity);
  });
  it("returns success when Reatech reports a failed contact submission", async () => {
    mocks.responses.push({ count: 0 }, { data: null }, { data: saved });
    mocks.sync.mockResolvedValueOnce("failed");
    expect(await submitQuoteRequest({ data: input })).toMatchObject({ ok: true, reference: "MID-QR-TEST", syncStatus: "failed" });
  });
  it("retains phone-only quotes locally without any external sync", async () => {
    mocks.responses.push({ count: 0 }, { data: null }, { data: { ...saved, reatech_sync_status: "skipped_no_email" } });
    expect(await submitQuoteRequest({ data: { ...input, email: "" } })).toMatchObject({ ok: true, syncStatus: "skipped_no_email" });
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.sync).not.toHaveBeenCalled();
  });
  it("does not call Reatech when the insert fails, and logs only a safe code", async () => {
    mocks.responses.push({ count: 0 }, { data: null }, { data: null, error: { code: "42501", message: "private provider detail" } });
    expect(await submitQuoteRequest({ data: input })).toMatchObject({ ok: false, code: "save_failed" });
    expect(mocks.sync).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("[quote] persistence_failure", expect.objectContaining({ stage: "insert", code: "42501" }));
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain("private provider detail");
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(input.email);
  });
  it("fails closed when the abuse-limit read fails", async () => {
    mocks.responses.push({ count: null, error: { code: "08006" } });
    expect(await submitQuoteRequest({ data: input })).toMatchObject({ ok: false, code: "save_failed" });
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.sync).not.toHaveBeenCalled();
  });
  it("refuses a sixth phone request within the existing fifteen-minute window", async () => {
    mocks.responses.push({ count: 5 });
    expect(await submitQuoteRequest({ data: input })).toMatchObject({ ok: false, code: "rate_limited" });
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("returns an existing idempotent receipt without another insert or sync", async () => {
    mocks.responses.push({ data: { ...saved, reatech_sync_status: "submitted" } });
    const result = await submitQuoteRequest({ data: { ...input, idempotencyKey: "00000000-0000-4000-8000-000000000001" } });
    expect(result).toMatchObject({ ok: true, reference: "MID-QR-TEST", syncStatus: "submitted" });
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.sync).not.toHaveBeenCalled();
  });
});