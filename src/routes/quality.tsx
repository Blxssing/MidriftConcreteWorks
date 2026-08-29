import { createFileRoute, Link } from "@tanstack/react-router";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site/primitives";
import manufacturingImg from "@/assets/manufacturing.jpg";
import blocksImg from "@/assets/blocks.jpg";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality & Manufacturing | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "How Midrift manufactures precast concrete: raw materials, mixing, moulding, compaction, curing, quality control, storage and dispatch.",
      },
      { property: "og:title", content: "Quality & Manufacturing | Midrift Concrete Works" },
      {
        property: "og:description",
        content: "An eight-stage production process built for consistent, repeatable precast concrete units.",
      },
      { property: "og:url", content: "https://midriftconcreteworks.com/quality" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://midriftconcreteworks.com/quality" }],
  }),
  component: QualityPage,
});

const steps = [
  { code: "01", title: "Raw Materials", body: "Aggregates, sand and cement are selected and stored to keep the mix inputs consistent." },
  { code: "02", title: "Mixing", body: "Materials are batched and mixed to the agreed proportions for the product being produced." },
  { code: "03", title: "Moulding", body: "The mix is placed into product moulds — standard profiles or custom moulds developed for a project." },
  { code: "04", title: "Compaction", body: "Vibration and pressure remove voids so the unit reaches its intended density and edge definition." },
  { code: "05", title: "Curing", body: "Units are cured under controlled conditions before they are moved or handled." },
  { code: "06", title: "Quality Control", body: "Units are checked for dimension, edge quality and finish before they are released to stock." },
  { code: "07", title: "Storage", body: "Finished units are stacked and stored on pallets in the yard, organised by product and batch." },
  { code: "08", title: "Loading / Dispatch", body: "Orders are loaded and dispatched to site according to the agreed delivery schedule." },
];

function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & manufacturing"
        title="Strength is a process"
        lead="Consistency comes from doing the same controlled steps every time. This is how a Midrift unit is made."
        image={manufacturingImg}
        imageAlt="Precast concrete production line"
      />

      <Section>
        <SectionHead
          eyebrow="Production process"
          title="Eight stages, one standard."
          lead="Each stage is the checkpoint for the next. Nothing leaves the yard that has not passed through all eight."
        />
        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.code} className="bg-background p-7">
              <span className="font-mono text-xs text-accent">{s.code}</span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="grid lg:grid-cols-2">
        <div className="flex items-center bg-ink px-5 py-20 text-ink-foreground md:px-16 md:py-24">
          <div className="max-w-lg">
            <p className="eyebrow text-accent">What we publish</p>
            <h2 className="mt-4 display-2">No invented numbers.</h2>
            <p className="mt-6 leading-relaxed text-ink-foreground/70">
              We publish product specifications, strengths and testing information only once they are confirmed for your
              specific order. Where a figure has not been confirmed, this site says so rather than guessing.
            </p>
            <p className="mt-4 leading-relaxed text-ink-foreground/70">
              Ask our team for the specification relevant to your project and we will confirm it in writing with your
              quotation.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline"
            >
              Request product specifications →
            </Link>
          </div>
        </div>
        <img
          src={blocksImg}
          alt="Finished concrete blocks stacked in the yard"
          loading="lazy"
            decoding="async"
          className="h-full min-h-[360px] w-full rounded-2xl object-cover"
        />
      </section>

      <CTABand />
    </>
  );
}
