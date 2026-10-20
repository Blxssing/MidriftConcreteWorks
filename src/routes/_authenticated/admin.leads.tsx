import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, RefreshCw, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Container, Section } from "@/components/site/primitives";
import { listLeads, retryReatechSync, updateLeadStatus } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [
      { title: "Leads & Quote Requests | Midrift Staff" },
      { name: "description", content: "Staff-only view of Midrift quotation requests and sync status." },
      { property: "og:title", content: "Leads & Quote Requests | Midrift Staff" },
      { property: "og:description", content: "Staff-only view of Midrift quotation requests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadsPage,
});

const statuses = ["new", "contacted", "quotation_sent", "follow_up", "won", "lost"] as const;

const syncLabel: Record<string, string> = {
  pending: "Pending",
  skipped_no_email: "Skipped — no email",
  not_configured: "Reatech not configured",
  submitted: "Contact API submitted",
  failed: "Failed",
};

function LeadsPage() {
  const fetchLeads = useServerFn(listLeads);
  const setStatus = useServerFn(updateLeadStatus);
  const retry = useServerFn(retryReatechSync);
  const qc = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const q = useQuery({ queryKey: ["admin-leads"], queryFn: () => fetchLeads() });

  if (q.isLoading)
    return (
      <Section>
        <Container>
          <Loader2 className="size-6 animate-spin" aria-label="Loading" />
        </Container>
      </Section>
    );

  if (q.isError || !q.data || q.data.view === "none")
    return (
      <Section>
        <Container>
          <div className="soft-card mx-auto max-w-lg border border-hairline bg-card p-8 text-center">
            <ShieldAlert className="mx-auto size-8 text-accent" aria-hidden="true" />
            <h1 className="mt-4 font-display text-2xl">Staff access required</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your account doesn't have a staff role yet. Ask the Midrift administrator to grant you access.
            </p>
          </div>
        </Container>
      </Section>
    );

  const { view, leads, roles } = q.data;
  const full = view === "full";

  async function onStatus(id: string, status: (typeof statuses)[number]) {
    setBusy(id);
    try {
      await setStatus({ data: { id, status } });
      await qc.invalidateQueries({ queryKey: ["admin-leads"] });
      toast.success("Status updated");
    } catch {
      toast.error("Couldn't update status");
    } finally {
      setBusy(null);
    }
  }

  async function onRetry(id: string) {
    setBusy(id);
    try {
      const r = await retry({ data: { id } });
      toast.message(`Reatech: ${syncLabel[r.status] ?? r.status}`);
      await qc.invalidateQueries({ queryKey: ["admin-leads"] });
    } catch {
      toast.error("Retry failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <Section>
      <Container>
        <p className="eyebrow">Staff · {roles.join(", ")}</p>
        <h1 className="mt-3 font-display text-3xl tracking-tight">{full ? "Leads & quote requests" : "Deliveries & fulfilment"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {full
            ? "“Contact API submitted” means Reatech accepted the web contact form. It does not confirm a CRM lead was created."
            : "Delivery details for quoted and won orders. Customer contact details are handled by sales."}
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-concrete text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="p-3">Reference</th>
                {full && <th className="p-3">Customer</th>}
                <th className="p-3">Product / qty</th>
                <th className="p-3">Delivery</th>
                <th className="p-3">Status</th>
                {full && <th className="p-3">Reatech</th>}
              </tr>
            </thead>
            <tbody>
              {leads.map((l: any) => (
                <tr key={l.id} className="border-t border-hairline align-top">
                  <td className="p-3 font-mono text-xs">
                    {l.reference}
                    <div className="mt-1 text-muted-foreground">{new Date(l.created_at).toLocaleString()}</div>
                  </td>
                  {full && (
                    <td className="p-3">
                      <div className="font-semibold">{l.full_name}</div>
                      {l.company && <div className="text-xs">{l.company}</div>}
                      <div className="text-xs">{l.phone}</div>
                      {l.email && <div className="text-xs">{l.email}</div>}
                      <div className="text-xs text-muted-foreground">Prefers {l.preferred_contact}</div>
                    </td>
                  )}
                  <td className="p-3">
                    {l.product}
                    <div className="text-xs text-muted-foreground">{l.quantity ? `${l.quantity} ${l.unit ?? ""}` : "Qty not given"}</div>
                    {full && <div className="text-xs text-muted-foreground">Price: quotation required</div>}
                  </td>
                  <td className="p-3 text-xs">
                    <div>{l.delivery_mode === "collection" ? "Collection" : "Delivery"}</div>
                    <div>{l.location_text}</div>
                    {l.maps_link && (
                      <a href={l.maps_link} target="_blank" rel="noreferrer" className="text-accent underline">
                        Map
                      </a>
                    )}
                    {l.site_access && <div className="text-muted-foreground">{l.site_access}</div>}
                    {l.offloading_needed && <div className="text-muted-foreground">{l.offloading_needed}</div>}
                    {l.timeframe && <div className="text-muted-foreground">{l.timeframe}</div>}
                  </td>
                  <td className="p-3">
                    {full ? (
                      <select
                        aria-label={`Status for ${l.reference}`}
                        className="rounded-xl border border-input bg-background px-2 py-1.5 text-xs"
                        value={l.status}
                        disabled={busy === l.id}
                        onChange={(e) => onStatus(l.id, e.target.value as (typeof statuses)[number])}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs">{l.status.replace("_", " ")}</span>
                    )}
                  </td>
                  {full && (
                    <td className="p-3 text-xs">
                      <div className="font-semibold">{syncLabel[l.reatech_sync_status] ?? l.reatech_sync_status}</div>
                      <div className="text-muted-foreground">CRM lead: {l.crm_lead_status === "confirmed" ? "confirmed" : "not confirmed"}</div>
                      {l.reatech_attempts > 0 && <div className="text-muted-foreground">Attempts: {l.reatech_attempts}</div>}
                      {l.reatech_last_error && <div className="text-destructive">{l.reatech_last_error}</div>}
                      {["failed", "pending", "not_configured"].includes(l.reatech_sync_status) && (
                        <button
                          type="button"
                          onClick={() => onRetry(l.id)}
                          disabled={busy === l.id}
                          className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 font-semibold hover:border-accent hover:text-accent"
                        >
                          <RefreshCw className="size-3.5" aria-hidden="true" /> Retry
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-muted-foreground" colSpan={6}>
                    No requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
