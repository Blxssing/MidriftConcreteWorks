import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getCategory } from "@/data/products";
import { CTABand, PageHero, PhotoSlots, Section } from "@/components/site/primitives";

const SITE = "https://midriftconcreteworks.com";

export const Route = createFileRoute("/products/$category/")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return {
      slug: category.slug,
      name: category.name,
      intro: category.intro,
      description: category.description,
      image: category.image,
      products: category.products.map((p) => ({ slug: p.slug, name: p.name })),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product category not found | Midrift" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Precast Concrete Kenya | Midrift Concrete Works`;
    const description = `${loaderData.intro} Manufactured in Kenya by Midrift Concrete Works and quoted to your project specification.`;
    const url = `${SITE}/products/${loaderData.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData.image
          ? [
              { property: "og:image", content: loaderData.image },
              { name: "twitter:image", content: loaderData.image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Products", item: `${SITE}/products` },
                  { "@type": "ListItem", position: 2, name: loaderData.name, item: url },
                ],
              },
              {
                "@type": "ItemList",
                name: loaderData.name,
                itemListElement: loaderData.products.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: p.name,
                  url: `${url}/${p.slug}`,
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category: slug } = Route.useParams();
  const category = getCategory(slug)!;
  const others = categories.filter((c) => c.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={`Products · ${category.code}`}
        title={category.name}
        lead={category.description}
        image={category.image}
        imageAlt={category.name}
      />

      <Section>
        <PhotoSlots slots={category.photoSlots} title={`${category.name} — photos`} />
      </Section>

      <Section className="pt-0">
        {category.products.length === 0 && (
          <p className="max-w-2xl text-muted-foreground">
            Sizes and variants for {category.name.toLowerCase()} are quoted to project specification. Send us your
            requirement and our team will confirm options, quantities and delivery.
          </p>
        )}
        <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((p) => (
            <Link
              key={p.slug}
              to="/products/$category/$product"
              params={{ category: slug, product: p.slug }}
              className="group flex flex-col bg-background p-6 transition-colors hover:bg-concrete"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
            decoding="async"
                  className="aspect-4/3 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex aspect-4/3 w-full items-center justify-center rounded-2xl border border-dashed border-hairline bg-concrete px-4 text-center text-xs text-muted-foreground">
                  Photo space reserved
                </div>
              )}
              <h2 className="mt-6 font-display text-lg font-bold uppercase tracking-tight group-hover:text-accent">
                {p.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <span className="mt-5 text-[12px] font-bold uppercase tracking-[0.12em] text-accent">View product →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline bg-concrete">
        <p className="eyebrow">Other categories</p>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {others.map((c) => (
            <Link
              key={c.slug}
              to="/products/$category"
              params={{ category: c.slug }}
              className="font-display text-xl font-bold uppercase tracking-tight hover:text-accent md:text-2xl"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </Section>

      <CTABand title={`Need a quote for ${category.name.toLowerCase()}?`} />
    </>
  );
}
