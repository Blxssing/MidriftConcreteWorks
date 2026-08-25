import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { PageHero, Section } from "@/components/site/primitives";
import { QuoteForm } from "@/components/site/QuoteForm";
import yard from "@/assets/project-yard.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Quotes | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "Request a written quotation for precast concrete products. Call, email or WhatsApp the Midrift sales team in Nakuru, Kenya.",
      },
      { property: "og:title", content: "Contact & Quotes | Midrift Concrete Works" },
      {
        property: "og:description",
        content: "Send your product, quantity and delivery location for a written quotation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
  { icon: Phone, label: "Phone (alt)", value: site.phoneAlt, href: site.phoneAltHref },
  { icon: MessageCircle, label: "WhatsApp", value: `${site.phoneAlt} — chat with sales`, href: whatsappLink() },
  {
    icon: BookOpen,
    label: "WhatsApp Catalogue",
    value: "Browse the full product catalogue",
    href: site.whatsappCatalog,
  },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Location", value: site.location },
  { icon: Clock, label: "Hours", value: site.hours },
];

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a quotation"
        lead="Tell us the product, quantity and delivery location. Our team replies with a written quotation and lead time."
        image={yard}
        imageAlt="Midrift concrete production yard"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="eyebrow">Direct lines</p>
            <ul className="mt-6 space-y-px overflow-hidden rounded-2xl bg-hairline">
              {details.map((d) => {
                const Icon = d.icon;
                const content = (
                  <span className="flex items-start gap-4 bg-card p-5">
                    <Icon className="mt-0.5 size-5 text-accent" />
                    <span>
                      <span className="eyebrow block">{d.label}</span>
                      <span className="mt-1 block text-sm font-semibold">{d.value}</span>
                    </span>
                  </span>
                );
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="block transition-colors hover:text-accent"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
