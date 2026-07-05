"use client"

import { useState } from "react"
import IntroAnimation, { type ScrollMorphHeroImage } from "@/components/ui/scroll-morph-hero"
import { ProjectModal } from "@/components/project-modal"
import { projects, type Project } from "@/lib/projects"

interface PortfolioHeroProps {
  ready?: boolean
}

export function PortfolioHero({ ready = false }: PortfolioHeroProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  interface HeroCard {
    image: ScrollMorphHeroImage
    project?: Project
  }

  const projectCards: HeroCard[] = projects.map((project) => ({
    project,
    image: {
      src: project.image,
      title: project.title,
      subtitle: project.role,
      href: project.link,
    },
  }))

  const tagCard: HeroCard = {
    image: { src: "/tag-logo.png", title: "TAG", subtitle: "The Anything Group" },
  }

  const baseCards = [...projectCards, tagCard]

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
        heroSubtitle="SCROLL TO EXPLORE"
        contentTitle="Product Builder · AI Strategist"
        contentDescription="I build technology, strategy and chaos into something valuable."
        backgroundClassName="bg-[#f5f4f1]"
        onImageClick={handleImageClick}
        active={ready}
      />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
