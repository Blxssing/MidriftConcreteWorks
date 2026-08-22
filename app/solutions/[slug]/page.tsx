import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { CTA, PageIntro, RouteShell } from '@/components/midrift-shell'
import { buyerGroups } from '@/lib/midrift-data'
export function generateStaticParams() { return buyerGroups.map((group) => ({ slug: group.slug })) }
export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const group = buyerGroups.find((item) => item.slug === slug); if (!group) notFound(); return <RouteShell><PageIntro eyebrow="Solutions / who we serve" title={<>{group.name}<br /><em>{group.title}</em></>} body={group.body} /><section className="section detail-grid"><div><p className="section-label"><span />Relevant products</p><h2>Supply that fits<br /><em>the project.</em></h2></div><div className="resource-list">{group.products.map((product) => <Link href="/products" key={product}><span>Product category</span><strong>{product}</strong><ArrowUpRight /></Link>)}</div></section><CTA /></RouteShell> }
