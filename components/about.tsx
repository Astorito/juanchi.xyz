"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, type MotionValue } from "motion/react"

const BG  = "#f5f4f1"
const DIM = "#c9c5be"   // barely-visible on cream → not-yet-revealed words
const LIT = "#111111"   // near-black → revealed words

const ABOUT_TEXT =
  "I'm an AI Solutions Specialist and founder who builds at the intersection of technology, strategy, and business. " +
  "I've launched multiple AI ventures — from virtual try-on engines and generative media platforms to civic intelligence systems and RAG agents for logistics. " +
  "I'm a hands-on leader who takes full ownership from strategy to execution, always driving tech towards business metrics. " +
  "I thrive in ambiguity, transforming complex ideas into working products fast. " +
  "From building AI roadmaps to automating operations, my focus is simply on delivering real business value."

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

// ─── Count-up number ─────────────────────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * target))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, target, duration])

  return (
    <div ref={ref} className="font-bold text-4xl lg:text-5xl" style={{ color: LIT }}>
      {display}{suffix}
    </div>
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
            { target: 200, suffix: "+", label: "Team Members" },
            { target: 4,   suffix: "+", label: "Countries"    },
            { target: 8,   suffix: "+", label: "Years"        },
            { target: 9,   suffix: "+", label: "Ventures"     },
          ].map(({ target, suffix, label }) => (
            <div key={label} className="space-y-1">
              <CountUp target={target} suffix={suffix} />
              <div className="text-sm" style={{ color: "#888" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
