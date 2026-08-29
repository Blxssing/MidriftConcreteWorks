import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, ArrowRight, ShoppingBag } from "lucide-react";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { useQuote } from "@/components/site/QuoteProvider";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site/primitives";
import cabroImg from "@/assets/cabro.jpg";

const SITE = "https://midriftconcreteworks.com";

export const Route = createFileRoute("/catalogue")({
  head: () => {
    const title = "WhatsApp Catalogue — Precast Concrete Prices | Midrift Concrete Works";
    const description =
      "Browse the Midrift Concrete Works WhatsApp catalogue: cabro, T-beams, blocks, paving slabs, culverts, kerbs and custom precast — tap any item to chat with sales instantly.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: `${SITE}/catalogue` },
      ],
      links: [{ rel: "canonical", href: `${SITE}/catalogue` }],
    };
  },
  component: CataloguePage,
});

function CataloguePage() {
  const { openQuote } = useQuote();
  return (
    <>
      <PageHero
        eyebrow="WhatsApp catalogue"
        title="Order straight from WhatsApp"
        lead="Every product family below opens a WhatsApp chat with the item already written into your message. Our official WhatsApp Business catalogue carries the same range with live availability."
        image={cabroImg}
        imageAlt="Interlocking cabro paving supplied by Midrift Concrete Works"
      />

      <Section className="pb-0">
        <div className="wa-callout flex flex-col gap-6 rounded-[32px] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-whatsapp-deep">Official catalogue</span>
            <h2 className="mt-3 display-2">Open the WhatsApp Business catalogue</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Photos, sizes and current availability, maintained by our sales team on WhatsApp {site.whatsappDisplay}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.whatsappCatalog}
              target="_blank"
              rel="noreferrer"
              className="wa-btn flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[14px] font-bold tracking-tight"
            >
              <ShoppingBag className="size-5" /> View catalogue
            </a>
            <a
              href={site.phoneHref}
              className="ios-glass flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[14px] font-bold tracking-tight transition-transform duration-300 active:scale-95"
            >
              <Phone className="size-5 text-accent" /> {site.phone}
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Browse by family"
          title="Tap a family to start a chat"
          lead="Each card opens WhatsApp with the product family pre-filled, or you can open the full technical page on the site."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article key={c.slug} className="ios-glass flex flex-col overflow-hidden rounded-[30px]">
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 w-full object-cover"
                />
              ) : (
                <div className="flex aspect-4/3 w-full items-center justify-center bg-concrete text-sm text-muted-foreground">
                  {c.name}
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs text-accent">{c.code}</span>
                <h3 className="mt-2 font-display text-xl tracking-tight">{c.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => openQuote({ product: c.name })}
                    aria-label={`Get a quote on WhatsApp for ${c.name}`}
                    className="wa-btn flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[13px] font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <MessageCircle className="size-[18px] shrink-0" /> WhatsApp about {c.name}
                  </button>
                  <div className="flex gap-2">
                    <Link
                      to="/products/$category"
                      params={{ category: c.slug }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-hairline px-4 py-3 text-[13px] font-semibold transition-colors hover:border-accent hover:text-accent"
                    >
                      Details <ArrowRight className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => openQuote({ product: c.name })}
                      aria-label={`Email a quote request for ${c.name}`}
                      className="flex flex-1 items-center justify-center rounded-full border border-hairline px-4 py-3 text-[13px] font-semibold transition-colors hover:border-accent hover:text-accent"
                    >
                      Email quote
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTABand
        title="Prefer to chat instead of fill a form?"
        lead="Send the product, quantity and delivery town on WhatsApp — we reply with pricing and lead time."
      />
    </>
  );
}
