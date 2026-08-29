import directorPhoto from "@/assets/team-IMG-20260825-WA0011.jpg.asset.json";
import managerPhoto from "@/assets/team-IMG-20260827-WA0001.jpg.asset.json";
import accountantPhoto from "@/assets/team-IMG-20260827-WA0000.jpg.asset.json";
import procurementPhoto from "@/assets/team-IMG-20260827-WA0005.jpg.asset.json";
import hrPhoto from "@/assets/team-IMG-20260827-WA0003.jpg.asset.json";
import marketingPhoto from "@/assets/team-IMG-20260827-WA0002.jpg.asset.json";

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
    name: "Mr Joseph Wanjohi",
    position: "Director",
    department: "leadership",
    order: 1,
    active: true,
    photo: directorPhoto.url,
    bio: "Provides strategic leadership and helps guide the overall direction, growth, governance, and performance of Midrift Concrete Works, keeping the company focused on quality, customer satisfaction, operational excellence, and sustainable growth.",
  },
  {
    name: "Mrs Mariam",
    position: "Human Resources",
    department: "management",
    order: 2,
    active: true,
    photo: hrPhoto.url,
    bio: "Supports the people and organizational side of Midrift Concrete Works by helping coordinate recruitment, employee support, workplace communication, staff development, and human-resource processes.",
  },
  {
    name: "Mr Patrick",
    position: "Manager",
    department: "management",
    order: 3,
    active: true,
    photo: managerPhoto.url,
    bio: "Coordinates the company's day-to-day activities and works across the team to support efficient operations, effective communication, customer satisfaction, and the consistent execution of company objectives.",
  },
  {
    name: "Mr Nathan",
    position: "Procurement & Operational Quality Officer",
    department: "core",
    order: 4,
    active: true,
    photo: procurementPhoto.url,
    bio: "Coordinates the sourcing of materials, supplies, and other resources the yard needs, and monitors operational activities so that products and production processes meet the company's required standards and specifications.",
  },
  {
    name: "Mrs Jane",
    position: "Accountant",
    department: "core",
    order: 5,
    active: true,
    photo: accountantPhoto.url,
    bio: "Supports the company's financial operations through accounting, financial record management, reporting, invoicing, and financial administration.",
  },
  {
    name: "Deliverknox",
    position: "Digital Marketing",
    department: "core",
    order: 6,
    active: true,
    photo: marketingPhoto.url,
    bio: "Helps connect Midrift Concrete Works with customers through digital channels, brand communication, content, social media, website management, and online customer engagement.",
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
