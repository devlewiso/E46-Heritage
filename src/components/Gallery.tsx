'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const items = [
  {
    num: '01',
    label: 'Side Profile',
    image: '/img/e46-hero.webp',
    svg: null,
  },
  {
    num: '02',
    label: 'Front Fascia',
    svg: (
      <svg viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="28" width="124" height="58" rx="4" stroke="#fff" strokeWidth="0.8" />
        {/* Kidney grilles */}
        <rect x="54" y="58" width="38" height="18" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="0.7" />
        <rect x="108" y="58" width="38" height="18" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="0.7" />
        {/* Headlights */}
        <path d="M38 28 Q46 28 52 40 L52 60 L38 60 Z" stroke="rgba(200,160,60,0.5)" strokeWidth="0.5" />
        <path d="M162 28 Q154 28 148 40 L148 60 L162 60 Z" stroke="rgba(200,160,60,0.5)" strokeWidth="0.5" />
        {/* Bumper bar */}
        <line x1="38" y1="86" x2="162" y2="86" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        {/* Wheels */}
        <circle cx="62" cy="95" r="10" stroke="#fff" strokeWidth="0.8" />
        <circle cx="138" cy="95" r="10" stroke="#fff" strokeWidth="0.8" />
        <circle cx="62" cy="95" r="4" stroke="rgba(200,160,60,0.5)" strokeWidth="0.5" />
        <circle cx="138" cy="95" r="4" stroke="rgba(200,160,60,0.5)" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Kidney Grille',
    svg: (
      <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left kidney */}
        <path d="M55 30 Q65 22 80 22 Q95 22 98 35 Q98 52 80 58 Q62 58 55 45 Z" stroke="#fff" strokeWidth="0.8" />
        {/* Right kidney */}
        <path d="M102 30 Q105 22 120 22 Q135 22 145 35 Q145 52 128 58 Q110 58 102 45 Z" stroke="#fff" strokeWidth="0.8" />
        {/* Slats */}
        {[35, 41, 47].map((y) => (
          <line key={y} x1="58" y1={y} x2="96" y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
        ))}
        {[35, 41, 47].map((y) => (
          <line key={y} x1="104" y1={y} x2="143" y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
        ))}
        {/* BMW roundel */}
        <circle cx="100" cy="78" r="12" stroke="rgba(200,160,60,0.6)" strokeWidth="0.6" />
        <circle cx="100" cy="78" r="7" stroke="rgba(200,160,60,0.3)" strokeWidth="0.4" />
        <line x1="100" y1="66" x2="100" y2="90" stroke="rgba(200,160,60,0.4)" strokeWidth="0.4" />
        <line x1="88" y1="78" x2="112" y2="78" stroke="rgba(200,160,60,0.4)" strokeWidth="0.4" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'BBS Wheels',
    svg: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" stroke="#fff" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="55" stroke="#fff" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="18" stroke="rgba(200,160,60,0.7)" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="8" fill="rgba(200,160,60,0.15)" stroke="rgba(200,160,60,0.5)" strokeWidth="0.5" />
        {/* 10 spokes */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 36 * Math.PI) / 180
          return (
            <line
              key={i}
              x1={100 + 19 * Math.cos(angle)}
              y1={100 + 19 * Math.sin(angle)}
              x2={100 + 54 * Math.cos(angle)}
              y2={100 + 54 * Math.sin(angle)}
              stroke="#fff"
              strokeWidth="1.2"
            />
          )
        })}
        {/* Lug bolts */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 72 * Math.PI) / 180
          return (
            <circle
              key={i}
              cx={100 + 28 * Math.cos(angle)}
              cy={100 + 28 * Math.sin(angle)}
              r="3"
              stroke="rgba(200,160,60,0.5)"
              strokeWidth="0.5"
            />
          )
        })}
      </svg>
    ),
  },
  {
    num: '05',
    label: 'Rear Quarter',
    svg: (
      <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 72 Q48 46 78 40 Q108 34 148 42 L168 72 Z" fill="#fff" opacity="0.9" />
        <path d="M78 40 L82 56 L148 42" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
        {/* Taillight */}
        <path d="M155 48 L172 52 L172 66 L155 62 Z" stroke="rgba(200,160,60,0.5)" strokeWidth="0.5" />
        <path d="M162 50 L170 53 L170 65 L162 62 Z" fill="rgba(200,160,60,0.1)" />
        {/* Rear wheel */}
        <ellipse cx="52" cy="72" rx="17" ry="17" stroke="#fff" strokeWidth="0.8" />
        <ellipse cx="52" cy="72" rx="9" ry="9" stroke="rgba(200,160,60,0.5)" strokeWidth="0.5" />
        {/* Diffuser hint */}
        <path d="M28 80 Q98 84 168 80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      </svg>
    ),
  },
]

export default function Gallery() {
  const titleRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const ref of [titleRef, stripRef]) {
      const el = ref.current
      if (!el) continue
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
        { threshold: 0.1 }
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="gallery" className="pt-[120px] overflow-hidden">
      <div className="px-12 pb-12">
        <div ref={titleRef} className="reveal">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c8a03c]/70 mb-4">
            Visual
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black leading-[0.95] tracking-tight uppercase text-white mb-2">
            Gallery
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
              E46
            </span>
          </h2>
          <div className="w-10 h-[0.5px] bg-[#c8a03c]/50 my-6 mb-10" />
        </div>
      </div>

      <div ref={stripRef} className="gallery-strip reveal">
        {items.map((item) => (
          <div key={item.num} className="g-item">
            <div className="g-bg">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 80vw, 400px"
                />
              ) : item.svg}
            </div>
            <div className="g-num">{item.num}</div>
            <div className="g-label">{item.label}</div>
            {/* Subtle bottom gradient on hover */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  )
}
