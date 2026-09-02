import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, MessageCircle, Mail, MapPin, Star, Home, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/data/site";
import { useQuote } from "./QuoteProvider";
import { Wordmark } from "@/components/site/Wordmark";
import { SocialIcons } from "@/components/site/SocialIcons";

const MENU_ID = "site-mobile-menu";

export function SiteHeader() {
  const { openQuote } = useQuote();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback((focusToggle = true) => {
    setOpen(false);
    if (focusToggle) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      const toggle = toggleRef.current;
      if (!panel || !toggle) return;
      const focusables = [
        toggle,
        ...Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ),
      ].filter((el) => el.offsetParent !== null || el === toggle);
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    // move focus into the sheet for screen-reader / keyboard users
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/75 backdrop-blur-2xl backdrop-saturate-150 [padding-top:env(safe-area-inset-top)]">
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-2 px-3 [touch-action:manipulation] [-webkit-tap-highlight-color:transparent] sm:gap-4 sm:px-5 md:h-24 md:px-10">

        <Link
          to="/"
          className="flex min-w-0 shrink items-center overflow-hidden"
          onClick={() => setOpen(false)}
          aria-label="Midrift Concrete Works — home"
        >
          <Wordmark size="sm" className="truncate whitespace-nowrap" />
        </Link>

        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Go to the home page"
          title="Home"
          activeProps={{ className: "border-accent text-accent" }}
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-hairline transition-all duration-300 hover:border-accent hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Home className="size-[18px]" aria-hidden="true" />
        </Link>



        <nav className="hidden items-center gap-1 2xl:flex">
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
          <button
            type="button"
            onClick={() => openQuote({})}
            aria-label="WhatsApp sales — opens the quote request form"
            title="WhatsApp sales"
            className="flex size-11 items-center justify-center rounded-2xl border border-hairline transition-all duration-300 hover:border-accent hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <MessageCircle className="size-[18px]" />
          </button>
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
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu — browse products, services and contact"}
          aria-expanded={open}
          aria-controls={MENU_ID}
          aria-haspopup="menu"
          onClick={() => (open ? close(false) : setOpen(true))}
          className="ios-cta flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-accent px-3.5 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-accent-foreground shadow-[0_10px_30px_-12px_hsl(var(--accent)/0.9)] transition-transform duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:text-[13px] sm:tracking-[0.08em] 2xl:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span>{open ? "Close" : "Menu"}</span>
          {!open && (
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-foreground/70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-foreground" />
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          id={MENU_ID}
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Site menu"
          className="ios-sheet max-h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain border-t border-white/20 bg-background/70 backdrop-blur-3xl backdrop-saturate-150 md:max-h-[calc(100dvh-96px)] 2xl:hidden"
        >
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-3">

            <p className="px-2 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Tap any page below to explore it
            </p>
            <div className="liquid-glass liquid-sheen overflow-hidden rounded-[26px] border border-white/25 bg-background/55 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-2xl backdrop-saturate-150">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="ios-row flex items-center justify-between gap-3 border-b border-hairline px-5 py-4 active:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                activeProps={{ className: "text-accent" }}
              >
                <span className="flex items-center gap-3">
                  <Home className="size-5 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-[17px] font-semibold tracking-tight">Home</span>
                    <span className="block text-[12.5px] text-muted-foreground">Back to the main page</span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
                  Go <ChevronRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
              {mainNav.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${40 + i * 35}ms` }}
                  className="ios-row flex items-center justify-between gap-3 border-b border-hairline px-5 py-4 last:border-b-0 active:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  activeProps={{ className: "text-accent" }}
                >
                  <span className="min-w-0">
                    <span className="block text-[17px] font-semibold tracking-tight">{item.label}</span>
                    <span className="block text-[12.5px] text-muted-foreground">{item.desc}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
                    View <ChevronRight className="size-3.5" aria-hidden="true" />
                  </span>
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
                <button
                  type="button"
                  onClick={() => openQuote({})}
                  aria-label="WhatsApp sales — opens the quote request form"
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <MessageCircle className="size-5 text-accent" /> WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => openQuote({})}
                  aria-label="Email sales — opens the quote request form"
                  className="ios-glass flex flex-col items-center gap-1 rounded-2xl py-3 text-[12px] font-semibold active:scale-95"
                >
                  <Mail className="size-5 text-accent" /> Email
                </button>
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
