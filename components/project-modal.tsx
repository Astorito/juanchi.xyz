"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-auto w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

              {/* Image header */}
              <div className="relative h-44 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {/* Role badge */}
                <div className="absolute bottom-4 left-5">
                  <span className="text-[10px] font-medium text-white/60 uppercase tracking-widest">
                    {project.role}
                    {project.comingSoon && <span className="ml-2 text-white/40 normal-case">· Sep '26</span>}
                  </span>
                  <h2 className="text-2xl font-semibold text-white leading-tight mt-0.5">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content — two columns */}
              <div className="px-5 pt-4 pb-5">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left: Overview */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                      Overview
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {project.details?.overview}
                    </p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white transition-colors mt-auto pt-2"
                      >
                        Visit site <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Right: Key Metrics */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                      Key Metrics
                    </h3>
                    <ul className="space-y-2.5">
                      {project.details?.metrics.map((metric, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-white/75 leading-relaxed">
                          <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-white/50" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
