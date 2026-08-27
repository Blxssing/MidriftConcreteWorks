import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Mail, Phone, BookOpen, Clock } from "lucide-react";
import { site, whatsappLink, emailLink } from "@/data/site";
import { Section, Container, CTABand } from "@/components/site/primitives";

type Search = { product?: string; quantity?: string };

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    product: typeof search["product"] === "string" ? search["product"] : undefined,
    quantity: typeof search["quantity"] === "string" ? search["quantity"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Quote Request Received | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "Thank you — your precast concrete quotation request has been received. Here is what happens next and how to reach the Midrift sales team.",
      },
      { property: "og:title", content: "Quote Request Received | Midrift Concrete Works" },
      {
        property: "og:description",
        content: "Your quotation request is with our sales team. Follow up instantly on WhatsApp, email or phone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

const steps = [
  {
    code: "01",
    title: "We review your requirement",
    body: "Our sales team checks the product, quantity and delivery location against current production and stock.",
  },
  {
    code: "02",
    title: "You receive a written quotation",
    body: "Unit pricing, bulk rates where applicable, lead time and transport cost — sent by WhatsApp or email.",
  },
  {
    code: "03",
    title: "Production and delivery scheduled",
    body: "Once confirmed, your order is slotted into the production programme and delivered to site.",
  },
];

function ThankYouPage() {
  const { product, quantity } = useSearch({ from: "/thank-you" });
  const summary = [product, quantity].filter(Boolean).join(" · ");
  const followUp = `Hello Midrift Concrete Works, I have just submitted a quote request${
    product ? ` for ${product}` : ""
  }${quantity ? ` (${quantity})` : ""}. Following up.`;

  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp sales",
      value: "Fastest reply — usually within working hours",
      href: whatsappLink(followUp),
      external: true,
    },
    {
      icon: Phone,
      label: `Call ${site.phone}`,
      value: "Speak directly to the sales desk",
      href: site.phoneHref,
    },
    {
      icon: Phone,
      label: `Call ${site.phoneAlt}`,
      value: "Alternative line",
      href: site.phoneAltHref,
    },
    {
      icon: Mail,
      label: site.email,
      value: "Send drawings, BQs or specifications",
      href: emailLink(
        `Quotation follow-up — ${product || "Precast concrete"}`,
        `${followUp}\n\nAdditional details:\n`,
      ),
    },
    {
      icon: BookOpen,
      label: "WhatsApp catalogue",
      value: "Browse the full product range",
      href: site.whatsappCatalog,
      external: true,
    },
  ];

  return (
    <>
      <section className="bg-ink text-ink-foreground" data-cta-zone="thank-you-hero">
        <Container className="py-24 md:py-32">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            <CheckCircle2 className="size-4" /> Request received
          </span>
          <h1 className="mt-7 max-w-4xl display-1">Thank you — your quote request is with our sales team.</h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-foreground/75">
            {summary
              ? `We have your request for ${summary}. `
              : "We have your request. "}
            A member of the Midrift team will respond with a written quotation, lead time and delivery cost.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-foreground/70">
            <Clock className="size-4 text-accent" /> {site.hours}
          </p>
        </Container>
      </section>

      <Section>
        <p className="eyebrow">What happens next</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.code} className="border-t border-hairline pt-6">
              <span className="font-mono text-xs text-accent">{s.code}</span>
              <h2 className="mt-3 font-display text-xl tracking-tight">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0" >
        <div className="soft-card border border-hairline bg-card p-6 md:p-10" data-cta-zone="thank-you-followup">
          <p className="eyebrow">Need an answer sooner? Follow up now</p>
          <ul className="mt-6 space-y-px overflow-hidden rounded-2xl bg-hairline">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="flex items-center gap-4 bg-background px-5 py-4 transition-colors hover:bg-concrete"
                >
                  <c.icon className="size-5 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{c.label}</span>
                    <span className="block text-xs text-muted-foreground">{c.value}</span>
                  </span>
                  <span className="ml-auto text-accent">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              to="/products"
              className="text-[12px] font-bold uppercase tracking-[0.12em] underline-offset-4 hover:underline"
            >
              Continue browsing products →
            </Link>
            <Link
              to="/"
              className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground hover:text-accent"
            >
              Back to home →
            </Link>
          </div>
        </div>
      </Section>

      <CTABand title="Have another requirement to price?" />
    </>
  );
}
