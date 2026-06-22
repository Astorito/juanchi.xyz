"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { ProjectModal } from "@/components/project-modal"
import { projects, type Project } from "@/lib/projects"

// ─── Arc geometry ────────────────────────────────────────────────────────────
const R       = 340    // radius px
const CARD_W  = 72     // portrait 3:4 — 3 wide
const CARD_H  = 96     // portrait 3:4 — 4 tall
const N       = projects.length
const A_MAX   = 170    // left edge of arc  (math deg, CCW from +x axis)
const A_MIN   = 10     // right edge of arc
const SPACING = (A_MAX - A_MIN) / (N - 1)   // 20° between cards
const PERIOD  = N * SPACING                  // 180° — full loop
const SPEED   = 0.002  // deg / ms  (~90 s per full loop)
const MIST_W  = 150    // px gradient overlay on each side

const CARD_MAX = Math.max(CARD_W, CARD_H)    // 96
const ORIGIN_X = R + CARD_MAX                // horizontal center of container
const ORIGIN_Y = R + CARD_MAX                // vertical circle-center position
const CONT_W   = 2 * (R + CARD_MAX)          // 872
const CONT_H   = R + CARD_MAX + 150          // +150 for profile+text

// ─── Pure helpers (no React state involved) ───────────────────────────────────
function effectiveAngle(baseAngle: number, offset: number): number {
  const raw = PERIOD - ((A_MAX - baseAngle + offset) % PERIOD + PERIOD) % PERIOD
  return A_MAX - raw
  // Result is always in (A_MAX-PERIOD, A_MAX] = (-10°, 170°]
}

// Opacity 0 at both wrap boundaries, 15° fade zone (was 30) so cards stay visible longer
function cardOpacity(deg: number): number {
  const lo   = A_MAX - PERIOD   // -10°
  const hi   = A_MAX            // 170°
  const FADE = 15
  if (deg <= lo || deg >= hi) return 0
  if (deg < lo + FADE) return (deg - lo) / FADE
  if (deg > hi - FADE) return (hi - deg) / FADE
  return 1
}

function cardRotation(deg: number): number {
  return 90 - deg
}

