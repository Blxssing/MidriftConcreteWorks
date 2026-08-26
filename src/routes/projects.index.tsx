import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { CTABand, PageHero, Section } from "@/components/site/primitives";
import projectYard from "@/assets/project-yard.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "Precast concrete supplied to commercial, residential, institutional and infrastructure projects across Kenya.",
      },
      { property: "og:title", content: "Projects | Midrift Concrete Works" },
      {
        property: "og:description",
        content: "Case studies of paving, block and civil precast supply by Midrift Concrete Works.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Supply in the field"
        lead="A selection of works Midrift has supplied. Quantities and completion details are published only where the client has confirmed them."
        image={projectYard}
        imageAlt="Completed paved commercial yard"
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          {projects.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group">
              <div className="overflow-hidden bg-concrete">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
            decoding="async"
                  className="aspect-16/9 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4">
                <p className="eyebrow">{p.location}</p>
                <p className="eyebrow">{p.type}</p>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight group-hover:text-accent">
                {p.name}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTABand title="Planning a project?" lead="Send us the scope and we will advise on products, quantities and delivery." />
    </>
  );
}
