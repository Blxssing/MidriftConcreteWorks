import cabroVenus from "@/assets/cabro-venus.jpg.asset.json";
import cabroDubro from "@/assets/cabro-dubro.jpg.asset.json";
import cabroArrow from "@/assets/cabro-arrow.jpg.asset.json";
import cabroThara from "@/assets/cabro-thara.jpg.asset.json";
import cabroUni from "@/assets/cabro-uni.jpg.asset.json";
import cabroMeera from "@/assets/cabro-meera-heera.jpg.asset.json";
import cabroNormal from "@/assets/cabro-normal.jpg.asset.json";
import cabroCustom from "@/assets/cabro-custom.jpg.asset.json";
import ballostad15 from "@/assets/ballostad-15.jpg.asset.json";
import ballostad2 from "@/assets/ballostad-2.jpg.asset.json";
import ballostad3 from "@/assets/ballostad-3.jpg.asset.json";
import culvert600 from "@/assets/culvert-600.jpg.asset.json";
import culvert900 from "@/assets/culvert-900.jpg.asset.json";
import culvert300 from "@/assets/culvert-300.jpg.asset.json";
import tbeam1 from "@/assets/tbeam-1.jpg.asset.json";
import tbeam2 from "@/assets/tbeam-2.jpg.asset.json";
import tbeam3 from "@/assets/tbeam-3.jpg.asset.json";
import tbeam4 from "@/assets/tbeam-4.jpg.asset.json";
import slab1 from "@/assets/slab-1.jpg.asset.json";
import slab2 from "@/assets/slab-2.jpg.asset.json";
import slab3 from "@/assets/slab-3.jpg.asset.json";
import fillerBlocksImg from "@/assets/filler-blocks.jpg.asset.json";
import interlockingBlocksImg from "@/assets/interlocking-blocks.jpg.asset.json";
import doubleSinkImg from "@/assets/double-sink.jpg.asset.json";
import roadKerbsImg from "@/assets/road-kerbs.jpg.asset.json";
import kenhaMarkersImg from "@/assets/kenha-markers.jpg.asset.json";
import concreteTilesImg from "@/assets/concrete-tiles.jpg.asset.json";
import concretePostsImg from "@/assets/concrete-posts.jpg.asset.json";
import up1 from "@/assets/up-1.jpg.asset.json";
import up2 from "@/assets/up-2.jpg.asset.json";
import up3 from "@/assets/up-3.jpg.asset.json";
import up4 from "@/assets/up-4.jpg.asset.json";
import up5 from "@/assets/up-5.jpg.asset.json";
import up6 from "@/assets/up-6.jpg.asset.json";
import up7 from "@/assets/up-7.jpg.asset.json";
import up8 from "@/assets/up-8.jpg.asset.json";
import imgSpreader from "@/assets/spreader.jpg.asset.json";
import imgHollow from "@/assets/hollow.jpg.asset.json";
import imgHollowPot from "@/assets/hollowpot.jpg.asset.json";
import imgSolid from "@/assets/solid.jpg.asset.json";
import imgKplc from "@/assets/kplc.jpg.asset.json";
import imgLouvers from "@/assets/louvers.jpg.asset.json";
import imgCustomVent from "@/assets/customvent.jpg.asset.json";
import imgSmoothVent from "@/assets/smoothvent.jpg.asset.json";
import imgGrillVent from "@/assets/grillvent.jpg.asset.json";
import imgNettedVent from "@/assets/netted-vent.jpg.asset.json";
import imgVent1 from "@/assets/vent-1.jpg.asset.json";
import imgVent2 from "@/assets/vent-2.jpg.asset.json";
import imgRoadCulvert from "@/assets/road-culvert.jpg.asset.json";
import imgShallowDrain from "@/assets/shallow-drain.jpg.asset.json";
import imgWaffles from "@/assets/waffles.jpg.asset.json";
import imgWallCoping from "@/assets/wall-coping.jpg.asset.json";
import imgWindowSills from "@/assets/window-sills.jpg.asset.json";
import imgPillarCoping from "@/assets/pillar-coping.jpg.asset.json";
import imgDoubleSinks from "@/assets/double-sinks.jpg.asset.json";

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

