'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Specs from '@/components/Specs'
import Engine from '@/components/Engine'
import Gallery from '@/components/Gallery'
import BuildLog from '@/components/BuildLog'
import CarAudio from '@/components/CarAudio'
import Footer from '@/components/Footer'
import Odometer from '@/components/Odometer'
import Cinematic from '@/components/Cinematic'
import StockVsModded from '@/components/StockVsModded'
import Cursor from '@/components/Cursor'
import Loader from '@/components/Loader'
import Particles from '@/components/Particles'

export default function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />
      {!loading && (
        <>
          <Cursor />
          <Particles />
          <Nav />
          <main className="bg-[#080808] transition-colors duration-500 day:bg-[#f0ede8]">
            <Hero />
            <Odometer />
            <Cinematic />
            <StockVsModded />
            <Specs />
            <Engine />
            <Gallery />
            <BuildLog />
            <CarAudio />
            <Footer />
          </main>
        </>
      )}
    </>
  )
}
