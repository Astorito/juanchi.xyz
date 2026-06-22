"use client"

import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import { ProjectModal } from "@/components/project-modal"
import { projects, type Project } from "@/lib/projects"

const ease = [0.16, 1, 0.3, 1] as const

const ARC_RADIUS = 340
const ANGLE_START = 172
const ANGLE_END = 8

function getArcPosition(index: number, total: number) {
  const angleDeg = ANGLE_START - (ANGLE_START - ANGLE_END) * (index / (total - 1))
  const angleRad = (angleDeg * Math.PI) / 180
  const x = ARC_RADIUS * Math.cos(angleRad)
  const y = -ARC_RADIUS * Math.sin(angleRad)
  const rotation = angleDeg - 90
  return { x, y, rotation }
}

interface HeroProps {
  ready?: boolean
}

export function Hero({ ready = false }: HeroProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!ready) return
    const timer = setTimeout(() => {
      animate(
        ".arc-card",
        { opacity: [0, 1], scale: [0.8, 1] },
        { duration: 0.45, delay: stagger(0.07) }
      )
    }, 350)
    return () => clearTimeout(timer)
  }, [ready, animate])

  const handleCardClick = (project: Project) => {
    if (project.details) setSelectedProject(project)
    else if (project.link) window.open(project.link, "_blank", "noopener,noreferrer")
  }

  return (
    <>
      {/* ── DESKTOP ─────────────────────────────────────────── */}
      <section
        id="hero"
        ref={scope}
        className="hidden md:block relative min-h-screen overflow-hidden"
        style={{ background: "#f5f4f1" }}
      >
        {/* Handwritten background text */}
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            style={{
              position: "absolute",
              top: "18%",
              left: "-1%",
              fontFamily: "var(--font-dancing), cursive",
              fontSize: "clamp(90px, 11vw, 155px)",
              color: "rgba(0,0,0,0.07)",
              whiteSpace: "nowrap",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            here&apos;s my story
          </span>
        </div>

        {/* Arc of project cards */}
        {projects.map((project, i) => {
          const { x, y, rotation } = getArcPosition(i, projects.length)
          const hasAction = !!(project.details || project.link)

          return (
            <motion.div
              key={project.title}
              className={`arc-card absolute opacity-0 overflow-hidden ${hasAction ? "cursor-pointer" : ""}`}
              style={{
                width: 96,
                height: 96,
                borderRadius: 22,
                left: `calc(50% + ${x}px)`,
                top: `calc(53% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
              }}
              whileHover={{ scale: 1.1, zIndex: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              onClick={() => handleCardClick(project)}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url('${project.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>
          )
        })}

        {/* Center: profile circle + name */}
        <motion.div
          className="absolute"
          style={{ left: "50%", top: "66%", transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.7, ease, delay: 0.65 }}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 76, height: 76, background: "#e8520a" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url('/placeholder-user.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
            <div className="text-center">
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                  marginBottom: 4,
                }}
              >
                Juanchi Martinez
              </p>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#999",
                }}
              >
                Product Builder · AI Strategist
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MOBILE ──────────────────────────────────────────── */}
      <section
        id="hero"
        className="md:hidden flex flex-col min-h-screen pt-20 overflow-hidden"
        style={{ background: "#f5f4f1" }}
      >
        {/* Name + tagline */}
        <div className="px-6 pt-6 pb-4 text-center flex flex-col gap-2 shrink-0">
          <motion.h1
            className="text-4xl sm:text-5xl font-heading tracking-tight"
            style={{ color: "#1a1a1a" }}
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease }}
          >
            Juanchi Martinez
          </motion.h1>
          <motion.p
            className="text-sm leading-relaxed mx-auto max-w-xs"
            style={{ color: "#888" }}
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            I build technology, strategy and chaos into something valuable
          </motion.p>
        </div>

        {/* Cards carousel */}
        <motion.div
          className="shrink-0 py-4"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
        >
          <div className="flex gap-3 overflow-x-auto px-6 pb-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project) => {
              const hasAction = !!(project.details || project.link)
              return (
                <div
                  key={project.title}
                  className={`shrink-0 w-[90px] h-[90px] overflow-hidden snap-start transition-transform duration-200 active:scale-95 ${hasAction ? "cursor-pointer" : ""}`}
                  style={{ borderRadius: 18, boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}
                  onClick={() => handleCardClick(project)}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Profile */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center gap-3 pb-8"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 72, height: 72, background: "#e8520a" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: "url('/placeholder-user.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </motion.div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
