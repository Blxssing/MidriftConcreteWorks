import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { useQuote } from "./QuoteProvider";
import { Wordmark } from "@/components/site/Wordmark";
import { SocialIcons } from "@/components/site/SocialIcons";
import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";

/** Ordered to match the main navigation so the site reads the same everywhere. */
const company = [
  { label: "Services We Offer", to: "/services" },
  { label: "Ready-Mix Concrete", to: "/ready-mix" },
  { label: "Delivery & Logistics", to: "/delivery" },
  { label: "Bulk & Wholesale", to: "/bulk-wholesale" },
  { label: "Projects", to: "/projects" },
  { label: "Testimonials & Reviews", to: "/testimonials" },
  { label: "Quality & Manufacturing", to: "/quality" },
  { label: "About Midrift", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  const { openQuote } = useQuote();
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark size="lg" stacked />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-foreground/60">{site.tagline}</p>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/70">Products</p>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products/$category"
                    params={{ category: c.slug }}
                    className="text-sm text-ink-foreground/75 transition-colors hover:text-accent"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/70">Who we serve</p>
            <ul className="mt-5 space-y-3">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: s.slug }}
                    className="text-sm text-ink-foreground/75 transition-colors hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/70">Company</p>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="text-sm text-ink-foreground/75 transition-colors hover:text-accent">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-hairline-invert pt-10 md:grid-cols-3">
          <div>
            <p className="eyebrow text-ink-foreground/70">Sales</p>
            <p className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="text-xs uppercase tracking-[0.12em] text-ink-foreground/60">Sales</span>
              <a href={site.phoneHref} className="text-lg font-semibold hover:text-accent">
                {site.phone}
              </a>
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-xs uppercase tracking-[0.12em] text-ink-foreground/60">Sales (alt)</span>
              <a href={site.phoneAltHref} className="text-lg font-semibold hover:text-accent">
                {site.phoneAlt}
              </a>
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-xs uppercase tracking-[0.12em] text-ink-foreground/60">WhatsApp</span>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-semibold hover:text-accent"
              >
                {site.whatsappDisplay}
              </a>
            </p>
            <button
              type="button"
              onClick={() => openQuote({})}
              aria-label="Email sales — opens the quote request form"
              className="block py-2 text-sm text-ink-foreground/70 hover:text-accent"
            >
              {site.email}
            </button>
            <button
              type="button"
              onClick={() => openQuote({})}
              aria-label="WhatsApp sales — opens the quote request form"
              className="mt-3 inline-block py-2 text-sm font-semibold text-accent"
            >
              WhatsApp Sales →
            </button>
            <a
              href={site.whatsappCatalog}
              target="_blank"
              rel="noreferrer"
              className="block py-2 text-sm font-semibold text-accent"
            >
              WhatsApp Catalogue →
            </a>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/70">Yard & office</p>
            <p className="mt-3 text-sm text-ink-foreground/80">{site.address}</p>
            <p className="text-sm text-ink-foreground/80">{site.hours}</p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-hairline-invert px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              <MapPin className="size-4 text-accent" /> Google Map
            </a>
            <a
              href={site.reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex w-fit items-center gap-2 rounded-full border border-hairline-invert px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              <Star className="size-4 text-accent" /> View Reviews
            </a>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/70">Follow</p>
            <SocialIcons className="mt-3" invert />
          </div>
        </div>

        <p className="mt-12 text-xs text-ink-foreground/70">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
