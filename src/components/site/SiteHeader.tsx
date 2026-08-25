import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";
import { mainNav, site, whatsappLink, emailLink } from "@/data/site";
import { Wordmark, WordmarkBadge } from "@/components/site/Wordmark";
import { SocialIcons } from "@/components/site/SocialIcons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-8 px-5 md:h-20 md:px-10">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <WordmarkBadge />
          <Wordmark size="sm" stacked className="hidden sm:block" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              className="rounded-full px-3.5 py-2 text-[13px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground"
              activeProps={{ className: "bg-foreground/5 text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={site.phoneHref}
            aria-label="Call sales"
            className="flex size-10 items-center justify-center rounded-full border border-hairline transition-colors hover:border-accent hover:text-accent"
          >
            <Phone className="size-[17px]" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp sales"
            className="flex size-10 items-center justify-center rounded-full border border-hairline transition-colors hover:border-accent hover:text-accent"
          >
            <MessageCircle className="size-[17px]" />
          </a>
          <Link
            to="/contact"
            className="ml-1 rounded-full bg-accent px-5 py-3 text-[12px] font-bold tracking-tight text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            Request a Quote
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-full border border-hairline lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-5 py-2">
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 font-display text-lg tracking-tight"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 py-5">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-accent px-5 py-4 text-center text-[12px] font-bold tracking-tight text-accent-foreground"
              >
                Request a Quote
              </Link>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={site.phoneHref}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-hairline py-3 text-[11px] font-semibold"
                >
                  <Phone className="size-5 text-accent" /> Call
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1 rounded-2xl border border-hairline py-3 text-[11px] font-semibold"
                >
                  <MessageCircle className="size-5 text-accent" /> WhatsApp
                </a>
                <a
                  href={emailLink()}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-hairline py-3 text-[11px] font-semibold"
                >
                  <Mail className="size-5 text-accent" /> Email
                </a>
              </div>
              <SocialIcons className="justify-center pt-1" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
