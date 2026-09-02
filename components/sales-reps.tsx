'use client'

import { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'

export type SalesRep = { name: string; phone: string; display: string }

export const salesReps: SalesRep[] = [
  { name: 'Patrick', phone: '254705736512', display: '0705 736512' },
  { name: 'Caleb', phone: '254791502707', display: '0791 502707' },
  { name: 'Nathaniel', phone: '254701755069', display: '0701 755069' },
  { name: 'Jane', phone: '254715293439', display: '0715 293439' },
  { name: 'John', phone: '254746422136', display: '0746 422136' },
]

export function SalesRepPicker({ message }: { message: string }) {
  const [selected, setSelected] = useState<SalesRep | null>(null)
  return <div className="rep-picker">
    <p className="eyebrow">Choose who should handle your quote</p>
    <div className="rep-grid" role="list">
      {salesReps.map((rep) => <button type="button" role="listitem" key={rep.phone} className={selected?.phone === rep.phone ? 'rep-card active' : 'rep-card'} onClick={() => setSelected(rep)} aria-pressed={selected?.phone === rep.phone}>
        <strong>{rep.name}</strong><span>{rep.display}</span>
      </button>)}
    </div>
    {selected && <div className="rep-actions">
      <a className="button" href={`https://wa.me/${selected.phone}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> Send to {selected.name} on WhatsApp</a>
      <a className="button button-ghost" href={`tel:+${selected.phone}`}><Phone size={16} /> Call {selected.name}</a>
    </div>}
  </div>
}
