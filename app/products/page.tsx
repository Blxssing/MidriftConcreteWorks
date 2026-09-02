import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CTA, PageIntro, RouteShell } from '@/components/midrift-shell'
import { products } from '@/lib/midrift-data'

export default function ProductsPage() {
  return <RouteShell><PageIntro eyebrow="Product catalogue" title={<>Concrete products<br /><em>with purpose.</em></>} body="Explore a focused range of precast solutions for residential, commercial and infrastructure work. Technical details, variants and quantities are confirmed per enquiry." /><section className="section product-grid">{products.map((product) => <article className="product-card" key={product.slug}>{product.image ? <div className="visual visual-photo"><img src={product.image} alt={`${product.name} by Midrift Concrete Works`} loading="lazy" /></div> : <div className="visual visual-concrete" role="img" aria-label={`${product.name} image to be added`}><span>Image to be added</span><i /></div>}<div className="product-info"><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><div className="product-foot"><span>{product.specsNote}</span><Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><ArrowUpRight /></Link></div></div></article>)}</section><CTA /></RouteShell>
}
