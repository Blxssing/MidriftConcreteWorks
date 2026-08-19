export type Solution = {
  slug: string;
  code: string;
  name: string;
  headline: string;
  needs: string[];
  howWeHelp: string[];
  products: { label: string; category: string }[];
  services: string[];
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "contractors",
    code: "01",
    name: "Contractors",
    headline: "Consistent supply that keeps the programme moving.",
    needs: [
      "Reliable quantities delivered on programme",
      "Consistent dimensions to control laying rates",
      "One supplier across paving, blocks and civil units",
      "Clear pricing for tender and valuation",
    ],
    howWeHelp: [
      "Scheduled production against your construction programme",
      "Consolidated supply across multiple product lines",
      "Site delivery coordinated with your works sequence",
      "Direct technical contact for substitutions and queries",
    ],
    products: [
      { label: "Interlocking cabro & heavy-duty paving", category: "cabro-paving" },
      { label: "Hollow, solid and structural blocks", category: "concrete-blocks" },
      { label: "Kerbs, channels and culverts", category: "road-infrastructure" },
    ],
    services: ["Bulk pricing", "Scheduled deliveries", "Custom production runs"],
    cta: "Request contractor pricing",
  },
  {
    slug: "real-estate-developers",
    code: "02",
    name: "Real Estate Developers",
    headline: "Finish quality that shows in the handover.",
    needs: [
      "Visual consistency across phases",
      "Durable external works with low maintenance",
      "Predictable cost across large quantities",
      "Phased delivery as units are released",
    ],
    howWeHelp: [
      "Colour and profile consistency held across production batches",
      "Phase-by-phase delivery scheduling",
      "Decorative and standard ranges specified together",
      "Support on external works detailing",
    ],
    products: [
      { label: "Uni-pavers and decorative paving", category: "cabro-paving" },
      { label: "Decorative and partition blocks", category: "concrete-blocks" },
      { label: "Ventilation block screens", category: "ventilation-blocks" },
    ],
    services: ["Phased supply", "Volume pricing", "Sample sets"],
    cta: "Discuss a development supply plan",
  },
  {
    slug: "hardware-distributors",
    code: "03",
    name: "Hardware Stores & Distributors",
    headline: "Stock that moves, backed by dependable resupply.",
    needs: [
      "Wholesale pricing with workable margins",
      "Consistent product your customers return for",
      "Fast restocking of fast-moving lines",
      "Product information for counter staff",
    ],
    howWeHelp: [
      "Wholesale and distributor pricing structures",
      "Scheduled restocking of core lines",
      "Product specification sheets for your team",
      "Support on new lines and seasonal demand",
    ],
    products: [
      { label: "Interlocking cabro (fast-moving)", category: "cabro-paving" },
      { label: "Hollow and solid blocks", category: "concrete-blocks" },
      { label: "Ventilation blocks", category: "ventilation-blocks" },
    ],
    services: ["Wholesale partnership", "Restocking schedule", "Trade terms"],
    cta: "Apply for wholesale pricing",
  },
  {
    slug: "government-infrastructure",
    code: "04",
    name: "Government & Infrastructure",
    headline: "Volume production for public works programmes.",
    needs: [
      "Capacity to sustain long programmes",
      "Documentation and traceable supply",
      "Products manufactured to civil specification",
      "Delivery to dispersed sites",
    ],
    howWeHelp: [
      "Dedicated production runs for programme quantities",
      "Manufacture to the specification issued by your engineer",
      "Delivery scheduling across multiple sites",
      "Documented order and dispatch records",
    ],
    products: [
      { label: "Road kerbs and barriers", category: "road-infrastructure" },
      { label: "Drainage channels and culverts", category: "road-infrastructure" },
      { label: "Heavy-duty paving", category: "cabro-paving" },
    ],
    services: ["Programme supply", "Tender support", "Multi-site logistics"],
    cta: "Request infrastructure supply information",
  },
  {
    slug: "architects-quantity-surveyors",
    code: "05",
    name: "Architects & Quantity Surveyors",
    headline: "Specification support from design through to tender.",
    needs: [
      "Accurate product data for specification",
      "Options for architectural expression",
      "Quantities and coverage for cost planning",
      "Ability to develop bespoke units",
    ],
    howWeHelp: [
      "Product data and coverage figures for documentation",
      "Custom mould development for signature elements",
      "Samples for material boards and approvals",
      "Direct technical contact during design stages",
    ],
    products: [
      { label: "Decorative paving", category: "cabro-paving" },
      { label: "Custom ventilation block designs", category: "ventilation-blocks" },
      { label: "Custom precast elements", category: "custom-precast" },
    ],
    services: ["Specification support", "Samples", "Custom design development"],
    cta: "Talk to our technical team",
  },
  {
    slug: "home-builders",
    code: "06",
    name: "Individual Home Builders",
    headline: "Straight answers, fair pricing, delivered to your plot.",
    needs: [
      "Guidance on the right product and quantity",
      "Clear pricing without hidden extras",
      "Delivery to a residential plot",
      "Durability that lasts beyond the build",
    ],
    howWeHelp: [
      "Help estimating quantities from your plan or area",
      "Clear written quotations",
      "Delivery arranged to your site",
      "Advice on laying, edging and drainage considerations",
    ],
    products: [
      { label: "Driveway cabro and pavers", category: "cabro-paving" },
      { label: "Hollow and solid blocks", category: "concrete-blocks" },
      { label: "Ventilation blocks", category: "ventilation-blocks" },
    ],
    services: ["Quantity guidance", "Site delivery", "WhatsApp support"],
    cta: "Get a quote for your home",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
