import { createFileRoute } from "@tanstack/react-router";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site/primitives";
import logisticsImg from "@/assets/logistics.jpg";
import { site } from "@/data/site";
import { useQuote } from "@/components/site/QuoteProvider";
import { Mail, MessageCircle, Music2, Phone } from "lucide-react";
import { DeliveryMap } from "@/components/site/DeliveryMap";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Logistics | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "Project-site delivery, bulk deliveries, trucking, loading and delivery scheduling for precast concrete orders.",
      },
      { property: "og:title", content: "Delivery & Logistics | Midrift Concrete Works" },
      {
        property: "og:description",
        content: "How Midrift loads, trucks and schedules precast concrete deliveries to site.",
      },
    ],
  }),
  component: DeliveryPage,
});

const process = [
  { code: "01", title: "Order confirmed", body: "Products, quantities and delivery location are agreed in the quotation." },
  { code: "02", title: "Delivery scheduled", body: "We agree delivery dates with you, phased where the order is large." },
  { code: "03", title: "Loading", body: "Units are loaded and secured on pallets at the yard for safe transit." },
  { code: "04", title: "Transit", body: "Trucking is arranged to match the load size and the access at your site." },
  { code: "05", title: "Site offloading", body: "Offloading arrangements are confirmed in advance with your site team." },
  { code: "06", title: "Confirmation", body: "Delivered quantities are recorded and confirmed against the order." },
];

function DeliveryPage() {
  const { openQuote } = useQuote();
  return (
    <>
      <PageHero
        eyebrow="Delivery & logistics"
        title="From our yard to your site"
        lead="Delivery is planned as part of the order, not treated as an afterthought once production is finished."
        image={logisticsImg}
        imageAlt="Truck loaded with precast concrete pallets"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Delivery areas</p>
            <h2 className="mt-4 display-2">Where we deliver</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Midrift operates from {site.location}. Delivery areas, transport charges and lead times are confirmed for
              each order based on your site location, access and load size.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We publish confirmed service areas only. Contact our team with your location and we will confirm whether
              we can deliver and what it will cost.
            </p>
          </div>
          <div>
            <p className="eyebrow">Delivery services</p>
            <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
              {[
                "Project-site delivery coordinated with your works programme",
                "Bulk deliveries for contractors, developers and distributors",
                "Trucking arranged to suit load size and site access",
                "Palletised loading for safe transit and reduced breakage",
                "Scheduled and phased deliveries for large orders",
                "Delivery quantities recorded and confirmed on dispatch",
              ].map((x) => (
                <li key={x} className="py-4 text-sm leading-relaxed">{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHead
          eyebrow="Service map"
          title="Where we deliver, confirmed."
          lead="The highlighted areas are confirmed delivery zones. Anywhere else, share your site location and we will confirm cost and lead time."
        />
        <div className="mt-10">
          <DeliveryMap />
        </div>
      </Section>

      <Section dark>
        <SectionHead eyebrow="Delivery process" title="Six steps, agreed in advance." />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p) => (
            <div key={p.code} className="border-t border-hairline-invert pt-6">
              <span className="font-mono text-xs text-accent">{p.code}</span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Talk to logistics"
          title="Fastest ways to book a delivery"
          lead="Message, call or email our delivery desk directly — we confirm scheduling and transport cost the same day."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => openQuote({})}
            aria-label="WhatsApp us to arrange delivery — opens the quote request form"
            className="hover-lift flex items-center gap-3 rounded-2xl bg-[var(--wa)] p-5 text-left text-[var(--wa-foreground)] shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <MessageCircle className="size-6 shrink-0" />
            <span>
              <span className="block text-base font-semibold">WhatsApp us</span>
              <span className="block text-sm opacity-90">{site.whatsappDisplay}</span>
            </span>
          </button>
          <a
            href={site.phoneHref}
            className="hover-lift flex items-center gap-3 rounded-2xl bg-ink p-5 text-ink-foreground shadow-lg"
          >
            <Phone className="size-6 shrink-0" />
            <span>
              <span className="block text-base font-semibold">Call delivery desk</span>
              <span className="block text-sm opacity-80">{site.phone}</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => openQuote({})}
            aria-label="Email logistics — opens the quote request form"
            className="hover-lift flex items-center gap-3 rounded-2xl border border-hairline bg-card p-5 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Mail className="size-6 shrink-0 text-accent" />
            <span>
              <span className="block text-base font-semibold">Email logistics</span>
              <span className="block text-sm text-muted-foreground">{site.email}</span>
            </span>
          </button>
          <a
            href={site.socials[0].href}
            target="_blank"
            rel="noopener"
            className="hover-lift flex items-center gap-3 rounded-2xl border border-hairline bg-card p-5 shadow-sm"
          >
            <Music2 className="size-6 shrink-0 text-accent" />
            <span>
              <span className="block text-base font-semibold">See deliveries on TikTok</span>
              <span className="block text-sm text-muted-foreground">@midriftconcreteworks</span>
            </span>
          </a>
        </div>
      </Section>

      <CTABand title="Confirm delivery to your site." lead="Share your location and required date and we will confirm scheduling and cost." />

    </>
  );
}
