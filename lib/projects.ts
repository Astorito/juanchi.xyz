export type ProjectDetails = {
  overview: string
  metrics: string[]
}

export type ProjectLink = {
  label: string
  url: string
}

export type Project = {
  title: string
  role: string
  description: string
  image: string
  link: string | null
  links?: ProjectLink[]
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
    image: "/mosaico-studio-logo.png",
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
    title: "SoyGalo",
    role: "COO",
    description: "AI-driven lending and onboarding platform. Currently leading operations and all AI initiatives.",
    image: "/soygalo-logo.svg",
    link: "https://www.soygalo.com/",
    details: {
      overview:
        "Serving as Chief Operating Officer at SoyGalo, leading day-to-day operations and directing every artificial intelligence initiative across the company — from internal process automation to AI-driven features embedded in the product itself.",
      metrics: [
        "Overseeing operations end-to-end for the SoyGalo platform.",
        "Directing all AI initiatives across the company, from internal tooling to product-facing features.",
      ],
    },
  },
  {
    title: "Alethia",
    role: "Director Argentina",
    description:
      "Civic transparency platform providing AI-powered access to detailed analysis of legislative sessions from over 50 municipalities.",
    image: "/alethia-logo.jpg",
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
    image: "/grant-solutions-office.png",
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
    image: "/el-cruce-aerial.jpg",
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
    title: "Catastro SMA",
    role: "Founder",
    description: "AI-powered second brain for urban planning ordinances and zoning regulations in San Martín de los Andes.",
    image: "/catastro-sma-aerial-view.jpg",
    link: "https://site.placeground.site/",
    details: {
      overview:
        "Built an AI-powered knowledge platform that acts as a second brain for municipal urban planning regulations in San Martín de los Andes — indexing ordinances, zoning codes, and land-use rules so anyone can search and query dense legal-urbanistic documents in plain language instead of digging through PDFs and municipal archives.",
      metrics: [
        "Indexed and made instantly searchable every zoning ordinance for San Martín de los Andes.",
        "Turns dense legal-urbanistic text into fast, plain-language answers for property owners, architects, and municipal staff.",
      ],
    },
  },
  {
    title: "TAG",
    role: "AI Engineer",
    description: "The Anything Group — the AI engineering studio behind every venture in this portfolio.",
    image: "/tag-logo.png",
    link: null,
    links: [
      { label: "Visit website", url: "https://albiebytag.com/" },
      { label: "Brain", url: "https://uew6tnv3a67s.placeground.site/#home" },
    ],
    details: {
      overview:
        "TAG (The Anything Group) is the AI engineering practice behind my applied ML work — the studio that turns a venture idea into a deployed, production-grade AI system. It's the common thread across every project here: LLM agents, retrieval pipelines, generative media, and computer vision systems built to hold up under real usage, not just a demo.",
      metrics: [
        "Shipped production AI systems spanning generative media, RAG, and computer vision use cases.",
        "Built repeatable fine-tuning and evaluation pipelines so model quality stays measurable, not anecdotal.",
        "The technical backbone behind every AI venture in this portfolio, from architecture to deployment.",
      ],
    },
  },
]
