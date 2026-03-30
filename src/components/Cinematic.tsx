'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cinematic bg-black min-h-[320px] flex items-center justify-center relative overflow-hidden border-t border-b border-white/[0.04]">
      <div className="cine-bars-top absolute top-0 left-0 right-0 h-14 bg-black z-[3]" />
      
      {[0, 2, 4].map((delay) => (
        <div
          key={delay}
          className="cine-line absolute h-[0.5px] bg-white/[0.04] w-full"
          style={{
            top: '-2px',
            animation: `scanLine 6s linear infinite ${delay}s`,
          }}
        />
      ))}

      <div className={`cine-content relative z-[4] text-center px-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="cine-quote text-[clamp(18px,3vw,28px)] font-black text-white tracking-tight leading-[1.2] uppercase mb-5">
          "Not just a car.<br />
          <span className="text-[#c8a03c]/90">A statement."</span>
        </div>
        <div className="cine-sub text-[11px] text-white/25 tracking-[0.2em] uppercase">
          E46 · The last pure BMW · 2003
        </div>
      </div>

      <div className="cine-bars-bot absolute bottom-0 left-0 right-0 h-14 bg-black z-[3]" />
      
      <style jsx>{`
        @keyframes scanLine {
          from { top: -2px; }
          to { top: 100%; }
        }
      `}</style>
    </section>
  )
}
