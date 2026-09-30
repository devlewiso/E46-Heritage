'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

// three.js pesa: se descarga solo cuando la sección está por entrar en pantalla.
const E46Scene = dynamic(() => import('./E46Scene'), { ssr: false })

export default function Walkaround() {
  const sectionRef = useRef<HTMLElement>(null)
  const [cerca, setCerca] = useState(false)
  const [visible, setVisible] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  // En pantallas angostas el recuadro es más vertical: se aleja la cámara para que el auto entre completo.
  const [margin, setMargin] = useState(0.82)

  useEffect(() => {
    setAutoRotate(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setMargin(window.innerWidth < 640 ? 1.12 : 0.82)
    const el = sectionRef.current
    if (!el) return
    const precarga = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCerca(true) }, { rootMargin: '600px 0px' })
    const entrada = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    precarga.observe(el)
    entrada.observe(el)
    return () => { precarga.disconnect(); entrada.disconnect() }
  }, [])

  return (
    <section
      id="walkaround"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] day:bg-[#141210] px-5 md:px-12 py-[120px] transition-colors duration-500"
    >
      <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c8a03c]/70 mb-4">360° View</p>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black leading-[0.95] tracking-tight uppercase text-white">
          Walk
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.28)' }}>
            Around
          </span>
        </h2>
        <div className="w-10 h-[0.5px] bg-[#c8a03c]/50 my-6" />
      </div>

      <div className="relative mt-4 h-[46vh] min-h-[320px] md:h-[520px] rounded-sm border border-white/[0.06] bg-[radial-gradient(ellipse_at_50%_70%,rgba(200,160,60,0.10),transparent_65%)]">
        {cerca ? (
          <E46Scene autoRotate={autoRotate} margin={margin} />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[11px] tracking-[0.2em] uppercase text-white/40">
            Cargando modelo 3D…
          </div>
        )}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/50">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c8a03c]/80" />
          Arrastra para girar
        </div>
        <div className="pointer-events-none absolute top-4 right-4 text-[10px] tracking-[0.15em] uppercase text-white/35">
          Modelo 3D generado con IA
        </div>
      </div>
    </section>
  )
}
