'use client'

import { useEffect, useRef, useState } from 'react'

const stockItems = [
  { key: 'Power', val: '192 hp', w: '58%' },
  { key: 'Suspension', val: 'OEM Springs', w: '40%' },
  { key: 'Wheels', val: '16" Stock', w: '35%' },
  { key: 'Exhaust', val: 'Stock Cat-back', w: '30%' },
  { key: 'Visual', val: 'Factory', w: '45%' },
]

const moddedItems = [
  { key: 'Power', val: '210+ hp', w: '72%' },
  { key: 'Suspension', val: 'BC Coilovers', w: '88%' },
  { key: 'Wheels', val: 'BBS 18"', w: '95%' },
  { key: 'Exhaust', val: 'Supersprint', w: '90%' },
  { key: 'Visual', val: 'Full Custom', w: '98%' },
]

export default function StockVsModded() {
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
    <section id="comp" ref={sectionRef} className="comp-section p-12 py-[120px] transition-colors duration-500 day:bg-[#f0ede8]">
      <div className={`section-label text-[10px] font-bold tracking-[0.25em] uppercase text-[#c8a03c]/70 mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        Evolution
      </div>
      <div className={`section-title text-[clamp(32px,5vw,52px)] font-black leading-[0.95] tracking-tight uppercase text-white mb-2 day:text-[#111] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        Stock <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,.25)' }}>vs</span> Modded
      </div>
      <div className={`w-10 h-[0.5px] bg-[#c8a03c]/50 my-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} />
      
      <div className={`comp-grid grid grid-cols-1 md:grid-cols-2 gap-[2px] mt-12 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* Stock Column */}
        <div className="comp-col bg-[#0a0a0a] p-8 md:p-10 day:bg-[#e0dcd5] transition-colors duration-500">
          <span className="comp-tag inline-block text-[9px] font-bold tracking-[0.2em] uppercase mb-6 px-3 py-1 border border-white/10 text-white/30 rounded-sm day:border-black/10 day:text-black/40">
            Stock 2003
          </span>
          {stockItems.map((item, i) => (
            <div key={i} className="comp-item py-3.5 border-b border-white/5 last:border-none day:border-black/10">
              <div className="comp-row flex justify-between items-center text-xs">
                <span className="comp-key text-[10px] text-white/30 tracking-wider uppercase day:text-black/40">
                  {item.key}
                </span>
                <span className="comp-val font-bold text-white day:text-[#111]">
                  {item.val}
                </span>
              </div>
              <div className="comp-bar-wrap mt-2 h-[2px] bg-white/[0.06] rounded-full overflow-hidden day:bg-black/15">
                <div
                  className="comp-bar-fill h-full bg-white/20 rounded-full transition-all duration-[1500ms] cubic-bezier(.16,1,.3,1)"
                  style={{ width: visible ? item.w : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modded Column */}
        <div className="comp-col modded bg-[#0d0b08] p-8 md:p-10 day:bg-[#e8e0d0] transition-colors duration-500">
          <span className="comp-tag inline-block text-[9px] font-bold tracking-[0.2em] uppercase mb-6 px-3 py-1 border border-[#c8a03c]/30 text-[#c8a03c]/90 rounded-sm day:border-[#966414]/30 day:text-[#966414]">
            Modded 2025
          </span>
          {moddedItems.map((item, i) => (
            <div key={i} className="comp-item py-3.5 border-b border-white/5 last:border-none day:border-black/10">
              <div className="comp-row flex justify-between items-center text-xs">
                <span className="comp-key text-[10px] text-white/30 tracking-wider uppercase day:text-black/40">
                  {item.key}
                </span>
                <span className="comp-val font-bold text-[#c8a03c]/90 day:text-[#111]">
                  {item.val}
                </span>
              </div>
              <div className="comp-bar-wrap mt-2 h-[2px] bg-white/[0.06] rounded-full overflow-hidden day:bg-black/15">
                <div
                  className="comp-bar-fill h-full bg-[#c8a03c]/70 rounded-full transition-all duration-[1500ms] cubic-bezier(.16,1,.3,1) day:bg-[#966414]/60"
                  style={{ width: visible ? item.w : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
