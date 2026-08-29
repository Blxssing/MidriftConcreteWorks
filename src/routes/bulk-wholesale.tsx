import { createFileRoute, Link } from "@tanstack/react-router";
import { CTABand, PageHero, QuoteCTA, Section, SectionHead, WhatsAppCTA } from "@/components/site/primitives";
import logisticsImg from "@/assets/logistics.jpg";

export const Route = createFileRoute("/bulk-wholesale")({
  head: () => ({
    meta: [
      { title: "Bulk & Wholesale Precast Concrete | Midrift" },
      {
        name: "description",
        content:
          "Bulk pricing, wholesale partnerships, project supply and scheduled deliveries for contractors, developers, hardware stores and distributors.",
      },
      { property: "og:title", content: "Bulk & Wholesale Precast Concrete | Midrift" },
      {
        property: "og:description",
        content: "Trade supply for contractors, developers, distributors and infrastructure companies.",
      },
      { property: "og:url", content: "https://midriftconcreteworks.com/bulk-wholesale" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://midriftconcreteworks.com/bulk-wholesale" }],
  }),
  component: BulkPage,
});

const benefits = [
  { code: "01", title: "Volume pricing", body: "Pricing structured for quantity, repeat orders and long supply agreements." },
  { code: "02", title: "Scheduled production", body: "Dedicated production runs planned against your programme, not left to stock chance." },
  { code: "03", title: "Consolidated supply", body: "Paving, blocks, kerbs and drainage under one order and one point of contact." },
  { code: "04", title: "Batch consistency", body: "Profiles and colour held consistent across phases of a large order." },
  { code: "05", title: "Scheduled deliveries", body: "Deliveries released to site as the works require, reducing on-site storage." },
  { code: "06", title: "Trade support", body: "Product information and direct contact with the people running production." },
];

const audiences = [
  { name: "Contractors", to: "contractors" },
  { name: "Real Estate Developers", to: "real-estate-developers" },
  { name: "Hardware Stores & Distributors", to: "hardware-distributors" },
  { name: "Government & Infrastructure", to: "government-infrastructure" },
];

function BulkPage() {
  return (
    <>
      <PageHero
        eyebrow="Bulk & wholesale"
        title="Trade supply at volume"
        lead="For buyers whose orders are measured in truckloads and programmes rather than pieces."
        image={logisticsImg}
        imageAlt="Loaded truck leaving the yard"
      />

      <Section>
        <SectionHead eyebrow="Why buy in bulk from Midrift" title="Predictable supply, predictable cost." />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.code} className="border-t border-hairline pt-6">
              <span className="font-mono text-xs text-accent">{b.code}</span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">Wholesale partnerships</p>
            <h2 className="mt-4 display-2">Stock Midrift products.</h2>
            <p className="mt-6 leading-relaxed text-ink-foreground/70">
              Hardware stores and distributors can carry our fast-moving lines with agreed trade terms and a restocking
              schedule that matches their turnover. We handle production planning so your shelves and yard stay
              supplied.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteCTA label="Request bulk pricing" />
              <WhatsAppCTA dark message="Hello Midrift, I would like to discuss bulk / wholesale pricing." />
            </div>
          </div>
          <div>
            <p className="eyebrow text-accent">Who this is for</p>
            <ul className="mt-6 divide-y divide-hairline-invert border-y border-hairline-invert">
              {audiences.map((a) => (
                <li key={a.to}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: a.to }}
                    className="group flex items-center justify-between gap-4 py-5 font-display text-lg font-bold uppercase tracking-tight hover:text-accent"
                  >
                    {a.name}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTABand
        title="Request bulk pricing."
        lead="Send your product list, quantities and delivery schedule. We will respond with a bulk quotation."
      />
    </>
  );
}
