# E46 Heritage — The Bimmer Vibes

Sitio web premium tipo showcase dedicado a un **BMW E46 325ci Coupé del 2003**. Una experiencia inmersiva que documenta el build, las specs y la historia del auto, construida con animaciones avanzadas y un sistema de diseño oscuro con acentos en oro.

---

## El Auto

| | |
|---|---|
| Modelo | BMW E46 325ci Coupé |
| Motor | M54B25 — 2.5L Inline-6 DOHC 24v VANOS |
| Potencia | 192 hp stock → 210+ hp modificado |
| Tracción | RWD · Manual |
| 0–100 km/h | 7.2s |
| Build | 2003 Munich → 2021 adquisición → 2025 ongoing |

---

## Stack

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS 3** para estilos
- **GSAP 3** + ScrollTrigger para animaciones de scroll
- **Lenis** para smooth scrolling
- **Framer Motion** para transiciones de componentes
- **Three.js** instalado (integración pendiente)

---

## Secciones

| Sección | Descripción |
|---------|-------------|
| Hero | Imagen full-screen del E46 con parallax, stats y botón "Rev Engine" (Web Audio API) |
| The Stats | Contadores animados — km, hp, días en posesión, modificaciones |
| Cinematic | Cita de impacto con efecto film |
| Stock vs Modded | Comparación visual 2003 → 2025 con barras de progreso |
| Full Specs | 6 tarjetas de rendimiento con animación hover |
| Engine M54B25 | Visualización del motor con anillos concéntricos giratorios |
| Gallery | Strip horizontal con perfiles SVG del auto + foto real |
| Build Log | Timeline 2003–2025 con milestones del build |
| Car Audio | Sistema HiFi completo — HELIX · ALPINE · KICKER · SOUNDSTREAM · SONY |

---

## Sistema de Audio

| Componente | Modelo | Rol |
|-----------|--------|-----|
| Amp Mono | HELIX M ONE — 600W @ 1Ω | Sub channel |
| Amp 4ch | ALPINE S2-A36F | Mids & highs |
| Sub 12" | SOUNDSTREAM XP12 — DVC 4Ω | Baúl (cableado 2Ω paralelo) |
| Rear | KICKER KSC650 — 6.5" | Deck trasero |
| Doors | SONY XS-FB — 16cm 3-way | Puertas |

---

## Desarrollo

```bash
pnpm install
pnpm run dev      # localhost:3000 con Turbopack
pnpm run build    # build de producción
pnpm run lint     # ESLint
```

---

*By [@devlewiso](https://instagram.com/devlewiso)*
