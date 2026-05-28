export type ProjectDetails = {
  overview: string
  metrics: string[]
}

export type Project = {
  title: string
  role: string
  description: string
  image: string
  link: string | null
  comingSoon?: boolean
  details?: ProjectDetails
}

export const projects: Project[] = [
  {
    title: "Trylook-ai",
    role: "Co-Founder",
    description: "AI B2B platform for virtual TryOn.",
    image: "/trylook-ai-model-urban.jpg",
    link: "https://www.trylook-ai.com/",
    details: {
      overview:
        "Co-founded and led the product and technical development of an AI-powered virtual try-on widget for fashion e-commerce sites. Designed the product strategy and system architecture from scratch, integrating advanced generative models directly into the checkout funnel of partner stores to help customers visualize clothing before purchase.",
      metrics: [
        "+28% increase in conversion rate across pilot stores driven by interactive visualization.",
        "15% reduction in apparel return rates due to improved size and fit accuracy.",
        "Shipped and integrated the core MVP in less than 4 weeks of rapid, iterative development.",
      ],
    },
  },
  {
    title: "Mosaico Studio",
    role: "Co-Founder",
    description: "AI-powered image and video generation platform for enterprises.",
    image: "/ai-image-video-generation-platform-technology.jpg",
    link: "https://www.mosaico-studio.com/",
    details: {
      overview:
        "Led product growth and data analytics for an AI-powered SaaS platform tailored for architecture students and professionals. Handled the entire product lifecycle: mapped user retention, optimized conversion funnels, and executed data-driven feature iterations that successfully scaled the business up to acquisition.",
      metrics: [
        "Successfully scaled, validated, and sold the startup (Acquisition / Exit).",
        "+40% increase in Month-over-Month user retention by restructuring core features based on product analytics data.",
        "Optimized AI infrastructure costs by 30% while maintaining fast rendering performance.",
      ],
    },
  },
  {
    title: "Astorlab",
    role: "Consulting",
    description: "Digital Transformation for Businesses with AI.",
    image: "/digital-transformation-ai-business-technology.jpg",
    link: "https://astorlab.site/",
    details: {
      overview:
        "Led strategic AI consulting engagements for SMEs and enterprises looking to integrate artificial intelligence into their core operations. Designed and delivered end-to-end digital transformation roadmaps, identifying high-impact automation opportunities and aligning technical solutions with business objectives.",
      metrics: [
        "Advised and implemented AI solutions across multiple industries including retail, logistics, and professional services.",
        "Reduced manual operational workload by an average of 35% across client engagements through targeted process automation.",
        "Delivered actionable AI adoption frameworks that shortened time-to-value for enterprise clients by 40%.",
      ],
    },
  },
  {
    title: "Alethia",
    role: "Director Argentina",
    description:
      "Civic transparency platform providing AI-powered access to detailed analysis of legislative sessions from over 50 municipalities.",
    image: "/ai-civic-transparency-legislative-platform.jpg",
    link: "https://alethia-azure.vercel.app/",
    details: {
      overview:
        "Designed and built a civic transparency dashboard and public data pipeline utilizing AI to track public data and assets of public officials. Built automated web scrapers, RAG agents, and ETL pipelines to ingest and normalize massive amounts of unstructured official data, transforming it into highly visual, actionable business intelligence insights.",
      metrics: [
        "Automated the processing of thousands of daily public records with real-time tracking alerts.",
        "Reduced manual data gathering and curation time by 80% through automated LLM pipelines and scraping infrastructure.",
        "Shipped a premium, high-end dashboard interface that significantly boosted user engagement and session length.",
      ],
    },
  },
  {
    title: "Grant Solutions",
    role: "Business Analyst",
    description:
      "AI implementation leader bridging business and technical teams to identify problems and propose data-driven solutions.",
    image: "/business-analysis-ai-implementation-corporate.jpg",
    link: "https://grantsolutions.es/",
    details: {
      overview:
        "Acted as the core analytical bridge between engineering teams and business stakeholders to design and optimize internal product workflows. Analyzed user data, mapped operational bottlenecks, and translated complex data patterns into actionable product requirements that directly drove business efficiency.",
      metrics: [
        "Optimized cross-functional team workflows, leading to a 20% increase in project delivery speed.",
        "Built data models and operational dashboards that improved resource allocation accuracy by 15%.",
        "Mapped and streamlined legacy processes, reducing product onboarding friction for enterprise clients.",
      ],
    },
  },
  {
    title: "Proacsa",
    role: "Project Manager",
    description: "Coordination of energy projects in the European Union. Grant management and client relations.",
    image: "/energy-projects-european-union-renewable.jpg",
    link: "https://proacsa.com/",
    details: {
      overview:
        "Orchestrated operational and analytical management for large-scale infrastructure projects, focusing on resource allocation and critical path optimization. Implemented Business Intelligence models to track budget variances and project timelines, turning raw operational data into strategic business decisions.",
      metrics: [
        "Cut budget variance by 12% by developing a predictive BI forecasting model for project expenditures.",
        "Maintained a 100% on-time delivery rate for critical project milestones via automated pipeline tracking.",
      ],
    },
  },
  {
    title: "Astorito",
    role: "Founder",
    description: "RAG Artificial Intelligence Agent for the logistics industry. Graduate Thesis Project.",
    image: "/ai-logistics-rag-agent-technology.jpg",
    link: null,
    details: {
      overview:
        "Built a Retrieval-Augmented Generation (RAG) AI agent specifically designed for the logistics and supply chain industry as a graduate thesis project. The system enables natural language querying over complex operational data — shipment records, carrier contracts, and route histories — delivering instant, context-aware answers to operational teams without requiring technical expertise.",
      metrics: [
        "Achieved sub-2s average query response time over a corpus of thousands of logistics documents using optimized vector retrieval.",
        "Reduced information retrieval time for operations teams by 70% compared to traditional manual document lookup.",
        "Presented and approved as graduate thesis with honors — validated technical architecture by an academic evaluation committee.",
      ],
    },
  },
  {
    title: "Club de Corredores",
    role: "Race Deputy Director",
    description:
      "Planning and execution of sporting events with up to 20,000 runners. Buenos Aires Marathon, Adidas Race, and El Cruce Columbia.",
    image: "/marathon-running-sports-event-management.jpg",
    link: "https://elcruce.com.ar/",
    details: {
      overview:
        "Served as Race Deputy Director for Club de Corredores, overseeing the full operational planning and on-ground execution of large-scale mass-participation sporting events across Argentina. Coordinated multidisciplinary teams covering logistics, safety, timing, and athlete experience for flagship events including the Buenos Aires Marathon, Adidas Race, and El Cruce Columbia.",
      metrics: [
        "Successfully managed events with up to 20,000 registered runners across multiple simultaneous race categories.",
        "Coordinated 200+ volunteers and operational staff across a 42km urban course with zero critical incidents.",
        "El Cruce Columbia: led operational planning for a 3-day, 100km trail relay across the Andes — one of South America's most demanding endurance events.",
      ],
    },
  },
  {
    title: "Patagonia Tech Week",
    role: "Director",
    description: "Premium tech immersion event in San Martín de los Andes bringing together founders, VCs, and builders.",
    image: "/modern-tech-office-workspace.jpg",
    link: null,
    comingSoon: true,
    details: {
      overview:
        "Serving as Director for Patagonia Tech Week 2026, a premium, high-impact technology immersion event hosted in San Martín de los Andes. Orchestrating the strategic planning, curation, and operations to bring together top-tier tech founders, VC investors, and frontier builders in an exclusive environment designed to foster deep technical collaboration.",
      metrics: [
        "Launching September 2026 — setting up the operational blueprint, partnership pipelines, and curation criteria for elite tech cohorts.",
        "High-End Curation: designing an exclusive, distraction-free environment tailored for tech leaders to connect away from traditional tech hubs.",
        "Ecosystem Building: driving regional tech development by connecting the international startup ecosystem with Patagonia's emerging landscape.",
      ],
    },
  },
]
