import { createFileRoute } from "@tanstack/react-router";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site/primitives";
import logisticsImg from "@/assets/logistics.jpg";
import { site } from "@/data/site";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Logistics | Midrift Concrete Solutions" },
      {
        name: "description",
        content:
          "Project-site delivery, bulk deliveries, trucking, loading and delivery scheduling for precast concrete orders.",
      },
      { property: "og:title", content: "Delivery & Logistics | Midrift Concrete Solutions" },
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

      <CTABand title="Confirm delivery to your site." lead="Share your location and required date and we will confirm scheduling and cost." />
    </>
  );
}
