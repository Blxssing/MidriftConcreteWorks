import a0 from "@/assets/project-IMG-20260828-WA0000.jpg.asset.json";
import a1 from "@/assets/project-IMG-20260828-WA0001.jpg.asset.json";
import a2 from "@/assets/project-IMG-20260828-WA0002.jpg.asset.json";
import a3 from "@/assets/project-IMG-20260828-WA0003.jpg.asset.json";
import a4 from "@/assets/project-IMG-20260828-WA0004.jpg.asset.json";
import a5 from "@/assets/project-IMG-20260828-WA0005.jpg.asset.json";
import a6 from "@/assets/project-IMG-20260828-WA0006.jpg.asset.json";
import a7 from "@/assets/project-IMG-20260828-WA0007.jpg.asset.json";

export type Project = {
  slug: string;
  name: string;
  location: string;
  type: string;
  quantity: string;
  application: string;
  description: string;
  image: string;
  gallery: string[];
  productsSupplied: { label: string; category: string }[];
  completion: string;
};

export const projects: Project[] = [
  {
    slug: "residential-home-driveway-paving",
    name: "Residential Home Driveway & Compound Paving",
    location: "Nakuru County",
    type: "Private residence",
    quantity: "Quantity available on request",
    application: "Driveway, compound apron and entrance paving",
    description:
      "Charcoal-toned wave (fan) interlocking cabro laid across the driveway and compound of a completed family home, finished against precast dwarf kerbs and a paved entrance step run. The darker blocks were selected to hide tyre marking on the vehicle route while the lighter cabro defines the walkway and parking edge.",
    image: a3.url,
    gallery: [a3.url, a7.url, a4.url],
    productsSupplied: [
      { label: "Wave / fan interlocking cabro", category: "cabro" },
      { label: "Dwarf kerbs and edge restraints", category: "road-concrete" },
    ],
    completion: "Completed — client confirmed",
  },
  {
    slug: "estate-paving-phased-delivery",
    name: "Estate Paving — Phased Site Delivery",
    location: "Nakuru County",
    type: "Residential development",
    quantity: "Delivered in scheduled truck loads",
    application: "Compound paving and hardstanding",
    description:
      "Cabro offloaded straight from the delivery truck to the laying gang, with two-tone wave pavers set out as the bed advances. Deliveries were phased to the crew's laying rate so blocks, kerbs and screed sand were on site without clogging the working area.",
    image: a1.url,
    gallery: [a1.url, a4.url],
    productsSupplied: [
      { label: "Wave interlocking cabro (two tones)", category: "cabro" },
      { label: "Kerbs", category: "road-concrete" },
    ],
    completion: "Supply completed",
  },
  {
    slug: "roadside-walkway-paving",
    name: "Roadside Pedestrian Walkway",
    location: "Rift Valley region",
    type: "Public / infrastructure works",
    quantity: "Quantity available on request",
    application: "Pedestrian walkway with concrete edge restraint",
    description:
      "Rectangular pavers laid in a 45° herringbone bond along a busy trading-centre road, bounded by cast edge beams. Herringbone was specified because it locks under foot and light vehicle loading far better than stretcher bond on a long linear walkway.",
    image: a5.url,
    gallery: [a5.url],
    productsSupplied: [
      { label: "Rectangular paving blocks", category: "cabro" },
      { label: "Edge kerbs", category: "road-concrete" },
    ],
    completion: "Completed",
  },
  {
    slug: "hexagonal-paving-yard",
    name: "Hexagonal Paving — Courtyard Hardstanding",
    location: "Nakuru County",
    type: "Commercial / institutional",
    quantity: "Quantity available on request",
    application: "Courtyard and service yard surfacing",
    description:
      "Hexagonal precast pavers laid tight across a service courtyard. The six-sided unit interlocks on every face, which keeps the surface stable under turning wheel loads and makes small repairs simple — single units lift and reset without disturbing the field.",
    image: a2.url,
    gallery: [a2.url],
    productsSupplied: [{ label: "Hexagonal paving blocks", category: "cabro" }],
    completion: "Completed",
  },
  {
    slug: "tbeam-suspended-slab",
    name: "T-Beam & Filler Block Suspended Slab",
    location: "Nakuru County",
    type: "Residential structure",
    quantity: "Beams and filler blocks to slab schedule",
    application: "Suspended floor / tank cover slab",
    description:
      "Precast T-beams set at design centres with filler blocks infilled between them to form a suspended slab over a lined underground tank. The system removes most of the formwork and props a conventional in-situ slab needs, so the deck is loaded out and topped within a day of the beams arriving.",
    image: a6.url,
    gallery: [a6.url],
    productsSupplied: [
      { label: "Precast T-beams", category: "t-beam" },
      { label: "Filler blocks", category: "concrete-blocks" },
    ],
    completion: "Completed",
  },
  {
    slug: "borehole-site-perimeter-fencing",
    name: "Solar Borehole Site — Precast Perimeter Fencing",
    location: "Rift Valley region",
    type: "Water / infrastructure project",
    quantity: "Posts and struts to fence line",
    application: "Perimeter security fencing and equipment enclosure",
    description:
      "Precast concrete fence posts, corner posts and angled struts supplied for the security fence around a solar-powered borehole, pump house and elevated tank base. Concrete posts were chosen over timber for termite and fire resistance on an exposed rural site with no maintenance crew nearby.",
    image: a0.url,
    gallery: [a0.url],
    productsSupplied: [
      { label: "Concrete fence posts and struts", category: "custom-precast" },
      { label: "Concrete blocks", category: "concrete-blocks" },
    ],
    completion: "Completed",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
