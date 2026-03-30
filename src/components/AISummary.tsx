'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const summaries: Record<string, string> = {
  hero: `BMW E46 325ci Coupé — 2003. Motor M54B25, bloque de 2.5 litros inline-6 con tecnología VANOS de doble árbol. Tracción trasera, caja manual de 5 velocidades. 192 hp de fábrica en una carrocería de apenas 1,400 kg. Una de las últimas plataformas BMW diseñadas antes de la era del torque artificial. Conducción pura, comunicación directa, carácter sin filtros.`,

  specs: `Relación peso-potencia: 7.29 kg por caballo. 0 a 100 en 7.2 segundos en condiciones stock — número que mejora con el setup actual de suspensión. El motor M54B25 opera a 6,000 rpm para potencia máxima, con una curva de torque lineal que comienza desde los 3,500 rpm. Sin turbo, sin intercooler: cada caballo viene directamente del motor. Top speed limitado electrónicamente a 235 km/h.`,

  engine: `El M54B25 es considerado uno de los mejores motores BMW de la era moderna. DOHC con 24 válvulas y sistema VANOS de doble fase variable — ajusta el timing de admisión y escape en tiempo real según demanda. Diámetro de cilindro 84 mm, carrera 75 mm. Relación de compresión 11.0:1. Inyección secuencial multipunto. Consumo moderado para su potencia. Motor longevo si se mantiene el nivel de aceite y se respetan los intervalos de servicio.`,

  audio: `Sistema de sonido orientado a High Fidelity con jerarquía clara. El HELIX M ONE es el músculo — amplificador mono alemán de 600W que alimenta el Soundstream XP12. El Alpine S2-A36F maneja los 4 canales de mids y highs con su firma de sonido cálida y natural. Configuración actual del sub: DVC 4Ω cableado en paralelo a 2Ω — el HELIX entrega aproximadamente 350-400W en esa carga. El eslabón a mejorar son los Sony de puertas. Cuando se reemplacen, el sistema sube un nivel completo.`,

  log: `22 años de historia en un solo chasis. Nació en Munich, llegó a Guatemala en 2021 con base mecánica sólida. El build progresó en etapas: suspensión primero para dominar el handling, luego las ruedas BBS para identidad visual, después el refresh de motor para garantizar longevidad. 2025 es el año del interior — la cabina ahora debe estar a la altura del exterior. 23 modificaciones documentadas. Build en progreso, no en exhibición.`,

  'audio-helix': `Amplificador mono de ingeniería alemana — el más fino del sistema. 600W RMS a 1Ω en Clase D, eficiencia superior al 90%. Actualmente operando a ~200W porque el Soundstream XP12 está cableado a 4Ω con una sola bobina. Solución directa: conectar ambas bobinas en paralelo baja la carga a 2Ω y libera ~350–400W reales. Este amplificador tiene más para dar de lo que el sistema actualmente le exige.`,

  'audio-alpine': `Amplificador de 4 canales de la línea S de Alpine — firma de sonido cálida y natural, característica de la marca japonesa. Alimenta las KSC650 en el deck trasero y los Sony XS-FB en las puertas. El problema: el amplificador tiene un nivel de resolución mayor al que los Sony pueden reproducir. Cuando se reemplacen los parlantes de puertas por componentes de mayor calidad, este Alpine va a brillar al nivel que realmente merece.`,

  'audio-soundstream': `Subwoofer de 12 pulgadas con imán doble de 120 onzas — motor de fuerza real. DVC 4Ω significa dos bobinas de voz de 4Ω cada una. Cableado actual: una sola bobina a 4Ω, el HELIX entrega ~200W. Configuración óptima: ambas bobinas en paralelo a 2Ω — el HELIX sube a ~350–400W. El sub aguanta 750W RMS así que hay margen amplio. Respuesta desde 25Hz: presión física en el baúl, no solo volumen.`,

  'audio-kicker': `Parlantes coaxiales de 6.5" de la línea KS de Kicker — construcción sólida, fidelidad confiable. Posicionados en el deck trasero para llenar el campo sonoro posterior. La serie KS de Kicker es conocida por su respuesta de medios limpia sin fatiga auditiva. Complementan bien la salida del Alpine S2-A36F. Buen punto de equilibrio entre calidad y costo dentro de esta configuración.`,

  'audio-sony': `Parlantes 3 vías de 16cm en las puertas delanteras — el eslabón más débil del sistema. Son funcionales pero el Alpine S2-A36F que los alimenta tiene una resolución muy superior a lo que estos pueden reproducir. Son el candidato principal para el próximo upgrade. Reemplazarlos por componentes separados — tweeter dedicado más mid de calidad — transformaría la escena sonora frontal y desbloquearía el potencial completo del amplificador Alpine.`,
}

function useTypewriter(text: string, speed = 22) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const start = useCallback(() => {
    setDisplayed('')
    setDone(false)
    indexRef.current = 0

    const tick = () => {
      if (indexRef.current < text.length) {
        indexRef.current++
        setDisplayed(text.slice(0, indexRef.current))
        rafRef.current = setTimeout(tick, speed)
      } else {
        setDone(true)
      }
    }
    rafRef.current = setTimeout(tick, speed)
  }, [text, speed])

  useEffect(() => {
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current)
    }
  }, [])

  return { displayed, done, start }
}

interface Props {
  section: string
  label?: string
  compact?: boolean
}

export default function AISummary({ section, label = 'AI Analysis', compact = false }: Props) {
  const [open, setOpen] = useState(false)
  const [thinking, setThinking] = useState(false)
  const text = summaries[section] ?? ''
  const { displayed, done, start } = useTypewriter(text, compact ? 14 : 18)

  const handleOpen = () => {
    if (open) { setOpen(false); return }
    setOpen(true)
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      start()
    }, 700)
  }

  return (
    <div className={compact ? 'mt-5' : 'mt-8'}>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="ai-trigger group flex items-center gap-2.5 cursor-none"
      >
        <span className="ai-dot" />
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#c8a03c]/60 group-hover:text-[#c8a03c]/90 transition-colors duration-200">
          {open ? 'Close' : label}
        </span>
        <span className="text-[#c8a03c]/25 text-[10px] group-hover:text-[#c8a03c]/50 transition-colors duration-200">
          {open ? '↑' : '↓'}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className={compact ? 'ai-panel ai-panel--compact mt-3' : 'ai-panel mt-4'}>
          {/* Header bar */}
          <div className="flex items-center gap-2 mb-3 pb-2.5" style={{ borderBottom: '0.5px solid rgba(200,160,60,0.12)' }}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full bg-[#c8a03c] ${!done ? 'animate-pulse' : ''}`} />
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#c8a03c]/50">
              {thinking ? 'Processing...' : done ? 'Analysis complete' : 'Generating...'}
            </span>
            <span className="ml-auto text-[9px] text-white/10 tracking-widest">E46·AI</span>
          </div>

          {/* Content */}
          <div className={`leading-[1.75] text-white/60 font-light tracking-wide min-h-[40px] ${compact ? 'text-[11px]' : 'text-[12px]'}`}>
            {thinking ? (
              <ThinkingDots />
            ) : (
              <>
                {displayed}
                {!done && <span className="ai-cursor" />}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ThinkingDots() {
  return (
    <span className="flex items-center gap-1.5 h-5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1 h-1 rounded-full bg-[#c8a03c]/40"
          style={{ animation: `thinkDot 1.2s ease-in-out infinite ${i * 0.2}s` }}
        />
      ))}
    </span>
  )
}
