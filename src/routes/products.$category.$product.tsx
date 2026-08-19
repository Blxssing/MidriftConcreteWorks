import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, getProduct, relatedProducts } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import { Container, Gallery, Section, SpecTable, QuoteCTA } from "@/components/site/primitives";
import { MessageCircle } from "lucide-react";

export const Route = createFileRoute("/products/$category/$product")({
  loader: ({ params }) => {
    const product = getProduct(params.category, params.product);
    if (!product) throw notFound();
    return { name: product.name, summary: product.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | Midrift" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} | Midrift Concrete Solutions`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const params = Route.useParams();
  const product = getProduct(params.category, params.product)!;
  const category = getCategory(params.category)!;
  const related = relatedProducts(product);
  const waMessage = `Hello Midrift, I would like a quote for ${product.name}.`;

  return (
    <>
      <div className="border-b border-hairline bg-concrete">
        <Container className="flex flex-wrap items-center gap-2 py-4 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <Link to="/products" className="hover:text-accent">Products</Link>
          <span>/</span>
          <Link to="/products/$category" params={{ category: category.slug }} className="hover:text-accent">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </Container>
      </div>

      <Section className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{category.name}</p>
            <h1 className="mt-4 display-2">{product.name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{product.summary}</p>
            <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteCTA label="Request a quote" />
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-foreground px-7 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
              >
                <MessageCircle className="size-4" /> WhatsApp Sales
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Or call <a href={site.phoneHref} className="font-semibold text-accent">{site.phone}</a>
            </p>
          </div>
          <Gallery images={product.gallery} alt={product.name} />
        </div>
      </Section>

      <Section className="border-t border-hairline py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <p className="eyebrow">Applications</p>
            <ul className="mt-5 space-y-3">
              {product.applications.map((a) => (
                <li key={a} className="border-b border-hairline pb-3 text-sm">{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Available variants</p>
            <ul className="mt-5 space-y-3">
              {product.variants.map((v) => (
                <li key={v} className="border-b border-hairline pb-3 text-sm">{v}</li>
              ))}
            </ul>
            <p className="eyebrow mt-8">Sizes</p>
            <ul className="mt-5 space-y-3">
              {product.sizes.map((s) => (
                <li key={s} className="border-b border-hairline pb-3 text-sm">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Specifications</p>
            <div className="mt-5">
              <SpecTable rows={product.specs} />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Published specifications are confirmed in writing at quotation stage for your specific order.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-ink py-14 text-ink-foreground md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">Quality</p>
            <h2 className="mt-4 display-2">Produced under one process.</h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink-foreground/70">
              {product.name} is manufactured through the same controlled mixing, moulding, compaction and curing
              sequence used across our range, so units are dimensionally consistent from batch to batch.
            </p>
            <Link
              to="/quality"
              className="mt-7 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-accent hover:underline"
            >
              Quality & manufacturing →
            </Link>
          </div>
          <div>
            <p className="eyebrow text-accent">Frequently asked</p>
            <dl className="mt-5 divide-y divide-hairline-invert border-y border-hairline-invert">
              {product.faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-display text-base font-bold uppercase tracking-tight">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-foreground/65">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="py-14 md:py-20">
          <p className="eyebrow">Related products</p>
          <div className="mt-8 grid gap-px bg-hairline sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/products/$category/$product"
                params={{ category: category.slug, product: r.slug }}
                className="group bg-background p-6 transition-colors hover:bg-concrete"
              >
                <img src={r.image} alt={r.name} loading="lazy" className="aspect-4/3 w-full object-cover" />
                <h3 className="mt-5 font-display text-base font-bold uppercase tracking-tight group-hover:text-accent">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
