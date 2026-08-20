export const profileData = {
  name: "Inam ul Haq Tariq",
  role: "AI/ML Engineer",
  experience:
    "AI/ML Engineer at National Telecommunication Corporation (NTC). Computer Systems Engineering graduate from Mirpur University of Science and Technology.",
  skills: [
    "Python",
    "SQL",
    "NLP",
    "Computer Vision",
    "LLMs",
    "RAG",
    "LangChain",
    "Chroma DB",
    "FastAPI",
    "Git/GitHub",
    "PostgreSQL",
    "Docker",
    "CI/CD Pipeline",
    "REST",
    "AI Agents",
  ],
};

export interface ChatProject {
  title: string;
  slug: string;
  description: string;
  tech_tags: string[];
  links: { label: string; url: string }[];
}

export const projectsData: ChatProject[] = [
  {
    title: "Intelligent document flow",
    slug: "intelligent-document-flow",
    description:
      "A document processing system that pulls structured data out of scanned PDFs, invoices, and forms.",
    tech_tags: ["FastAPI", "OpenCV", "Python"],
    links: [],
  },
  {
    title: "AI knowledge assistant",
    slug: "ai-knowledge-assistant",
    description:
      "An internal chatbot that answers questions from company docs using semantic retrieval.",
    tech_tags: ["LangChain", "RAG", "Chroma DB"],
    links: [],
  },
  {
    title: "Workflow insights",
    slug: "workflow-insights",
    description:
      "A dashboard that visualizes how business processes actually run and where bottlenecks form.",
    tech_tags: ["Python", "SQL", "Docker"],
    links: [],
  },
];
