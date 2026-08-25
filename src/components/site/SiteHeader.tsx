import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { mainNav, site, whatsappLink } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-extrabold text-accent-foreground">
            M
          </span>
          <span className="leading-none">
            <span className="block font-display text-sm font-extrabold uppercase tracking-tight md:text-base">
              Midrift
            </span>
            <span className="eyebrow block text-[9px]">Concrete Works</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            WhatsApp Sales
          </a>
          <Link
            to="/contact"
            className="rounded-full bg-accent px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            Request a Quote
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
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
                className="border-b border-hairline py-4 font-display text-lg font-bold uppercase tracking-tight"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 py-5">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-accent px-5 py-4 text-center text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground"
              >
                Request a Quote
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-foreground px-5 py-4 text-center text-[12px] font-bold uppercase tracking-[0.12em]"
              >
                WhatsApp Sales
              </a>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground"
              >
                <Phone className="size-4" /> {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
