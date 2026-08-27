import tbeam1 from "@/assets/tbeam-1.jpg.asset.json";
import tbeam2 from "@/assets/tbeam-2.jpg.asset.json";
import tbeam3 from "@/assets/tbeam-3.jpg.asset.json";
import tbeam4 from "@/assets/tbeam-4.jpg.asset.json";

export const TBC = "Specification to be confirmed";

export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image?: string;
  gallery: string[];
  photoSlots: PhotoSlot[];
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
  image?: string;
  photoSlots: PhotoSlot[];
  products: Product[];
};

export type PhotoSlot = {
  label: string;
  note: string;
  image?: string;
  cta: { label: string; message: string };
};

const photoSlots = (name: string, count = 2): PhotoSlot[] =>
  Array.from({ length: count }, (_, i) => ({
    label: `${name} — photo ${i + 1}`,
    note: "Image space reserved. Add your own photo here.",
    cta:
      i % 2 === 0
        ? { label: "Request a quote", message: `Hello Midrift, I would like a quote for ${name}.` }
        : { label: "Talk to sales", message: `Hello Midrift, I would like to discuss ${name} for my project.` },
  }));

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

const paveSpecs = ["Thickness", "Compressive strength", "Coverage per m²", "Colour options", "Surface finish"];
const blockSpecs = ["Nominal size", "Compressive strength", "Weight per unit", "Units per m²", "Finish"];
const civilSpecs = ["Nominal size", "Class / rating", "Weight per unit", "Reinforcement", "Finish"];

const p = (
  category: string,
  slug: string,
  name: string,
  summary: string,
  description: string,
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
  gallery: [],
  photoSlots: photoSlots(name),
  applications,
  variants,
  sizes,
  specs: spec(specLabels),
  faqs: baseFaqs(name),
});

const paver = (slug: string, name: string, summary: string, description: string) =>
  p(
    "cabro",
    slug,
    name,
    summary,
    description,
    ["Driveways", "Parking yards", "Estate roads", "Walkways"],
    ["Standard grey", "Coloured"],
    ["Multiple thicknesses available"],
    paveSpecs,
  );

const block = (slug: string, name: string, summary: string, description: string, apps: string[]) =>
  p("concrete-blocks", slug, name, summary, description, apps, ["Standard", "To project specification"], ["Multiple sizes available"], blockSpecs);

