'use client'

import { useEffect, useRef } from 'react'
import AISummary from './AISummary'

const components = [
  {
    brand: 'HELIX',
    series: 'M-Series Digital',
    model: 'M ONE',
    role: 'Amplifier — Mono',
    position: 'Subwoofer Channel',
    specs: [
      { key: 'RMS Power', val: '600W @ 1Ω' },
      { key: 'Active load', val: '~350W @ 2Ω' },
      { key: 'Type', val: 'Class D Mono' },
    ],
    tier: 'flagship',
    power: 100,
    aiKey: 'audio-helix',
  },
  {
    brand: 'ALPINE',
    series: 'S-Series',
    model: 'S2-A36F',
    role: 'Amplifier — 4 Channel',
    position: 'Mids & Highs',
    specs: [
      { key: 'Channels', val: '4 CH' },
      { key: 'Character', val: 'Warm & Natural' },
      { key: 'Drives', val: 'KSC650 + XS-FB' },
    ],
    tier: 'flagship',
    power: 88,
    aiKey: 'audio-alpine',
  },
  {
    brand: 'SOUNDSTREAM',
    series: 'XPRO Series',
    model: 'XP12',
    role: 'Subwoofer — 12"',
    position: 'Trunk / Baúl',
    specs: [
      { key: 'RMS Power', val: '750W' },
      { key: 'Impedance', val: '2Ω (DVC parallel)' },
      { key: 'Magnet', val: '120 Oz Double' },
    ],
    tier: 'high',
    power: 80,
    aiKey: 'audio-soundstream',
  },
  {
    brand: 'KICKER',
    series: 'KS-Series',
    model: 'KSC650',
    role: 'Coaxial — 6.5"',
    position: 'Rear Deck',
    specs: [
      { key: 'Size', val: '6.5"' },
      { key: 'Type', val: 'Coaxial' },
      { key: 'Role', val: 'Rear Fidelity' },
    ],
    tier: 'high',
    power: 72,
    aiKey: 'audio-kicker',
  },
  {
    brand: 'SONY',
    series: 'XS-FB Series',
    model: 'XS-FB 16cm',
    role: '3-Way — 16cm',
    position: 'Front Doors',
    specs: [
      { key: 'Size', val: '16 cm' },
      { key: 'Config', val: '3-Way' },
      { key: 'Note', val: 'Upgrade pendiente' },
    ],
    tier: 'mid',
    power: 52,
    aiKey: 'audio-sony',
  },
]

const chain = [
  { label: 'Head Unit', sub: 'Source' },
  { label: 'ALPINE S2-A36F', sub: '4 Channel' },
  { label: 'KICKER KSC650', sub: 'Rear' },
  { label: 'SONY XS-FB', sub: 'Doors' },
]

