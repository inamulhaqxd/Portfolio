"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/features/home/components/site-header";
import { AboutSection } from "@/features/home/components/about-section";
import { ContactModal } from "@/features/contact/components/contact-modal";
import Link from "next/link";

const FEATURED_PROJECTS = [
  { title: "Intelligent document flow", slug: "intelligent-document-flow", description: "A document processing system that pulls structured data out of scanned PDFs, invoices, and forms.", image: "https://picsum.photos/seed/docflow/600/400" },
  { title: "AI knowledge assistant", slug: "ai-knowledge-assistant", description: "An internal chatbot that answers questions from company docs using semantic retrieval.", image: "https://picsum.photos/seed/knowledge/600/400" },
  { title: "Workflow insights", slug: "workflow-insights", description: "A dashboard that visualizes how business processes actually run and where bottlenecks form.", image: "https://picsum.photos/seed/workflow/600/400" },
];

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", window.location.pathname);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section id="hero" className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6 sm:pt-32 md:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="stagger">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">AI/ML Engineer</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl md:text-6xl lg:text-7xl">
            Inam ul Haq Tariq
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base md:text-lg">
            AI/ML engineer specializing in intelligent automation. I build systems that streamline workflows and boost productivity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group rounded-full metallic px-5 py-2.5 text-xs font-bold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 sm:px-6 sm:py-3 sm:text-sm"
            >
              View Projects
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full glass border border-line px-5 py-2.5 text-xs font-bold transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-lg hover:shadow-accent/10 sm:px-6 sm:py-3 sm:text-sm"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      <AboutSection />

      <section id="skills" className="relative z-10 bg-surface py-16 sm:py-20 md:py-28" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">What I work with</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
            <h2 className="max-w-xl text-3xl font-bold leading-none tracking-[-0.05em] sm:text-4xl md:text-5xl">Practical AI, from model to workflow.</h2>
            <p className="max-w-sm text-sm text-foreground/60">Tools and technologies selected to turn ideas into reliable, useful products.</p>
          </div>
          <div className="stagger mt-10 grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {[
              { name: "Python", slug: "python" },
              { name: "SQL", slug: "postgresql" },
              { name: "NLP", slug: "huggingface" },
              { name: "Computer Vision", slug: "opencv" },
              { name: "LLMs", slug: "ollama" },
              { name: "RAG", slug: "elasticsearch" },
              { name: "LangChain", slug: "langchain" },
              { name: "Chroma DB", slug: "sqlite" },
              { name: "FastAPI", slug: "fastapi" },
              { name: "Git/GitHub", slug: "github" },
              { name: "PostgreSQL", slug: "postgresql" },
              { name: "Docker", slug: "docker" },
              { name: "CI/CD Pipeline", slug: "githubactions" },
              { name: "REST", slug: "postman" },
              { name: "AI Agents", slug: "n8n" },
            ].map(({ name, slug }) => (
              <article key={name} className="group rounded-panel glass p-4 transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-lg hover:shadow-accent/20 sm:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full metallic transition-all duration-300 group-hover:scale-110 group-hover:shadow-md sm:mb-4 sm:h-12 sm:w-12">
                  <img
                    src={`https://cdn.simpleicons.org/${slug}/1a1a1a?viewbox=auto`}
                    alt={name}
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6 skill-icon"
                  />
                </div>
                <h3 className="text-base font-bold transition-colors duration-300 group-hover:text-accent sm:text-xl">{name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 py-16 sm:py-20 md:py-28" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s forwards', opacity: 0 }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="rounded-window glass-deep p-5 sm:p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">Featured work</p>
            <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
              <h2 className="max-w-xl text-3xl font-bold leading-none tracking-[-0.05em] sm:text-4xl md:text-5xl">Projects that turn complex problems into clear outcomes.</h2>
              <button
                type="button"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-xs font-bold text-accent underline decoration-1 underline-offset-4 hover:text-accent-strong sm:text-sm"
              >
                Discuss a project
              </button>
            </div>
            <div className="stagger mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {FEATURED_PROJECTS.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="flex">
                  <article className="group flex flex-col rounded-panel bg-surface/60 backdrop-blur-sm p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-accent/10 sm:p-5 w-full">
                    <div className="h-36 overflow-hidden rounded-2xl sm:h-44">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold transition-colors duration-300 group-hover:text-accent sm:mt-5 sm:text-xl">{project.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/60 sm:text-sm">{project.description}</p>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/projects" className="rounded-full border border-line px-5 py-2.5 text-xs font-bold transition hover:border-accent hover:text-accent sm:px-6 sm:py-3 sm:text-sm">View all projects</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 py-16 sm:py-20 md:py-28" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s forwards', opacity: 0 }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="rounded-window metallic p-5 text-ink sm:p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] sm:text-sm">Let&apos;s make something useful</p>
            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
              <h2 className="max-w-2xl text-3xl font-bold leading-none tracking-[-0.06em] sm:text-4xl md:text-6xl">Have an AI problem worth solving?</h2>
              <ContactModal>
                Get in touch
                <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </ContactModal>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="https://github.com/inamulhaqxd" target="_blank" rel="noopener noreferrer" className="text-xs font-bold underline decoration-1 underline-offset-4 transition-all duration-300 hover:text-ink/70 hover:decoration-2 sm:text-sm">GitHub</a>
              <a href="https://linkedin.com/in/inam-ul-haq-471969264" target="_blank" rel="noopener noreferrer" className="text-xs font-bold underline decoration-1 underline-offset-4 transition-all duration-300 hover:text-ink/70 hover:decoration-2 sm:text-sm">LinkedIn</a>
              <a href="https://wa.me/923121869234" target="_blank" rel="noopener noreferrer" className="text-xs font-bold underline decoration-1 underline-offset-4 transition-all duration-300 hover:text-ink/70 hover:decoration-2 sm:text-sm">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
