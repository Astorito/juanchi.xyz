"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showRest, setShowRest] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowRest(true), 3500)
  }, [])

  return (
    <>
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      />
      
      <main className="relative z-10 min-h-screen">
        <Header />
        <Hero />
        
        {/* Glass overlay for content below hero */}
        <div className="relative">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
          <div className="relative z-10">
            <div
              className={`transition-all duration-1000 ${
                showRest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <Projects />
            </div>
            <div
              className={`transition-all duration-1000 delay-300 ${
                showRest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <About />
            </div>
            <div
              className={`transition-all duration-1000 delay-500 ${
                showRest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <Contact />
            </div>
            <div
              className={`transition-all duration-1000 delay-700 ${
                showRest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
