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

  const images: ScrollMorphHeroImage[] = projects.map((project) => ({
    src: project.image,
    title: project.title,
    subtitle: project.role,
    href: project.link,
  }))

  const handleImageClick = (_image: ScrollMorphHeroImage, index: number) => {
    const project = projects[index]
    if (project.details) setSelectedProject(project)
    else if (project.link) window.open(project.link, "_blank", "noopener,noreferrer")
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
