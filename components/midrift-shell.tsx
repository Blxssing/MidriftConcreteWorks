import Link from 'next/link'
import { ArrowUpRight, Camera, Mail, MapPin, MessageCircle, Phone, Send, Video } from 'lucide-react'

export const salesPhone = '254745240050'
export const officePhone = '254791502707'
export const salesEmail = 'midmerchants@gmail.com'
export const googleMapsUrl = 'https://maps.app.goo.gl/bwNKrAXXZXFq3U457'
export const companyLocation = 'Old Nairobi Rd, Nakuru, Kenya'
export const companyHours = 'Open · Closes 5 PM'
export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Camera },
  { label: 'TikTok', href: 'https://www.tiktok.com/', icon: Send },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: Video },
]

export function SiteHeader() {
  return <header className="site-header"><Link href="/" className="wordmark" aria-label="Midrift Concrete Works home"><span>MIDRIFT</span><small>CONCRETE WORKS LTD</small></Link><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/products">Products</Link><Link href="/solutions">Solutions</Link><Link href="/projects">Projects</Link><Link href="/quality">Quality</Link><Link href="/about">About</Link><Link href="/resources">Resources</Link><Link href="/contact">Contact</Link></nav><div className="header-actions"><a className="text-link whatsapp-link" href={`https://wa.me/${salesPhone}`} aria-label="Chat with Midrift on WhatsApp"><MessageCircle size={16} /> WhatsApp Sales</a><Link className="button button-small" href="/contact">Request a quote <ArrowUpRight /></Link></div></header>
}

export function RouteShell({ children }: { children: React.ReactNode }) {
  return <main><SiteHeader />{children}<footer className="site-footer"><div className="footer-top"><Link href="/" className="wordmark footer-mark"><span>MIDRIFT</span><small>CONCRETE WORKS LTD</small></Link><div className="footer-statement">Quality precast concrete.<br /><em>Built for strength.</em></div><Link className="button" href="/contact">Request a quote <ArrowUpRight /></Link></div><div className="footer-contact"><a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> {companyLocation}</a><a href={`tel:+${salesPhone}`}><Phone size={16} /> 0745 240050</a><a href={`tel:+${officePhone}`}><Phone size={16} /> 0791 502707</a><span>{companyHours}</span><a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Plus code: P43J+J9 Nakuru</a></div><div className="footer-bottom"><div><p className="footer-label">Contact</p><a href={`https://wa.me/${salesPhone}`}>WhatsApp Sales</a><a href={`mailto:${salesEmail}`}><Mail size={14} /> {salesEmail}</a></div><div><p className="footer-label">Explore</p><Link href="/products">Products</Link><Link href="/solutions">Solutions</Link><Link href="/projects">Projects</Link></div><div><p className="footer-label">Follow Midrift</p><div className="social-links">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Midrift Concrete Works on ${label}`}><Icon size={17} /></a>)}</div></div><p className="copyright">© 2026 Midrift Concrete Works Ltd.<br />Quality precast concrete · Nakuru, Kenya</p></div></footer></main>
}

export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: React.ReactNode; body: string }) {
  return <section className="page-intro"><p className="section-label"><span />{eyebrow}</p><h1>{title}</h1><p className="hero-intro">{body}</p></section>
}

export function CTA() {
  return <section className="section quote-section"><div className="quote-intro"><p className="section-label"><span />Start a conversation</p><h2>Tell us what<br /><em>you are building.</em></h2><p>Share the essentials and our sales team can help shape the next step. Product specifications, quantities and delivery details are confirmed during the quotation process.</p></div><Link className="button" href="/contact">Request a quote <ArrowUpRight /></Link></section>
}
