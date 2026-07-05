"use client"

import { useState, useEffect } from "react"
import { PortfolioHero } from "@/components/portfolio-hero"
import { LoaderScreen } from "@/components/loader-screen"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

// Normalizes progress so a section starts revealing only after `start`,
// reaching full opacity by progress === 1.
function reveal(progress: number, start: number) {
  return Math.min(Math.max((progress - start) / (1 - start), 0), 1)
}

export default function Home() {
  const [heroReady, setHeroReady] = useState(false)
  const [heroProgress, setHeroProgress] = useState(0)

  useEffect(() => {
    // loader hides at ~3800ms; hero sequence starts just after
    const heroTimer = setTimeout(() => setHeroReady(true), 4000)
    return () => clearTimeout(heroTimer)
  }, [])

  // heroProgress now spans the whole hero interaction (circle→arc morph +
  // shuffle, where the About Me preview plays out) — reaches 1 right as the
  // hero unlocks scroll, so these only need to catch up in the final stretch.
  const aboutReveal = reveal(heroProgress, 0.7)
  const contactReveal = reveal(heroProgress, 0.8)
  const footerReveal = reveal(heroProgress, 0.9)

  return (
    <>
      <LoaderScreen />

      {/* Black background */}
      <div className="fixed inset-0 z-0 bg-black" />

      <main className="relative z-10 min-h-screen">
        <PortfolioHero ready={heroReady} onScrollProgress={setHeroProgress} />

        {/* Glass overlay for content below hero — fades in as the hero cards leave the circle */}
        <div className="relative">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
          <div className="relative z-10">
            <div style={{ opacity: aboutReveal, transform: `translateY(${(1 - aboutReveal) * 48}px)` }}>
              <About />
            </div>
            <div style={{ opacity: contactReveal, transform: `translateY(${(1 - contactReveal) * 48}px)` }}>
              <Contact />
            </div>
            <div style={{ opacity: footerReveal, transform: `translateY(${(1 - footerReveal) * 48}px)` }}>
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
