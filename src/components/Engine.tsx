'use client'

import { useEffect, useRef } from 'react'
import AISummary from './AISummary'

const engineSpecs = [
  { key: 'Configuration', val: 'I6 DOHC' },
  { key: 'Valves',        val: '24v VANOS' },
  { key: 'Bore × Stroke', val: '84 × 75 mm' },
  { key: 'Compression',   val: '11.0:1' },
  { key: 'Fuel system',   val: 'Sequential MFI' },
  { key: 'Oil capacity',  val: '6.5 L' },
]

const rings = [
  { size: 280, duration: 25, reverse: false },
  { size: 210, duration: 18, reverse: true },
  { size: 140, duration: 12, reverse: false },
]

export default function Engine() {
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = infoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="engine"
      className="px-12 py-[120px] bg-[#050505]"
      style={{ borderTop: '0.5px solid rgba(255,255,255,0.05)', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-5xl">
        {/* Animated rings visual */}
        <div className="relative h-80 flex items-center justify-center">
          {rings.map((ring, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: ring.size,
                height: ring.size,
                border: '0.5px solid rgba(200,160,60,0.14)',
                animation: `rotateRing ${ring.duration}s linear infinite${ring.reverse ? ' reverse' : ''}`,
              }}
            />
          ))}
          {/* Tick marks on outermost ring */}
          <svg
            className="absolute"
            width="280"
            height="280"
            viewBox="0 0 280 280"
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24
              const r = (angle * Math.PI) / 180
              const r1 = 138, r2 = 132
              return (
                <line
                  key={i}
                  x1={140 + r1 * Math.cos(r)}
                  y1={140 + r1 * Math.sin(r)}
                  x2={140 + r2 * Math.cos(r)}
                  y2={140 + r2 * Math.sin(r)}
                  stroke="rgba(200,160,60,0.3)"
                  strokeWidth="0.5"
                />
              )
            })}
          </svg>
          {/* Core */}
          <div
            className="relative z-10 w-20 h-20 rounded-full bg-[#0d0d0d] flex items-center justify-center"
            style={{ border: '0.5px solid rgba(200,160,60,0.4)' }}
          >
            <span className="text-[10px] font-bold tracking-[0.12em] text-[#c8a03c]/80 uppercase">
              M54
            </span>
          </div>
        </div>

        {/* Engine info */}
        <div ref={infoRef} className="reveal">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c8a03c]/70 mb-4">
            Powerplant
          </p>
          <div className="text-[clamp(28px,4vw,42px)] font-black text-white tracking-tight uppercase leading-[0.95] mb-6">
            M54B25
            <br />
            <span
              className="font-black"
              style={{
                color: 'rgba(255,255,255,0.22)',
                fontSize: 'clamp(20px,3vw,32px)',
              }}
            >
              inline six
            </span>
          </div>
          <AISummary section="engine" label="Engine Analysis" />
          <ul className="list-none mt-8">
            {engineSpecs.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center py-3.5 text-[12px]"
                style={{ borderBottom: i < engineSpecs.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <span className="text-white/30 tracking-[0.1em] uppercase">{item.key}</span>
                <span className="text-white font-bold tracking-[0.05em]">{item.val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
