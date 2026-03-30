'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${Math.round(ringPos.current.x)}px`
        ringRef.current.style.top = `${Math.round(ringPos.current.y)}px`
      }
      requestAnimationFrame(animateRing)
    }

    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    window.addEventListener('mousemove', handleMouseMove)
    const requestID = requestAnimationFrame(animateRing)

    const interactiveElements = document.querySelectorAll('button, li, a, .spec-card, .g-item')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(requestID)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed w-3 h-3 rounded-full bg-[#c8a03c]/90 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200 ${hovered ? 'w-1.5 h-1.5' : ''}`}
      />
      <div
        ref={ringRef}
        className={`fixed w-9 h-9 rounded-full border border-[#c8a03c]/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-300 ${hovered ? 'w-[52px] h-[52px] opacity-60' : ''}`}
      />
      <style jsx global>{`
        html, body {
          cursor: none !important;
        }
        button, a, li {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
