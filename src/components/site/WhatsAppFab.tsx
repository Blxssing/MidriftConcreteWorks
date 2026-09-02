import { MessageCircle } from "lucide-react";
import { useQuote } from "./QuoteProvider";

/**
 * Sticky, high-contrast WhatsApp button. Opens the centralized quote form so
 * sales always receives a structured request.
 */
export function WhatsAppFab() {
  const { openQuote } = useQuote();
  return (
    <button
      type="button"
      onClick={() => openQuote({})}
      data-cta-zone="whatsapp-fab"
      aria-label="Talk to sales on WhatsApp — opens the quote request form"
      className="wa-btn wa-halo fixed bottom-24 right-4 z-50 flex min-h-12 min-w-12 items-center gap-2.5 rounded-full px-4 py-3.5 text-[14px] font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background print:hidden md:bottom-28 md:right-8 md:px-5"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="hidden sm:inline">Talk to Sales</span>
    </button>
  );
}
