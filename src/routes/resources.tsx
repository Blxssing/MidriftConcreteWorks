import { createFileRoute, Link } from "@tanstack/react-router";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site/primitives";
import manufacturing from "@/assets/manufacturing.jpg";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Guides | Midrift Concrete Solutions" },
      {
        name: "description",
        content:
          "Installation guidance, product selection notes and ordering guides for precast paving, blocks and civil concrete products in Kenya.",
      },
      { property: "og:title", content: "Resources & Guides | Midrift Concrete Solutions" },
      {
        property: "og:description",
        content: "Practical guidance on selecting, ordering and installing precast concrete products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

const guides = [
  {
    code: "R-01",
    title: "Choosing a cabro thickness",
    body: "60mm for pedestrian and light vehicle areas, 80mm for car parks and access roads, 100mm for heavy commercial and yard traffic.",
  },
  {
    code: "R-02",
    title: "Estimating paving quantities",
    body: "Measure the paved area in square metres, add 5% for cuts at edges and curves, and confirm kerb linear metres separately.",
  },
  {
    code: "R-03",
    title: "Base preparation",
    body: "Compacted hardcore, a graded sub-base and a 30–50mm sand bedding layer are what determine paving life more than the block itself.",
  },
  {
    code: "R-04",
    title: "Curing and handling",
    body: "Units are cured before dispatch. On site, stack on level ground, avoid dropping edges and keep loads banded until laying.",
  },
  {
    code: "R-05",
    title: "Ordering and lead times",
    body: "Standard items are supplied from stock where available; custom moulds and large volumes are scheduled into a production run.",
  },
  {
    code: "R-06",
    title: "Delivery planning",
    body: "Confirm site access, offloading method and receiving hours before dispatch so trucks are not held at the gate.",
  },
];

function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guidance before you order"
        lead="Short, practical notes from our production and technical team to help you specify and receive the right product."
        image={manufacturing}
        imageAlt="Precast concrete manufacturing process"
      />

      <Section>
        <SectionHead
          eyebrow="Technical notes"
          title="Specification & site guidance"
          lead="These are general notes. For a specific project, send us the drawings or scope and we will advise directly."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <article key={g.code} className="bg-card p-8">
              <span className="font-mono text-xs text-accent">{g.code}</span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">{g.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            Browse products
          </Link>
          <Link
            to="/delivery"
            className="inline-flex items-center rounded-full border border-foreground px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
          >
            Delivery information
          </Link>
        </div>
      </Section>

      <CTABand title="Need advice on a specific job?" lead="Share the scope and our technical team will recommend products and quantities." />
    </>
  );
}
