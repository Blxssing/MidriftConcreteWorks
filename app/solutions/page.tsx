import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CTA, PageIntro, RouteShell } from '@/components/midrift-shell'
import { buyerGroups } from '@/lib/midrift-data'

export default function SolutionsPage() { return <RouteShell><PageIntro eyebrow="Who we serve" title={<>Built around<br /><em>your brief.</em></>} body="Midrift brings product knowledge, manufacturing capability and a practical supply mindset to the people and projects shaping Kenya." /><section className="dark-section solutions-section"><div className="solution-list">{buyerGroups.map((group, index) => <Link className="solution-row" href={`/solutions/${group.slug}`} key={group.slug}><span>0{index + 1}</span><h3>{group.name}</h3><p>{group.body}</p><ArrowUpRight /></Link>)}</div></section><CTA /></RouteShell> }
