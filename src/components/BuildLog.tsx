'use client'

import { useEffect, useRef } from 'react'
import AISummary from './AISummary'

type LogEntry = {
  date: string
  title: string
  desc: string
  tag: string
  active?: boolean
}

const leftLog: LogEntry[] = [
  {
    date: '2003 · Munich',
    title: 'Born at BMW AG',
    desc: 'Salió de línea en la planta de Munich. M54B25 de fábrica, configuración coupé, color Space Gray.',
    tag: 'Stock',
  },
  {
    date: '2021 · Acquisition',
    title: 'El carro llega a mis manos',
    desc: 'Primera inspección completa. Fluidos, frenos, revisión de la suspensión. Base limpia para empezar el build.',
    tag: 'Baseline',
  },
  {
    date: '2022 · Suspension',
    title: 'Coilovers + Camber plates',
    desc: 'BC Racing BR Series instalados. Ajuste de camber negativo para look y manejo track-oriented.',
    tag: 'Stage 1',
  },
]

const rightLog: LogEntry[] = [
  {
    date: '2023 · Wheels',
    title: 'BBS RC 18"',
    desc: 'Ruedas BBS RC en gunmetal. Perfil bajo, fitment perfecto para el E46 coupé. Imagen transformada.',
    tag: 'Stage 2',
  },
  {
    date: '2024 · Engine',
    title: 'Refresh completo M54',
    desc: 'Válvulas VANOS reconstruidas, filtro de aceite Mahle, bujías NGK. El motor canta diferente.',
    tag: 'Stage 3',
  },
  {
    date: '2025 · Ongoing',
    title: 'Interior + Audio',
    desc: 'Asientos Recaro, volante M-Sport, sistema de audio custom. El build continúa.',
    tag: 'In Progress',
    active: true,
  },
]

function TimelineItem({ item, index }: { item: LogEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="t-item relative pl-8 pb-12 last:pb-0"
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      {/* Dot */}
      <div
        className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[#080808]"
        style={{
          border: `0.5px solid ${item.active ? 'rgba(200,160,60,0.8)' : 'rgba(200,160,60,0.4)'}`,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
          style={{ background: item.active ? 'rgba(200,160,60,0.9)' : 'rgba(200,160,60,0.6)' }}
        />
      </div>

      <p
        className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2"
        style={{ color: item.active ? 'rgba(200,160,60,0.85)' : 'rgba(200,160,60,0.55)' }}
      >
        {item.date}
      </p>
      <h4 className="text-[16px] font-bold text-white mb-1.5 tracking-tight leading-snug">
        {item.title}
      </h4>
      <p className="text-[12px] text-white/30 leading-relaxed">{item.desc}</p>
      <span
        className="inline-block text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 mt-3 rounded-sm"
        style={{
          border: `0.5px solid ${item.active ? 'rgba(200,160,60,0.35)' : 'rgba(255,255,255,0.1)'}`,
          color: item.active ? 'rgba(200,160,60,0.7)' : 'rgba(255,255,255,0.22)',
        }}
      >
        {item.tag}
      </span>
    </div>
  )
}

function Timeline({ items }: { items: LogEntry[] }) {
  return (
    <div
      className="relative pl-6"
      style={{ borderLeft: '0.5px solid rgba(255,255,255,0.07)' }}
    >
      {items.map((item, i) => (
        <TimelineItem key={i} item={item} index={i} />
      ))}
    </div>
  )
}

export default function BuildLog() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="log" className="px-12 py-[120px]">
      <div ref={titleRef} className="reveal mb-16">
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c8a03c]/70 mb-4">
          Historia
        </p>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black leading-[0.95] tracking-tight uppercase text-white mb-2">
          Build
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
            Log
          </span>
        </h2>
        <div className="w-10 h-[0.5px] bg-[#c8a03c]/50 mt-6" />
        <AISummary section="log" label="Build Summary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-14">
        <Timeline items={leftLog} />
        <Timeline items={rightLog} />
      </div>
    </section>
  )
}
