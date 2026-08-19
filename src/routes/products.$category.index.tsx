import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getCategory } from "@/data/products";
import { CTABand, PageHero, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/products/$category/")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { name: category.name, intro: category.intro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product category not found | Midrift" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} | Midrift Concrete Solutions`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.intro },
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
        <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((p) => (
            <Link
              key={p.slug}
              to="/products/$category/$product"
              params={{ category: slug, product: p.slug }}
              className="group flex flex-col bg-background p-6 transition-colors hover:bg-concrete"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
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
