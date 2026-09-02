import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { CTA, PageIntro, RouteShell } from '@/components/midrift-shell'
import { products } from '@/lib/midrift-data'

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })) }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  return <RouteShell><PageIntro eyebrow={product.category} title={<>{product.name}<br /><em>built for the brief.</em></>} body={product.description} /><section className="section product-detail">{product.image ? <div className="visual visual-photo"><img src={product.image} alt={`${product.name} precast concrete by Midrift Concrete Works`} /></div> : <div className="visual visual-process" role="img" aria-label={`${product.name} image to be added`}><span>Product photography to be added</span><i /></div>}<div className="detail-copy"><p className="eyebrow">Applications</p><ul className="detail-list">{product.applications.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><p className="eyebrow">Available variants</p><ul className="detail-list">{product.variants.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><p className="spec-note">{product.specsNote}</p><Link className="button" href="/contact">Request a quote <ArrowUpRight /></Link></div></section><CTA /></RouteShell>
}
