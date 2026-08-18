import { SiteHeader } from "@/features/home/components/site-header";
import { AboutSection } from "@/features/home/components/about-section";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section id="hero" className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-8 sm:pt-40 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-accent">AI/ML Engineer</p>
        <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
          Inam ul Haq Tariq
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
          AI/ML engineer specializing in intelligent automation. I build systems that streamline workflows and boost productivity.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#projects" className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent-strong">
            View Projects
          </a>
          <a href="#contact" className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-accent hover:text-accent">
            Contact Me
          </a>
        </div>
      </section>

      <AboutSection />

      <section id="skills" className="relative z-10 bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">What I work with</p>
          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-xl text-4xl font-bold leading-none tracking-[-0.05em] sm:text-5xl">Practical AI, from model to workflow.</h2>
            <p className="max-w-sm text-foreground/60">Tools and technologies selected to turn ideas into reliable, useful products.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Python", "ML workflows and automation"],
              ["SQL", "Database querying and management"],
              ["NLP", "Text processing and language models"],
              ["Computer Vision", "Image analysis and object detection"],
              ["LLMs", "Large language model integration"],
              ["RAG", "Retrieval-augmented generation systems"],
              ["PostgreSQL", "Relational database management"],
              ["Docker", "Containerization and deployment"],
            ].map(([name, description], index) => (
              <article key={name} className="rounded-panel border border-line bg-background p-6 transition hover:-translate-y-1 hover:border-accent">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink">0{index + 1}</span>
                <h3 className="mt-7 text-xl font-bold">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="rounded-window bg-ink p-7 shadow-panel sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Featured work</p>
            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-xl text-4xl font-bold leading-none tracking-[-0.05em] sm:text-5xl">Projects that turn complex problems into clear outcomes.</h2>
              <a href="#contact" className="text-sm font-bold text-accent underline decoration-1 underline-offset-4 hover:text-accent-strong">Discuss a project</a>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {["Intelligent document flow", "AI knowledge assistant", "Workflow insights"].map((project, index) => (
                <article key={project} className="group rounded-panel bg-surface p-5 transition hover:-translate-y-1">
                  <div className={`flex h-40 items-end rounded-2xl p-5 ${index === 1 ? "bg-accent text-ink" : "bg-surface-muted"}`}>
                    <span className="text-5xl font-bold tracking-[-0.08em]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{project}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">A focused case study is coming soon.</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Experience</p>
            <h2 className="mt-5 text-4xl font-bold leading-none tracking-[-0.05em] sm:text-5xl">Learning by building useful things.</h2>
          </div>
          <div className="space-y-4">
            {[
              { role: "AI/ML Engineer", company: "National Telecommunication Corporation (NTC)", period: "Apr 2026 — Present", details: "AI chatbot solutions, RAG systems, vector databases, and local LLM development" },
              { role: "BS Computer System Engineering", company: "Mirpur University of Science and Technology", period: "Sep 2021 — Aug 2025", details: "AI specialization" },
            ].map((item, index) => (
              <div key={item.role} className="border-t border-line py-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-accent">0{index + 1}</span>
                  <span className="text-xs text-foreground/40">{item.period}</span>
                </div>
                <p className="mt-2 text-lg font-bold">{item.role}</p>
                <p className="text-sm text-foreground/60">{item.company}</p>
                <p className="mt-1 text-sm text-foreground/50">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="rounded-window bg-accent p-7 text-ink sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Let&apos;s make something useful</p>
            <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-2xl text-4xl font-bold leading-none tracking-[-0.06em] sm:text-6xl">Have an AI problem worth solving?</h2>
              <a href="mailto:inamulhaq12290@gmail.com" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-foreground transition hover:bg-background">Get in touch</a>
            </div>
            <div className="mt-8 flex gap-4">
              <a href="https://github.com/inamulhaqxd" target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline decoration-1 underline-offset-4 hover:text-ink/70">GitHub</a>
              <a href="https://linkedin.com/in/inam-ul-haq-471969264" target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline decoration-1 underline-offset-4 hover:text-ink/70">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