const paver = (slug: string, name: string, summary: string, description: string, image?: string) => {
  const base = p(
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
  if (!image) return base;
  return {
    ...base,
    image,
    photoSlots: base.photoSlots.map((s, i) =>
      i === 0 ? { ...s, image, note: `${name} laid on site.` } : s,
    ),
  };
};

const withImages = (product: Product, images: { url: string; note?: string }[]): Product => {
  const first = images[0]?.url ?? product.image;
  return {
    ...product,
    ...(first ? { image: first } : null),
    photoSlots: product.photoSlots.map((s, i) =>
      images[i] ? { ...s, image: images[i]!.url, note: images[i]!.note ?? `${product.name} produced at the Midrift yard.` } : s,
    ),
  };
};

const block = (slug: string, name: string, summary: string, description: string, apps: string[], image?: string) => {
  const base = p("concrete-blocks", slug, name, summary, description, apps, ["Standard", "To project specification"], ["Multiple sizes available"], blockSpecs);
  return image ? withImages(base, [{ url: image }]) : base;
};

const rawCategories: Category[] = [
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
      image: [tbeam1.url, tbeam2.url, tbeam3.url, tbeam4.url][i] as string,
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
    image: cabroVenus.url,
    photoSlots: photoSlots("Cabro").map((s, i) => ({
      ...s,
      image: [cabroArrow.url, cabroUni.url][i] as string,
      note: "Cabro laid by Midrift on site.",
    })),
    products: [
      paver("cabro-meera-heera", "Meera & Heera Pavers", "Popular decorative interlock profiles for driveways and estates.", "Meera and Heera profiles combine a strong mechanical interlock with a decorative surface pattern, suited to driveways, estate roads and commercial frontages.", cabroMeera.url),
      paver("arrow-paver", "Arrow Pavers", "Directional arrow profile with tight lateral interlock.", "The arrow profile locks firmly in both directions, making it a dependable choice for areas carrying constant vehicle movement.", up5.url),
      paver("smooth-cabro-coloured", "Smooth Coloured Pavers", "Smooth-faced coloured units for a refined finished surface.", "Smooth coloured cabro gives a clean, even face for premium driveways, courtyards and commercial entrances.", up6.url),
      paver("dubro-cabro", "Dubro Pavers", "Robust profile for yards and access roads.", "Dubro pavers are produced for load distribution and dimensional consistency across large paved fields.", cabroDubro.url),
      paver("venus-cabro", "Venus Pavers", "Distinct decorative profile for landscaped and public areas.", "Venus pavers carry a recognisable face pattern while retaining full interlocking performance.", cabroVenus.url),
      paver("thara-cabro", "Thara Pavers", "Patterned interlock for estates and walkways.", "Thara pavers suit estate roads, walkways and landscaped areas where pattern and durability both matter.", cabroThara.url),
      paver("cabro-spreader", "Cabro Spreader", "Feature paver for architectural and premium landscaping.", "Cabro Spreader pavers are used where the paved surface forms part of the architectural finish.", imgSpreader.url),
      paver("hexagon-cabro", "Hexagon Pavers", "Six-sided units for stable, uniform paved fields.", "The hexagonal geometry spreads load evenly and produces a clean repeating rhythm across large areas.", up4.url),
      paver("flower-cabro", "Flower Pavers", "Decorative floral pattern for landscaped surfaces.", "Flower pavers are used for feature paving, courtyards and garden paths where appearance leads the specification.", up8.url),
      paver("uni-large", "Large Uni Pavers", "Large-format uni profile for fast laying over wide areas.", "Large Uni pavers cover ground quickly while maintaining reliable interlock for vehicle traffic.", cabroUni.url),
      paver("uni-small", "Small Uni Pavers", "Compact uni profile for detailed and pedestrian areas.", "Small Uni pavers allow tighter curves, borders and detail work in pedestrian and landscaped spaces.", up7.url),
      paver("quad-cabro", "Quad Pavers", "Four-part modular profile for varied laying patterns.", "Quad pavers let you set out multiple laying patterns from a single unit type.", up3.url),
      paver("normal-cabro-blocks", "Standard Interlocking Pavers", "The standard workhorse paver for everyday paving works.", "Our standard interlocking paver is the general-purpose unit for driveways, yards and estate roads.", cabroNormal.url),
      paver("custom-paving-designs", "Custom Paving Designs", "Bespoke shapes, colours and moulds for specific projects.", "Where a project requires a paving unit that is not in our standard range, we develop the mould and run production to the agreed specification.", cabroCustom.url),
    ],
  },
  {
    slug: "concrete-blocks",
    name: "Concrete Blocks",
    code: "03",
    intro: "Masonry and precast units produced to consistent dimension for faster, cleaner building.",
    description:
      "Our concrete block range covers structural, infill and partition walling plus supporting precast items for residential, commercial and institutional buildings. Consistent dimensions reduce mortar wastage and speed up work on site.",
    image: ballostad15.url,
    photoSlots: photoSlots("Concrete Blocks").map((sl, i) => ({
      ...sl,
      image: [ballostad15.url, ballostad2.url][i] as string,
      note: "Precast units from the Midrift yard.",
    })),
    products: [
      block("hollow-blocks", "Hollow Concrete Blocks", "Lighter walling units with cores for services and reduced dead load.", "Hollow blocks reduce wall dead load and allow services and reinforcement to be routed through the cores.", ["External walling", "Internal walling", "Boundary walls"], imgHollow.url),
      block("hollow-pot-blocks", "Hollow Pot Blocks", "Infill units for suspended hollow-pot slabs.", "Hollow pot blocks act as lightweight infill between ribs in suspended slab construction, reducing concrete volume and slab weight.", ["Suspended slabs", "Floor systems", "Roof slabs"], imgHollowPot.url),
      block("solid-blocks", "Solid Concrete Blocks", "Dense units where mass, strength and acoustics matter.", "Solid blocks provide higher mass for load-bearing walls, retaining structures and acoustic separation.", ["Load-bearing walls", "Retaining structures", "Boundary walls"], imgSolid.url),
      block("ballostad-1-5ft", "Concrete Balustrade – 1.5 ft", "Precast balustrade units at 1.5ft height.", "Precast balustrade units are cast for balcony, terrace and staircase edging at a 1.5ft height.", ["Balconies", "Terraces", "Staircases"], ballostad15.url),
      block("ballostad-2ft", "Concrete Balustrade – 2 ft", "Precast balustrade units at 2ft height.", "A 2ft balustrade height for terraces, walkways and perimeter edging.", ["Terraces", "Walkways", "Perimeter edging"], ballostad2.url),
      block("ballostad-3ft", "Concrete Balustrade – 3 ft", "Precast balustrade units at 3ft height.", "A taller 3ft balustrade for elevated terraces, roof edges and boundary features.", ["Roof edges", "Elevated terraces", "Boundary features"], ballostad3.url),
      block("concrete-posts", "Precast Concrete Posts", "Durable posts for fencing and perimeter works.", "Concrete posts provide a long-life alternative to timber for fence lines, perimeter security and agricultural use.", ["Fence lines", "Perimeter security", "Farms & estates"], concretePostsImg.url),
      block("concrete-tiles", "Concrete Tiles", "Cast tiles for floors, terraces and external areas.", "Concrete tiles give a hard-wearing finished surface for terraces, corridors and external circulation areas.", ["Terraces", "Corridors", "External floors"], concreteTilesImg.url),
      block("filler-blocks", "Filler Blocks", "Lightweight infill for slab and rib systems.", "Filler blocks occupy the void between slab ribs, reducing dead load and concrete consumption.", ["Suspended slabs", "Rib-and-block floors"], fillerBlocksImg.url),
      block("interlocking-blocks", "Interlocking Concrete Blocks", "Dry-stack walling units for faster construction.", "Interlocking blocks key into each other, reducing mortar use and speeding up walling.", ["Walling", "Boundary walls", "Fast-build projects"], interlockingBlocksImg.url),
      block("kplc-hatari", "KPLC Hatari Slabs", "Precast units supplied for utility installations.", "Produced to the sizes required for utility and power installation works.", ["Utility works", "Power installations", "Infrastructure sites"], imgKplc.url),
    ],
  },
  {
    slug: "paving-slabs",
    name: "Paving Slabs",
    code: "04",
    intro: "Large-format slabs for walkways, terraces and pedestrian areas.",
    description:
      "Paving slabs give a broad, flat finished surface for walkways, terraces, courtyards and pedestrian areas, produced to consistent thickness for level laying.",
    image: slab1.url,
    photoSlots: photoSlots("Paving Slabs", 3).map((sl, i) => ({
      ...sl,
      image: [slab1.url, slab2.url, slab3.url][i] as string,
      note: "Paving slabs laid by Midrift.",
    })),
    products: [],
  },
  {
    slug: "ventilation-blocks",
    name: "Ventilation Blocks",
    code: "05",
    intro: "Airflow, light and privacy in a single architectural masonry unit.",
    description:
      "Ventilation blocks deliver passive airflow and daylight while maintaining privacy and security. Midrift produces a range of patterns and can develop custom moulds for architectural projects.",
    image: imgVent1.url,
    photoSlots: photoSlots("Ventilation Blocks", 2).map((sl, i) => ({
      ...sl,
      image: [imgVent1.url, imgVent2.url][i] as string,
      note: "Ventilation block screens installed on site.",
    })),
    products: [
      withImages(p("ventilation-blocks", "smooth-ventilation", "Smooth Ventilation Blocks", "Clean-faced vent units for tidy exposed screens.", "A smooth face finish for screens that stay exposed in the finished building.", ["Facade screens", "Stairwells", "Boundary walls"], ["Standard grey", "Painted"], ["Multiple sizes"], blockSpecs), [{ url: imgSmoothVent.url }]),
      withImages(p("ventilation-blocks", "grill-ventilation", "Grill Ventilation Blocks", "Grill-pattern apertures for strong airflow.", "The grill pattern maximises open area for service yards, car parks and drying areas.", ["Car park ventilation", "Service yards", "Drying areas"], ["Standard grey", "Painted"], ["Multiple sizes"], blockSpecs), [{ url: imgGrillVent.url }]),
      withImages(p("ventilation-blocks", "netted-ventilation", "Netted Ventilation Blocks", "Fine mesh-style aperture for privacy with airflow.", "A finer aperture that keeps privacy high while still moving air through the wall.", ["Residential", "Hotels & resorts", "Interior screens"], ["Standard grey", "Painted", "Coloured"], ["Multiple sizes"], blockSpecs), [{ url: imgNettedVent.url, note: "Netted ventilation screen wall." }]),
      withImages(p("ventilation-blocks", "louvers", "Concrete Louver Blocks", "Angled precast louvers for directed airflow and shading.", "Concrete louver blocks direct airflow and cut direct sun while screening the opening.", ["Facades", "Plant rooms", "Car parks"], ["Standard grey", "Painted"], ["Multiple sizes"], blockSpecs), [{ url: imgLouvers.url }]),
      withImages(p("ventilation-blocks", "custom-ventilation-designs", "Custom Ventilation Blocks", "Architect-specified patterns produced from bespoke moulds.", "For architectural projects we develop custom vent block moulds so the screen becomes part of the building's identity.", ["Signature facades", "Public buildings", "Architectural screens"], ["Custom mould", "Custom finish"], ["To project specification"], blockSpecs), [{ url: imgCustomVent.url }]),
    ],
  },
  {
    slug: "road-concrete",
    name: "Road Concrete Works",
    code: "06",
    intro: "Culverts, drains and road markers for civil and highway works.",
    description:
      "Midrift supplies precast units for road construction and drainage — produced in volume and scheduled to match construction programmes.",
    image: culvert600.url,
    photoSlots: photoSlots("Road Concrete Works").map((sl, i) => ({
      ...sl,
      image: [culvert600.url, culvert900.url][i] as string,
      note: "Precast culverts from the Midrift yard.",
    })),
    products: [
      {
        ...withImages(
          p("road-concrete", "culverts", "Precast Culverts", "Cross-drainage units for access and civil works.", "Culvert units carry water beneath roads and accesses, supplied to the sizes required by the civil design. Standard diameters include 300mm, 600mm and 900mm.", ["Site drainage", "Access roads", "Water crossings"], ["300mm", "600mm", "900mm", "Box", "Circular"], ["300mm", "600mm", "900mm", "To project specification"], civilSpecs),
          [
            { url: culvert600.url, note: "600mm culverts" },
            { url: culvert900.url, note: "900mm culverts" },
            { url: culvert300.url, note: "300mm culverts" },
          ],
        ),
        photoSlots: [
          { label: "Precast Culverts — 600mm", note: "600mm culverts", image: culvert600.url, cta: { label: "Request a quote", message: "Hello Midrift, I would like a quote for 600mm culverts." } },
          { label: "Precast Culverts — 900mm", note: "900mm culverts", image: culvert900.url, cta: { label: "Request a quote", message: "Hello Midrift, I would like a quote for 900mm culverts." } },
          { label: "Precast Culverts — 300mm", note: "300mm culverts", image: culvert300.url, cta: { label: "Request a quote", message: "Hello Midrift, I would like a quote for 300mm culverts." } },
        ],
      },
      withImages(p("road-concrete", "road-culverts", "Road Culverts", "Heavier culvert units for carriageway crossings.", "Road culverts are produced for the loading conditions found beneath carriageways and highway shoulders.", ["Highways", "Carriageway crossings", "Estate roads"], ["Box", "Circular", "Reinforced"], ["To project specification"], civilSpecs), [{ url: imgRoadCulvert.url, note: "Box culvert crossing beneath a road." }]),
      withImages(p("road-concrete", "shallow-drain", "Precast Shallow Drains", "Shallow precast drains for controlled surface water flow.", "Shallow drains move surface water away from carriageways, yards and walkways quickly and predictably.", ["Roads", "Industrial yards", "Estates"], ["Open channel", "Covered channel"], ["Multiple sizes"], civilSpecs), [{ url: imgShallowDrain.url, note: "Shallow precast channel drain." }]),
      withImages(p("road-concrete", "road-kerbs", "Precast Road Kerbs", "Precast kerbs for carriageway, parking and walkway edging.", "Road kerbs define carriageway, parking bay and walkway edges, containing the paved surface and directing surface water to drainage.", ["Carriageway edging", "Parking bays", "Walkways"], ["Standard", "Half-battered", "To authority specification"], ["Multiple sizes"], civilSpecs), [{ url: roadKerbsImg.url, note: "Precast road kerbs at the Midrift yard." }]),
      withImages(p("road-concrete", "kenha-boundary-markers", "Road Reserve Boundary Markers", "Precast boundary markers for road reserve demarcation.", "Boundary markers demarcate road reserves and public works boundaries in line with authority requirements.", ["Road reserves", "Public works", "Highway boundaries"], ["Standard", "To authority specification"], ["To project specification"], civilSpecs), [{ url: kenhaMarkersImg.url, note: "KeNHA boundary markers cast at the Midrift yard." }]),
    ],
  },
  {
    slug: "building-infrastructure",
    name: "Building and Infrastructure",
    code: "07",
    intro: "Precast building components for finishing and structural works.",
    description:
      "Precast components that finish and support buildings — waffle units, sinks, copings and sills — produced to consistent dimension for straightforward installation.",
    image: doubleSinkImg.url,
    photoSlots: photoSlots("Building and Infrastructure").map((sl, i) => ({
      ...sl,
      image: [doubleSinkImg.url, roadKerbsImg.url][i] as string,
      note: "Precast building components from the Midrift yard.",
    })),
    products: [
      withImages(p("building-infrastructure", "waffles", "Waffle Slab Units", "Waffle units for ribbed slab construction.", "Waffle moulding units form ribbed slabs that reduce concrete volume while keeping structural depth.", ["Suspended slabs", "Commercial floors", "Institutional buildings"], ["Standard", "To engineer's specification"], ["To project specification"], civilSpecs), [{ url: imgWaffles.url, note: "Waffle ribbed slab soffit." }]),
      withImages(p("building-infrastructure", "double-sink", "Precast Double Sink", "Precast double sink units for utility areas.", "Cast double sinks for kitchens, laundries, institutions and service areas where durability is essential.", ["Institutions", "Laundries", "Service areas"], ["Standard"], ["Multiple sizes"], civilSpecs), [{ url: doubleSinkImg.url, note: "Precast double sink units." }, { url: imgDoubleSinks.url, note: "Double sink unit ready for delivery." }]),
      withImages(p("building-infrastructure", "wall-coping", "Wall Coping", "Capping units that protect wall tops from water.", "Wall coping sheds water off the top of boundary and parapet walls, extending the life of the masonry below.", ["Boundary walls", "Parapets", "Perimeter walls"], ["Standard", "Coloured"], ["Multiple sizes"], civilSpecs), [{ url: imgWallCoping.url, note: "Precast wall coping units." }]),
      withImages(p("building-infrastructure", "window-seals", "Precast Window Sills", "Precast sills that throw water clear of the wall face.", "Precast window sills give a clean finished sill line and direct rainwater away from the wall below the opening.", ["Residential", "Commercial buildings", "Institutions"], ["Standard", "Coloured"], ["Multiple sizes"], civilSpecs), [{ url: imgWindowSills.url, note: "Precast window sills." }]),
      withImages(p("building-infrastructure", "pillar-coping", "Pillar Coping", "Decorative and protective caps for gate and fence pillars.", "Pillar coping finishes gate and fence pillars while protecting the top surface from water ingress.", ["Gate pillars", "Fence pillars", "Estates"], ["Standard", "Decorative"], ["Multiple sizes"], civilSpecs), [{ url: imgPillarCoping.url, note: "Pillar coping cap on a gate pillar." }]),
    ],
  },
  {
    slug: "custom-precast",
    name: "Custom Precast Solutions",
    code: "08",
    intro: "Project-based manufacturing, custom moulds and bulk production runs.",
    description:
      "When a project needs a unit that does not exist in a standard catalogue, Midrift develops the mould, agrees the specification and runs dedicated production to your programme.",
    image: up1.url,
    photoSlots: photoSlots("Custom Precast Solutions").map((sl, i) => ({
      ...sl,
      image: [up1.url, up2.url][i] as string,
      note: "Custom precast units produced at the Midrift yard.",
    })),
    products: [],
  },
];

/** Photography is complete, so empty reserved slots are dropped from the UI. */
const withFilledSlots = <T extends { photoSlots: PhotoSlot[] }>(item: T): T => ({
  ...item,
  photoSlots: item.photoSlots.filter((s) => !!s.image),
});

export const categories: Category[] = rawCategories.map((c) => ({
  ...withFilledSlots(c),
  products: c.products.map(withFilledSlots),
}));

export const allProducts = categories.flatMap((c) => c.products);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getProduct = (categorySlug: string, productSlug: string) =>
  getCategory(categorySlug)?.products.find((p) => p.slug === productSlug);

export const relatedProducts = (product: Product, limit = 3) =>
  (getCategory(product.category)?.products ?? []).filter((x) => x.slug !== product.slug).slice(0, limit);
