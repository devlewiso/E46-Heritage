'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface CountProps {
  id: string
  from: number
  to: number
  duration: number
  formatter: (v: number) => ReactNode
}

function useCountUp({ from, to, duration, formatter }: CountProps, trigger: boolean) {
  const [value, setValue] = useState(formatter(from))
  const fired = useRef(false)

  useEffect(() => {
    if (trigger && !fired.current) {
      fired.current = true
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 4)
        const current = Math.round(from + (to - from) * ease)
        setValue(formatter(current))
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }
  }, [trigger, from, to, duration, formatter])

  return value
}

export default function Odometer() {
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

  const odo1 = useCountUp(
    {
      id: 'odo1',
      from: 0,
      to: 187432,
      duration: 2000,
      formatter: (v) => v.toLocaleString(),
    },
    visible
  )
  const odo2 = useCountUp(
    {
      id: 'odo2',
      from: 0,
      to: 192,
      duration: 1200,
      formatter: (v) => (
        <>
          {v}
          <span className="text-xs text-[#c8a03c]/70 font-normal ml-1">hp</span>
        </>
      ),
    },
    visible
  )
  const odo3 = useCountUp(
    {
      id: 'odo3',
      from: 0,
      to: 1460,
      duration: 1500,
      formatter: (v) => v.toLocaleString(),
    },
    visible
  )
  const odo4 = useCountUp(
    {
      id: 'odo4',
      from: 0,
      to: 23,
      duration: 1000,
      formatter: (v) => (
        <>
          {v}
          <span className="text-xs text-[#c8a03c]/70 font-normal ml-1">mods</span>
        </>
      ),
    },
    visible
  )

  return (
    <section
      ref={sectionRef}
      id="odo"
      className="odo-section bg-[#050505] border-t border-b border-white/5 py-20 px-12 transition-colors duration-500 day:bg-[#e8e4de]"
    >
      <div className={`section-label text-[10px] font-bold tracking-[0.25em] uppercase text-[#c8a03c]/70 mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        Numbers
      </div>
      <div className={`section-title text-[clamp(32px,5vw,52px)] font-black leading-[0.95] tracking-tight uppercase text-white mb-2 day:text-[#111] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        The <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,.25)' }}>Stats</span>
      </div>
      <div className={`w-10 h-[0.5px] bg-[#c8a03c]/50 my-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} />
      
      <div className={`odo-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mt-12 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="odo-card bg-[#050505] p-10 text-center day:bg-[#f0ede8]">
          <div className="odo-val text-[clamp(28px,4vw,48px)] font-black text-white tracking-tight day:text-[#111]">
            {odo1}
          </div>
          <div className="odo-label text-[9px] tracking-[0.2em] uppercase text-white/25 mt-2 day:text-black/40">
            Kilometers
          </div>
        </div>
        <div className="odo-card bg-[#050505] p-10 text-center day:bg-[#f0ede8]">
          <div className="odo-val text-[clamp(28px,4vw,48px)] font-black text-white tracking-tight day:text-[#111]">
            {odo2}
          </div>
          <div className="odo-label text-[9px] tracking-[0.2em] uppercase text-white/25 mt-2 day:text-black/40">
            Horsepower
          </div>
        </div>
        <div className="odo-card bg-[#050505] p-10 text-center day:bg-[#f0ede8]">
          <div className="odo-val text-[clamp(28px,4vw,48px)] font-black text-white tracking-tight day:text-[#111]">
            {odo3}
          </div>
          <div className="odo-label text-[9px] tracking-[0.2em] uppercase text-white/25 mt-2 day:text-black/40">
            Days Owned
          </div>
        </div>
        <div className="odo-card bg-[#050505] p-10 text-center day:bg-[#f0ede8]">
          <div className="odo-val text-[clamp(28px,4vw,48px)] font-black text-white tracking-tight day:text-[#111]">
            {odo4}
          </div>
          <div className="odo-label text-[9px] tracking-[0.2em] uppercase text-white/25 mt-2 day:text-black/40">
            Modifications
          </div>
        </div>
      </div>
    </section>
  )
}
