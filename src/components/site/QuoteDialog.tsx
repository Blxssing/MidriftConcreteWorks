import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { X, MessageCircle, Mail, MapPin, LocateFixed, Check, Loader2, Phone, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/data/products";
import { site, salesTeam } from "@/data/site";
import { track } from "@/lib/analytics";
import { submitQuoteRequest } from "@/lib/quotes.functions";
import { quoteSchema, timeframes, quantityUnits, mapsLinkFor } from "@/lib/quote-shared";
import type { ContactMethod, QuoteInput } from "@/lib/quote-shared";

const LocationPicker = lazy(() => import("./LocationPicker"));

type Errors = Partial<Record<keyof QuoteInput, string>>;

const field =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent";
const errCls = "border-destructive focus:border-destructive";
const labelCls = "mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground";

const productOptions = categories.flatMap((c) => [c.name, ...c.products.map((p) => p.name)]).concat("Other");

export function QuoteDialog({
  open,
  product,
  sourcePage,
  onClose,
}: {
  open: boolean;
  product?: string | undefined;
  sourcePage?: string | undefined;
  onClose: () => void;
}) {
  const submit = useServerFn(submitQuoteRequest);
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showMap, setShowMap] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [notSureQty, setNotSureQty] = useState(false);
  const [result, setResult] = useState<
    { reference: string; whatsappMessage: string; emailSubject: string; emailBody: string } | null
  >(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredContact: "whatsapp" as ContactMethod,
    product: product ?? "",
    quantity: "",
    unit: "pieces",
    locationText: "",
    timeframe: "",
    notes: "",
    website: "",
  });

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, product: product ?? f.product }));
      track("quote_form_opened", { source_page: sourcePage ?? "unknown", product: product ?? "none" });
      setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("input,select,button")?.focus(), 60);
    }
  }, [open, product, sourcePage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const startedRef = useRef(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("quote_form_started", { source_page: sourcePage ?? "unknown" });
    }
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const mapsLink = useMemo(() => mapsLinkFor(coords?.lat, coords?.lng, form.locationText), [coords, form.locationText]);

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      toast.error("Location isn't available on this device — please type it instead.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setShowMap(true);
        track("location_selected", { method: "device" });
        toast.success("Location selected ✓");
      },
      () => toast.error("We couldn't get your location. Please enter it manually."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;

    const payload: QuoteInput = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      preferredContact: form.preferredContact,
      product: form.product,
      quantity: notSureQty ? "" : form.quantity,
      unit: form.unit,
      notSureQuantity: notSureQty,
      locationText: form.locationText,
      ...(coords ? { lat: coords.lat, lng: coords.lng } : {}),
      timeframe: form.timeframe,
      notes: form.notes,
      sourcePage: sourcePage ?? "unknown",
      website: form.website,
    };

    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof QuoteInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setSending(true);
    try {
      const res = await submit({ data: parsed.data });
      setResult(res);
      track("quote_form_submitted", {
        source_page: sourcePage ?? "unknown",
        product: form.product,
        contact_method: form.preferredContact,
        has_coordinates: !!coords,
        timeframe: form.timeframe || "unspecified",
      });
    } catch {
      toast.error("We couldn't submit your request right now. Please try again.");
    } finally {
      setSending(false);
    }
  }

  /** Closes the dialog and returns the visitor to the home page. */
  function finish() {
    setResult(null);
    onClose();
    void navigate({ to: "/" });
  }

  if (!open) return null;

  const waHrefFor = (number: string) =>
    result ? `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(result.whatsappMessage)}` : "#";
  const mailHref = result
    ? `mailto:${site.email}?subject=${encodeURIComponent(result.emailSubject)}&body=${encodeURIComponent(
        result.emailBody.replace(/\r?\n/g, "\r\n"),
      )}`
    : "#";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 print:hidden">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-dialog-title"
        data-cta-zone="quote-dialog"
        className="ios-glass relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-[28px] bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[88dvh] sm:rounded-[28px] sm:p-6 md:p-9"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => (result ? finish() : onClose())}
            aria-label="Return to the website"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Return
          </button>
          <button
            type="button"
            onClick={() => { setResult(null); onClose(); }}
            aria-label="Close the quote request form"
            className="flex size-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>


        {result ? (
          <div>
            <div className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check className="size-6" aria-hidden="true" />
            </div>
            <h2 id="quote-dialog-title" className="mt-5 font-display text-2xl tracking-tight">
              Request Received ✓
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Thank you. Your quotation request has been successfully received.
            </p>
            <p className="mt-4 rounded-2xl border border-hairline bg-background px-4 py-3 font-mono text-sm">
              Reference: <strong>{result.reference}</strong>
            </p>
            <p className="mt-5 text-sm font-semibold">
              Choose the salesperson you'd like to send your quotation to:
            </p>
            <div className="mt-4 grid gap-2.5">
              {salesTeam.map((rep) => (
                <a
                  key={rep.whatsapp}
                  href={waHrefFor(rep.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    track("whatsapp_sales_clicked", { stage: "success", rep: rep.name });
                    finish();
                  }}
                  className="wa-btn flex min-h-12 items-center justify-between gap-3 rounded-full px-5 py-3.5 text-left text-[14px] font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
                    {rep.name}
                    <span className="text-[12px] font-medium opacity-80">· {rep.role}</span>
                  </span>
                  <span className="text-[12px] font-semibold opacity-90">{rep.phone}</span>
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3">
              <a
                href={mailHref}
                onClick={() => {
                  track("email_sales_clicked", { stage: "success" });
                  finish();
                }}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-hairline px-6 py-4 text-center text-[14px] font-bold tracking-tight transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="size-5" aria-hidden="true" />
                Continue to Email to send the quotation
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-5 py-3 text-[13px] font-semibold hover:border-accent hover:text-accent"
              >
                <Phone className="size-4" aria-hidden="true" /> {site.phone}
              </a>
              <button
                type="button"
                onClick={finish}
                className="inline-flex min-h-11 items-center rounded-full px-5 py-3 text-[13px] font-semibold text-muted-foreground hover:text-foreground"
              >
                Return to home page
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <p className="eyebrow">Sales</p>
            <h2 id="quote-dialog-title" className="mt-3 font-display text-2xl tracking-tight">
              Request a Quote
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Share a few details about your project and our sales team will get back to you with pricing, availability
              and delivery.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="qd-name">Full name *</label>
                <input id="qd-name" className={`${field} ${errors.fullName ? errCls : ""}`} value={form.fullName} onChange={set("fullName")} aria-invalid={!!errors.fullName} autoComplete="name" />
                {errors.fullName && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.fullName}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="qd-phone">Phone *</label>
                <input id="qd-phone" type="tel" inputMode="tel" placeholder="07XX XXX XXX" className={`${field} ${errors.phone ? errCls : ""}`} value={form.phone} onChange={set("phone")} aria-invalid={!!errors.phone} autoComplete="tel" />
                {errors.phone && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="qd-email">Email (optional)</label>
                <input id="qd-email" type="email" className={`${field} ${errors.email ? errCls : ""}`} value={form.email} onChange={set("email")} autoComplete="email" />
                {errors.email && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="qd-contact">Preferred contact method</label>
                <select id="qd-contact" className={field} value={form.preferredContact} onChange={set("preferredContact")}>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone call</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="qd-product">Product interested in *</label>
                <select id="qd-product" className={`${field} ${errors.product ? errCls : ""}`} value={form.product} onChange={set("product")} aria-invalid={!!errors.product}>
                  <option value="">Select a product</option>
                  {productOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.product && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.product}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="qd-qty">Estimated quantity</label>
                <div className="flex gap-2">
                  <input id="qd-qty" inputMode="decimal" placeholder="e.g. 500" disabled={notSureQty} className={`${field} ${errors.quantity ? errCls : ""}`} value={form.quantity} onChange={set("quantity")} />
                  <select aria-label="Quantity unit" disabled={notSureQty} className={`${field} w-44`} value={form.unit} onChange={set("unit")}>
                    {quantityUnits.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <label className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="size-4 accent-[var(--accent-raw,#e2571f)]" checked={notSureQty} onChange={(e) => setNotSureQty(e.target.checked)} />
                  I'm not sure yet
                </label>
                {errors.quantity && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.quantity}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="qd-loc">Where should we deliver / where is your project? *</label>
                <input id="qd-loc" className={`${field} ${errors.locationText ? errCls : ""}`} placeholder="Town, estate or site name" value={form.locationText} onChange={set("locationText")} aria-invalid={!!errors.locationText} />
                {errors.locationText && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.locationText}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => { setShowMap((s) => !s); track("quote_cta_clicked", { action: "open_map" }); }} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-[13px] font-semibold hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <MapPin className="size-4" aria-hidden="true" /> {showMap ? "Hide map" : "Select location on map"}
                  </button>
                  <button type="button" onClick={useMyLocation} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-[13px] font-semibold hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <LocateFixed className="size-4" aria-hidden="true" /> Use my current location
                  </button>
                </div>
                {showMap && (
                  <div className="mt-3">
                    <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-concrete" />}>
                      <LocationPicker value={coords} onPick={(c) => { setCoords(c); track("location_selected", { method: "map" }); }} />
                    </Suspense>
                  </div>
                )}
                {coords && (
                  <p className="mt-2 text-xs font-medium text-accent">
                    Location selected ✓ —{" "}
                    <a href={mapsLink} target="_blank" rel="noreferrer" className="underline">
                      view on Google Maps
                    </a>
                  </p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  We use your location only to help our sales team understand your delivery / project location. Typing it
                  manually is always enough.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="qd-when">When do you need the products?</label>
                <select id="qd-when" className={field} value={form.timeframe} onChange={set("timeframe")}>
                  <option value="">Select a timeframe</option>
                  {timeframes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="qd-notes">Tell us about your project (optional)</label>
                <textarea id="qd-notes" rows={3} className={`${field} ${errors.notes ? errCls : ""}`} placeholder="Optional — briefly tell us what you need, your project requirements, or any questions you have." value={form.notes} onChange={set("notes")} />

                {errors.notes && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.notes}</p>}
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                value={form.website}
                onChange={set("website")}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:opacity-60"
            >
              {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {sending ? "Sending…" : "Send Quote"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pressing “Send Quote” saves your request, then you choose which salesperson to send it to on WhatsApp — or continue by email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
