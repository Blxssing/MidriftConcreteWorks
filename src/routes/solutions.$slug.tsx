import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSolution, solutions } from "@/data/solutions";
import { getCategory } from "@/data/products";
import { CTABand, PageHero, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return { name: solution.name, headline: solution.headline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Solution not found | Midrift" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} | Midrift Concrete Works`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.headline },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.headline },
      ],
    };
  },
  component: SolutionPage,
});

function SolutionPage() {
  const { slug } = Route.useParams();
  const s = getSolution(slug)!;
  const others = solutions.filter((x) => x.slug !== slug);

  return (
    <>
      <PageHero eyebrow={`Solutions · ${s.code}`} title={s.name} lead={s.headline} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What you need</p>
            <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
              {s.needs.map((n) => (
                <li key={n} className="py-4 text-sm leading-relaxed">{n}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">How Midrift helps</p>
            <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
              {s.howWeHelp.map((h) => (
                <li key={h} className="py-4 text-sm leading-relaxed">{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-concrete">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Relevant products</p>
            <ul className="mt-6 space-y-4">
              {s.products.map((p) => {
                const cat = getCategory(p.category);
                return (
                  <li key={p.label}>
                    <Link
                      to="/products/$category"
                      params={{ category: p.category }}
                      className="group flex items-baseline justify-between gap-4 border-b border-hairline pb-4"
                    >
                      <span>
                        <span className="block font-display text-lg font-bold uppercase tracking-tight group-hover:text-accent">
                          {p.label}
                        </span>
                        <span className="eyebrow">{cat?.name}</span>
                      </span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Relevant services</p>
            <ul className="mt-6 space-y-4">
              {s.services.map((x) => (
                <li key={x} className="border-b border-hairline pb-4 font-display text-lg font-bold uppercase tracking-tight">
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-6">
              <Link to="/bulk-wholesale" className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline">
                Bulk & wholesale →
              </Link>
              <Link to="/delivery" className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline">
                Delivery & logistics →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <p className="eyebrow">Other buyer groups</p>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/solutions/$slug"
              params={{ slug: o.slug }}
              className="font-display text-xl font-bold uppercase tracking-tight hover:text-accent"
            >
              {o.name}
            </Link>
          ))}
        </div>
      </Section>

      <CTABand title={s.cta + "."} />
    </>
  );
}
