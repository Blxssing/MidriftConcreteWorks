import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Factory, CheckCircle2 } from "lucide-react";
import { CTABand, PageHero, Section, SectionHead, WhatsAppBanner } from "@/components/site/primitives";
import manufacturingImg from "@/assets/manufacturing.jpg";

const SITE = "https://midriftconcreteworks.com";

const services = [
  {
    icon: Truck,
    code: "S-01",
    name: "Ready-Mix Concrete Production",
    lead:
      "Batching and mixing precise ratios of cement, water, sand and aggregate at a dedicated plant, then delivering it fresh to your site in transit mixer trucks.",
    points: [
      "Computer-assisted batching for consistent, repeatable mix ratios",
      "Designed mixes by strength class to suit slabs, columns, foundations and pavements",
      "Slump and workability adjusted to the placing method on site",
      "Transit mixers keep the concrete agitated and workable in transit",
      "Scheduled pours so trucks arrive in sequence and placing never stalls",
      "Batch records issued with every delivery for site quality files",
    ],
  },
  {
    icon: Factory,
    code: "S-02",
    name: "Precast Concrete Manufacturing",
    lead:
      "Moulding structural and functional elements off-site — T-beams, paving blocks, masonry blocks, culverts, pipes, kerbs and slabs — cured under control and delivered ready for quick installation.",
    points: [
      "Steel and engineered moulds give tight dimensional tolerance unit after unit",
      "Controlled curing in the yard, independent of weather on your site",
      "Reinforcement placed and cover checked before casting",
      "Units cast in parallel with site works, compressing programme time",
      "Less formwork, less wet trade labour and far less waste on site",
      "Custom moulds produced for project-specific shapes and profiles",
    ],
  },
];

const process = [
  { step: "01", title: "Brief & specification", copy: "Share drawings, strength class, quantities and site access." },
  { step: "02", title: "Written quotation", copy: "Priced schedule with lead time and delivery cost to your site." },
  { step: "03", title: "Production", copy: "Batching or casting scheduled against your programme dates." },
  { step: "04", title: "Delivery & support", copy: "Transit mixers or flatbed delivery, with placing guidance." },
];

export const Route = createFileRoute("/services")({
  head: () => {
    const title = "Ready-Mix & Precast Concrete Services | Midrift Concrete Works";
    const description =
      "Ready-mix concrete batched and delivered fresh by transit mixer, plus off-site precast manufacturing of beams, blocks, culverts, pipes and slabs in Nakuru, Kenya.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE}/services` },
      ],
      links: [{ rel: "canonical", href: `${SITE}/services` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: title,
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              description: s.lead,
            })),
          }),
        },
      ],
    };
  },
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services we also offer"
        title="Ready-mix concrete and precast manufacturing"
        lead="Beyond our catalogue, we batch and deliver fresh ready-mix concrete and manufacture precast elements to your specification."
        image={manufacturingImg}
        imageAlt="Concrete manufacturing yard"
      />

      {services.map((s) => {
        const Icon = s.icon;
        return (
          <Section key={s.code} className="border-b border-hairline">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="font-mono text-xs text-accent">{s.code}</span>
                <div className="mt-4 flex size-14 items-center justify-center rounded-3xl bg-accent/15 text-accent">
                  <Icon className="size-7" />
                </div>
                <h2 className="mt-6 display-2">{s.name}</h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{s.lead}</p>
                <Link
                  to="/contact"
                  className="ios-cta mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-[13px] font-bold tracking-tight text-accent-foreground"
                >
                  Request this service
                </Link>
              </div>
              <ul className="grid gap-3 self-start sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="ios-glass flex gap-3 rounded-3xl p-5 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}

      <Section>
        <WhatsAppBanner message="Hello Midrift Concrete Works, I would like ready-mix or precast service pricing." />
      </Section>

      <Section className="pt-0">
        <SectionHead
          eyebrow="How it runs"
          title="From brief to delivery"
          lead="A simple, predictable sequence so your programme never waits on materials."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="ios-glass rounded-3xl p-6">
              <span className="font-mono text-xs text-accent">{p.step}</span>
              <h3 className="mt-3 font-display text-lg tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABand
        title="Need concrete on site this week?"
        lead="Tell us the strength class, volume and pour date — we'll come back with a written quotation."
      />
    </>
  );
}
