import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { categories } from "@/data/products";

type Row = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  categoryName: string;
  applications: string[];
  image?: string;
};

const allProducts: Row[] = categories.flatMap((c) =>
  c.products.map((p) => ({
    slug: p.slug,
    name: p.name,
    summary: p.summary,
    category: c.slug,
    categoryName: c.name,
    applications: p.applications,
    ...(p.image ? { image: p.image } : {}),
  })),
);

const allApplications = Array.from(new Set(allProducts.flatMap((p) => p.applications))).sort();

const chip =
  "rounded-full border border-hairline px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent";
const chipActive = "border-accent bg-accent text-accent-foreground hover:text-accent-foreground";

export function ProductFinder() {
  const [q, setQ] = useState("");
  const [family, setFamily] = useState("");
  const [application, setApplication] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (family && p.category !== family) return false;
      if (application && !p.applications.includes(application)) return false;
      if (!term) return true;
      return (
        p.name.toLowerCase().includes(term) ||
        p.summary.toLowerCase().includes(term) ||
        p.categoryName.toLowerCase().includes(term) ||
        p.applications.some((a) => a.toLowerCase().includes(term))
      );
    });
  }, [q, family, application]);

  const active = !!(q || family || application);

  return (
    <div id="find-a-product" className="soft-card border border-hairline bg-card p-6 md:p-8">
      <p className="eyebrow">Find a product</p>
      <h2 className="mt-3 font-display text-2xl tracking-tight">Search by name, family or application</h2>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. cabro, culvert, driveway, suspended slab"
          aria-label="Search products"
          className="w-full rounded-full border border-input bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => setFamily("")} className={`${chip} ${!family ? chipActive : ""}`}>
          All families
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFamily(family === c.slug ? "" : c.slug)}
            className={`${chip} ${family === c.slug ? chipActive : ""}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setApplication("")} className={`${chip} ${!application ? chipActive : ""}`}>
          All uses
        </button>
        {allApplications.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setApplication(application === a ? "" : a)}
            className={`${chip} ${application === a ? chipActive : ""}`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {results.length} product{results.length === 1 ? "" : "s"} match
        </p>
        {active && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setFamily("");
              setApplication("");
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-accent"
          >
            <X className="size-3.5" /> Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Nothing matches that yet — we also manufacture to project specification. Send us your requirement and our team
          will confirm options.
        </p>
      ) : (
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <Link
              key={`${p.category}-${p.slug}`}
              to="/products/$category/$product"
              params={{ category: p.category, product: p.slug }}
              className="group flex gap-4 bg-card p-4 transition-colors hover:bg-concrete"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="size-16 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div className="size-16 shrink-0 rounded-xl border border-dashed border-hairline bg-concrete" />
              )}
              <span className="min-w-0">
                <span className="eyebrow block">{p.categoryName}</span>
                <span className="mt-1 block font-display text-sm font-bold uppercase tracking-tight group-hover:text-accent">
                  {p.name}
                </span>
                <span className="mt-1 block line-clamp-2 text-xs text-muted-foreground">{p.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
