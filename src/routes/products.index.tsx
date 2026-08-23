import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { CTABand, PageHero, Section } from "@/components/site/primitives";
import cabroImg from "@/assets/cabro.jpg";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Precast Concrete Products | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "Cabro and paving, concrete blocks, ventilation blocks, road and infrastructure precast, and custom precast solutions manufactured in Kenya.",
      },
      { property: "og:title", content: "Precast Concrete Products | Midrift" },
      {
        property: "og:description",
        content: "Explore Midrift's full precast concrete product range for builders, contractors and distributors.",
      },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Product catalogue"
        title="Precast concrete products"
        lead="Manufactured in our own yard and supplied to individual builders, contractors, developers, distributors and infrastructure projects."
        image={cabroImg}
        imageAlt="Interlocking cabro paving"
      />

      {categories.map((c) => (
        <Section key={c.slug} className="border-b border-hairline">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="font-mono text-xs text-accent">{c.code}</span>
              <h2 className="mt-3 display-2">{c.name}</h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{c.description}</p>
              <Link
                to="/products/$category"
                params={{ category: c.slug }}
                className="mt-8 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline"
              >
                Open {c.name} →
              </Link>
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="mt-10 aspect-16/9 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="mt-10 flex aspect-16/9 w-full items-center justify-center rounded-2xl border border-dashed border-hairline bg-concrete text-sm text-muted-foreground">
                  Image space reserved for {c.name}
                </div>
              )}
            </div>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {c.products.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/products/$category/$product"
                    params={{ category: c.slug, product: p.slug }}
                    className="group flex items-start gap-6 py-5 transition-colors hover:text-accent"
                  >
                    <div className="flex-1">
                      <h3 className="font-display text-base font-bold uppercase tracking-tight">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                    </div>
                    <span className="mt-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <CTABand />
    </>
  );
}
