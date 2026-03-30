'use client'

import { useState } from 'react'

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const links = [
  ['specs', 'Specs'],
  ['engine', 'Engine'],
  ['gallery', 'Gallery'],
  ['log', 'Build Log'],
  ['audio', 'Audio'],
] as const

export default function Nav() {
  const [isDay, setIsDay] = useState(false)

  const toggleDayMode = () => {
    setIsDay(!isDay)
    document.body.classList.toggle('day')
  }

  return (
    <>
      <button
        id="toggle"
        onClick={toggleDayMode}
        className="fixed top-5 right-5 z-[200] bg-white/[0.05] border border-white/10 rounded-full px-3.5 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase text-white/40 cursor-none transition-all duration-300 hover:bg-[#c8a03c]/10 hover:border-[#c8a03c]/30 hover:text-[#c8a03c]/80"
      >
        {isDay ? 'NIGHT MODE' : 'DAY MODE'}
      </button>
      <nav className="sticky top-0 z-[100] flex justify-between items-center px-12 py-5 border-b border-white/[0.05] bg-[#080808]/95 backdrop-blur-[10px] transition-colors duration-500 day:bg-[#f0ede8]/92 day:border-black/[0.05]">
        <div className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase day:text-black/50">
          E46 Heritage
        </div>
        <ul className="flex gap-7 list-none">
          {links.map(([id, label]) => (
            <li
              key={id}
              onClick={() => scrollTo(id)}
              className="text-[10px] tracking-[0.15em] text-white/[0.28] uppercase cursor-pointer transition-colors duration-300 hover:text-white/80 day:text-black/40 day:hover:text-black/80"
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
