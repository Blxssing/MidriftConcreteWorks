import { createFileRoute } from "@tanstack/react-router";
import { Star, MapPin, MessageCircle, PenLine } from "lucide-react";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site/primitives";
import { site } from "@/data/site";
import projectYard from "@/assets/project-yard.jpg";

const SITE = "https://midriftconcreteworks.com";

const proof = [
  {
    title: "Read our Google reviews",
    copy: "Every review on our profile is left by a verified Google account — nothing on this page is written by us.",
    href: site.reviewsUrl,
    action: "View reviews on Google",
    icon: Star,
  },
  {
    title: "Visit the yard",
    copy: "Old Nairobi Road, Nakuru. Walk the yard, inspect stock and see the moulds and curing beds for yourself.",
    href: site.mapsUrl,
    action: "Open in Google Maps",
    icon: MapPin,
  },
  {
    title: "Talk to us on WhatsApp",
    copy: "Ask for references on a product family or a project type similar to yours and we'll share them directly.",
    href: site.whatsappCatalog,
    action: "Open WhatsApp catalogue",
    icon: MessageCircle,
  },
];

export const Route = createFileRoute("/testimonials")({
  head: () => {
    const title = "Customer Reviews & Testimonials | Midrift Concrete Works";
    const description =
      "Read verified Google reviews for Midrift Concrete Works in Nakuru, visit our yard on Old Nairobi Road, or leave a review after your delivery.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE}/testimonials` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE}/testimonials` }],
    };
  },
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What our customers say"
        lead="We don't publish invented reviews. Everything here points to verified, first-hand feedback you can check yourself."
        image={projectYard}
        imageAlt="Midrift Concrete Works yard"
      />

      <Section>
        <SectionHead
          eyebrow="Verified feedback"
          title="Proof you can check"
          lead="Contractors, developers and homeowners across the Rift Valley buy from us repeatedly. Here is where to see it."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {proof.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="ios-glass hover-lift flex flex-col rounded-[28px] p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl tracking-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                <span className="mt-5 text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
                  {p.action} →
                </span>
              </a>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="ios-glass flex flex-col gap-6 rounded-[32px] p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-xl">
            <h2 className="display-2">Bought from us before?</h2>
            <p className="mt-4 text-muted-foreground">
              A short, honest review helps other builders in Nakuru find a supplier they can trust.
            </p>
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="ios-cta inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[13px] font-bold tracking-tight text-accent-foreground"
          >
            <PenLine className="size-[18px]" /> Leave a Google review
          </a>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
