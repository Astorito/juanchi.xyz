"use client"

import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot"
import { ProjectModal } from "@/components/project-modal"
import { projects, type Project } from "@/lib/projects"

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"

const positions = [
  { className: "top-[4%] left-[8%]",         depth: 0.5, size: "w-32 h-32 md:w-40 md:h-40" },
  { className: "top-[3%] left-[32%]",         depth: 1,   size: "w-36 h-36 md:w-44 md:h-44" },
  { className: "top-[8%] left-[48%]",         depth: 1,   size: "w-28 h-28 md:w-36 md:h-36" },
  { className: "top-[38%] left-[6%]",         depth: 1,   size: "w-32 h-32 md:w-40 md:h-40" },
  { className: "top-[20%] right-[3%]",        depth: 2,   size: "w-32 h-40 md:w-40 md:h-48" },
  { className: "top-[68%] left-[13%]",        depth: 4,   size: "w-36 h-36 md:w-48 md:h-48" },
  { className: "top-[55%] right-[4%]",        depth: 1,   size: "w-28 h-28 md:w-36 md:h-36" },
  { className: "top-[65%] right-[11%]",       depth: 2,   size: "w-32 h-40 md:w-40 md:h-48" },
  { className: "top-[3%] left-[62%]",         depth: 1,   size: "w-28 h-28 md:w-36 md:h-36" },
]

const ease = [0.16, 1, 0.3, 1] as const

interface HeroProps {
  ready?: boolean
}

export function Hero({ ready = false }: HeroProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [scope, animate] = useAnimate()
  const [robotVisible, setRobotVisible] = useState(false)

  useEffect(() => {
    if (!ready) return

    // Phase 3: robot appears 600ms after ready
    const robotTimer = setTimeout(() => setRobotVisible(true), 600)

    // Phase 4: cards appear 1000ms after ready, staggered
    const cardsTimer = setTimeout(() => {
      animate(
        ".floating-card",
        { opacity: [0, 1] },
        { duration: 0.5, delay: stagger(0.12) }
      )
    }, 1000)

    return () => {
      clearTimeout(robotTimer)
      clearTimeout(cardsTimer)
    }
  }, [ready, animate])

  const handleCardClick = (project: Project) => {
    if (project.details) {
      setSelectedProject(project)
    } else if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <>
      <section
        id="hero"
        ref={scope}
        className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 pb-8 relative md:overflow-hidden bg-black"
      >
        {/* Robot — phase 3, fades in after H1+H2 */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: robotVisible ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div
            className="w-full h-full"
            style={{ transform: "translateY(20%) scale(0.65)", transformOrigin: "center center" }}
          >
            <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="w-full h-full" />
          </div>
        </motion.div>

        {/* Floating project cards — z-10, phase 4, desktop only */}
        <Floating sensitivity={-1} className="z-10 overflow-hidden pointer-events-none hidden md:block">
          {projects.map((project, i) => {
            const pos = positions[i] ?? positions[0]
            const hasAction = !!(project.details || project.link)

            return (
              <FloatingElement key={project.title} depth={pos.depth} className={pos.className}>
                <motion.div
                  className={`floating-card pointer-events-auto opacity-0 ${pos.size} relative rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-105 ${hasAction ? "cursor-pointer" : ""}`}
                  onClick={() => handleCardClick(project)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                  <div className="relative h-full p-2 md:p-3 flex flex-col justify-end">
                    <p className="text-[9px] md:text-[10px] font-medium text-white/70 uppercase tracking-wider leading-tight">
                      {project.role}
                      {project.comingSoon && <span className="ml-1 normal-case text-white/40">· soon</span>}
                    </p>
                    <h3 className="text-xs md:text-sm font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              </FloatingElement>
            )
          })}
        </Floating>

        {/* Text + mobile cards — z-50 */}
        <div className="max-w-5xl w-full mx-auto text-center relative z-50 -mt-8 md:-mt-48 flex flex-col items-center gap-4">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-heading tracking-tight text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, ease }}
          >
            Juanchi Martinez
          </motion.h1>
          <motion.p
            className="text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed text-center mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
          >
            I build technology, strategy and chaos into something valuable
          </motion.p>

          {/* Mobile project cards strip — visible only below md */}
          <motion.div
            className="md:hidden w-full mt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease, delay: 0.9 }}
          >
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {projects.map((project) => {
                const hasAction = !!(project.details || project.link)
                return (
                  <div
                    key={project.title}
                    className={`shrink-0 w-28 h-36 relative rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)] snap-start transition-transform duration-200 active:scale-95 ${hasAction ? "cursor-pointer" : ""}`}
                    onClick={() => handleCardClick(project)}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    <div className="relative h-full p-2 flex flex-col justify-end">
                      <p className="text-[8px] font-medium text-white/70 uppercase tracking-wider leading-tight">
                        {project.role}
                        {project.comingSoon && <span className="ml-1 normal-case text-white/40">· soon</span>}
                      </p>
                      <h3 className="text-[10px] font-bold text-white leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
