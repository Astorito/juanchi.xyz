"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

const BG  = "#f5f4f1"
const DIM = "#c9c5be"   // barely-visible on cream → not-yet-revealed words
const LIT = "#111111"   // near-black → revealed words

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
  const opacity = useTransform(progress, range, [0.18, 1])
  const color   = useTransform(progress, range, [DIM, LIT])
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

  return (
    <>
      {/* ── Word-reveal sticky section ─────────────────────── */}
      <div
        id="about"
        ref={containerRef}
        className="relative"
        style={{ height: "420vh" }}
      >
        <div
          className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 lg:px-20 overflow-hidden"
          style={{ background: BG }}
        >
          <div className="max-w-6xl w-full space-y-8 pt-20">

            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight shrink-0"
              style={{ color: LIT }}
            >
              About Me
            </h2>

            <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed [hyphens:none]">
              {words.map((word, i) => (
                <Word
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[i / total, Math.min((i + 1.5) / total, 1)]}
                />
              ))}
            </p>

          </div>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section
        className="px-6 lg:px-20 py-16"
        style={{ background: BG, borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "200+", label: "Team Members" },
            { value: "4+",   label: "Countries"    },
            { value: "8+",   label: "Years"        },
            { value: "9+",   label: "Ventures"     },
          ].map(({ value, label }) => (
            <div key={label} className="space-y-1">
              <div className="font-bold text-4xl lg:text-5xl" style={{ color: LIT }}>{value}</div>
              <div className="text-sm" style={{ color: "#888" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
