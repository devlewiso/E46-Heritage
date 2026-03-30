'use client'

import { useEffect, useRef } from 'react'
import AISummary from './AISummary'

const specs = [
  { num: '192', unit: 'hp', name: 'Power',       desc: '@ 6,000 rpm' },
  { num: '245', unit: 'nm', name: 'Torque',       desc: '@ 3,500 rpm' },
  { num: '2.5', unit: 'L',  name: 'Displacement', desc: 'Inline-6' },
  { num: '7.2', unit: 's',  name: '0–100 km/h',   desc: 'Manual transmission' },
  { num: '235', unit: '+',  name: 'Top Speed',    desc: 'km/h (limited)' },
  { num: '1.4', unit: 't',  name: 'Kerb Weight',  desc: 'Coupé body' },
]

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Specs() {
  return (
    <section id="specs" className="px-12 py-[120px] relative overflow-hidden">
      <Reveal>
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c8a03c]/70 mb-4">
          Performance
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black leading-[0.95] tracking-tight uppercase text-white mb-2">
          Full
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}
          >
            Specs
          </span>
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <div className="w-10 h-[0.5px] bg-[#c8a03c]/50 my-6" />
        <AISummary section="specs" />
        <div className="mb-14" />
      </Reveal>
      <Reveal delay={200}>
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.055]"
          style={{ border: '0.5px solid rgba(255,255,255,0.055)' }}
        >
          {specs.map((s, i) => (
            <div key={i} className="spec-card">
              <div className="text-[36px] font-black text-white leading-none tracking-tight">
                {s.num}
                <span className="text-[14px] font-light text-white/38 ml-1">{s.unit}</span>
              </div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-white/[0.28] mt-2">
                {s.name}
              </div>
              <div className="text-[11px] text-white/[0.15] mt-1.5 leading-relaxed">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
