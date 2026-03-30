# E46 Heritage — Project Context

## ¿Qué es este proyecto?

**E46 Heritage** es una web premium de portafolio / showcase que celebra un BMW E46 325ci Coupé del 2003, modificado y construido por @devlewiso. La experiencia está diseñada como un sitio inmersivo e interactivo que documenta la evolución del vehículo, sus specs, modificaciones y la historia del build.

**Tagline:** "The Bimmer Vibes"
**Owner/Creator:** devlewiso (Instagram: @devlewiso)

---

## El Auto

| Dato | Detalle |
|------|---------|
| Modelo | BMW E46 325ci Coupé |
| Año | 2003 |
| Motor | M54B25 — 2.5L Inline-6, DOHC, 24v, VANOS |
| Potencia stock | 192 hp @ 6,000 rpm |
| Potencia actual | 210+ hp (post modificaciones) |
| Torque | 245 Nm @ 3,500 rpm |
| Tracción | RWD, transmisión manual |
| 0-100 km/h | 7.2s |
| Velocidad máxima | 235+ km/h |
| Peso | 1,400 kg |
| Kilometraje | 187,432 km |
| En posesión desde | 2021 (1,460+ días) |
| Modificaciones | 23+ |

---

## Stack Técnico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 15.1.0 | Framework principal |
| React | 19.0.0 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4.1 | Estilos utilitarios |
| GSAP + ScrollTrigger | 3.14.2 | Animaciones de scroll |
| @gsap/react | 2.1.2 | Integración React de GSAP |
| Framer Motion | 12.38.0 | Animaciones de componentes |
| Lenis | 1.0.42 | Smooth scrolling |
| Three.js | 0.183.2 | 3D (instalado, pendiente de uso) |
| Lucide React | 1.7.0 | Iconos |
| clsx + tailwind-merge | — | Manejo de clases CSS |

**Deploy:** pendiente (estructura Next.js lista para Netlify/Vercel)
**Dev:** `pnpm run dev` con Turbopack

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fuente Inter, metadata
│   ├── page.tsx          # Página principal — orquesta todos los componentes
│   └── globals.css       # Variables CSS, dark/light mode, efectos visuales
├── components/
│   ├── Nav.tsx           # Navegación sticky con toggle day/night
│   ├── Footer.tsx        # Footer con branding e Instagram
│   ├── SmoothScrollProvider.tsx  # Lenis + GSAP ScrollTrigger provider
│   ├── Loader.tsx        # Loader inicial con barra de progreso
│   ├── Cursor.tsx        # Cursor personalizado con estados hover
│   ├── Particles.tsx     # Partículas flotantes de fondo (18 partículas)
│   ├── Hero.tsx          # Sección hero — imagen auto, stats, botón "Rev Engine"
│   ├── Odometer.tsx      # Contadores animados (km, hp, días, mods)
│   ├── Cinematic.tsx     # Sección cita cinematográfica
│   ├── StockVsModded.tsx # Comparación stock 2003 vs modded 2025
│   ├── Specs.tsx         # Grid de specs de rendimiento (6 tarjetas)
│   ├── Engine.tsx        # Showcase motor M54B25 con visualización rotante
│   ├── Gallery.tsx       # Galería horizontal con 5 visualizaciones SVG del auto
│   └── BuildLog.tsx      # Timeline del build (2003–2025)
public/
└── img/
    └── e46-hero.webp     # Imagen principal del auto (3.2 MB, optimizado)
```

---

## Sistema de Diseño

**Paleta de colores:**
- Fondo dark: `#080808`, `#050505`
- Texto: `#ffffff`
- Acento (oro): `#c8a03c`
- Fondo light: `#f0ede8`, `#e8e4de`
- Acento light: `#a07820`

**Efectos visuales:**
- Overlay de scanlines (efecto CRT)
- Film grain texture
- Radial gradient spotlights
- Glassmorphism en navbar (backdrop blur)
- Gold glow animations
- Parallax scrolling

**Tipografía:** Inter (pesos 300, 400, 700, 900) — Google Fonts

---

## Secciones de la Página (en orden)

1. **Loader** — Animación inicial con círculo BMW y progreso
2. **Nav** — Navegación sticky + toggle day/night
3. **Hero** — Auto con parallax, stats superpuestas, botón "Rev Engine" (Web Audio API)
4. **Odometer** — Contadores animados con números clave
5. **Cinematic** — Cita: *"Not just a car. A statement."* con efecto film
6. **StockVsModded** — Comparación visual stock vs modificado
7. **Specs** — 6 tarjetas de rendimiento con animación hover
8. **Engine** — Visualización motor con anillos giratorios
9. **Gallery** — Galería horizontal con SVGs del auto (perfil, frontal, grilla, ruedas, trasera)
10. **BuildLog** — Timeline 2003–2025 con milestones del build
11. **Footer** — Branding + Instagram

---

## Sistema de Audio — Car Audio Build

| Componente | Marca / Serie | Modelo | Rol |
|-----------|--------------|--------|-----|
| Amplificador Mono | HELIX M-Series (Digital) | M ONE — 600W RMS @ 1Ω | Músculo del bajo — ~350W activos @ 2Ω al Soundstream XP12 |
| Amplificador 4 Canales | ALPINE S-Series | S2-A36F | Claridad central — voces y medios, sonido cálido y natural |
| Parlantes Traseros | KICKER KS-Series | KSC650 — 6.5" | Fidelidad trasera — complementan la potencia del Alpine |
| Subwoofer | SOUNDSTREAM XPRO | XP12 — 12" DVC 4Ω | 2Ω (DVC paralelo) — ~350W del HELIX, margen a 750W RMS |
| Parlantes Puertas | SONY XS-FB | 16cm 3 vías | Eslabón débil — upgrade pendiente |

**Jerarquía de calidad:** HELIX > ALPINE S > KICKER KS > SOUNDSTREAM XP > SONY XS-FB

**Flujo de señal:**
- Fuente → Alpine S2-A36F (4ch) → KSC650 traseros + Sony XS-FB puertas
- Fuente → HELIX M ONE (mono) → Soundstream XP12 (2Ω DVC paralelo, ~350W activos)

**Cableado sub:** DVC 4Ω → ambas bobinas en paralelo → 2Ω ✓ (configuración óptima activa)

**Notas:**
- Sistema en configuración óptima — sub a 2Ω, HELIX entregando ~350W activos
- Los Sony de puertas son el único punto a mejorar en el próximo upgrade
- Configuración orientada a High Fidelity (HiFi) con énfasis en bajos precisos

---

## Build Timeline

| Año | Hito |
|-----|------|
| 2003 | Fabricación en Munich |
| 2021 | Adquisición del vehículo |
| 2022 | Suspensión — coilovers |
| 2023 | Ruedas BBS |
| 2024 | Refresh de motor |
| 2025 | Trabajo interior en progreso |

---

## Estado Actual

**Completado:**
- Todos los componentes principales implementados
- Sistema de animaciones (GSAP, Lenis, Framer Motion)
- Toggle dark/light mode
- Cursor personalizado
- Smooth scrolling
- Diseño responsive

**Pendiente / Por implementar:**
- Integración Three.js (librerías instaladas pero sin usar)
- Imágenes reales en la galería (actualmente SVGs)
- Media en Build Log
- SEO optimizado
- Analytics
- Deploy en producción

---

## Comandos

```bash
pnpm install
pnpm run dev      # Desarrollo con Turbopack en localhost:3000
pnpm run build    # Build de producción
pnpm run lint     # ESLint
```
