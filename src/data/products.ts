import cabroImg from "@/assets/cabro.jpg";
import blocksImg from "@/assets/blocks.jpg";
import blocksAAsset from "@/assets/blocks-a.jpg.asset.json";
import blocksBAsset from "@/assets/blocks-b.jpg.asset.json";
import bal15Asset from "@/assets/balustrade-15ft.jpg.asset.json";
import bal2Asset from "@/assets/balustrade-2ft.jpg.asset.json";
import bal3Asset from "@/assets/balustrade-3ft.jpg.asset.json";

const blocksAImg = blocksAAsset.url;
const blocksBImg = blocksBAsset.url;
const bal15Img = bal15Asset.url;
const bal2Img = bal2Asset.url;
const bal3Img = bal3Asset.url;
import ventImg from "@/assets/vent.jpg";
import infraImg from "@/assets/infrastructure.jpg";
import manufacturingImg from "@/assets/manufacturing.jpg";

export const TBC = "Specification to be confirmed";

export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  applications: string[];
  variants: string[];
  sizes: string[];
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

export type Category = {
  slug: string;
  name: string;
  code: string;
  intro: string;
  description: string;
  image: string;
  products: Product[];
};

const spec = (labels: string[]) => labels.map((label) => ({ label, value: TBC }));

const baseFaqs = (name: string) => [
  {
    q: `What is the minimum order for ${name.toLowerCase()}?`,
    a: "Minimum order quantities depend on the variant and delivery location. Send us your requirement and our team will confirm.",
  },
  {
    q: "Can Midrift produce custom sizes or finishes?",
    a: "Yes. We manufacture to project specification, including custom moulds and bulk production runs for contractors and developers.",
  },
  {
    q: "Do you deliver to site?",
    a: "Yes. We arrange trucking and scheduled site delivery. Delivery areas and charges are confirmed at quotation stage.",
  },
];

const p = (
  category: string,
  slug: string,
  name: string,
  summary: string,
  description: string,
  image: string,
  applications: string[],
  variants: string[],
  sizes: string[],
  specLabels: string[],
): Product => ({
  slug,
  name,
  category,
  summary,
  description,
  image,
  gallery: [image],
  applications,
  variants,
  sizes,
  specs: spec(specLabels),
  faqs: baseFaqs(name),
});

const paveSpecs = ["Thickness", "Compressive strength", "Coverage per m²", "Colour options", "Surface finish"];
const blockSpecs = ["Nominal size", "Compressive strength", "Weight per unit", "Units per m²", "Finish"];

