import { createFileRoute, Link } from "@tanstack/react-router";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site/primitives";
import heroImg from "@/assets/hero-yard.jpg";
import manufacturingImg from "@/assets/manufacturing.jpg";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Midrift Concrete Works Ltd" },
      {
        name: "description",
        content:
          "Midrift Concrete Works Ltd is a Kenyan precast concrete manufacturer supplying paving, blocks, ventilation blocks and civil precast products.",
      },
      { property: "og:title", content: "About Midrift Concrete Works Ltd" },
      {
        property: "og:description",
        content: "Who we are, what we manufacture and how we work with buyers across Kenya.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { code: "01", title: "Consistency", body: "A unit ordered today should behave like the one ordered last month." },
  { code: "02", title: "Straight answers", body: "We confirm what we can supply, by when, at what cost — in writing." },
  { code: "03", title: "Capability", body: "Standard range plus custom moulds and project-based manufacturing." },
  { code: "04", title: "Accountability", body: "One point of contact from quotation through production to dispatch." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Midrift Concrete Works Ltd"
        lead="A Kenyan precast concrete manufacturer supplying products, technical guidance and project supply to the people who build."
        image={heroImg}
        imageAlt="Midrift production yard"
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Who we are" title="Manufacturer first." />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Midrift Concrete Works Ltd manufactures precast concrete products — interlocking cabro and paving,
              concrete blocks, ventilation blocks, road and drainage units, and custom precast elements — from our yard
              in {site.location}.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Because we produce what we sell, we control quality, quantity and schedule. That matters most to buyers
              whose work stops when material does not arrive.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We supply individual home builders, contractors, developers, hardware stores and distributors, architects
              and quantity surveyors, and infrastructure and government-related projects.
            </p>
          </div>
          <img
            src={manufacturingImg}
            alt="Inside the Midrift production facility"
            loading="lazy"
            className="aspect-4/3 w-full rounded-2xl object-cover"
          />
        </div>
      </Section>

      <Section dark>
        <SectionHead eyebrow="How we work" title="Four commitments." />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.code} className="border-t border-hairline-invert pt-6">
              <span className="font-mono text-xs text-accent">{v.code}</span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <Link to="/quality" className="font-display text-2xl font-bold uppercase tracking-tight hover:text-accent">
            Quality & manufacturing →
          </Link>
          <Link to="/projects" className="font-display text-2xl font-bold uppercase tracking-tight hover:text-accent">
            Projects →
          </Link>
          <Link to="/products" className="font-display text-2xl font-bold uppercase tracking-tight hover:text-accent">
            Product catalogue →
          </Link>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
