import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Section, SectionHead, QuoteCTA, WhatsAppCTA } from "@/components/site/primitives";
import { TeamCard } from "@/components/site/TeamCard";
import { membersOf, teamGroups, teamValues } from "@/data/team";
import manufacturingImg from "@/assets/manufacturing.jpg";

const SITE = "https://midriftconcreteworks.com";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "Meet the team behind Midrift Concrete Works, supporting our operations, quality control, finance, procurement, marketing, and customer service.",
      },
      { property: "og:title", content: "Our Team | Midrift Concrete Works" },
      {
        property: "og:description",
        content:
          "The people behind Midrift Concrete Works — leadership, management, quality control, finance, procurement and marketing.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/team` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/team` }],
  }),
  component: TeamPage,
});

function TeamPage() {
  const leadership = membersOf("leadership");
  const management = membersOf("management");
  const core = membersOf("core");

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src={manufacturingImg}
          alt="Midrift Concrete Works production yard in Nakuru"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <Container className="relative py-20 md:py-32">
          <p className="eyebrow text-accent">Meet our team</p>
          <h1 className="mt-5 max-w-4xl display-1">The Team Behind Midrift</h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-foreground/75 md:text-lg">
            People, expertise, and teamwork working together to deliver dependable concrete solutions.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#core-team"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Meet the Team
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-foreground transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Contact Our Team
            </Link>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <SectionHead eyebrow="Introduction" title="Built by People Who Care About the Work" />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              At Midrift Concrete Works, our work is driven by a dedicated team committed to quality, efficiency,
              reliability, and customer satisfaction. From operations and quality control to finance, procurement,
              human resources, and digital marketing, every role contributes to delivering dependable concrete
              solutions to our customers.
            </p>
            <p>
              Behind every product we deliver is a team working across leadership, operations, quality control,
              finance, human resources, procurement, and digital communication. Our people work together to keep the
              business efficient, responsive, and focused on delivering value to our customers.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="eyebrow">
          <span className="font-mono text-accent">{teamGroups[0]!.code}</span> — {teamGroups[0]!.label}
        </p>
        <h2 className="mt-4 display-2">Leadership</h2>
        <div className="mt-10 grid gap-6">
          {leadership.map((m) => (
            <TeamCard key={m.position} member={m} featured />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <p className="eyebrow">
          <span className="font-mono text-accent">{teamGroups[1]!.code}</span> — {teamGroups[1]!.label}
        </p>
        <h2 className="mt-4 display-2">Management</h2>
        <div className="mt-10 grid gap-6">
          {management.map((m) => (
            <TeamCard key={m.position} member={m} featured />
          ))}
        </div>
      </Section>

      <Section id="core-team" className="pt-0">
        <p className="eyebrow">
          <span className="font-mono text-accent">{teamGroups[2]!.code}</span> — {teamGroups[2]!.label}
        </p>
        <h2 className="mt-4 display-2">Our Core Functions</h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{teamGroups[2]!.lead}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((m) => (
            <TeamCard key={m.position} member={m} />
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHead eyebrow="How we work" title="Four things we hold ourselves to." />
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {teamValues.map((v) => (
            <div key={v.title} className="border-t border-hairline-invert pt-6">
              <h3 className="font-display text-lg uppercase tracking-tight">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="soft-card border border-hairline bg-card p-8 md:p-14">
          <h2 className="display-2 max-w-3xl">Need Concrete Solutions for Your Project?</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Our team is ready to help you find the right products and discuss your project requirements.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteCTA />
            <WhatsAppCTA />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer to browse first?{" "}
            <Link to="/products" className="font-semibold text-accent underline underline-offset-4">
              See our product families
            </Link>{" "}
            or{" "}
            <Link to="/delivery" className="font-semibold text-accent underline underline-offset-4">
              check delivery areas
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
