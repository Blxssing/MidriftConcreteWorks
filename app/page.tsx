'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Menu, MessageCircle, Plus, X } from 'lucide-react'
import { buyerGroups, faqs, processSteps, products } from '@/lib/midrift-data'
import { googleMapsUrl, officePhone, salesEmail, salesPhone } from '@/components/midrift-shell'

const productFilters = ['All products', 'Cabro & paving', 'Concrete blocks', 'Ventilation blocks', 'Road & infrastructure', 'Custom precast']
const socialLinks = [
  { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/' },
  { label: 'Facebook', short: 'FB', href: 'https://www.facebook.com/' },
  { label: 'LinkedIn', short: 'in', href: 'https://www.linkedin.com/' },
  { label: 'YouTube', short: 'YT', href: 'https://www.youtube.com/' },
]

function Label({ children }: { children: React.ReactNode }) { return <p className="section-label"><span />{children}</p> }

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filter, setFilter] = useState('All products')
  const [openFaq, setOpenFaq] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const visibleProducts = filter === 'All products' ? products.slice(0, 6) : products.filter((item) => item.category === filter)

  return <main id="top">
    <header className="site-header floating-header">
      <Link href="/" className="wordmark" aria-label="Midrift Concrete Works home"><span>MIDRIFT</span><small>CONCRETE WORKS LTD</small></Link>
      <nav className={`desktop-nav ${mobileOpen ? 'mobile-nav-open' : ''}`} aria-label="Primary navigation">
        {['Products', 'Solutions', 'Projects', 'Quality', 'About', 'Resources', 'Contact'].map((item) => <Link key={item} href={item === 'Contact' ? '/contact' : `/${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{item}</Link>)}
      </nav>
      <div className="header-actions"><a className="text-link whatsapp-link" href={`https://wa.me/${salesPhone}`}><MessageCircle size={16} /> WhatsApp Sales</a><Link className="button button-small" href="/contact">Request a quote <ArrowDownRight /></Link><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X /> : <Menu />}</button></div>
    </header>

    <section className="hero hero-cinematic">
      <div className="hero-copy hero-copy-centered"><Label>Kenyan precast concrete manufacturing</Label><p className="hero-kicker">EST. / NAKURU / KENYA</p><h1>Concrete<br /><em>in context.</em></h1><p className="hero-intro">Quality precast concrete, made for the people and projects shaping Kenya.</p><div className="hero-actions"><Link className="button" href="/contact">Request a quote <ArrowDownRight /></Link><Link className="button button-ghost" href="/products">View products <ArrowRight /></Link></div><p className="hero-note"><span className="accent-dot" /> Products / Manufacturing / Technical knowledge / Project supply</p></div>
      <div className="hero-art cinematic-art"><div className="grid-lines" /><div className="concrete-monolith" /><div className="hero-orbit">QUALITY / STRENGTH / PERFORMANCE</div><span className="hero-index">01 / 03</span></div>
      <a className="scroll-cue" href="#products">Scroll <ArrowDownRight size={15} /></a>
    </section>

    <section className="capability-strip"><div className="capability-lead">A manufacturing partner<br /><strong>for the built environment.</strong></div>{['Precast products', 'Manufacturing', 'Project supply', 'Custom solutions', 'Logistics'].map((item, i) => <div className="capability-item" key={item}><span>0{i + 1}</span>{item}</div>)}</section>

    <section className="section products-section" id="products"><div className="section-heading"><div><Label>Product catalogue</Label><h2>Made to build<br /><em>with purpose.</em></h2></div><p>Explore a focused range of precast solutions. For technical details, variants and project quantities, start a conversation with our team.</p></div><div className="filter-row" role="tablist" aria-label="Product categories">{productFilters.map((item) => <button className={filter === item ? 'filter active' : 'filter'} key={item} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item}</button>)}</div><div className="product-grid">{visibleProducts.map((product, index) => <Link className={`product-card product-card-${index % 3}`} href={`/products/${product.slug}`} key={product.slug}><div className="visual visual-concrete"><span>{product.category}</span><div className="product-shape" /></div><div className="product-info"><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><div className="product-foot"><span>View product</span><span className="round-arrow"><ArrowDownRight size={17} /></span></div></div></Link>)}</div><div className="section-cta"><Link className="text-link" href="/products">Explore the full product range <ArrowRight /></Link></div></section>

    <section className="dark-section solutions-section" id="solutions"><div className="section-heading light-heading"><div><Label>Who we serve</Label><h2>Built around<br /><em>your brief.</em></h2></div><p>Different projects ask different questions. Midrift brings product knowledge, manufacturing capability and a practical supply mindset to the conversation.</p></div><div className="solution-list">{buyerGroups.map((group, index) => <Link className="solution-row" href={`/solutions/${group.slug}`} key={group.slug}><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.name}</h3><p>{group.body}</p><ArrowDownRight /></Link>)}</div></section>

    <section className="section quality-section" id="quality"><div className="split-visual process-visual"><div className="process-ring" /><div className="process-number">08</div><div className="vertical-note">QUALITY / MANUFACTURING</div></div><div className="process-content"><Label>How we work</Label><h2>From raw material<br /><em>to ready to build.</em></h2><p className="lead">A considered process is the foundation of a dependable product. Follow the stages behind a Midrift supply conversation.</p><div className="process-list">{processSteps.map((item, i) => <div className="process-step" key={item}><span>0{i + 1}</span><strong>{item}</strong><small>Process chapter</small></div>)}</div><Link className="button button-dark" href="/quality">Explore quality & manufacturing <ArrowRight /></Link></div></section>

    <section className="project-feature" id="projects"><div className="project-image project-visual"><div className="project-grid" /><span className="project-mark">M</span><div className="project-flag">PROJECTS / 01</div></div><div className="project-copy"><Label>Project portfolio</Label><h2>Concrete in<br /><em>context.</em></h2><p>From a single home build to a complex infrastructure package, the right product only matters when it performs in context.</p><div className="project-meta"><span>Featured case study</span><strong>Project details to be added</strong></div><Link className="button button-dark" href="/projects">View projects <ArrowDownRight /></Link></div></section>

    <section className="section trade-section"><div className="trade-panel bulk"><Label>Bulk & wholesale</Label><h2>Supply that<br /><em>keeps pace.</em></h2><p>For contractors, developers, hardware stores, distributors and infrastructure companies looking for a reliable precast supply conversation.</p><Link className="text-link" href="/bulk-wholesale">Request bulk pricing <ArrowRight /></Link></div><div className="trade-panel delivery"><Label>Delivery & logistics</Label><h2>Plan the<br /><em>next move.</em></h2><p>Talk to us about project-site delivery, bulk loading, trucking and scheduling. Service areas and availability are confirmed per enquiry.</p><Link className="text-link" href="/delivery-logistics">Discuss delivery <ArrowRight /></Link></div></section>

    <section className="section quote-section" id="quote"><div className="quote-intro"><Label>Start a conversation</Label><h2>Tell us what<br /><em>you are building.</em></h2><p>Share the essentials and our sales team can help shape the next step. Product specifications, quantities and delivery details are confirmed during the quotation process.</p><a className="whatsapp-cta" href={`https://wa.me/${salesPhone}`}><MessageCircle /> Prefer WhatsApp? Message sales <ArrowDownRight /></a></div><form className="quote-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>{submitted ? <div className="form-success"><span className="success-icon"><Check /></span><h3>Thank you.</h3><p>Your enquiry has been captured. Our team can continue the conversation from here.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight /></button></div> : <><div className="form-row"><label>Name<input required placeholder="Your name" /></label><label>Company<input placeholder="Company name" /></label></div><div className="form-row"><label>Phone<input required type="tel" placeholder="+254" /></label><label>Email<input required type="email" placeholder="you@company.com" /></label></div><div className="form-row"><label>Product<select defaultValue=""><option value="" disabled>Select a category</option>{productFilters.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label><label>Quantity<input placeholder="e.g. 500 units" /></label></div><label>Delivery location<input placeholder="Town / county" /></label><label>Additional requirements<textarea rows={4} placeholder="Tell us about your project" /></label><button className="button form-submit" type="submit">Submit quote request <ArrowDownRight /></button><p className="form-disclaimer">Your project details are used to prepare your enquiry response.</p></>}</form></section>

    <section className="faq-section"><div><Label>Questions</Label><h2>Good to<br /><em>know.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <ChevronDown /> : <Plus />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

    <footer className="site-footer"><div className="footer-top"><Link href="/" className="wordmark footer-mark"><span>MIDRIFT</span><small>CONCRETE WORKS LTD</small></Link><div className="footer-statement">Quality precast concrete.<br /><em>Built for strength.</em></div><Link className="button" href="/contact">Request a quote <ArrowDownRight /></Link></div><div className="footer-contact"><a href={googleMapsUrl} target="_blank" rel="noreferrer">Old Nairobi Rd, Nakuru, Kenya</a><a href={`tel:+${salesPhone}`}>0745 240050</a><a href={`tel:+${officePhone}`}>0791 502707</a><a href={`mailto:${salesEmail}`}>{salesEmail}</a><a href={googleMapsUrl} target="_blank" rel="noreferrer">Open in Google Maps</a></div><div className="footer-bottom"><div><p className="footer-label">Contact</p><a href={`https://wa.me/${salesPhone}`}>WhatsApp Sales</a><a href="mailto:hello@midrift.co.ke">hello@midrift.co.ke</a></div><div><p className="footer-label">Explore</p><Link href="/products">Products</Link><Link href="/solutions">Solutions</Link><Link href="/projects">Projects</Link></div><div><p className="footer-label">Follow Midrift</p><div className="social-links">{socialLinks.map((item) => <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} key={item.label}>{item.short}</a>)}</div></div><p className="copyright">© 2026 Midrift Concrete Works Ltd.<br />Midrift Concrete Works · Nakuru, Kenya</p></div></footer>
  </main>
}
