"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot"
import { projects } from "@/lib/projects"

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"

// cards moved 5% outward; Astorito (index 6) moved to right-side mid
const positions = [
  { className: "top-[4%] left-[8%]",            depth: 0.5, size: "w-26 h-26 md:w-36 md:h-36"  },
  { className: "top-[8%] left-[32%]",            depth: 1,   size: "w-32 h-32 md:w-40 md:h-40"  },
  { className: "top-[8%] left-[48%]",            depth: 1,   size: "w-32 h-32 md:w-40 md:h-40"  },
  { className: "top-[38%] left-[6%]",            depth: 1,   size: "w-36 h-36 md:w-48 md:h-48"  },
  { className: "top-[20%] right-[8%]",           depth: 2,   size: "w-36 h-48 md:w-48 md:h-56"  },
  { className: "top-[68%] left-[13%]",           depth: 4,   size: "w-40 h-40 md:w-56 md:h-56"  },
  { className: "top-[55%] right-[4%]",           depth: 1,   size: "w-32 h-32 md:w-40 md:h-40"  },
  { className: "top-[65%] right-[11%]",          depth: 2,   size: "w-36 h-48 md:w-48 md:h-56"  },
]

export function Hero() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      ".floating-card",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    )
  }, [animate])

  return (
    <section
      id="hero"
      ref={scope}
      className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 pb-4 relative overflow-hidden bg-black"
    >
      {/* Robot — pushed to bottom via translateY, scaled down */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full"
          style={{ transform: "translateY(20%) scale(0.65)", transformOrigin: "center center" }}
        >
          <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="w-full h-full" />
        </div>
      </div>

      {/* Floating project cards — z-10, below text */}
      <Floating sensitivity={-1} className="z-10 overflow-hidden pointer-events-none">
        {projects.map((project, i) => {
          const pos = positions[i] ?? positions[0]
          const CardContent = (
            <motion.div
              className={`floating-card opacity-0 ${pos.size} relative rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-105 ${project.link ? "cursor-pointer" : ""}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="relative h-full p-2 md:p-3 flex flex-col justify-end">
                <p className="text-[9px] md:text-[10px] font-medium text-white/70 uppercase tracking-wider leading-tight">
                  {project.role}
                </p>
                <h3 className="text-xs md:text-sm font-bold text-white leading-tight">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          )

          return (
            <FloatingElement key={project.title} depth={pos.depth} className={pos.className}>
              <div className="pointer-events-auto">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </div>
            </FloatingElement>
          )
        })}
      </Floating>

      {/* Text — z-50, centered, pushed further up */}
      <div className="max-w-5xl w-full mx-auto text-center space-y-4 relative z-50 -mt-48">
        <h1 className="text-5xl lg:text-8xl font-heading tracking-tight md:text-6xl text-white">
          Juanchi Martinez
        </h1>

        <p className="text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed text-center mx-auto">
          I build technology, strategy and chaos into something valuable
        </p>

      </div>
    </section>
  )
}
