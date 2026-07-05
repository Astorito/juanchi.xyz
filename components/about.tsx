"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

const LIT = "#111111"   // near-black → revealed words

export const ABOUT_TEXT =
  "I'm an AI Solutions Specialist and founder who builds at the intersection of technology, strategy, and business. " +
  "I've launched multiple AI ventures — from virtual try-on engines and generative media platforms to civic intelligence systems and RAG agents for logistics. " +
  "I'm a hands-on leader who takes full ownership from strategy to execution, always driving tech towards business metrics. " +
  "I thrive in ambiguity, transforming complex ideas into working products fast. " +
  "From building AI roadmaps to automating operations, my focus is simply on delivering real business value."

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

// The word-by-word reveal of ABOUT_TEXT now happens inside the hero itself
// (see components/portfolio-hero.tsx) as the cards finish their pass, so this
// section only carries the stats — kept under id="about" for the nav anchor.
export function About() {
  return (
    <section
      id="about"
      className="px-6 lg:px-20 py-16"
      style={{ background: "#f5f4f1", borderTop: "1px solid rgba(0,0,0,0.06)" }}
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
  )
}
