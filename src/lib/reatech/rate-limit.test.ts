import { afterEach, expect, it, vi } from "vitest";
const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc } }));
import { claimReatechRequest } from "./rate-limit.server";
afterEach(() => vi.clearAllMocks());

it("allows outbound calls only when the durable limiter grants capacity", async () => {
  rpc.mockResolvedValueOnce({ data: true, error: null });
  expect(await claimReatechRequest()).toBe(true);
  expect(rpc).toHaveBeenCalledWith("claim_reatech_request");
  rpc.mockResolvedValueOnce({ data: false, error: null });
  expect(await claimReatechRequest()).toBe(false);
});

it("fails closed if the durable rate limit database is unavailable", async () => {
  rpc.mockResolvedValueOnce({ data: null, error: { message: "unavailable" } });
  expect(await claimReatechRequest()).toBe(false);
});