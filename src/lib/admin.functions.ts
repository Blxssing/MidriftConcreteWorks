import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type StaffRole = "admin" | "sales" | "operations";
const statuses = ["new", "contacted", "quotation_sent", "follow_up", "won", "lost"] as const;

async function staffRoles(supabase: { from: (t: "user_roles") => any }, userId: string): Promise<StaffRole[]> {
  // Reads the caller's OWN role rows (RLS: users can read their own roles).
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return ((data ?? []) as { role: string }[])
    .map((r) => r.role)
    .filter((r): r is StaffRole => r === "admin" || r === "sales" || r === "operations");
}

export const getMyStaffRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => ({ roles: await staffRoles(context.supabase, context.userId) }));

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const roles = await staffRoles(context.supabase, context.userId);
    if (roles.includes("admin") || roles.includes("sales")) {
      const { data, error } = await context.supabase
        .from("quote_requests")
        .select(
          "id, reference, created_at, status, full_name, company, phone, email, preferred_contact, product, quantity, unit, location_text, maps_link, delivery_mode, site_access, offloading_needed, timeframe, notes, source_page, consent_marketing, pricing_status, reatech_sync_status, reatech_attempts, reatech_last_error, reatech_last_attempt_at, crm_lead_status",
        )
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw new Error("Could not load leads");
      return { view: "full" as const, roles, leads: data ?? [] };
    }
    if (roles.includes("operations")) {
      // Operations: delivery/fulfilment fields only — no customer contact data.
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("quote_requests")
        .select("id, reference, created_at, status, product, quantity, unit, location_text, maps_link, delivery_mode, site_access, offloading_needed, timeframe")
        .in("status", ["quotation_sent", "follow_up", "won"])
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw new Error("Could not load deliveries");
      return { view: "operations" as const, roles, leads: data ?? [] };
    }
    return { view: "none" as const, roles, leads: [] };
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), status: z.enum(statuses) }).parse(d))
  .handler(async ({ data, context }) => {
    const roles = await staffRoles(context.supabase, context.userId);
    if (!roles.includes("admin") && !roles.includes("sales")) throw new Error("Forbidden");
    const { error } = await context.supabase.from("quote_requests").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error("Could not update");
    return { ok: true };
  });

export const retryReatechSync = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const roles = await staffRoles(context.supabase, context.userId);
    if (!roles.includes("admin") && !roles.includes("sales")) throw new Error("Forbidden");
    const { syncQuoteToReatech } = await import("./reatech/sync.server");
    const status = await syncQuoteToReatech(data.id, { allowServerToken: true });
    return { status };
  });
