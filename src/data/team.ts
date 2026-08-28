/**
 * Team directory. Roles are verified; names and photographs are added only when
 * the company supplies approved details — never fabricated.
 *
 * To publish a real person: set `name` and `photo` (imported asset URL) and keep
 * `active: true`. Set `active: false` to hide a role without deleting it.
 */
export type TeamDepartment = "leadership" | "management" | "core";

export interface TeamMember {
  /** Verified full name. Leave undefined until the company approves publication. */
  name?: string;
  position: string;
  department: TeamDepartment;
  bio: string;
  /** Approved photograph URL. Undefined renders an elegant placeholder. */
  photo?: string;
  order: number;
  active: boolean;
}

export const teamGroups: { id: TeamDepartment; code: string; label: string; lead?: string }[] = [
  { id: "leadership", code: "01", label: "Leadership" },
  { id: "management", code: "02", label: "Management" },
  {
    id: "core",
    code: "03",
    label: "Our Core Functions",
    lead: "Operations and quality, people and finance, marketing, and procurement.",
  },
];

export const team: TeamMember[] = [
  {
    position: "Director",
    department: "leadership",
    order: 1,
    active: true,
    bio: "Provides strategic leadership and helps guide the overall direction, growth, governance, and performance of Midrift Concrete Solutions, keeping the company focused on quality, customer satisfaction, operational excellence, and sustainable growth.",
  },
  {
    position: "Manager",
    department: "management",
    order: 2,
    active: true,
    bio: "Coordinates the company's day-to-day activities and works across the team to support efficient operations, effective communication, customer satisfaction, and the consistent execution of company objectives.",
  },
  {
    position: "Operational Quality Control Officer",
    department: "core",
    order: 3,
    active: true,
    bio: "Supports the company's quality-control processes by monitoring operational activities and helping ensure that products and production processes meet the company's required standards and specifications.",
  },
  {
    position: "Human Resources",
    department: "core",
    order: 4,
    active: true,
    bio: "Supports the people and organizational side of Midrift Concrete Solutions by helping coordinate recruitment, employee support, workplace communication, staff development, and human-resource processes.",
  },
  {
    position: "Accountant",
    department: "core",
    order: 5,
    active: true,
    bio: "Supports the company's financial operations through accounting, financial record management, reporting, invoicing, and financial administration.",
  },
  {
    position: "Digital Marketing Team",
    department: "core",
    order: 6,
    active: true,
    bio: "Helps connect Midrift Concrete Solutions with customers through digital channels, brand communication, content, social media, website management, and online customer engagement.",
  },
  {
    position: "Procurement Officer",
    department: "core",
    order: 7,
    active: true,
    bio: "Supports the company's procurement activities by coordinating the sourcing of materials, supplies, and other resources required to support efficient business and operational activities.",
  },
];

export function membersOf(department: TeamDepartment) {
  return team
    .filter((m) => m.active && m.department === department)
    .sort((a, b) => a.order - b.order);
}

export const teamValues = [
  { title: "Quality first", body: "We focus on consistency and care across our products and operations." },
  { title: "Teamwork", body: "We work across different functions toward shared business and customer goals." },
  { title: "Reliability", body: "We aim to communicate clearly and follow through on our commitments." },
  { title: "Customer focus", body: "We listen to customer requirements and work toward practical solutions." },
];
