'use client'

import { useEffect, useState } from 'react'

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const links = [
  ['walkaround', '360°'],
  ['specs', 'Specs'],
  ['engine', 'Engine'],
  ['gallery', 'Gallery'],
  ['log', 'Build Log'],
  ['audio', 'Audio'],
] as const

export default function Nav() {
  const [isDay, setIsDay] = useState(false)

  // Sincroniza el botón con la clase real del body (por si ya venía activada).
  useEffect(() => {
    setIsDay(document.body.classList.contains('day'))
  }, [])

  const toggleDayMode = () => {
    const next = !isDay
    setIsDay(next)
    document.body.classList.toggle('day', next)
  }

  return (
    <nav
      aria-label="Secciones"
      className="sticky top-0 z-[100] flex flex-wrap md:flex-nowrap justify-between items-center gap-y-3 px-5 md:px-12 py-4 md:py-5 border-b border-white/[0.05] bg-[#080808]/95 backdrop-blur-[10px] transition-colors duration-500 day:bg-[#141210]/95"
    >
      <div className="text-[11px] font-bold tracking-[0.25em] text-white/60 uppercase">
        E46 Heritage
      </div>

      {/* En móvil la lista baja a una fila propia que se puede deslizar. */}
      <ul className="order-last md:order-none w-full md:w-auto flex gap-6 md:gap-7 list-none overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map(([id, label]) => (
          <li key={id} className="shrink-0">
            <button
              type="button"
              onClick={() => scrollTo(id)}
              className="py-1 text-[11px] tracking-[0.15em] text-white/55 uppercase whitespace-nowrap transition-colors duration-300 hover:text-white/90 focus-visible:text-white/90"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <button
        id="toggle"
        type="button"
        onClick={toggleDayMode}
        aria-pressed={isDay}
        aria-label={isDay ? 'Cambiar a modo noche' : 'Cambiar a modo día'}
        className="bg-white/[0.05] border border-white/10 rounded-full px-3.5 py-2 md:py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-white/60 transition-all duration-300 hover:bg-[#c8a03c]/10 hover:border-[#c8a03c]/30 hover:text-[#c8a03c]"
      >
        {isDay ? 'Night mode' : 'Day mode'}
      </button>
    </nav>
  )
}
