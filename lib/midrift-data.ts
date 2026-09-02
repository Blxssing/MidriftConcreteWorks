import balustrade15 from '@/src/assets/balustrade-15ft.jpg.asset.json'
import balustrade2 from '@/src/assets/balustrade-2ft.jpg.asset.json'
import balustrade3 from '@/src/assets/balustrade-3ft.jpg.asset.json'
import concreteBlocks1 from '@/src/assets/concrete-blocks-1.jpg.asset.json'
import concreteBlocks2 from '@/src/assets/concrete-blocks-2.jpg.asset.json'

export type Product = {
  slug: string
  name: string
  category: string
  description: string
  applications: string[]
  variants: string[]
  specsNote: string
  image?: string
}

export const products: Product[] = [
  { slug: 'interlocking-cabro', name: 'Interlocking cabro', category: 'Cabro & paving', description: 'Paving systems for driveways, courtyards, walkways and commercial surfaces.', applications: ['Driveways', 'Courtyards', 'Walkways', 'Commercial surfaces'], variants: ['Interlocking format', 'Colour and finish to be confirmed'], specsNote: 'Sizes and specifications available on request.' },
  { slug: 'zigzag-i-shape', name: 'Zigzag & I-shape', category: 'Cabro & paving', description: 'Interlocking formats selected for a considered finish and dependable installation.', applications: ['Residential paving', 'Commercial yards', 'Pedestrian areas'], variants: ['Zigzag', 'I-shape'], specsNote: 'Available sizes and technical data to be confirmed.' },
  { slug: 'balustrade-1-5ft', name: 'Balustrade 1.5ft', category: 'Balustrades', description: 'Cast concrete balustrade columns at 1.5ft height for low balcony and terrace railings.', applications: ['Terraces', 'Low balcony rails', 'Garden edges'], variants: ['Plain finish', 'Painted finish'], specsNote: 'Heights, base sizes and finishes confirmed on enquiry.', image: balustrade15.url },
  { slug: 'balustrade-2ft', name: 'Balustrade 2ft', category: 'Balustrades', description: 'Standard 2ft balustrade columns for balconies, staircases and boundary railings.', applications: ['Balconies', 'Staircases', 'Boundary railings'], variants: ['Plain finish', 'Painted finish'], specsNote: 'Heights, base sizes and finishes confirmed on enquiry.', image: balustrade2.url },
  { slug: 'balustrade-3ft', name: 'Balustrade 3ft', category: 'Balustrades', description: 'Tall 3ft balustrade columns for grand staircases, verandas and perimeter rails.', applications: ['Grand staircases', 'Verandas', 'Perimeter rails'], variants: ['Plain finish', 'Painted finish'], specsNote: 'Heights, base sizes and finishes confirmed on enquiry.', image: balustrade3.url },
  { slug: 'hollow-blocks', name: 'Hollow blocks', category: 'Concrete blocks', description: 'Concrete block solutions for residential, commercial and structural building applications.', applications: ['Walling', 'Partitioning', 'Residential construction'], variants: ['Hollow format'], specsNote: 'Product sizes and strength information available on request.', image: concreteBlocks1.url },
  { slug: 'solid-blocks', name: 'Solid blocks', category: 'Concrete blocks', description: 'Dense precast blocks for projects requiring a robust building material conversation.', applications: ['Building works', 'Boundary walls', 'Commercial construction'], variants: ['Solid format'], specsNote: 'Product sizes and technical information to be confirmed.', image: concreteBlocks2.url },
  { slug: 'ventilation-blocks', name: 'Ventilation blocks', category: 'Ventilation blocks', description: 'Pattern-led blocks that bring airflow, shade and character to built spaces.', applications: ['Residential screens', 'Commercial facades', 'Boundary walls'], variants: ['Multiple designs', 'Custom patterns'], specsNote: 'Designs, sizes and finishes available on request.' },
  { slug: 'road-kerbs', name: 'Road kerbs', category: 'Road & infrastructure', description: 'Precast components for road edges, drainage and civil works packages.', applications: ['Road edges', 'Estate roads', 'Civil works'], variants: ['Project-specific formats'], specsNote: 'Dimensions and project quantities to be confirmed per enquiry.' },
  { slug: 'drainage-channels', name: 'Drainage channels & culverts', category: 'Road & infrastructure', description: 'Infrastructure products for drainage, access and project-based civil works.', applications: ['Drainage', 'Culverts', 'Infrastructure projects'], variants: ['Channels', 'Culverts'], specsNote: 'Technical details supplied during project review.' },
  { slug: 'custom-precast', name: 'Custom precast solutions', category: 'Custom precast', description: 'Project-based manufacturing, mould development and bulk production support.', applications: ['Commercial', 'Residential', 'Infrastructure'], variants: ['Custom mould/design development'], specsNote: 'Bring a drawing, reference image or project brief for review.' },
]

export const buyerGroups = [
  { slug: 'contractors', name: 'Contractors', title: 'Bulk supply and project support.', body: 'Reliable product supply, clear communication and practical support from order through dispatch.', products: ['Cabro & paving', 'Concrete blocks', 'Road & infrastructure'] },
  { slug: 'developers', name: 'Real estate developers', title: 'Materials for developments that move.', body: 'Coordinate a consistent precast package across residential and commercial developments.', products: ['Paving', 'Blocks', 'Custom precast'] },
  { slug: 'hardware-stores', name: 'Hardware stores & distributors', title: 'A stronger wholesale conversation.', body: 'Build a dependable product range with wholesale conversations shaped around your market.', products: ['Cabro & paving', 'Blocks', 'Ventilation blocks'] },
  { slug: 'government-infrastructure', name: 'Government & infrastructure projects', title: 'Precast for civil works.', body: 'Discuss road, drainage and infrastructure requirements with a manufacturing partner.', products: ['Road kerbs', 'Channels', 'Culverts'] },
  { slug: 'architects-quantity-surveyors', name: 'Architects & quantity surveyors', title: 'Bring material intent into focus.', body: 'Product and custom precast guidance for specifications, schedules and project conversations.', products: ['Ventilation blocks', 'Paving', 'Custom precast'] },
  { slug: 'home-builders', name: 'Individual home builders', title: 'Clear direction for your build.', body: 'Get practical help framing the right products, quantities and next step.', products: ['Blocks', 'Paving', 'Ventilation blocks'] },
]

export const processSteps = ['Raw Materials', 'Mixing', 'Moulding', 'Compaction', 'Curing', 'Quality Control', 'Storage', 'Loading / Dispatch']

export const faqs = [
  ['Can I request a product that is not listed?', 'Yes. Share your drawing, reference image or project requirement and our team can review the possibility of a custom precast solution.'],
  ['Do you supply in bulk?', 'Bulk and project supply conversations are welcome for contractors, developers, distributors and infrastructure teams.'],
  ['Can you help with product selection?', 'Yes. Tell us what you are building, where it is located and what you need supplied. We can help frame the right product conversation.'],
]
