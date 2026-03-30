'use client'

import { useEffect, useRef, useState } from 'react'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [gone, setGone] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18 + 4
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setGone(true)
            onCompleteRef.current()
          }, 300)
          return 100
        }
        return next
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      id="loader"
      className={`fixed inset-0 bg-[#040404] z-[10000] flex flex-col items-center justify-center transition-opacity duration-800 ease-in-out ${gone ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="bmw-circle w-20 h-20 rounded-full border border-[#c8a03c]/30 flex items-center justify-center animate-[spinLoader_3s_linear_infinite]">
          <div className="bmw-inner w-[60px] h-[60px] rounded-full border border-[#c8a03c]/50 flex items-center justify-center">
            <span className="bmw-text text-[11px] font-black tracking-[0.2em] text-[#c8a03c]/80">BMW</span>
          </div>
        </div>
        <div className="loader-name text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mt-3">
          E46 Heritage
        </div>
      </div>
      <div className="loader-bar-wrap w-[200px] h-px bg-white/[0.08] mt-10 overflow-hidden">
        <div
          className="loader-bar h-full bg-[#c8a03c]/70 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loader-pct text-[10px] text-white/20 tracking-[0.15em] mt-3">
        {Math.round(progress)}%
      </div>
      <style jsx>{`
        @keyframes spinLoader {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