export const categories: Category[] = [
  {
    slug: "t-beam",
    name: "T-Beam",
    code: "01",
    intro: "Precast T-beams for suspended slabs and floor systems.",
    description:
      "Midrift manufactures precast T-beams used in suspended floor and roof systems. Beams are produced under controlled casting and curing so sections stay straight, consistent and ready for fast installation on site.",
    image: tbeam1.url,
    photoSlots: photoSlots("T-Beam", 4).map((s, i) => ({
      ...s,
      image: [tbeam1.url, tbeam2.url, tbeam3.url, tbeam4.url][i],
      note: "Precast T-beams from the Midrift yard.",
    })),
    products: [],
  },
  {
    slug: "cabro",
    name: "Cabro",
    code: "02",
    intro: "Interlocking cabro engineered for traffic, drainage and long service life.",
    description:
      "Midrift manufactures interlocking cabro for driveways, parking yards, walkways, estates, industrial hardstands and commercial developments. Every batch is produced under controlled mixing and compaction for consistent dimension and strength.",
    photoSlots: photoSlots("Cabro"),
    products: [
      paver("cabro-meera-heera", "Cabro Meera and Heera", "Popular decorative interlock profiles for driveways and estates.", "Meera and Heera profiles combine a strong mechanical interlock with a decorative surface pattern, suited to driveways, estate roads and commercial frontages."),
      paver("arrow-paver", "Arrow Paver", "Directional arrow profile with tight lateral interlock.", "The arrow profile locks firmly in both directions, making it a dependable choice for areas carrying constant vehicle movement."),
      paver("smooth-cabro-coloured", "Smooth Cabro Coloured", "Smooth-faced coloured units for a refined finished surface.", "Smooth coloured cabro gives a clean, even face for premium driveways, courtyards and commercial entrances."),
      paver("dubro-cabro", "Dubro Cabro", "Robust profile for yards and access roads.", "Dubro cabro is produced for load distribution and dimensional consistency across large paved fields."),
      paver("venus-cabro", "Venus Cabro", "Distinct decorative profile for landscaped and public areas.", "Venus cabro carries a recognisable face pattern while retaining full interlocking performance."),
      paver("thara-cabro", "Thara Cabro", "Patterned interlock for estates and walkways.", "Thara cabro suits estate roads, walkways and landscaped areas where pattern and durability both matter."),
      paver("splender", "Splender", "Feature paver for architectural and premium landscaping.", "Splender units are used where the paved surface forms part of the architectural finish."),
      paver("hexagon-cabro", "Hexagon Cabro", "Six-sided units for stable, uniform paved fields.", "The hexagonal geometry spreads load evenly and produces a clean repeating rhythm across large areas."),
      paver("flower-cabro", "Flower Cabro", "Decorative floral pattern for landscaped surfaces.", "Flower cabro is used for feature paving, courtyards and garden paths where appearance leads the specification."),
      paver("uni-large", "Uni Large", "Large-format uni profile for fast laying over wide areas.", "Uni large covers ground quickly while maintaining reliable interlock for vehicle traffic."),
      paver("uni-small", "Uni Small", "Compact uni profile for detailed and pedestrian areas.", "Uni small allows tighter curves, borders and detail work in pedestrian and landscaped spaces."),
      paver("quad-cabro", "Quad Cabro", "Four-part modular profile for varied laying patterns.", "Quad cabro lets you set out multiple laying patterns from a single unit type."),
      paver("normal-cabro-blocks", "Normal Cabro Blocks", "The standard workhorse paver for everyday paving works.", "Our standard cabro block is the general-purpose unit for driveways, yards and estate roads."),
      paver("custom-paving-designs", "Custom Paving Designs", "Bespoke shapes, colours and moulds for specific projects.", "Where a project requires a paving unit that is not in our standard range, we develop the mould and run production to the agreed specification."),
    ],
  },
  {
    slug: "concrete-blocks",
    name: "Concrete Blocks",
    code: "03",
    intro: "Masonry and precast units produced to consistent dimension for faster, cleaner building.",
    description:
      "Our concrete block range covers structural, infill and partition walling plus supporting precast items for residential, commercial and institutional buildings. Consistent dimensions reduce mortar wastage and speed up work on site.",
    photoSlots: photoSlots("Concrete Blocks"),
    products: [
      block("hollow-blocks", "Hollow Blocks", "Lighter walling units with cores for services and reduced dead load.", "Hollow blocks reduce wall dead load and allow services and reinforcement to be routed through the cores.", ["External walling", "Internal walling", "Boundary walls"]),
      block("hollow-pot-blocks", "Hollow Pot Blocks", "Infill units for suspended hollow-pot slabs.", "Hollow pot blocks act as lightweight infill between ribs in suspended slab construction, reducing concrete volume and slab weight.", ["Suspended slabs", "Floor systems", "Roof slabs"]),
      block("solid-blocks", "Solid Blocks", "Dense units where mass, strength and acoustics matter.", "Solid blocks provide higher mass for load-bearing walls, retaining structures and acoustic separation.", ["Load-bearing walls", "Retaining structures", "Boundary walls"]),
      block("ballostad-1-5ft", "Ballostad 1.5ft", "Precast balustrade units at 1.5ft height.", "Ballostad units are cast for balcony, terrace and staircase edging at a 1.5ft height.", ["Balconies", "Terraces", "Staircases"]),
      block("ballostad-2ft", "Ballostad 2ft", "Precast balustrade units at 2ft height.", "A 2ft balustrade height for terraces, walkways and perimeter edging.", ["Terraces", "Walkways", "Perimeter edging"]),
      block("ballostad-3ft", "Ballostad 3ft", "Precast balustrade units at 3ft height.", "A taller 3ft balustrade for elevated terraces, roof edges and boundary features.", ["Roof edges", "Elevated terraces", "Boundary features"]),
      block("concrete-posts", "Concrete Posts", "Durable posts for fencing and perimeter works.", "Concrete posts provide a long-life alternative to timber for fence lines, perimeter security and agricultural use.", ["Fence lines", "Perimeter security", "Farms & estates"]),
      block("concrete-tiles", "Concrete Tiles", "Cast tiles for floors, terraces and external areas.", "Concrete tiles give a hard-wearing finished surface for terraces, corridors and external circulation areas.", ["Terraces", "Corridors", "External floors"]),
      block("filler-blocks", "Filler Blocks", "Lightweight infill for slab and rib systems.", "Filler blocks occupy the void between slab ribs, reducing dead load and concrete consumption.", ["Suspended slabs", "Rib-and-block floors"]),
      block("interlocking-blocks", "Interlocking Blocks", "Dry-stack walling units for faster construction.", "Interlocking blocks key into each other, reducing mortar use and speeding up walling.", ["Walling", "Boundary walls", "Fast-build projects"]),
      block("kplc-hater", "KPLC Hater", "Precast units supplied for utility installations.", "Produced to the sizes required for utility and power installation works.", ["Utility works", "Power installations", "Infrastructure sites"]),
    ],
  },
  {
    slug: "paving-slabs",
    name: "Paving Slabs",
    code: "04",
    intro: "Large-format slabs for walkways, terraces and pedestrian areas.",
    description:
      "Paving slabs give a broad, flat finished surface for walkways, terraces, courtyards and pedestrian areas, produced to consistent thickness for level laying.",
    photoSlots: photoSlots("Paving Slabs", 3),
    products: [],
  },
  {
    slug: "ventilation-blocks",
    name: "Ventilation Blocks",
    code: "05",
    intro: "Airflow, light and privacy in a single architectural masonry unit.",
    description:
      "Ventilation blocks deliver passive airflow and daylight while maintaining privacy and security. Midrift produces a range of patterns and can develop custom moulds for architectural projects.",
    photoSlots: photoSlots("Ventilation Blocks"),
    products: [
      p("ventilation-blocks", "smooth-ventilation", "Smooth Ventilation", "Clean-faced vent units for tidy exposed screens.", "A smooth face finish for screens that stay exposed in the finished building.", ["Facade screens", "Stairwells", "Boundary walls"], ["Standard grey", "Painted"], ["Multiple sizes"], blockSpecs),
      p("ventilation-blocks", "grill-ventilation", "Grill Ventilation", "Grill-pattern apertures for strong airflow.", "The grill pattern maximises open area for service yards, car parks and drying areas.", ["Car park ventilation", "Service yards", "Drying areas"], ["Standard grey", "Painted"], ["Multiple sizes"], blockSpecs),
      p("ventilation-blocks", "netted-ventilation", "Netted Ventilation", "Fine mesh-style aperture for privacy with airflow.", "A finer aperture that keeps privacy high while still moving air through the wall.", ["Residential", "Hotels & resorts", "Interior screens"], ["Standard grey", "Painted", "Coloured"], ["Multiple sizes"], blockSpecs),
      p("ventilation-blocks", "louvers", "Louvers", "Angled precast louvers for directed airflow and shading.", "Louver units direct airflow and cut direct sun while screening the opening.", ["Facades", "Plant rooms", "Car parks"], ["Standard grey", "Painted"], ["Multiple sizes"], blockSpecs),
      p("ventilation-blocks", "custom-ventilation-designs", "Custom Ventilation Designs", "Architect-specified patterns produced from bespoke moulds.", "For architectural projects we develop custom vent block moulds so the screen becomes part of the building's identity.", ["Signature facades", "Public buildings", "Architectural screens"], ["Custom mould", "Custom finish"], ["To project specification"], blockSpecs),
    ],
  },
  {
    slug: "road-concrete",
    name: "Road Concrete Works",
    code: "06",
    intro: "Culverts, drains and road markers for civil and highway works.",
    description:
      "Midrift supplies precast units for road construction and drainage — produced in volume and scheduled to match construction programmes.",
    photoSlots: photoSlots("Road Concrete Works"),
    products: [
      p("road-concrete", "culverts", "Culverts", "Cross-drainage units for access and civil works.", "Culvert units carry water beneath roads and accesses, supplied to the sizes required by the civil design.", ["Site drainage", "Access roads", "Water crossings"], ["Box", "Circular"], ["To project specification"], civilSpecs),
      p("road-concrete", "road-culverts", "Road Culverts", "Heavier culvert units for carriageway crossings.", "Road culverts are produced for the loading conditions found beneath carriageways and highway shoulders.", ["Highways", "Carriageway crossings", "Estate roads"], ["Box", "Circular", "Reinforced"], ["To project specification"], civilSpecs),
      p("road-concrete", "shallow-drain", "Shallow Drain", "Shallow precast drains for controlled surface water flow.", "Shallow drains move surface water away from carriageways, yards and walkways quickly and predictably.", ["Roads", "Industrial yards", "Estates"], ["Open channel", "Covered channel"], ["Multiple sizes"], civilSpecs),
      p("road-concrete", "kenha-boundary-markers", "Kenha Boundary Makers", "Precast boundary markers for road reserve demarcation.", "Boundary markers demarcate road reserves and public works boundaries in line with authority requirements.", ["Road reserves", "Public works", "Highway boundaries"], ["Standard", "To authority specification"], ["To project specification"], civilSpecs),
    ],
  },
  {
    slug: "building-infrastructure",
    name: "Building and Infrastructure",
    code: "07",
    intro: "Precast building components for finishing and structural works.",
    description:
      "Precast components that finish and support buildings — waffles, sinks, copings and seals — produced to consistent dimension for straightforward installation.",
    photoSlots: photoSlots("Building and Infrastructure"),
    products: [
      p("building-infrastructure", "waffles", "Waffles", "Waffle units for ribbed slab construction.", "Waffle moulding units form ribbed slabs that reduce concrete volume while keeping structural depth.", ["Suspended slabs", "Commercial floors", "Institutional buildings"], ["Standard", "To engineer's specification"], ["To project specification"], civilSpecs),
      p("building-infrastructure", "double-sink", "Doble Sink", "Precast double sink units for utility areas.", "Cast double sinks for kitchens, laundries, institutions and service areas where durability is essential.", ["Institutions", "Laundries", "Service areas"], ["Standard"], ["Multiple sizes"], civilSpecs),
      p("building-infrastructure", "wall-coping", "Wall Coping", "Capping units that protect wall tops from water.", "Wall coping sheds water off the top of boundary and parapet walls, extending the life of the masonry below.", ["Boundary walls", "Parapets", "Perimeter walls"], ["Standard", "Coloured"], ["Multiple sizes"], civilSpecs),
      p("building-infrastructure", "window-seals", "Window Seals", "Precast sills that throw water clear of the wall face.", "Window seals give a clean finished sill line and direct rainwater away from the wall below the opening.", ["Residential", "Commercial buildings", "Institutions"], ["Standard", "Coloured"], ["Multiple sizes"], civilSpecs),
      p("building-infrastructure", "pillar-coping", "Pillar Coping", "Decorative and protective caps for gate and fence pillars.", "Pillar coping finishes gate and fence pillars while protecting the top surface from water ingress.", ["Gate pillars", "Fence pillars", "Estates"], ["Standard", "Decorative"], ["Multiple sizes"], civilSpecs),
    ],
  },
  {
    slug: "custom-precast",
    name: "Custom Precast Solutions",
    code: "08",
    intro: "Project-based manufacturing, custom moulds and bulk production runs.",
    description:
      "When a project needs a unit that does not exist in a standard catalogue, Midrift develops the mould, agrees the specification and runs dedicated production to your programme.",
    photoSlots: photoSlots("Custom Precast Solutions"),
    products: [],
  },
];

export const allProducts = categories.flatMap((c) => c.products);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getProduct = (categorySlug: string, productSlug: string) =>
  getCategory(categorySlug)?.products.find((p) => p.slug === productSlug);

export const relatedProducts = (product: Product, limit = 3) =>
  (getCategory(product.category)?.products ?? []).filter((x) => x.slug !== product.slug).slice(0, limit);
