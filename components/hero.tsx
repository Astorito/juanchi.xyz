"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { ScrambleText } from "@/components/scramble-text"
import { Typewriter } from "@/components/typewriter"
import { RippleButton } from "@/components/ripple-button"

export function Hero() {
  const [scrambleComplete, setScrambleComplete] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 pb-4 relative"
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="max-w-5xl w-full mx-auto text-left space-y-6 relative z-10">
        <h1 className="text-5xl lg:text-8xl font-bold font-heading tracking-tight md:text-6xl text-foreground">
          <ScrambleText
            duration={2.8}
            staggerFrom="center"
            staggerDelay={0.056}
            onComplete={() => setScrambleComplete(true)}
          >
            Juanchi Martinez
          </ScrambleText>
        </h1>

        <div className="h-8 lg:h-10 flex items-center justify-start">
          {scrambleComplete && (
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <Typewriter
                speed={50}
                variance={0.5}
                onComplete={() => setTypewriterComplete(true)}
              >
                I build technology, strategy and chaos into something valuable
              </Typewriter>
            </p>
          )}
        </div>

        <div className="pt-4">
          {typewriterComplete && (
            <RippleButton
              onClick={scrollToProjects}
              visible={typewriterComplete}
              className="group inline-flex items-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base rounded-xl hover:scale-105"
            >
              See my work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </RippleButton>
          )}
        </div>
      </div>
    </section>
  )
}