// Compute arc position for card i at a given offset
function arcPosition(i: number, offset: number) {
  const deg = effectiveAngle(A_MAX - i * SPACING, offset)
  const rad = (deg * Math.PI) / 180
  return {
    cx:  ORIGIN_X + R * Math.cos(rad),
    cy:  ORIGIN_Y - R * Math.sin(rad),
    rot: cardRotation(deg),
    op:  cardOpacity(deg),
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
interface HeroProps { ready?: boolean }

export function Hero({ ready = false }: HeroProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [visible,  setVisible]  = useState(false)
  const [arcReady, setArcReady] = useState(false)

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef   = useRef<number | null>(null)

  // Name / profile fade-in
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [ready])

  // ── Entrance animation ─────────────────────────────────────────────────────
  // After loader finishes: name appears first (200ms), then cards drop
  // sequentially from above their arc position into place (90ms stagger each).
  // After all cards land, CSS transitions are stripped and rAF loop takes over.
  useEffect(() => {
    if (!ready) return

    const ENTRANCE_DELAY = 500   // ms after ready before first card drops
    const STAGGER        = 90    // ms between each card
    const DROP_DURATION  = 650   // ms per card transition
    const timers: ReturnType<typeof setTimeout>[] = []

    // Set all cards to starting position: at arc location but 90px above, invisible
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i]
      if (!el) continue
      const { cx, cy, rot } = arcPosition(i, 0)
      el.style.transition = "none"
      el.style.transform  = `translate3d(${cx}px,${cy - 90}px,0) translate(-50%,-50%) rotate(${rot}deg)`
      el.style.opacity    = "0"
    }

    // Stagger: enable transition then animate to final arc position
    for (let i = 0; i < N; i++) {
      const t = setTimeout(() => {
        const el = cardRefs.current[i]
        if (!el) return
        const { cx, cy, rot, op } = arcPosition(i, 0)
        el.style.transition = `transform ${DROP_DURATION}ms cubic-bezier(.16,1,.3,1), opacity ${Math.round(DROP_DURATION * 0.55)}ms ease`
        el.style.transform  = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%) rotate(${rot}deg)`
        el.style.opacity    = String(op)
      }, ENTRANCE_DELAY + i * STAGGER)
      timers.push(t)
    }

    // After all cards have landed: strip transitions, hand off to rAF loop
    const totalMs = ENTRANCE_DELAY + (N - 1) * STAGGER + DROP_DURATION + 80
    const doneTimer = setTimeout(() => {
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i]
        if (el) el.style.transition = "none"
      }
      setArcReady(true)
    }, totalMs)
    timers.push(doneTimer)

    return () => timers.forEach(clearTimeout)
  }, [ready])

  // ── Continuous arc rotation (rAF loop) ────────────────────────────────────
  useEffect(() => {
    if (!arcReady) return

    let offset    = 0
    let lastTime: number | null = null

    const tick = (now: number) => {
      if (lastTime !== null) offset += SPEED * (now - lastTime)
      lastTime = now

      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const { cx, cy, rot, op } = arcPosition(i, offset)
        el.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%) rotate(${rot}deg)`
        el.style.opacity   = String(op)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [arcReady])

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
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden">
          <span style={{
            position: "absolute", top: "20%", left: "-1%",
            fontFamily: "var(--font-dancing), cursive",
            fontSize: "clamp(80px, 10vw, 145px)",
            color: "rgba(0,0,0,0.055)",
            whiteSpace: "nowrap", lineHeight: 1,
          }}>
            here&apos;s my story
          </span>
        </div>

        <div className="flex flex-col items-center relative z-10">
          <div className="relative" style={{ width: CONT_W, height: CONT_H }}>

            {/* Cards — positioned via entrance anim then rAF loop */}
            {projects.map((project, i) => {
              const hasAction = !!(project.details || project.link)
              return (
                <div
                  key={project.title}
                  ref={el => { cardRefs.current[i] = el }}
                  style={{
                    position: "absolute",
                    left: 0, top: 0,
                    opacity: 0,
                    transform: `translate3d(${ORIGIN_X}px,${ORIGIN_Y}px,0) translate(-50%,-50%)`,
                    willChange: "transform, opacity",
                    zIndex: 2,
                  }}
                >
                  <div
                    onClick={() => hasAction && handleClick(project)}
                    style={{
                      width: CARD_W, height: CARD_H,
                      borderRadius: 13,
                      overflow: "hidden",
                      boxShadow: "0 4px 22px rgba(0,0,0,0.14)",
                      cursor: hasAction ? "pointer" : "default",
                      transition: "transform 0.18s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.08)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)" }}
                  >
                    <div style={{
                      width: "100%", height: "100%",
                      backgroundImage: `url('${project.image}')`,
                      backgroundSize: "cover", backgroundPosition: "center",
                    }} />
                  </div>
                </div>
              )
            })}

            {/* Mist overlays */}
            <div aria-hidden="true" style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: MIST_W, zIndex: 4, pointerEvents: "none",
              background: `linear-gradient(to right, #f5f4f1 18%, rgba(245,244,241,0.72) 55%, transparent 100%)`,
            }} />
            <div aria-hidden="true" style={{
              position: "absolute", right: 0, top: 0, bottom: 0,
              width: MIST_W, zIndex: 4, pointerEvents: "none",
              background: `linear-gradient(to left, #f5f4f1 18%, rgba(245,244,241,0.72) 55%, transparent 100%)`,
            }} />

            {/* Profile — fades in together with name */}
            <motion.div
              style={{
                position: "absolute",
                left: ORIGIN_X, top: ORIGIN_Y,
                transform: "translate(-50%, -50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                zIndex: 6,
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  width: 108, height: 108, borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.18)",
                  transition: "transform 0.35s cubic-bezier(.16,1,.3,1)",
                  cursor: "default",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)" }}
              >
                <div style={{
                  width: "100%", height: "100%",
                  backgroundImage: "url('/juanchi.jpg')",
                  backgroundSize: "cover", backgroundPosition: "center top",
                }} />
              </div>
              <div style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#1a1a1a", marginBottom: 4 }}>
                  Juanchi Martinez
                </p>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>
                  Product Builder · AI Strategist
                </p>
              </div>
            </motion.div>

          </div>
        </div>
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
                  style={{ width: 72, height: 96, borderRadius: 13, overflow: "hidden", boxShadow: "0 3px 12px rgba(0,0,0,0.12)", flexShrink: 0 }}
                  onClick={() => hasAction && handleClick(project)}
                >
                  <div style={{
                    width: "100%", height: "100%",
                    backgroundImage: `url('${project.image}')`,
                    backgroundSize: "cover", backgroundPosition: "center",
                  }} />
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex flex-col items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
            <div style={{ width: "100%", height: "100%", backgroundImage: "url('/juanchi.jpg')", backgroundSize: "cover", backgroundPosition: "center top" }} />
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#1a1a1a", fontFamily: "var(--font-raleway)" }}>
            Juanchi Martinez
          </p>
        </motion.div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
