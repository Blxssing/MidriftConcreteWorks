import { createFileRoute, Link } from "@tanstack/react-router";
import { solutions } from "@/data/solutions";
import { CTABand, PageHero, Section } from "@/components/site/primitives";
import manufacturingImg from "@/assets/manufacturing.jpg";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions | Who Midrift Concrete Serves" },
      {
        name: "description",
        content:
          "Precast concrete supply for contractors, developers, hardware stores, distributors, government projects, architects, quantity surveyors and home builders.",
      },
      { property: "og:title", content: "Solutions | Who Midrift Concrete Serves" },
      {
        property: "og:description",
        content: "How Midrift supports each type of buyer — from single home builds to infrastructure programmes.",
      },
      { property: "og:url", content: "https://midriftconcreteworks.com/solutions" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://midriftconcreteworks.com/solutions" }],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Who we serve"
        lead="Different buyers need different things from a concrete supplier. Here is how we work with each of them."
        image={manufacturingImg}
        imageAlt="Precast concrete manufacturing"
      />

      <Section>
        <div className="grid gap-px bg-hairline md:grid-cols-2">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              to="/solutions/$slug"
              params={{ slug: s.slug }}
              className="group bg-background p-8 transition-colors hover:bg-ink hover:text-ink-foreground md:p-12"
            >
              <span className="font-mono text-xs text-accent">{s.code}</span>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight">{s.name}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground group-hover:text-ink-foreground/70">
                {s.headline}
              </p>
              <span className="mt-7 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
                {s.cta} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
