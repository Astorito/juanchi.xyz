"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { ProjectModal } from "@/components/project-modal"
import { projects, type Project } from "@/lib/projects"

// ─── Arc geometry ────────────────────────────────────────────────────────────
const R = 340          // circle radius px
const CARD_W = 96      // card width  (4:3)
const CARD_H = 72      // card height (4:3)
const N = projects.length
const A_MAX = 170      // left edge of arc  (deg, math convention)
const A_MIN = 10       // right edge of arc (deg, math convention)
const SPACING = (A_MAX - A_MIN) / (N - 1)   // 20° between cards
const PERIOD  = N * SPACING                  // 180° full loop
const FADE    = 24     // deg of fade zone at each edge
const SPEED   = 0.004  // deg / ms

// Container origin is bottom-center; profile+text anchored at the circle center
const ORIGIN_X = R + CARD_W               // px from container left  (= CONT_W/2)
const ORIGIN_Y = R + CARD_H               // px from container top   (= circle center)
const CONT_W   = 2 * (R + CARD_W)
const CONT_H   = R + CARD_H + 140         // extra space for profile + text below arc center

function effectiveAngle(baseAngle: number, offset: number): number {
  const raw = PERIOD - ((A_MAX - baseAngle + offset) % PERIOD + PERIOD) % PERIOD
  return A_MAX - raw
}

function cardOpacity(deg: number): number {
  const lo = A_MIN - FADE
  const hi = A_MAX + FADE
  if (deg <= lo || deg >= hi) return 0
  if (deg < A_MIN + FADE) return (deg - lo) / (2 * FADE)
  if (deg > A_MAX - FADE) return (hi - deg) / (2 * FADE)
  return 1
}

// ─── Component ───────────────────────────────────────────────────────────────
interface HeroProps { ready?: boolean }

export function Hero({ ready = false }: HeroProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [arcOffset, setArcOffset]             = useState(0)
  const [visible, setVisible]                 = useState(false)
  const lastTime = useRef<number | null>(null)
  const rafId    = useRef<number | null>(null)

  // Fade-in on ready
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [ready])

  // Continuous arc rotation
  useEffect(() => {
    if (!ready) return
    const tick = (now: number) => {
      if (lastTime.current !== null) {
        const dt = now - lastTime.current
        setArcOffset(prev => prev + SPEED * dt)
      }
      lastTime.current = now
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current) }
  }, [ready])

  const handleClick = (project: Project) => {
    if (project.details) setSelectedProject(project)
    else if (project.link) window.open(project.link, "_blank", "noopener,noreferrer")
  }

  return (
    <>
      {/* ── DESKTOP ──────────────────────────────────────────── */}
      <section
        id="hero"
        className="hidden md:flex min-h-screen items-center justify-center overflow-hidden"
        style={{ background: "#f5f4f1" }}
      >
        {/* Handwritten watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 overflow-hidden"
        >
          <span style={{
            position: "absolute",
            top: "20%",
            left: "-1%",
            fontFamily: "var(--font-dancing), cursive",
            fontSize: "clamp(80px, 10vw, 145px)",
            color: "rgba(0,0,0,0.055)",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}>
            here&apos;s my story
          </span>
        </div>

        {/* Center column */}
        <motion.div
          className="flex flex-col items-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Arc container – origin at bottom-center */}
          <div
            className="relative"
            style={{ width: CONT_W, height: CONT_H }}
          >
            {projects.map((project, i) => {
              const baseAngle = A_MAX - i * SPACING
              const deg  = effectiveAngle(baseAngle, arcOffset)
              const rad  = (deg * Math.PI) / 180
              const x    = ORIGIN_X + R * Math.cos(rad)
              const y    = ORIGIN_Y - R * Math.sin(rad)
              const op   = cardOpacity(deg)
              const hasAction = !!(project.details || project.link)

              return (
                <div
                  key={project.title}
                  onClick={() => hasAction && handleClick(project)}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: CARD_W,
                    height: CARD_H,
                    borderRadius: 14,
                    overflow: "hidden",
                    opacity: op,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
                    cursor: hasAction ? "pointer" : "default",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={e => { if (hasAction) (e.currentTarget as HTMLDivElement).style.transform = "translate(-50%,-50%) scale(1.1)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translate(-50%,-50%) scale(1)" }}
                >
                  <div style={{
                    width: "100%", height: "100%",
                    backgroundImage: `url('${project.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }} />
                </div>
              )
            })}

            {/* Profile anchored at the arc's circle center (bottom-center of container) */}
            <div
              style={{
                position: "absolute",
                left: ORIGIN_X,
                top: ORIGIN_Y,
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{
                width: 72, height: 72,
                borderRadius: "50%",
                background: "#e8520a",
                overflow: "hidden",
                boxShadow: "0 4px 18px rgba(232,82,10,0.28)",
              }}>
                <div style={{
                  width: "100%", height: "100%",
                  backgroundImage: "url('/placeholder-user.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} />
              </div>

              <div style={{ textAlign: "center", fontFamily: "var(--font-raleway), sans-serif" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#1a1a1a", marginBottom: 4 }}>
                  Juanchi Martinez
                </p>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>
                  Product Builder · AI Strategist
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MOBILE ───────────────────────────────────────────── */}
      <section
        id="hero"
        className="md:hidden flex flex-col min-h-screen pt-20 overflow-hidden"
        style={{ background: "#f5f4f1" }}
      >
        <div className="px-6 pt-6 pb-4 text-center flex flex-col gap-2 shrink-0">
          <motion.h1
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#1a1a1a", fontFamily: "var(--font-raleway), sans-serif" }}
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7 }}
          >
            Juanchi Martinez
          </motion.h1>
          <motion.p
            className="text-sm leading-relaxed mx-auto max-w-xs"
            style={{ color: "#999" }}
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            I build technology, strategy and chaos into something valuable
          </motion.p>
        </div>

        <motion.div
          className="shrink-0 py-4"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="flex gap-3 overflow-x-auto px-6 pb-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project) => {
              const hasAction = !!(project.details || project.link)
              return (
                <div
                  key={project.title}
                  className={`shrink-0 snap-start ${hasAction ? "cursor-pointer" : ""}`}
                  style={{ width: 90, height: 68, borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 12px rgba(0,0,0,0.12)", flexShrink: 0 }}
                  onClick={() => hasAction && handleClick(project)}
                >
                  <div style={{
                    width: "100%", height: "100%",
                    backgroundImage: `url('${project.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }} />
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e8520a", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", backgroundImage: "url('/placeholder-user.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
          </div>
        </motion.div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
