'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const carWrapRef = useRef<HTMLDivElement>(null)
  const yearBgRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.hl1', '.hl2', '.hl3', '.hero-sub', '.hero-stats', '.hero-cta'], {
        y: 30,
        opacity: 0,
      })
      gsap.set(carWrapRef.current, { x: 100, opacity: 0 })

      const tl = gsap.timeline({ delay: 0.1 })
      tl.to(carWrapRef.current, { x: 0, opacity: 1, duration: 1.6, ease: 'power4.out' })
        .to('.hl1', { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, 0.4)
        .to('.hl2', { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, 0.55)
        .to('.hl3', { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, 0.7)
        .to('.hero-sub',   { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, 0.9)
        .to('.hero-stats', { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, 1.05)
        .to('.hero-cta',   { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, 1.2)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Scroll effects: car parallax + yearBg parallax
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY
      lastScrollY.current = sy

      if (carWrapRef.current)
        carWrapRef.current.style.transform = `translateX(${sy * -0.05}px)`
      if (yearBgRef.current)
        yearBgRef.current.style.transform = `translateY(calc(-50% + ${sy * 0.15}px))`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const revEngine = () => {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const makeNote = (freq: number, dur: number, detune: number) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sawtooth'
      o.frequency.setValueAtTime(freq, ctx.currentTime)
      o.frequency.exponentialRampToValueAtTime(freq * 2.2, ctx.currentTime + dur * 0.4)
      o.frequency.exponentialRampToValueAtTime(freq * 0.7, ctx.currentTime + dur)
      if (detune) o.detune.value = detune
      g.gain.setValueAtTime(0, ctx.currentTime)
      g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.05)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
      o.connect(g)
      g.connect(ctx.destination)
      o.start()
      o.stop(ctx.currentTime + dur)
    }
    makeNote(80, 1.8, 0)
    makeNote(160, 1.6, 5)
    makeNote(240, 1.4, -5)

    const btn = document.getElementById('revBtn')
    if (btn) {
      const originalText = btn.textContent
      btn.textContent = 'VROOOOM!'
      setTimeout(() => {
        btn.textContent = originalText
      }, 2000)
    }
  }

  return (
    <section ref={heroRef} className="hero relative min-h-screen overflow-hidden bg-[#080808] p-12 flex flex-col justify-end transition-colors duration-500 day:bg-[#e8e4de]">

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,.013) 0px, rgba(255,255,255,.013) 1px, transparent 1px, transparent 4px)',
          animation: 'flicker 8s infinite',
        }}
      />

      {/* Progress bar left edge */}
      <div className="absolute left-0 top-0 w-[2px] h-full bg-white/[0.05] z-10">
        <div
          className="w-full bg-[#c8a03c]/70 h-[35%]"
          style={{ animation: 'progressGrow 2s cubic-bezier(.16,1,.3,1) 0.5s both' }}
        />
      </div>

      {/* Background "E46" */}
      <div
        ref={yearBgRef}
        className="absolute right-10 top-[40%] -translate-y-1/2 text-[180px] md:text-[240px] font-black text-white/[0.022] tracking-tighter select-none z-[1] leading-none day:text-black/5"
      >
        E46
      </div>

      {/* Spotlight glow */}
      <div
        className="absolute right-[5%] bottom-0 w-[60%] h-[90%] z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 60% 90%, rgba(200,160,60,.16) 0%, transparent 70%)',
          animation: 'pulseGlow 4s ease-in-out infinite alternate',
        }}
      />

      {/* Car Image - Full Width Container */}
      <div
        ref={carWrapRef}
        className="absolute inset-0 w-full h-full flex items-end justify-end z-[2] pointer-events-none select-none overflow-hidden"
      >
        <div className="relative w-full h-full img-glow day:opacity-85">
          <Image
            src="/img/e46-hero.webp"
            alt="BMW E46 325ci"
            fill
            className="object-contain object-right-bottom scale-110 md:scale-125 translate-x-[5%] translate-y-[8%] lg:translate-x-[2%] lg:translate-y-[5%]"
            priority
          />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-[420px]">
        <div
          className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#c8a03c]/90 px-3 py-1 rounded-sm mb-5"
          style={{ border: '0.5px solid rgba(200,160,60,0.4)' }}
        >
          2003 · M54B25 · E46
        </div>

        <div className="flex flex-col text-[clamp(42px,7vw,62px)] font-black leading-[0.92] tracking-tighter uppercase">
          <span className="hl1 text-white day:text-[#111]">The</span>
          <span className="hl2 text-transparent day:text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.28)' }}>
            Bimmer
          </span>
          <span className="hl3 text-white day:text-[#111]">Vibes</span>
          <style jsx>{`
            body.day .hl2 { -webkit-text-stroke: 1px rgba(0,0,0,0.25); }
          `}</style>
        </div>

        <p className="hero-sub text-[11px] font-light text-white/35 tracking-[0.12em] uppercase my-2.5 mb-7 day:text-black/40">
          325ci · Coupé · Naturally Aspirated
        </p>

        <div className="hero-stats flex gap-7 mb-8">
          <div>
            <div className="text-[22px] font-bold text-white leading-none day:text-[#111]">192</div>
            <div className="text-[10px] text-white/[0.28] tracking-[0.15em] uppercase mt-1 day:text-black/40">HP</div>
          </div>
          <div className="w-[0.5px] bg-white/10 self-stretch day:bg-black/10" />
          <div>
            <div className="text-[22px] font-bold text-white leading-none day:text-[#111]">2.5L</div>
            <div className="text-[10px] text-white/[0.28] tracking-[0.15em] uppercase mt-1 day:text-black/40">Engine</div>
          </div>
          <div className="w-[0.5px] bg-white/10 self-stretch day:bg-black/10" />
          <div>
            <div className="text-[22px] font-bold text-white leading-none day:text-[#111]">RWD</div>
            <div className="text-[10px] text-white/[0.28] tracking-[0.15em] uppercase mt-1 day:text-black/40">Drive</div>
          </div>
        </div>

        <div className="hero-cta flex items-center gap-6">
          <button
            id="revBtn"
            onClick={revEngine}
            className="bg-[#c8a03c]/90 text-[#080808] text-[10px] font-bold tracking-[0.18em] uppercase px-7 py-3 rounded-sm border-none cursor-none transition-all duration-200 hover:bg-[#dbb84a] hover:-translate-y-px active:scale-[0.97]"
          >
            Rev Engine
          </button>
          <button
            onClick={() => scrollTo('specs')}
            className="btn-ghost-line bg-transparent text-white/35 text-[10px] tracking-[0.15em] uppercase border-none cursor-none transition-colors duration-200 hover:text-white/70 day:text-black/40 day:hover:text-black/70"
          >
            Explore specs
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 right-12 z-10 flex items-center gap-2.5">
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/[0.18] day:text-black/20">Scroll</span>
        <div
          className="w-1 h-1 rounded-full bg-[#c8a03c]/60"
          style={{ animation: 'blink 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