const chainSub = [
  { label: 'Head Unit', sub: 'Source' },
  { label: 'HELIX M ONE', sub: 'Mono 600W' },
  { label: 'SOUNDSTREAM XP12', sub: 'Sub 12"' },
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
      { threshold: 0.08 }
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

const tierColor: Record<string, string> = {
  flagship: 'rgba(200,160,60,0.85)',
  high: 'rgba(200,160,60,0.45)',
  mid: 'rgba(255,255,255,0.25)',
}

const tierLabel: Record<string, string> = {
  flagship: 'Flagship',
  high: 'High Grade',
  mid: 'Mid Grade',
}

export default function CarAudio() {
  const waveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = waveRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="audio"
      className="px-12 py-[120px] bg-[#050505] relative overflow-hidden"
      style={{ borderTop: '0.5px solid rgba(255,255,255,0.05)', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}
    >
      {/* Header */}
      <Reveal>
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c8a03c]/70 mb-4">
          Sound System
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black leading-[0.95] tracking-tight uppercase text-white mb-2">
          Car
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
            Audio
          </span>
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <div className="w-10 h-[0.5px] bg-[#c8a03c]/50 my-6 mb-14" />
      </Reveal>

      {/* Visual + Signal Chain */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mb-20">

        {/* Speaker wave visual */}
        <Reveal delay={180}>
          <div ref={waveRef} className="relative h-72 flex items-center justify-center">
            {[280, 220, 162, 108, 64].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  border: `0.5px solid rgba(200,160,60,${0.06 + i * 0.04})`,
                  animation: `rotateRing ${22 + i * 5}s linear infinite${i % 2 === 1 ? ' reverse' : ''}`,
                }}
              />
            ))}
            {/* Tick marks */}
            <svg className="absolute" width="280" height="280" viewBox="0 0 280 280">
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (i * 360) / 32
                const r = (angle * Math.PI) / 180
                const r1 = 138, r2 = 131
                return (
                  <line
                    key={i}
                    x1={140 + r1 * Math.cos(r)}
                    y1={140 + r1 * Math.sin(r)}
                    x2={140 + r2 * Math.cos(r)}
                    y2={140 + r2 * Math.sin(r)}
                    stroke="rgba(200,160,60,0.22)"
                    strokeWidth="0.5"
                  />
                )
              })}
            </svg>
            {/* Core */}
            <div
              className="relative z-10 w-20 h-20 rounded-full bg-[#050505] flex flex-col items-center justify-center gap-0.5"
              style={{ border: '0.5px solid rgba(200,160,60,0.4)' }}
            >
              <span className="text-[9px] font-bold tracking-[0.14em] text-[#c8a03c]/80 uppercase">HiFi</span>
              <span className="text-[8px] text-white/20 tracking-widest uppercase">Build</span>
            </div>
          </div>
        </Reveal>

        {/* Signal chain */}
        <Reveal delay={220}>
          <div>
            <AISummary section="audio" label="System Analysis" />
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mt-8 mb-8">Signal Flow</p>

            {/* Highs chain */}
            <p className="text-[9px] tracking-[0.18em] uppercase text-[#c8a03c]/50 mb-3">Mids & Highs</p>
            <div className="flex items-center gap-0 mb-8 flex-wrap">
              {chain.map((node, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white/85 leading-tight whitespace-nowrap">{node.label}</span>
                    <span className="text-[9px] text-white/25 tracking-[0.1em] uppercase">{node.sub}</span>
                  </div>
                  {i < chain.length - 1 && (
                    <span className="mx-2 text-[#c8a03c]/30 text-[10px] font-light select-none">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Sub chain */}
            <p className="text-[9px] tracking-[0.18em] uppercase text-[#c8a03c]/50 mb-3">Bass Channel</p>
            <div className="flex items-center gap-0 mb-10 flex-wrap">
              {chainSub.map((node, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white/85 leading-tight whitespace-nowrap">{node.label}</span>
                    <span className="text-[9px] text-white/25 tracking-[0.1em] uppercase">{node.sub}</span>
                  </div>
                  {i < chainSub.length - 1 && (
                    <span className="mx-2 text-[#c8a03c]/30 text-[10px] font-light select-none">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Wiring note */}
            <div
              className="px-4 py-3 text-[10px] leading-relaxed text-white/30"
              style={{ border: '0.5px solid rgba(255,255,255,0.06)', borderLeft: '2px solid rgba(200,160,60,0.4)' }}
            >
              Sub cableado DVC 4Ω en paralelo → 2Ω ✓
              <br />
              HELIX entregando ~350W activos en esa carga.
            </div>
          </div>
        </Reveal>
      </div>

      {/* Component cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]"
        style={{ border: '0.5px solid rgba(255,255,255,0.04)' }}
      >
        {components.map((c, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="audio-card group">
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 h-[1.5px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: tierColor[c.tier] }}
              />

              {/* Brand + tier */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className="text-[9px] font-black tracking-[0.22em] uppercase"
                    style={{ color: tierColor[c.tier] }}
                  >
                    {c.brand}
                  </span>
                  <p className="text-[8px] text-white/20 tracking-[0.1em] uppercase mt-0.5">{c.series}</p>
                </div>
                <span
                  className="text-[8px] font-bold tracking-[0.12em] uppercase px-2 py-0.5"
                  style={{
                    border: `0.5px solid ${tierColor[c.tier]}`,
                    color: tierColor[c.tier],
                    opacity: 0.7,
                  }}
                >
                  {tierLabel[c.tier]}
                </span>
              </div>

              {/* Model */}
              <div className="text-[28px] font-black text-white leading-none tracking-tight mb-1">
                {c.model}
              </div>
              <div className="text-[10px] text-white/30 tracking-[0.12em] uppercase mb-1">{c.role}</div>
              <div className="text-[10px] text-[#c8a03c]/50 tracking-[0.08em] mb-5">{c.position}</div>

              {/* Power bar */}
              <div className="mb-5">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[9px] text-white/20 tracking-widest uppercase">Grade</span>
                  <span className="text-[9px] font-bold" style={{ color: tierColor[c.tier] }}>{c.power}%</span>
                </div>
                <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-[1.4s] ease-out"
                    style={{
                      width: `${c.power}%`,
                      background: `linear-gradient(90deg, ${tierColor[c.tier]}80, ${tierColor[c.tier]})`,
                    }}
                  />
                </div>
              </div>

              {/* Specs */}
              <ul>
                {c.specs.map((s, j) => (
                  <li
                    key={j}
                    className="flex justify-between items-center py-2.5 text-[11px]"
                    style={{ borderBottom: j < c.specs.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <span className="text-white/25 tracking-[0.08em] uppercase text-[10px]">{s.key}</span>
                    <span className="text-white font-bold tracking-[0.04em]">{s.val}</span>
                  </li>
                ))}
              </ul>

              <AISummary section={c.aiKey} compact label="Analysis" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
