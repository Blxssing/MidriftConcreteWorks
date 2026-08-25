import { Link } from "@tanstack/react-router";
import { site, whatsappLink, emailLink } from "@/data/site";
import { Wordmark } from "@/components/site/Wordmark";
import { SocialIcons } from "@/components/site/SocialIcons";
import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";

const company = [
  { label: "About Midrift", to: "/about" },
  { label: "Quality & Manufacturing", to: "/quality" },
  { label: "Projects", to: "/projects" },
  { label: "Bulk & Wholesale", to: "/bulk-wholesale" },
  { label: "Delivery & Logistics", to: "/delivery" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark size="lg" stacked />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-foreground/60">{site.tagline}</p>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/50">Products</p>
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
            <p className="eyebrow text-ink-foreground/50">Who we serve</p>
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
            <p className="eyebrow text-ink-foreground/50">Company</p>
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
            <p className="eyebrow text-ink-foreground/50">Sales</p>
            <a href={site.phoneHref} className="mt-3 block text-lg font-semibold hover:text-accent">
              {site.phone}
            </a>
            <a href={site.phoneAltHref} className="block text-lg font-semibold hover:text-accent">
              {site.phoneAlt}
            </a>
            <a href={`mailto:${site.email}`} className="block text-sm text-ink-foreground/70 hover:text-accent">
              {site.email}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-accent"
            >
              WhatsApp Sales →
            </a>
            <a
              href={site.whatsappCatalog}
              target="_blank"
              rel="noreferrer"
              className="block text-sm font-semibold text-accent"
            >
              WhatsApp Catalogue →
            </a>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/50">Yard & office</p>
            <p className="mt-3 text-sm text-ink-foreground/70">{site.location}</p>
            <p className="text-sm text-ink-foreground/70">{site.hours}</p>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/50">Follow</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm text-ink-foreground/70 transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-ink-foreground/40">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
