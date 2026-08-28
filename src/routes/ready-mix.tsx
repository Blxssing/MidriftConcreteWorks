import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHead, PageHero, QuoteCTA, WhatsAppCTA, CTABand } from "@/components/site/primitives";
import { site } from "@/data/site";
import manufacturingImg from "@/assets/manufacturing.jpg";

const SITE = "https://midrift-prime-solutions.lovable.app";

export const Route = createFileRoute("/ready-mix")({
  head: () => ({
    meta: [
      { title: "Ready-Mix Concrete | Grades, Slump & Delivery | Midrift Concrete Works" },
      {
        name: "description",
        content:
          "Ready-mix concrete from Midrift Concrete Works, Nakuru: concrete grades, mix options, slump, minimum order, truck capacity, delivery radius, lead times, testing and ordering process.",
      },
      { property: "og:title", content: "Ready-Mix Concrete | Midrift Concrete Works" },
      {
        property: "og:description",
        content: "Grades, slump, minimum order, truck capacity, delivery radius, lead times and testing for ready-mix concrete in Nakuru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/ready-mix` }],
  }),
  component: ReadyMixPage,
});

const grades = [
  { grade: "C15 / Class 15", use: "Blinding, mass fill, non-structural bases", note: "Nominal mix, unreinforced work" },
  { grade: "C20 / Class 20", use: "Ground slabs, foundations, light structural work", note: "Common domestic grade" },
  { grade: "C25 / Class 25", use: "Suspended slabs, columns, beams, ring beams", note: "Most requested structural grade" },
  { grade: "C30 / Class 30", use: "Heavy-duty slabs, driveways, water-retaining work", note: "Designed mix" },
  { grade: "C35 and above", use: "Bridge decks, industrial floors, precast structural units", note: "Designed mix, on request" },
];

const facts = [
  { k: "Mix options", v: "Nominal or designed mixes; sulphate-resistant cement, plasticiser, retarder, waterproofing and pumping admixtures available on request." },
  { k: "Slump", v: "Typically 50–100 mm for standard placement and 100–150 mm for pumped or congested-reinforcement pours. State the required slump on order." },
  { k: "Minimum order", v: "Part loads are accepted, but a short-load charge applies below a full truck. Confirm the current minimum with the sales desk when booking." },
  { k: "Truck capacity", v: "Transit mixers are loaded per truck to the volume confirmed at booking; large pours are sequenced across multiple loads to avoid cold joints." },
  { k: "Delivery radius", v: "Nakuru town and the surrounding county as standard, with wider Rift Valley deliveries quoted per site. Access, gradient and turning space are checked before dispatch." },
  { k: "Lead time", v: "Book ahead of the pour date. Same-week slots are usually possible; large or early-morning pours should be confirmed in advance." },
  { k: "Testing", v: "Slump testing at discharge and cube sampling for 7-day and 28-day compressive strength, with results issued against your delivery reference." },
  { k: "Pumping", v: "Pumping is arranged through partner plant where a site needs it. Tell us the pour height and distance and we will confirm availability with the quote." },
  { k: "Documentation", v: "Every load is delivered with a batch/delivery ticket recording grade, volume, time of batching and mix details for your records and the engineer's file." },
];

const steps = [
  "Send the pour details: grade, volume in cubic metres, slump, date and time, and the site location.",
  "We confirm mix design, price, truck sequencing and access requirements in writing.",
  "Book the slot — confirmed pours are scheduled and the batching plan is fixed.",
  "Delivery in transit mixers, discharged continuously to keep the pour monolithic.",
  "Slump test at discharge, cubes taken where specified, delivery ticket signed on site.",
  "Test certificates issued at 7 and 28 days against your delivery reference.",
];

function ReadyMixPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Ready-Mix Concrete"
        lead="Batched to specification and delivered fresh in transit mixers — with the grades, slump, testing and paperwork your engineer expects."
        image={manufacturingImg}
        imageAlt="Concrete production at the Midrift yard in Nakuru"
      />

      <Section>
        <SectionHead eyebrow="Grades" title="Concrete grades and where they are used" />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th className="py-4 pr-4 eyebrow">Grade</th>
                <th className="py-4 pr-4 eyebrow">Typical use</th>
                <th className="py-4 eyebrow">Notes</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.grade} className="border-b border-hairline">
                  <td className="py-4 pr-4 font-semibold">{g.grade}</td>
                  <td className="py-4 pr-4 text-muted-foreground">{g.use}</td>
                  <td className="py-4 text-muted-foreground">{g.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Final mix design is confirmed against your structural engineer's specification before batching. Where a
          designed mix is required, send the specification with your enquiry.
        </p>
      </Section>

      <Section className="pt-0">
        <SectionHead eyebrow="Technical" title="Supply, delivery and testing" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k} className="soft-card border border-hairline bg-card p-6">
              <h3 className="font-display text-lg uppercase tracking-tight">{f.k}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHead eyebrow="Ordering" title="How to order a pour" />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s} className="border-t border-hairline-invert pt-5">
              <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/75">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <QuoteCTA />
          <WhatsAppCTA />
        </div>
        <p className="mt-6 text-sm text-ink-foreground/60">
          Yard and office: {site.address} · {site.hours}
        </p>
      </Section>

      <Section>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Looking for precast instead?{" "}
          <Link to="/products" className="font-semibold text-accent underline underline-offset-4">
            See our precast product families
          </Link>{" "}
          or{" "}
          <Link to="/delivery" className="font-semibold text-accent underline underline-offset-4">
            check delivery and logistics
          </Link>
          .
        </p>
      </Section>

      <CTABand
        title="Booking a pour?"
        lead="Send the grade, volume, slump and pour date and we will confirm price, trucks and timing."
      />
    </>
  );
}
