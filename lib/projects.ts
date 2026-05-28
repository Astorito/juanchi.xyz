export type Project = {
  title: string
  role: string
  description: string
  image: string
  link: string | null
  comingSoon?: boolean
}

export const projects: Project[] = [
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
