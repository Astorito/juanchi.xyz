"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

const ABOUT_TEXT =
  "I'm an AI Solutions Specialist and founder who builds at the intersection of technology, strategy, and business. " +
  "I've launched multiple AI ventures — from virtual try-on engines and generative media platforms to civic intelligence systems and RAG agents for logistics. " +
  "I don't just advise on AI. I architect it, ship it, and scale it. " +
  "Leading teams of over 200 people across four countries, I've learned that great technology means nothing without the execution to match. " +
  "My edge is turning ambiguity into working product — fast. " +
  "Whether it's a full AI integration roadmap, a production-ready MVP, or a pipeline that replaces a team of analysts, " +
  "I move from idea to impact with speed and precision."

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const color = useTransform(progress, range, ["#52525b", "#ffffff"])
  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] break-keep"
    >
      {word}
    </motion.span>
  )
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const words = ABOUT_TEXT.split(/\s+/).filter(Boolean)
  const total = words.length

  // Stats fade in near end of scroll
  const statsOpacity = useTransform(scrollYProgress, [0.82, 0.97], [0, 1])
  const statsY = useTransform(scrollYProgress, [0.82, 0.97], [24, 0])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative"
      style={{ height: "360vh" }}
    >
      {/* Sticky panel — stays fixed while user scrolls through the container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 lg:px-20 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl w-full space-y-8">

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Me
          </h2>

          {/* Word-by-word reveal */}
          <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed [hyphens:none]">
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[i / total, Math.min((i + 2) / total, 1)]}
              />
            ))}
          </p>

          {/* Stats — appear when text is fully revealed */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            <div className="space-y-1">
              <div className="font-bold text-4xl lg:text-5xl text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-4xl lg:text-5xl text-foreground">4+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-4xl lg:text-5xl text-primary">8+</div>
              <div className="text-sm text-muted-foreground">Years</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-4xl lg:text-5xl text-foreground">9+</div>
              <div className="text-sm text-muted-foreground">Ventures</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
