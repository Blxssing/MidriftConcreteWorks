import { Phone, MessageCircle, Mail, FileText, MapPin, Music2 } from "lucide-react";
import { site } from "@/data/site";
import { useQuote } from "./QuoteProvider";

const tiktok = site.socials.find((s) => s.icon === "tiktok");

const actions = [
  { label: "Call", title: "Call sales now", icon: Phone, href: site.phoneHref, external: false },
  { label: "Map", title: "Open our yard in Google Maps", icon: MapPin, href: site.mapsUrl, external: true },
  ...(tiktok
    ? [{ label: "TikTok", title: "Watch Midrift on TikTok", icon: Music2, href: tiktok.href as string, external: true }]
    : []),
];

/**
 * iOS-style floating action dock — always-visible sales shortcuts that open
 * the phone dialler, WhatsApp app, mail app, Google Maps and TikTok directly.
 */
export function ContactDock() {
  const { openQuote } = useQuote();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 print:hidden">
      <div
        data-cta-zone="floating-dock"
        className="liquid-glass pointer-events-auto flex items-center gap-0.5 rounded-[26px] p-1.5"
      >
        {[
          { label: "WhatsApp", title: "Talk to sales on WhatsApp", icon: MessageCircle },
          { label: "Email", title: "Email sales", icon: Mail },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              type="button"
              onClick={() => openQuote({})}
              aria-label={a.title}
              title={a.title}
              className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[18px] px-3 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-300 ease-out hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            >
              <Icon className="size-[19px] text-accent" aria-hidden="true" />
              <span className="hidden md:inline">{a.label}</span>
            </button>
          );
        })}
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={a.title}
              title={a.title}
              className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[18px] px-3 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-300 ease-out hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            >
              <Icon className="size-[19px] text-accent" aria-hidden="true" />
              <span className="hidden md:inline">{a.label}</span>
            </a>
          );
        })}
        <button
          type="button"
          onClick={() => openQuote({})}
          aria-label="Get a quote from Midrift sales"
          className="ios-cta flex min-h-11 items-center gap-2 rounded-[18px] bg-accent px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground text-[13px] font-bold tracking-tight text-accent-foreground"
        >
          <FileText className="size-[19px]" aria-hidden="true" />
          <span className="hidden sm:inline">Get a Quote</span>
        </button>
      </div>
    </div>
  );
}
