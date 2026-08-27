import { Phone, MessageCircle, Mail, FileText, MapPin, Music2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { site, whatsappLink, emailLink } from "@/data/site";

const tiktok = site.socials.find((s) => s.icon === "tiktok");

const actions = [
  { label: "Call", icon: Phone, href: site.phoneHref, external: false },
  { label: "WhatsApp", icon: MessageCircle, href: whatsappLink(), external: true },
  { label: "Email", icon: Mail, href: emailLink(), external: false },
  { label: "Map", icon: MapPin, href: site.mapsUrl, external: true },
  ...(tiktok ? [{ label: "TikTok", icon: Music2, href: tiktok.href as string, external: true }] : []),
];

/**
 * iOS-style floating action dock — always-visible sales shortcuts that open
 * the phone dialler, WhatsApp app, mail app, Google Maps and TikTok directly.
 */
export function ContactDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 print:hidden">
      <div
        data-cta-zone="floating-dock"
        className="ios-glass pointer-events-auto flex items-center gap-0.5 rounded-[26px] p-1.5"
      >
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={a.label}
              title={a.label}
              className="flex items-center gap-2 rounded-[18px] px-3 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-300 ease-out hover:bg-foreground/5 active:scale-95"
            >
              <Icon className="size-[19px] text-accent" />
              <span className="hidden md:inline">{a.label}</span>
            </a>
          );
        })}
        <Link
          to="/contact"
          aria-label="Get a quote"
          className="ios-cta flex items-center gap-2 rounded-[18px] bg-accent px-4 py-2.5 text-[13px] font-bold tracking-tight text-accent-foreground"
        >
          <FileText className="size-[19px]" />
          <span className="hidden sm:inline">Get a Quote</span>
        </Link>
      </div>
    </div>
  );
}
