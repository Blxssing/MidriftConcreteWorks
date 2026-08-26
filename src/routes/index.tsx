import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-yard.jpg";
import manufacturingImg from "@/assets/manufacturing.jpg";
import logisticsImg from "@/assets/logistics.jpg";
import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/site/Reveal";
import { SectionNav } from "@/components/site/SectionNav";
import { KineticText } from "@/components/site/KineticText";
import { ImageMarquee, TextMarquee } from "@/components/site/Marquee";
import {
  CTABand,
  Container,
  QuoteCTA,
  Section,
  SectionHead,
  WhatsAppCTA,
} from "@/components/site/primitives";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Midrift Concrete Works Ltd | Precast Concrete Manufacturer, Kenya" },
      {
        name: "description",
        content:
          "Quality precast concrete built for strength. Cabro paving, concrete blocks, ventilation blocks, road kerbs and custom precast manufacturing with bulk supply and site delivery.",
      },
      { property: "og:title", content: "Midrift Concrete Works Ltd | Precast Concrete Manufacturer" },
      {
        property: "og:description",
        content:
          "Precast concrete manufacturing and project supply in Kenya — paving, blocks, ventilation blocks, road and infrastructure products.",
      },
    ],
  }),
  component: Home,
});

const capabilities = [
  { code: "01", title: "Manufacturing", body: "Controlled mixing, moulding and compaction for consistent, repeatable units." },
  { code: "02", title: "Product range", body: "Paving, blocks, ventilation blocks and civil precast in one supply source." },
  { code: "03", title: "Technical support", body: "Guidance on product selection, quantities and application from our team." },
  { code: "04", title: "Project supply", body: "Dedicated production runs scheduled against construction programmes." },
  { code: "05", title: "Custom solutions", body: "Bespoke moulds and units manufactured to drawing and specification." },
  { code: "06", title: "Logistics", body: "Loading, trucking and scheduled delivery direct to your site." },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={heroImg}
          alt="Pallets of precast concrete paving blocks in the Midrift production yard"
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 size-full scale-105 object-cover opacity-40 [animation:none] md:animate-[marquee-x_0s]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
        <Container className="flex min-h-[86vh] flex-col justify-end py-24 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">Precast concrete manufacturer · Kenya</p>
          </Reveal>
          <KineticText
            as="h1"
            text="Quality precast concrete, built for strength."
            className="mt-7 max-w-5xl display-1"
          />
          <KineticText
            as="p"
            text="Designed for performance."
            delay={320}
            className="max-w-5xl display-1 text-accent"
          />
          <Reveal delay={520}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/75 md:text-lg">
              Midrift Concrete Works manufactures and supplies paving, blocks, ventilation blocks and civil precast
              products for builders, contractors, developers, distributors and infrastructure projects.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <QuoteCTA />
              <WhatsAppCTA dark />
            </div>
          </Reveal>
        </Container>
      </section>

      <SectionNav
        items={[
          { id: "products", label: "Products" },
          { id: "capabilities", label: "What we do" },
          { id: "quality", label: "Quality" },
          { id: "serve", label: "Who we serve" },
          { id: "projects", label: "Projects" },
          { id: "bulk", label: "Bulk & delivery" },
        ]}
      />

      <TextMarquee
        items={[
          "Cabro paving",
          "Concrete blocks",
          "Ventilation blocks",
          "Kerbs & channels",
          "Culverts",
          "Custom precast",
        ]}
        className="bg-concrete"
      />

      {/* Product categories — asymmetric editorial grid */}
      <Section id="products" className="scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Product range"
            title="Seven product families. One manufacturer."
            lead="Every unit is produced in our own yard, so quality, quantity and delivery stay under one roof."
          />
          <Link
            to="/products"
            className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
              <Link
                to="/products/$category"
                params={{ category: c.slug }}
                className="hover-lift group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground"
              >
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
            decoding="async"
                    className="absolute inset-0 size-full object-cover opacity-45 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-30"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative">
                  <span className="font-mono text-xs text-accent">{c.code}</span>
                  <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight">{c.name}</h3>
                  <p className="mt-3 max-w-sm text-sm text-ink-foreground/70">{c.intro}</p>
                  <span className="mt-5 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-accent transition-transform duration-500 group-hover:translate-x-1">
                    Explore range →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <ImageMarquee
        images={[
          { src: heroImg, alt: "Precast paving stacked in the Midrift yard" },
          { src: manufacturingImg, alt: "Concrete production line" },
          { src: logisticsImg, alt: "Loaded delivery truck leaving the yard" },
          ...categories.filter((c) => !!c.image).slice(0, 3).map((c) => ({ src: c.image as string, alt: c.name })),
        ]}
      />


      {/* Capability strip */}
      <Section id="capabilities" dark className="scroll-mt-28">
        <SectionHead
          eyebrow="What Midrift does"
          title="Products, manufacturing and supply — end to end."
          className="[&_p:last-child]:text-ink-foreground/70"
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.code} delay={i * 80}>
              <div className="group border-t border-hairline-invert pt-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent">
                <span className="font-mono text-xs text-accent">{c.code}</span>
                <h3 className="mt-3 font-display text-xl tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </Section>

      {/* Manufacturing split */}
      <section id="quality" className="grid scroll-mt-28 gap-4 px-4 py-4 lg:grid-cols-2">
        <figure className="media-zoom rounded-3xl">
          <img
            src={manufacturingImg}
            alt="Precast concrete production inside the Midrift factory"
            loading="lazy"
            decoding="async"
            className="h-full min-h-[380px] w-full rounded-3xl object-cover"
          />
        </figure>
        <div className="flex items-center rounded-3xl bg-concrete px-6 py-20 md:px-14 md:py-24">
          <Reveal className="max-w-lg">
            <p className="eyebrow">Quality & manufacturing</p>
            <h2 className="mt-4 display-2">Strength is a process, not a claim.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              From raw material selection through mixing, moulding, compaction and curing, every stage is controlled so
              the units arriving on your site behave the same way, batch after batch.
            </p>
            <Link
              to="/quality"
              className="mt-8 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline"
            >
              See our manufacturing process →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Who we serve */}
      <Section id="serve" className="scroll-mt-28">
        <SectionHead
          eyebrow="Who we serve"
          title="Built for the people who build."
          lead="From a single driveway to a national infrastructure programme, the supply approach adapts to the buyer."
        />
        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link
                to="/solutions/$slug"
                params={{ slug: s.slug }}
                className="group flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 hover:text-accent"
              >
                <span className="font-mono text-xs text-muted-foreground">{s.code}</span>
                <h3 className="font-display text-2xl tracking-tight md:text-3xl">{s.name}</h3>
                <span className="ml-auto hidden max-w-md text-sm text-muted-foreground lg:block">{s.headline}</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>


      {/* Projects */}
      <Section id="projects" className="scroll-mt-28 bg-concrete">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Projects" title="Supplied, delivered, in service." />
          <Link to="/projects" className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline">
            All projects →
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group">
              <div className="overflow-hidden bg-background">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
            decoding="async"
                  className="aspect-4/3 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-5">{p.location}</p>
              <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-tight group-hover:text-accent">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.application}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Bulk + delivery */}
      <section id="bulk" className="grid scroll-mt-28 lg:grid-cols-2">
        <div className="flex items-center bg-ink px-5 py-20 text-ink-foreground md:px-16 md:py-24">
          <div className="max-w-lg">
            <p className="eyebrow text-accent">Bulk & wholesale</p>
            <h2 className="mt-4 display-2">Volume supply for trade buyers.</h2>
            <p className="mt-6 leading-relaxed text-ink-foreground/70">
              Contractors, developers, hardware stores and distributors work with us on bulk pricing, scheduled
              production and repeat resupply.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                to="/bulk-wholesale"
                className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline"
              >
                Bulk & wholesale →
              </Link>
              <Link
                to="/delivery"
                className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink-foreground/70 hover:text-accent"
              >
                Delivery & logistics →
              </Link>
            </div>
          </div>
        </div>
        <img
          src={logisticsImg}
          alt="Truck loaded with pallets of concrete blocks leaving the yard"
          loading="lazy"
            decoding="async"
          className="h-full min-h-[360px] w-full rounded-2xl object-cover"
        />
      </section>

      <CTABand />
    </>
  );
}
