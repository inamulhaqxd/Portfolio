export const portfolio = {
  name: "Inam",
  fullName: "Inam ul Haq Tariq",
  greeting: "Hey, I'm Inam 👋",
  role: "AI/ML Engineer",
  intro: "AI/ML engineer specializing in intelligent automation. I build systems that streamline workflows and boost productivity.",
  about: "I'm passionate about building intelligent systems that solve real problems. With expertise in machine learning, NLP, and computer vision, I create AI-powered tools that make a difference.",
  
  avatar: "/images/hero-avatar.png",
  
  social: {
    github: "https://github.com/inamulhaqxd",
    linkedin: "https://linkedin.com/in/inam-ul-haq-471969264",
    email: "inamulhaqxd@gmail.com",
  },

  navCards: [
    { id: "me", label: "Me", icon: "Laugh", color: "#329696" },
    { id: "projects", label: "Projects", icon: "BriefcaseBusiness", color: "#3E9858" },
    { id: "skills", label: "Skills", icon: "Layers", color: "#856ED9" },
    { id: "fun", label: "Fun", icon: "PartyPopper", color: "#B95F9D" },
    { id: "contact", label: "Contact", icon: "UserRoundSearch", color: "#C19433" },
  ] as const,

  projects: [
    {
      title: "Intelligent Document Flow",
      description: "A document processing system that pulls structured data out of scanned PDFs, invoices, and forms.",
      techStack: ["Python", "FastAPI", "OpenCV", "Tesseract"],
      github: "https://github.com/inamulhaqxd",
      live: "#",
      image: "https://picsum.photos/seed/docflow/600/400",
      year: "2024",
      category: "AI/ML",
    },
    {
      title: "AI Knowledge Assistant",
      description: "An internal chatbot that answers questions from company docs using semantic retrieval.",
      techStack: ["LangChain", "ChromaDB", "OpenAI", "Next.js"],
      github: "https://github.com/inamulhaqxd",
      live: "#",
      image: "https://picsum.photos/seed/knowledge/600/400",
      year: "2024",
      category: "NLP",
    },
    {
      title: "Workflow Insights",
      description: "A dashboard that visualizes how business processes actually run and where bottlenecks form.",
      techStack: ["Python", "React", "PostgreSQL", "D3.js"],
      github: "https://github.com/inamulhaqxd",
      live: "#",
      image: "https://picsum.photos/seed/workflow/600/400",
      year: "2023",
      category: "Analytics",
    },
  ],

  skills: {
    "AI / ML": ["Python", "TensorFlow", "PyTorch", "HuggingFace", "LangChain", "OpenCV", "Scikit-learn"],
    "Backend": ["FastAPI", "Django", "Node.js", "PostgreSQL", "Redis"],
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "Cloud / DevOps": ["Docker", "AWS", "GitHub Actions", "CI/CD"],
    "Tools": ["Git", "VS Code", "Jupyter", "Linux", "Postman"],
  },

  fun: {
    interests: ["Open source contributing", "Building AI tools", "Chess", "Photography"],
    currentlyLearning: ["Rust", "System Design", "Advanced RAG patterns"],
    favoriteTools: ["Cursor", "Warp", "Notion", "Figma"],
    randomFacts: [
      "I automate everything I can",
      "I believe AI should be accessible to everyone",
      "Coffee is my fuel",
      "I write code at 2 AM",
    ],
  },
} as const;

export type NavCardId = typeof portfolio.navCards[number]["id"];
