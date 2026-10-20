import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Durable, atomic spacing across worker instances; fail closed on database errors.
export async function claimReatechRequest(): Promise<boolean> {
  const { data, error } = await supabaseAdmin.rpc("claim_reatech_request");
  return !error && data === true;
}