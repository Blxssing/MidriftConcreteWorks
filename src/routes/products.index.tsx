import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { CTABand, PageHero, Section } from "@/components/site/primitives";
import { ProductFinder } from "@/components/site/ProductFinder";
import cabroImg from "@/assets/cabro.jpg";

const SITE = "https://midrift-prime-solutions.lovable.app";

type ProductSearch = { q?: string; family?: string; use?: string };

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    const out: ProductSearch = {};
    const q = str(search["q"]);
    const family = str(search["family"]);
    const use = str(search["use"]);
    if (q) out.q = q;
    if (family) out.family = family;
    if (use) out.use = use;
    return out;
  },
  head: ({ match }) => {
    const search = (match?.search ?? {}) as ProductSearch;
    const familyName = categories.find((c) => c.slug === search.family)?.name;
    const parts = [familyName, search.use ? `for ${search.use.toLowerCase()}` : null].filter(Boolean);
    const title = parts.length
      ? `${parts.join(" ")} — Precast Concrete | Midrift Concrete Works`
      : "Precast Concrete Products | Midrift Concrete Works";
    const description = parts.length
      ? `Browse Midrift Concrete Works ${(familyName ?? "precast concrete").toLowerCase()} ${
          search.use ? `suited to ${search.use.toLowerCase()}` : ""
        } — manufactured in Kenya and quoted to your project specification.`.replace(/\s+/g, " ").trim()
      : "Cabro and paving, concrete blocks, ventilation blocks, road and infrastructure precast, and custom precast solutions manufactured in Kenya.";
    const query = new URLSearchParams();
    if (search.family) query.set("family", search.family);
    if (search.use) query.set("use", search.use);
    const canonical = `${SITE}/products${query.toString() ? `?${query.toString()}` : ""}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        ...(search.q ? [{ name: "robots", content: "noindex,follow" }] : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: title,
            itemListElement: categories.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              url: `${SITE}/products/${c.slug}`,
            })),
          }),
        },
      ],
    };
  },
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

      <Section className="pb-0">
        <ProductFinder />
      </Section>

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
            decoding="async"
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
