import { beforeEach, describe, expect, it, vi } from "vitest";

const m = vi.hoisted(() => ({ row: null as Record<string, unknown> | null, updates: [] as unknown[], post: vi.fn() }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {
  from: () => {
    const c: Record<string, unknown> = {};
    for (const k of ["select", "eq", "insert"]) c[k] = () => c;
    c["update"] = (v: unknown) => { m.updates.push(v); return c; };
    c["maybeSingle"] = () => Promise.resolve({ data: m.row });
    c["then"] = (r: (v: unknown) => unknown) => Promise.resolve({}).then(r);
    return c;
  },
} }));
vi.mock("./reatech.server", () => ({ isReatechConfigured: () => true, fetchContactToken: vi.fn(), postContact: m.post }));

import { syncQuoteToReatech } from "./sync.server";
import { quoteReceiptMessage } from "@/lib/quote-shared";

const quote = {
  id: "q1", reference: "MID-QR-2026-0018", full_name: "Offline Test", company: "Test Co", phone: "+254 700 000000",
  email: "offline@example.com", product: "Cabro – Zigzag", quantity: "500", unit: "pieces", location_text: "Ruiru",
  maps_link: null, delivery_mode: "delivery", site_access: null, offloading_needed: null, timeframe: null, notes: null,
  preferred_contact: "whatsapp", source_page: "/contact", reatech_sync_status: "pending", reatech_attempts: 0,
};
const token = { formToken: "tok", tokenIssuedAt: Date.now() - 5000 };

beforeEach(() => { m.row = { ...quote }; m.updates.length = 0; m.post.mockReset(); });

describe("Reatech Forms submission (mocked, offline)", () => {
  it("sends the quotation reference in the subject and full details in the message", async () => {
    m.post.mockResolvedValueOnce({ ok: true, status: 201 });
    expect(await syncQuoteToReatech("q1", token)).toBe("submitted");
    const p = m.post.mock.calls[0]![0];
    expect(p.subject).toBe("Quotation Request — MID-QR-2026-0018");
    for (const s of ["Offline Test", "+254 700 000000", "offline@example.com", "Cabro – Zigzag", "500 pieces", "Ruiru"]) expect(p.message).toContain(s);
  });
  it("marks failed (not submitted) when the API rejects", async () => {
    m.post.mockResolvedValueOnce({ ok: false, code: "http_error", status: 422, message: "HTTP 422" });
    expect(await syncQuoteToReatech("q1", token)).toBe("failed");
    expect(m.updates.at(-1)).toMatchObject({ reatech_sync_status: "failed" });
  });
  it("never resubmits an already-submitted quote", async () => {
    m.row = { ...quote, reatech_sync_status: "submitted" };
    expect(await syncQuoteToReatech("q1", token)).toBe("submitted");
    expect(m.post).not.toHaveBeenCalled();
  });
});

describe("visitor receipt wording", () => {
  it("only claims sales-inbox delivery when the Forms API accepted it", () => {
    expect(quoteReceiptMessage("submitted")).toContain("delivered");
    for (const s of ["failed", "pending", "not_configured", "skipped_no_email"]) expect(quoteReceiptMessage(s)).not.toContain("delivered");
  });
});
