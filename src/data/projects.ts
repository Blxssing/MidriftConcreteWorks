import projectYard from "@/assets/project-yard.jpg";
import cabroImg from "@/assets/cabro.jpg";
import blocksImg from "@/assets/blocks.jpg";
import infraImg from "@/assets/infrastructure.jpg";
import ventImg from "@/assets/vent.jpg";

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
    slug: "commercial-parking-yard",
    name: "Commercial Parking Yard",
    location: "Nakuru County",
    type: "Commercial development",
    quantity: "Quantity available on request",
    application: "Parking and vehicle circulation paving",
    description:
      "Supply of interlocking cabro and edge kerbs for a commercial parking yard, with deliveries phased to match the paving contractor's laying rate.",
    image: projectYard,
    gallery: [projectYard, cabroImg],
    productsSupplied: [
      { label: "Interlocking cabro", category: "cabro" },
      { label: "Road kerbs", category: "road-concrete" },
    ],
    completion: "Completion details to be confirmed",
  },
  {
    slug: "residential-estate-external-works",
    name: "Residential Estate External Works",
    location: "Rift Valley region",
    type: "Residential estate",
    quantity: "Quantity available on request",
    application: "Estate roads, driveways and walkways",
    description:
      "Paving supply across an estate's external works package, holding profile and colour consistency across successive delivery phases.",
    image: cabroImg,
    gallery: [cabroImg, projectYard],
    productsSupplied: [
      { label: "Uni-pavers", category: "cabro" },
      { label: "Decorative paving", category: "cabro" },
    ],
    completion: "Completion details to be confirmed",
  },
  {
    slug: "institutional-walling-package",
    name: "Institutional Walling Package",
    location: "Nakuru County",
    type: "Institutional building",
    quantity: "Quantity available on request",
    application: "Structural and partition walling",
    description:
      "Block supply for an institutional building programme, delivered in scheduled batches to keep masonry gangs continuously supplied.",
    image: blocksImg,
    gallery: [blocksImg],
    productsSupplied: [
      { label: "Hollow blocks", category: "concrete-blocks" },
      { label: "Partition blocks", category: "concrete-blocks" },
    ],
    completion: "Completion details to be confirmed",
  },
  {
    slug: "road-drainage-supply",
    name: "Road Drainage Supply",
    location: "Rift Valley region",
    type: "Infrastructure / civil works",
    quantity: "Quantity available on request",
    application: "Surface water drainage and edge restraint",
    description:
      "Supply of kerbs and precast drainage channels for a road improvement package, produced in dedicated runs to the civil specification.",
    image: infraImg,
    gallery: [infraImg],
    productsSupplied: [
      { label: "Road kerbs", category: "road-concrete" },
      { label: "Drainage channels", category: "road-concrete" },
    ],
    completion: "Completion details to be confirmed",
  },
  {
    slug: "hospitality-screen-walls",
    name: "Hospitality Screen Walls",
    location: "Kenya",
    type: "Hospitality development",
    quantity: "Quantity available on request",
    application: "Ventilated architectural screen walls",
    description:
      "Ventilation block supply for architectural screen walls providing airflow, daylight and privacy across service and circulation areas.",
    image: ventImg,
    gallery: [ventImg],
    productsSupplied: [{ label: "Ventilation blocks", category: "ventilation-blocks" }],
    completion: "Completion details to be confirmed",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
