import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHead } from "@/components/site/primitives";
import { AgencyLink, AGENCY_NAME } from "@/components/site/AgencyCredit";
import manufacturing from "@/assets/manufacturing.jpg";
import logistics from "@/assets/logistics.jpg";
import yard from "@/assets/project-yard.jpg";

const CASE_URL = "https://midriftconcreteworks.com/resources/midrift-digital-transformation";

export const Route = createFileRoute("/resources/midrift-digital-transformation")({
  head: () => ({
    meta: [
      { title: "Midrift Digital Transformation | Case Study" },
      {
        name: "description",
        content:
          "How the Midrift Concrete Works website was designed and developed as a digital platform for products, projects, delivery and quote enquiries.",
      },
      { property: "og:title", content: "Midrift Concrete Works — Digital Transformation" },
      {
        property: "og:description",
        content:
          "Building a digital platform for construction products, project enquiries and business growth.",
      },
      { property: "og:url", content: CASE_URL },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CASE_URL }],
  }),
  component: CaseStudyPage,
});

const strategy = [
  { code: "01", title: "Product catalogue", body: "Eight precast families with dedicated category and product pages." },
  { code: "02", title: "Project portfolio", body: "Completed supply presented as case studies with location and application." },
  { code: "03", title: "Quality & manufacturing", body: "Production, curing and testing explained for technical buyers." },
  { code: "04", title: "Who we serve", body: "Contractors, developers, distributors, government, consultants and home builders." },
  { code: "05", title: "Bulk & wholesale", body: "Trade supply, volume ordering and scheduled production runs." },
  { code: "06", title: "Delivery & logistics", body: "Delivery zones, truck capacity and lead-time guidance." },
  { code: "07", title: "Quote generation", body: "A guided enquiry flow that captures product, quantity and delivery location." },
  { code: "08", title: "WhatsApp sales", body: "Enquiries hand over to the sales team with a pre-filled message." },
  { code: "09", title: "Resources", body: "Specification and site guidance for buyers before they order." },
  { code: "10", title: "Local search visibility", body: "Structured data, per-page metadata and a maintained XML sitemap." },
];

const experience = [
  { title: "Responsive, mobile-first", body: "The layout is built for phones first, where most enquiries begin, then scales up to desktop." },
  { title: "Product discovery", body: "Search and filtering, category browsing and image-led product pages." },
  { title: "Conversion-focused CTAs", body: "Every product view offers a clear next step: quote, WhatsApp or call." },
  { title: "Quote workflow", body: "A short multi-step form saves the enquiry, issues a reference and produces a downloadable quotation." },
  { title: "WhatsApp integration", body: "Direct chat links and the product catalogue connect buyers to the sales team." },
  { title: "Technical content", body: "Grades, dimensions and installation notes support specification decisions." },
  { title: "Visual storytelling", body: "Photography from the yard and completed works carries the product story." },
];

const share = [
  { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`Midrift Concrete Works — Digital Transformation case study: ${CASE_URL}`)}` },
  { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CASE_URL)}` },
  { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(CASE_URL)}` },
];

function CaseStudyPage() {
  return (
    <>
      <PageHero
        eyebrow="Case study"
        title="Midrift Concrete Works — Digital Transformation"
        lead="Building a digital platform for construction products, project enquiries and business growth."
        image={manufacturing}
        imageAlt="Precast concrete manufacturing at the Midrift yard"
      />

      <Section>
        <SectionHead
          eyebrow="01 — The challenge"
          title="A digital presence that carries the whole business"
          lead="Midrift manufactures a wide precast range and supplies projects across Kenya. The site had to present precast products, manufacturing capability, completed projects, bulk supply, delivery and construction solutions in one place — and turn interest into a written quote enquiry."
        />
      </Section>

      <Section className="bg-concrete">
        <SectionHead
          eyebrow="02 — The digital strategy"
          title="Architecture built around how buyers decide"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {strategy.map((s) => (
            <article key={s.code} className="bg-card p-8">
              <span className="font-mono text-xs text-accent">{s.code}</span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="03 — The experience" title="Designed for the buyer on a site visit" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <ul className="space-y-6">
            {experience.map((e) => (
              <li key={e.title} className="border-t border-hairline pt-5">
                <h3 className="font-display text-base font-bold uppercase tracking-tight">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </li>
            ))}
          </ul>
          <div className="grid gap-6">
            <img
              src={yard}
              alt="Midrift production yard shown on the website"
              loading="lazy"
              decoding="async"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <img
              src={logistics}
              alt="Delivery truck loaded with precast concrete products"
              loading="lazy"
              decoding="async"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-concrete">
        <SectionHead
          eyebrow="04 — Business-focused design"
          title="More than a brochure"
          lead="The website works as a digital sales and information platform: it answers technical questions, presents proof of supply, and moves the visitor into a quote request or a WhatsApp conversation with the sales team."
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            Browse products
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-foreground px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
          >
            Request a quote
          </Link>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl border-t border-hairline pt-10">
          <p className="eyebrow">05 — Technology partner</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Website design, development and digital experience by{" "}
            <AgencyLink placement="case_study" className="font-semibold text-foreground hover:text-accent">
              {AGENCY_NAME}
            </AgencyLink>
            .
          </p>
          <h2 className="mt-8 font-display text-2xl font-bold uppercase tracking-tight">
            Need a digital system for your business?
          </h2>
          <AgencyLink
            placement="case_study"
            label={`Explore ${AGENCY_NAME} — opens in a new tab`}
            className="mt-6 inline-flex items-center rounded-full border border-foreground px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] no-underline transition-colors hover:bg-foreground hover:text-background hover:no-underline"
          >
            Explore {AGENCY_NAME} →
          </AgencyLink>

          <p className="eyebrow mt-14">Share this case study</p>
          <div className="mt-4 flex flex-wrap gap-4">
            {share.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-hairline px-5 py-3 text-xs font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
