"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Trylook-ai",
    role: "Co-Founder",
    description: "AI B2B platform for virtual TryOn.",
    image: "/trylook-ai-model-urban.jpg",
    link: "https://www.trylook-ai.com/",
  },
  {
    title: "Mosaico Studio",
    role: "Co-Founder",
    description: "AI-powered image and video generation platform for enterprises.",
    image: "/images/logo.jpg",
    link: "https://www.mosaico-studio.com/",
  },
  {
    title: "Astorlab",
    role: "Consulting",
    description: "Digital Transformation for Businesses with AI.",
    image: "/modern-tech-office-workspace.jpg",
    link: "https://astorlab.site/",
  },
  {
    title: "Alethia",
    role: "Director Argentina",
    description:
      "Civic transparency platform providing AI-powered access to detailed analysis of legislative sessions from over 50 municipalities. Delivers specific information for both citizens and businesses.",
    image: "/alethia-logo.jpg",
    link: "https://alethia-azure.vercel.app/",
  },
  {
    title: "Grant Solutions",
    role: "Business Analyst",
    description:
      "AI implementation leader. Bridge between company board, technical, legal, and technology departments to identify problems, analyze data, and propose solutions that improve efficiency and business processes.",
    image: "/corporate-technology-meeting-office.jpg",
    link: "https://grantsolutions.es/",
  },
  {
    title: "Proacsa",
    role: "Project Manager",
    description: "Coordination of energy projects in the European Union. Grant management and client relations.",
    image: "/solar-energy-plant-panels.jpg",
    link: "https://proacsa.com/",
  },
  {
    title: "Astorito",
    role: "Founder",
    description: "RAG Artificial Intelligence Agent for the logistics industry. Graduate Thesis Project.",
    image: "/futuristic-floating-phone-ai.jpg",
    link: null,
  },
  {
    title: "Club de Corredores",
    role: "Race Deputy Director",
    description:
      "Planning and execution of sporting events with up to 20,000 runners. Buenos Aires Marathon, Adidas Race, and El Cruce Columbia. Camp Director for El Cruce Columbia managing 250 people.",
    image: "/aerial-marathon-runners-view.jpg",
    link: "https://elcruce.com.ar/",
  },
]

export function Projects() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [dragDistance, setDragDistance] = useState(0)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 2200)

    const autoScrollInterval = setInterval(() => {
      if (!isDragging && !isUserInteracting && containerRef.current) {
        const container = containerRef.current
        const maxScroll = container.scrollWidth - container.clientWidth

        if (container.scrollLeft >= maxScroll - 5) {
          container.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior })
        } else {
          container.scrollLeft += 0.5
        }
      }
    }, 20)

    return () => clearInterval(autoScrollInterval)
  }, [isDragging, isUserInteracting])

  const resetInteractionTimeout = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    setIsUserInteracting(true)
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
    }, 3000)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setDragDistance(0)
    resetInteractionTimeout()
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    lastXRef.current = e.pageX
    lastTimeRef.current = Date.now()
    setVelocity(0)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      applyMomentum()
    }
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    if (isDragging) {
      applyMomentum()
    }
    setIsDragging(false)
  }

  const applyMomentum = () => {
    if (!containerRef.current || Math.abs(velocity) < 0.5) return

    let currentVelocity = velocity
    const deceleration = 0.95

    const animate = () => {
      if (!containerRef.current || Math.abs(currentVelocity) < 0.5) return

      containerRef.current.scrollLeft -= currentVelocity
      currentVelocity *= deceleration

      requestAnimationFrame(animate)
    }

    animate()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()

    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk

    setDragDistance(Math.abs(walk))

    const now = Date.now()
    const timeDelta = now - lastTimeRef.current
    const distance = e.pageX - lastXRef.current

    if (timeDelta > 0) {
      setVelocity((distance / timeDelta) * 16)
    }

    lastXRef.current = e.pageX
    lastTimeRef.current = now
  }

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current
    if (container) {
      resetInteractionTimeout()
      const scrollAmount = 400
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount
      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  const handleCardClick = (link: string | null) => {
    if (dragDistance > 5) return // Ignore clicks if dragged
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section
      id="projects"
      className={`pt-4 pb-24 lg:pt-6 lg:pb-32 px-6 lg:px-8 overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20 space-y-4"></div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div
            ref={containerRef}
            id="projects-container"
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4 px-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: isDragging ? "none" : "auto",
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[224px] sm:w-[256px] md:w-[280px] lg:w-[304px] h-[304px] sm:h-[336px] md:h-[360px] rounded-2xl overflow-hidden snap-start group cursor-pointer border border-border/20 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] animate-float"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  pointerEvents: "auto",
                }}
                onMouseEnter={() => !isDragging && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                <div className="relative h-full p-5 md:p-6 flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wider">
                      {project.role}
                      {project.comingSoon && <span className="ml-2 text-muted-foreground/60 normal-case">soon</span>}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                  </div>

                  <div
                    className={`absolute inset-0 bg-black/95 p-5 md:p-6 flex flex-col justify-between transition-opacity duration-300 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wider">
                        {project.role}
                        {project.comingSoon && <span className="ml-2 text-muted-foreground/60 normal-case">soon</span>}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{project.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs md:text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                        onClick={(e) => {
                          if (dragDistance > 5) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
