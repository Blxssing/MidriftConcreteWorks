import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/data/projects";
import { CTABand, Gallery, PageHero, Section, SpecTable } from "@/components/site/primitives";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { name: project.name, description: project.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found | Midrift" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} | Midrift Projects`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const p = getProject(slug)!;
  const others = projects.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Project" title={p.name} lead={p.description} image={p.image} imageAlt={p.name} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SpecTable
              rows={[
                { label: "Location", value: p.location },
                { label: "Project type", value: p.type },
                { label: "Application", value: p.application },
                { label: "Quantity", value: p.quantity },
                { label: "Completion", value: p.completion },
              ]}
            />
            <p className="eyebrow mt-10">Products supplied</p>
            <ul className="mt-5 space-y-4">
              {p.productsSupplied.map((prod) => (
                <li key={prod.label}>
                  <Link
                    to="/products/$category"
                    params={{ category: prod.category }}
                    className="group flex items-baseline justify-between gap-4 border-b border-hairline pb-4 font-display text-lg font-bold uppercase tracking-tight hover:text-accent"
                  >
                    {prod.label}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Gallery images={p.gallery} alt={p.name} />
        </div>
      </Section>

      {others.length > 0 && (
        <Section className="bg-concrete">
          <p className="eyebrow">More projects</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to="/projects/$slug" params={{ slug: o.slug }} className="group">
                <img src={o.image} alt={o.name} loading="lazy" className="aspect-4/3 w-full object-cover" />
                <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight group-hover:text-accent">
                  {o.name}
                </h3>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABand title="Need supply for similar works?" />
    </>
  );
}
