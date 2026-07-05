"use client"

import { useState } from "react"
import IntroAnimation, { type ScrollMorphHeroImage } from "@/components/ui/scroll-morph-hero"
import { ProjectModal } from "@/components/project-modal"
import { projects, type Project } from "@/lib/projects"

const DIM = "#c9c5be" // barely-visible on cream → not-yet-revealed words
const LIT = "#111111" // near-black → revealed words

const ABOUT_TEXT =
  "I'm an AI Solutions Specialist and founder who builds at the intersection of technology, strategy, and business. " +
  "I've launched multiple AI ventures — from virtual try-on engines and generative media platforms to civic intelligence systems and RAG agents for logistics. " +
  "I'm a hands-on leader who takes full ownership from strategy to execution, always driving tech towards business metrics. " +
  "I thrive in ambiguity, transforming complex ideas into working products fast. " +
  "From building AI roadmaps to automating operations, my focus is simply on delivering real business value."

function lerpColor(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255
  const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const b_ = Math.round(ab + (bb - ab) * t)
  return `rgb(${r}, ${g}, ${b_})`
}

const ABOUT_WORDS = ABOUT_TEXT.split(/\s+/).filter(Boolean)

// Word-by-word reveal of the About Me copy, driven by the hero's own scroll
// progress instead of the page's — shown above the cards once they've
// finished landing in the arc, so it plays out while the cards hold below.
function AboutPreview({ progress }: { progress: number }) {
  const total = ABOUT_WORDS.length
  return (
    <div className="max-w-2xl px-4">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3" style={{ color: LIT }}>
        About Me
      </h2>
      <p className="text-sm md:text-base font-medium leading-relaxed [hyphens:none] text-justify">
        {ABOUT_WORDS.map((word, i) => {
          const start = i / total
          const end = Math.min((i + 1.5) / total, 1)
          const t = Math.min(Math.max((progress - start) / (end - start), 0), 1)
          return (
            <span key={i}>
              <span
                className="break-keep"
                style={{ opacity: 0.18 + t * 0.82, color: lerpColor(DIM, LIT, t) }}
              >
                {word}
              </span>
              {i < ABOUT_WORDS.length - 1 ? " " : null}
            </span>
          )
        })}
      </p>
    </div>
  )
}

interface PortfolioHeroProps {
  ready?: boolean
  onScrollProgress?: (progress: number) => void
}

export function PortfolioHero({ ready = false, onScrollProgress }: PortfolioHeroProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  interface HeroCard {
    image: ScrollMorphHeroImage
    project?: Project
  }

  const baseCards: HeroCard[] = projects.map((project) => ({
    project,
    image: {
      src: project.image,
      title: project.title,
      subtitle: project.role,
      href: project.link,
    },
  }))

  // Duplicated so the circle is denser — with evenly spaced cards, index i and
  // i + baseCards.length land exactly 180° apart, so each repeat faces its twin.
  const cards: HeroCard[] = [...baseCards, ...baseCards]
  const images: ScrollMorphHeroImage[] = cards.map((card) => card.image)

  const handleImageClick = (_image: ScrollMorphHeroImage, index: number) => {
    const project = cards[index]?.project
    if (project?.details) setSelectedProject(project)
    else if (project?.link) window.open(project.link, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="hero" className="relative h-screen w-full">
      <IntroAnimation
        images={images}
        heroTitle="Juanchi Martinez"
        heroTagline="AI Engineer"
        heroSubtitle="SCROLL TO EXPLORE"
        backgroundClassName="bg-[#f5f4f1]"
        onImageClick={handleImageClick}
        active={ready}
        onScrollProgress={onScrollProgress}
        overlayContent={({ arcProgress }) => <AboutPreview progress={arcProgress} />}
      />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