export const categories: Category[] = [
  {
    slug: "cabro-paving",
    name: "Cabro & Paving",
    code: "01",
    intro: "Interlocking paving engineered for traffic, drainage and long service life.",
    description:
      "Midrift manufactures interlocking cabro and paving units for driveways, parking yards, walkways, estates, industrial hardstands and commercial developments. Every batch is produced under controlled mixing and compaction for consistent dimension and strength.",
    image: cabroImg,
    products: [
      p("cabro-paving", "interlocking-cabro", "Interlocking Cabro", "The standard workhorse paver for driveways, yards and estate roads.", "Our core interlocking cabro is produced for dimensional consistency so blocks lock tightly, distribute load evenly and resist rutting under repeated traffic.", cabroImg, ["Driveways", "Parking yards", "Estate roads", "Walkways"], ["Standard grey", "Coloured", "Heavy-duty"], ["Multiple thicknesses available"], paveSpecs),
      p("cabro-paving", "zigzag-paver", "Zigzag Paver", "High-interlock profile for areas carrying constant vehicle movement.", "The zigzag profile produces a tight mechanical interlock across the paved field, making it a preferred choice for loading yards, petrol stations and access roads.", cabroImg, ["Loading yards", "Petrol stations", "Access roads"], ["Standard grey", "Coloured"], ["Multiple thicknesses available"], paveSpecs),
      p("cabro-paving", "i-shape-paver", "I-Shape Paver", "Dense interlocking pattern for heavy and industrial traffic.", "I-shape units bind laterally in both directions, giving strong resistance to horizontal movement in industrial and logistics environments.", cabroImg, ["Industrial hardstands", "Container yards", "Bus bays"], ["Standard grey", "Coloured"], ["Multiple thicknesses available"], paveSpecs),
      p("cabro-paving", "uni-paver", "Uni-Paver", "A clean, uniform profile with a refined finished appearance.", "Uni-pavers combine structural interlock with a tidy, repeatable visual rhythm — suited to commercial frontages and premium residential works.", cabroImg, ["Commercial frontages", "Residential driveways", "Courtyards"], ["Standard grey", "Coloured"], ["Multiple thicknesses available"], paveSpecs),
      p("cabro-paving", "square-rectangular-pavers", "Square & Rectangular Pavers", "Simple geometry for patios, pathways and landscaped areas.", "Square and rectangular units allow straightforward laying patterns and clean edges for landscaped and pedestrian areas.", cabroImg, ["Patios", "Pathways", "Landscaping", "Pool surrounds"], ["Square", "Rectangular", "Coloured"], ["Multiple sizes available"], paveSpecs),
      p("cabro-paving", "decorative-paving", "Decorative Paving", "Pattern and colour options for architectural landscaping.", "Decorative paving lets architects and landscapers set out colour banding, borders and feature areas without compromising structural performance.", cabroImg, ["Hotels & resorts", "Estates", "Public realm", "Feature borders"], ["Colour blends", "Textured finish", "Feature borders"], ["Custom sizes on request"], paveSpecs),
      p("cabro-paving", "heavy-duty-paving", "Heavy-Duty Paving", "Thicker units for ports, depots and heavy axle loads.", "Heavy-duty paving is produced at increased thickness and compaction for locations subject to heavy axle loads and continuous plant movement.", cabroImg, ["Depots", "Ports & logistics", "Industrial parks", "Weighbridges"], ["Heavy-duty grey", "Heavy-duty coloured"], ["Increased thickness options"], paveSpecs),
      p("cabro-paving", "custom-paving-designs", "Custom Paving Designs", "Bespoke shapes, colours and moulds for specific projects.", "Where a project requires a paving unit that is not in our standard range, we develop the mould and run production to the agreed specification.", cabroImg, ["Signature developments", "Branded spaces", "Special profiles"], ["Custom mould", "Custom colour"], ["To project specification"], paveSpecs),
    ],
  },
  {
    slug: "concrete-blocks",
    name: "Concrete Blocks",
    code: "02",
    intro: "Masonry units produced to consistent dimension for faster, cleaner walling.",
    description:
      "Our concrete block range covers structural, infill and partition walling for residential, commercial and institutional buildings. Consistent dimensions reduce mortar wastage and speed up masonry on site.",
    image: blocksAImg,
    products: [
      p("concrete-blocks", "hollow-blocks", "Hollow Blocks", "Lighter walling units with cores for services and reduced dead load.", "Hollow blocks reduce wall dead load and allow services and reinforcement to be routed through the cores.", blocksAImg, ["External walling", "Internal walling", "Boundary walls"], ["Standard", "Reinforced core"], ["Multiple nominal sizes"], blockSpecs),
      p("concrete-blocks", "solid-blocks", "Solid Blocks", "Dense units where mass, strength and acoustics matter.", "Solid blocks provide higher mass for load-bearing walls, retaining structures and acoustic separation.", blocksBImg, ["Load-bearing walls", "Retaining structures", "Boundary walls"], ["Standard", "High-density"], ["Multiple nominal sizes"], blockSpecs),
      p("concrete-blocks", "partition-blocks", "Partition Blocks", "Slim units for fast internal subdivision.", "Partition blocks give a lighter, thinner section for internal subdivision, reducing structural load and speeding up fit-out.", blocksImg, ["Internal partitions", "Office fit-out", "Institutional buildings"], ["Standard"], ["Multiple thicknesses"], blockSpecs),
      p("concrete-blocks", "structural-blocks", "Structural Blocks", "Engineered walling units for load-bearing applications.", "Structural blocks are produced for projects where the walling contributes to load transfer, with strength targets agreed at order stage.", blocksImg, ["Load-bearing walls", "Multi-storey walling", "Industrial buildings"], ["Standard", "To engineer's specification"], ["To project specification"], blockSpecs),
      p("concrete-blocks", "decorative-blocks", "Decorative Blocks", "Face-quality units for exposed masonry.", "Decorative blocks are produced with a controlled face finish for walls that remain exposed in the finished building.", blocksImg, ["Feature walls", "Boundary walls", "Facades"], ["Textured", "Split-face", "Coloured"], ["Multiple sizes"], blockSpecs),
    ],
  },
  {
    slug: "ventilation-blocks",
    name: "Ventilation Blocks",
    code: "03",
    intro: "Airflow, light and privacy in a single architectural masonry unit.",
    description:
      "Ventilation blocks — also called breeze or screen blocks — deliver passive airflow and daylight while maintaining privacy and security. Midrift produces a range of patterns and can develop custom moulds for architectural projects.",
    image: ventImg,
    products: [
      p("ventilation-blocks", "geometric-vent-block", "Geometric Vent Block", "Repeating geometric aperture for facades and screens.", "A clean geometric aperture that reads well across large screen walls and delivers consistent shadow patterns through the day.", ventImg, ["Facade screens", "Stairwells", "Car park ventilation"], ["Standard grey", "Painted", "Coloured"], ["Multiple sizes"], blockSpecs),
      p("ventilation-blocks", "cross-vent-block", "Cross Vent Block", "Classic cross pattern for boundary and service walls.", "A traditional pattern used widely for service yards, drying areas and boundary walls where airflow is required.", ventImg, ["Boundary walls", "Service yards", "Drying areas"], ["Standard grey", "Painted"], ["Multiple sizes"], blockSpecs),
      p("ventilation-blocks", "circular-vent-block", "Circular Vent Block", "Softer aperture for residential and hospitality projects.", "Circular apertures diffuse light more softly, suiting hospitality, residential and interior screen applications.", ventImg, ["Residential", "Hotels & resorts", "Interior screens"], ["Standard grey", "Painted", "Coloured"], ["Multiple sizes"], blockSpecs),
      p("ventilation-blocks", "custom-vent-designs", "Custom Vent Designs", "Architect-specified patterns produced from bespoke moulds.", "For architectural projects we develop custom vent block moulds so the screen becomes part of the building's identity.", ventImg, ["Signature facades", "Public buildings", "Architectural screens"], ["Custom mould", "Custom finish"], ["To project specification"], blockSpecs),
    ],
  },
  {
    slug: "road-infrastructure",
    name: "Road & Infrastructure",
    code: "04",
    intro: "Kerbs, channels, culverts and barriers for roads and civil works.",
    description:
      "Midrift supplies precast units for road construction, drainage and civil infrastructure — produced in volume and scheduled to match construction programmes.",
    image: infraImg,
    products: [
      p("road-infrastructure", "road-kerbs", "Road Kerbs", "Edge restraint and channel definition for roads and yards.", "Road kerbs define carriageway edges, restrain paving and direct surface water into the drainage line.", infraImg, ["Roads & highways", "Parking yards", "Estate roads"], ["Half-battered", "Splayed", "Bull-nosed"], ["Multiple profiles"], paveSpecs),
      p("road-infrastructure", "drainage-channels", "Drainage Channels", "Precast channels for controlled surface water flow.", "Precast drainage channels move surface water away from carriageways and hardstands quickly and predictably.", infraImg, ["Roads", "Industrial yards", "Estates"], ["Open channel", "Covered channel"], ["Multiple sizes"], paveSpecs),
      p("road-infrastructure", "culverts", "Culverts", "Cross-drainage units for roads and access works.", "Culvert units carry water beneath roads and accesses, supplied to the sizes required by the civil design.", infraImg, ["Road crossings", "Access roads", "Site drainage"], ["Box", "Circular"], ["To project specification"], paveSpecs),
      p("road-infrastructure", "concrete-channels", "Concrete Channels", "Lined channels for stormwater management.", "Channel units line stormwater routes to reduce erosion and maintain flow capacity.", infraImg, ["Stormwater routes", "Industrial sites", "Institutions"], ["Standard", "Reinforced"], ["Multiple sizes"], paveSpecs),
      p("road-infrastructure", "road-barriers", "Road Barriers", "Precast barriers for traffic separation and site protection.", "Barriers separate traffic, protect works zones and control vehicle movement on industrial sites.", infraImg, ["Highways", "Works zones", "Industrial sites"], ["Standard", "Reflective marking"], ["To project specification"], paveSpecs),
      p("road-infrastructure", "infrastructure-accessories", "Infrastructure Accessories", "Supporting precast units for civil works packages.", "We supply supporting precast items required to complete civil packages, produced alongside your main order.", infraImg, ["Civil works", "Utilities", "Public works"], ["To project specification"], ["To project specification"], paveSpecs),
    ],
  },
  {
    slug: "custom-precast",
    name: "Custom Precast Solutions",
    code: "05",
    intro: "Project-based manufacturing, custom moulds and bulk production runs.",
    description:
      "When a project needs a unit that does not exist in a standard catalogue, Midrift develops the mould, agrees the specification and runs dedicated production to your programme.",
    image: manufacturingImg,
    products: [
      p("custom-precast", "custom-manufacturing", "Custom Precast Manufacturing", "Units produced to your drawings and specification.", "We work from your drawings to produce precast units that match the specification, tolerance and finish your project requires.", manufacturingImg, ["Specialist civil works", "Architectural precast", "Industrial components"], ["To drawing"], ["To project specification"], paveSpecs),
      p("custom-precast", "bulk-production", "Bulk Production Runs", "Dedicated capacity for high-volume requirements.", "Large orders are planned as scheduled production runs so quantities arrive in line with your construction programme.", manufacturingImg, ["Large developments", "Infrastructure programmes", "Distributor stock"], ["Scheduled batches"], ["To order"], paveSpecs),
      p("custom-precast", "contractor-supply", "Contractor Supply Packages", "Consolidated supply across multiple product lines.", "Contractors can consolidate paving, blocks, kerbs and drainage into one supply agreement with coordinated deliveries.", manufacturingImg, ["Main contractors", "Subcontractors", "Civil packages"], ["Multi-product package"], ["To order"], paveSpecs),
      p("custom-precast", "mould-development", "Custom Mould & Design Development", "New mould development for signature products.", "Our team develops new moulds where a project or distributor requires a distinct product profile.", manufacturingImg, ["Architectural projects", "Product development", "Branded ranges"], ["New mould"], ["To project specification"], paveSpecs),
    ],
  },
  {
    slug: "balustrades",
    name: "Balustrades",
    code: "06",
    intro: "Turned precast balusters for balconies, terraces, staircases and boundary walls.",
    description:
      "Midrift casts balustrade columns in standard 1.5ft, 2ft and 3ft heights, with matching bases and handrail sections. Units are produced from high-strength mixes for outdoor durability and can be supplied grey or finished to your colour.",
    image: bal2Img,
    products: [
      p("balustrades", "balustrade-1-5ft", "Balustrade 1.5ft", "Low-height balusters for terraces, planters and short parapets.", "The 1.5ft baluster suits low parapets, terrace edges and planter walls where an open, decorative rail is required without full height.", bal15Img, ["Terraces", "Planters", "Low parapets"], ["Standard grey", "Painted finish"], ["1.5ft height"], blockSpecs),
      p("balustrades", "balustrade-2ft", "Balustrade 2ft", "The standard balcony and staircase baluster height.", "Our most requested balustrade height, used for balconies, verandas and staircases with matching base and handrail sections.", bal2Img, ["Balconies", "Verandas", "Staircases"], ["Standard grey", "Painted finish"], ["2ft height"], blockSpecs),
      p("balustrades", "balustrade-3ft", "Balustrade 3ft", "Full-height balusters for grand frontages and boundary rails.", "The 3ft baluster gives a taller, more imposing rail line for entrances, grand staircases and boundary walls.", bal3Img, ["Entrances", "Grand staircases", "Boundary rails"], ["Standard grey", "Painted finish"], ["3ft height"], blockSpecs),
    ],
  },
];

export const allProducts = categories.flatMap((c) => c.products);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getProduct = (categorySlug: string, productSlug: string) =>
  getCategory(categorySlug)?.products.find((p) => p.slug === productSlug);

export const relatedProducts = (product: Product, limit = 3) =>
  (getCategory(product.category)?.products ?? []).filter((x) => x.slug !== product.slug).slice(0, limit);
