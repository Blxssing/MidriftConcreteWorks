import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, MessageCircle, Mail, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { mainNav, site, whatsappLink, emailLink } from "@/data/site";
import { Wordmark } from "@/components/site/Wordmark";
import { SocialIcons } from "@/components/site/SocialIcons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/75 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 px-5 md:h-24 md:px-10">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Midrift Concrete Works — home">
          <Wordmark size="md" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              className="rounded-full px-3.5 py-2 text-[14px] font-medium tracking-tight text-muted-foreground transition-all duration-300 hover:bg-foreground/5 hover:text-foreground active:scale-95"
              activeProps={{ className: "bg-foreground/8 text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={site.phoneHref}
            aria-label="Call sales"
            title="Call sales"
            className="flex size-11 items-center justify-center rounded-2xl border border-hairline transition-all duration-300 hover:border-accent hover:text-accent active:scale-95"
          >
            <Phone className="size-[18px]" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp sales"
            title="WhatsApp sales"
            className="flex size-11 items-center justify-center rounded-2xl border border-hairline transition-all duration-300 hover:border-accent hover:text-accent active:scale-95"
          >
            <MessageCircle className="size-[18px]" />
          </a>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Find us on Google Maps"
            title="Find us on Google Maps"
            className="flex size-11 items-center justify-center rounded-2xl border border-hairline transition-all duration-300 hover:border-accent hover:text-accent active:scale-95"
          >
            <MapPin className="size-[18px]" />
          </a>
          <Link
            to="/contact"
            className="ios-cta ml-1 rounded-full bg-accent px-5 py-3 text-[13px] font-bold tracking-tight text-accent-foreground"
          >
            Request a Quote
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-2xl border border-hairline transition-transform duration-300 active:scale-90 xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="ios-sheet border-t border-hairline bg-background/92 backdrop-blur-2xl xl:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-3">
            <div className="ios-glass overflow-hidden rounded-[26px]">
              {mainNav.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${40 + i * 35}ms` }}
                  className="ios-row flex items-center justify-between border-b border-hairline px-5 py-4 text-[17px] font-semibold tracking-tight last:border-b-0 active:bg-foreground/5"
                  activeProps={{ className: "text-accent" }}
                >
                  {item.label}
                  <span className="text-muted-foreground">›</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 py-5">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="ios-cta rounded-full bg-accent px-5 py-4 text-center text-[15px] font-bold tracking-tight text-accent-foreground"
              >
                Request a Quote
              </Link>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={site.phoneHref}
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <Phone className="size-5 text-accent" /> Call
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <MessageCircle className="size-5 text-accent" /> WhatsApp
                </a>
                <a
                  href={emailLink()}
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <Mail className="size-5 text-accent" /> Email
                </a>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <MapPin className="size-5 text-accent" /> Map
                </a>
                <a
                  href={site.reviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <Star className="size-5 text-accent" /> Reviews
                </a>
                <a
                  href={site.whatsappCatalog}
                  target="_blank"
                  rel="noreferrer"
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <MessageCircle className="size-5 text-accent" /> Catalogue
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
