import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

/**
 * Sticky, high-contrast WhatsApp button. Sits above the contact dock on every
 * page so a sales conversation is always one tap away.
 */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      data-cta-zone="whatsapp-fab"
      aria-label="Talk to sales on WhatsApp — opens a pre-filled WhatsApp chat"
      className="wa-btn wa-halo fixed bottom-24 right-4 z-50 flex min-h-12 min-w-12 items-center gap-2.5 rounded-full px-4 py-3.5 text-[14px] font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background print:hidden md:bottom-28 md:right-8 md:px-5"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="hidden sm:inline">Talk to Sales</span>
    </a>
  );
}
