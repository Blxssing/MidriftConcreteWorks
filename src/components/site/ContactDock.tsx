import { Phone, MessageCircle, Mail, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { site, whatsappLink, emailLink } from "@/data/site";

const actions = [
  { label: "Call", icon: Phone, href: site.phoneHref, external: false },
  { label: "WhatsApp", icon: MessageCircle, href: whatsappLink(), external: true },
  { label: "Email", icon: Mail, href: emailLink(), external: false },
];

/**
 * iOS-style floating action dock — always-visible sales shortcuts that open
 * the phone dialler, WhatsApp app and mail app directly.
 */
export function ContactDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 print:hidden">
      <div className="ios-glass pointer-events-auto flex items-center gap-1 rounded-[22px] p-1.5">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}
              aria-label={a.label}
              className="flex items-center gap-2 rounded-[16px] px-3.5 py-2.5 text-[12px] font-semibold tracking-tight transition-all duration-300 ease-out hover:bg-foreground/5 active:scale-95"
            >
              <Icon className="size-[18px] text-accent" />
              <span className="hidden sm:inline">{a.label}</span>
            </a>
          );
        })}
        <Link
          to="/contact"
          aria-label="Get a quote"
          className="flex items-center gap-2 rounded-[16px] bg-accent px-4 py-2.5 text-[12px] font-bold tracking-tight text-accent-foreground transition-transform duration-300 ease-out active:scale-95"
        >
          <FileText className="size-[18px]" />
          <span className="hidden sm:inline">Get a Quote</span>
        </Link>
      </div>
    </div>
  );
}
