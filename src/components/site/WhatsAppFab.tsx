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
      aria-label="Chat with Midrift sales on WhatsApp"
      className="wa-btn wa-halo fixed bottom-24 right-4 z-50 flex items-center gap-2.5 rounded-full px-4 py-3.5 text-[14px] font-bold tracking-tight print:hidden md:bottom-28 md:right-8 md:px-5"
    >
      <MessageCircle className="size-6" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
