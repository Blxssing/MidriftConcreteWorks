import { FileText } from "lucide-react";
import { useQuote } from "./QuoteProvider";

/** Contact-page entry into the single shared quotation flow (QuoteDialog). */
export function QuoteLauncher() {
  const { openQuote } = useQuote();
  return (
    <div data-cta-zone="quote-form" className="soft-card border border-hairline bg-card p-6 md:p-10">
      <p className="eyebrow">Request a quote</p>
      <h2 className="mt-3 font-display text-2xl tracking-tight">Tell us what you need</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Product, quantity, delivery or collection, site access and how you'd like us to reply. Your request is saved with a
        reference number, then you can send it to our sales team on WhatsApp or by email.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        <li>• Takes about 2 minutes — phone number is enough, email is optional</li>
        <li>• Written quotation with pricing, availability and lead time</li>
        <li>• Downloadable PDF copy of your request</li>
      </ul>
      <button
        type="button"
        onClick={() => openQuote({ sourcePage: "/contact" })}
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:w-auto"
      >
        <FileText className="size-4" aria-hidden="true" /> Start your quote request
      </button>
    </div>
  );
}
