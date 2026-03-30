'use client'

import { useEffect, useState } from 'react'

export default function Particles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 18 }).map(() => ({
      size: Math.random() * 6 + 3,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 15,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div id="particles" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-[#c8a03c]/15"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animation: `floatP ${p.duration}s linear infinite ${p.delay}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes floatP {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
