import Link from 'next/link'
import { ArrowUpRight, ArrowRight, BookOpen, BriefcaseBusiness, Building2, Factory, Play } from 'lucide-react'
import { CTA, PageIntro, RouteShell } from '@/components/midrift-shell'

export const metadata = {
  title: 'Concrete Resources, Guides & Project Advice in Kenya',
  description: 'Practical guides from Midrift on cabro, concrete blocks, ventilation blocks, road kerbs, culverts and selecting a precast concrete supplier in Kenya.',
  keywords: ['cabro blocks Kenya guide', 'hollow vs solid concrete blocks', 'road kerbs Kenya', 'precast concrete Kenya resources'],
}

const articles = [
  ['01 / Buying guide', '5 things to check before buying cabro in Kenya', 'A practical checklist for comparing paving products, finishes, applications and supply conversations.', 'Cabro & paving'],
  ['02 / Product guide', 'Hollow vs solid concrete blocks — which should you use?', 'Understand the questions to ask before selecting blocks for residential, commercial or boundary-wall work.', 'Concrete blocks'],
  ['03 / Infrastructure', 'How road kerbs and drainage products fit together', 'A clear starting point for contractors and infrastructure teams planning a civil-works package.', 'Road & infrastructure'],
  ['04 / Manufacturing', 'Behind the scenes at Midrift Concrete Works', 'A look at the conversations, process stages and quality questions behind a dependable precast supply.', 'Quality & manufacturing'],
]

const locationOpportunities = [
  ['Nakuru', 'Cabro suppliers, concrete blocks and precast concrete in Nakuru.', 'Core location for genuinely useful local product and project pages.'],
  ['Nairobi', 'Cabro suppliers and concrete products for Nairobi projects.', 'A future location page should focus on delivery conversations and project context.'],
  ['Naivasha', 'Concrete products and paving solutions in Naivasha.', 'Useful for developments, contractors and infrastructure work when coverage is confirmed.'],
  ['Eldoret', 'Precast concrete products for Eldoret projects.', 'Create only when Midrift can provide accurate local service information.'],
]

const channels = [
  { name: 'Facebook', detail: 'Homeowners, contractors and local market awareness.', icon: Building2, href: 'https://www.facebook.com/' },
  { name: 'Instagram', detail: 'Cabro designs, product textures, projects and brand building.', icon: Factory, href: 'https://www.instagram.com/' },
  { name: 'TikTok', detail: 'Visual manufacturing stories and short construction explainers.', icon: Play, href: 'https://www.tiktok.com/' },
  { name: 'LinkedIn', detail: 'Developers, engineers, architects and procurement teams.', icon: BriefcaseBusiness, href: 'https://www.linkedin.com/' },
  { name: 'YouTube', detail: 'Long-form product education and factory storytelling.', icon: BookOpen, href: 'https://www.youtube.com/' },
]

export default function ResourcesPage() {
  return <RouteShell><PageIntro eyebrow="Resources" title={<>Useful information<br /><em>for better decisions.</em></>} body="Practical product guidance, project thinking and behind-the-scenes stories for the people building Kenya." />
    <section className="section resource-section"><div className="section-heading"><div><p className="section-label"><span />Search-led guidance</p><h2>Learn before<br /><em>you specify.</em></h2></div><p>Midrift’s resource hub is designed to answer the questions that come before a quote: what to select, what to confirm and how to frame a better supply conversation.</p></div><div className="resource-list">{articles.map(([eyebrow, title, body, category]) => <article className="resource-card" key={title}><div className="resource-card-top"><BookOpen size={20} /><span>{category}</span></div><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{body}</p><Link className="text-link" href="/contact">Discuss your project <ArrowRight size={17} /></Link></article>)}</div></section>
    <section className="dark-section content-engine"><div className="section-heading light-heading"><div><p className="section-label"><span />Content engine</p><h2>Educate.<br /><em>Demonstrate.</em></h2></div><p>Every article, project story and product video should build trust before it asks for an order — turning useful search traffic into qualified conversations.</p></div><div className="content-rhythm"><div><strong>Weekly</strong><span>3–5 social posts<br />2–3 short videos</span></div><div><strong>Monthly</strong><span>1 educational article<br />1 project case study</span></div><div><strong>Always</strong><span>Product-led campaigns<br />Clear quote pathways</span></div></div></section>
    <section className="section location-section"><div className="section-heading"><div><p className="section-label"><span />Local search, done properly</p><h2>Useful pages for<br /><em>real project locations.</em></h2></div><p>Location SEO should help a buyer understand what Midrift supplies, where a conversation starts and what to confirm about delivery. We will publish only pages with genuine local value — never thin copies of one another.</p></div><div className="location-grid">{locationOpportunities.map(([name, title, detail]) => <article className="location-card" key={name}><span className="eyebrow">Future location</span><h3>{title}</h3><p>{detail}</p><a className="text-link" href="/contact">Discuss a project in {name} <ArrowRight size={17} /></a></article>)}</div></section>
    <section className="section social-section"><div className="section-heading"><div><p className="section-label"><span />Follow the work</p><h2>Concrete<br /><em>in motion.</em></h2></div><p>Social channels are a gateway to the work — from product detail and factory process to project conversations and technical learning.</p></div><div className="channel-grid">{channels.map(({ name, detail, icon: Icon, href }) => <a className="channel-card" href={href} target="_blank" rel="noreferrer" key={name}><Icon size={21} /><div><strong>{name}</strong><p>{detail}</p></div><ArrowUpRight size={18} /></a>)}</div><p className="resource-note">Official profile URLs can be replaced once Midrift’s verified social handles are confirmed.</p></section>
    <section className="section seo-path"><div><p className="section-label"><span />From search to sale</p><h2>Google should<br /><em>start conversations.</em></h2></div><div className="seo-flow">{['Google Search', 'Product page', 'Request a quote', 'Sales conversation', 'Quotation'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 4 && <ArrowRight size={17} />}</div>)}</div></section>
    <CTA /></RouteShell>
}
