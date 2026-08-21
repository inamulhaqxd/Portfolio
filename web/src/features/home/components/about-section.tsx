import { TypingRole } from "./typing-role";

const SKILLS = [
  { name: "RAG", animation: "float-1" },
  { name: "AI Agents", animation: "float-2" },
  { name: "NLP", animation: "float-3" },
  { name: "Computer Vision", animation: "float-1" },
  { name: "LLMs", animation: "float-2" },
  { name: "Automations", animation: "float-3" },
];

const CAPABILITIES = [
  "Design and train custom ML models for classification, detection, and extraction",
  "Build RAG pipelines and AI agents that reason over your data",
  "Deploy production APIs with FastAPI, Docker, and CI/CD",
  "Automate complex workflows — from data ingestion to decision",
];

const TECH_STACK = [
  { name: "Python", slug: "python" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Docker", slug: "docker" },
  { name: "LangChain", slug: "langchain" },
  { name: "HuggingFace", slug: "huggingface" },
  { name: "OpenCV", slug: "opencv" },
  { name: "Git", slug: "github" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-16 sm:py-20 md:py-28 select-none">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div>
          <p className="reveal-up mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm" style={{ animationDelay: "0.1s" }}>
            About me
          </p>
          <h2 className="reveal-up" style={{ animationDelay: "0.2s" }}>
            <span className="block text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl">
              I&apos;m an
            </span>
            <span className="relative mt-1 block text-5xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              <TypingRole />
              <span className="reveal-underline absolute -bottom-2 left-0 h-[3px] w-0 rounded-full bg-accent" />
            </span>
          </h2>
          <ul className="reveal-up mt-8 max-w-lg space-y-3 sm:mt-10" style={{ animationDelay: "0.4s" }}>
            {CAPABILITIES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/70 sm:text-base">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />
          <div className="glow-orb glow-orb-3" />
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
            <div className="profile-ring-glow" />
            <div className="profile-ring" />
            <div className="orbit-dot orbit-dot-1" />
            <div className="orbit-dot orbit-dot-2" />
            <div className="orbit-dot orbit-dot-3" />
            <img
              src="/images/profile-dark.jpeg"
              alt="Inam ul Haq Tariq"
              className="absolute inset-0 h-full w-full rounded-[2rem] object-cover dark-profile"
            />
            <img
              src="/images/profile-light.jpeg"
              alt="Inam ul Haq Tariq"
              className="absolute inset-0 h-full w-full rounded-[2rem] object-cover light-profile"
            />
            {SKILLS.map((skill, i) => {
              const positions = [
                "top-2 right-0",
                "top-1/4 -right-4",
                "bottom-1/4 -right-2",
                "bottom-2 right-4",
                "bottom-4 left-4",
                "top-1/3 -left-4",
              ];
              return (
                <span
                  key={skill.name}
                  className={`absolute ${positions[i]} ${skill.animation} rounded-full border border-accent/15 bg-background/50 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-foreground/70 select-none cursor-pointer transition-all duration-150 hover:border-accent/40 hover:bg-accent/5 hover:text-accent active:shadow-[0_0_20px_var(--accent)] active:border-accent active:text-accent sm:text-sm`}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
