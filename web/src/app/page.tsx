export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">

      <section id="hero" className="relative z-10 mx-auto min-h-screen max-w-7xl px-5 pb-16 pt-5 sm:px-8 lg:px-12">
        <nav aria-label="Primary navigation" className="flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold tracking-tight sm:text-2xl">
            Inam<span className="text-accent">.</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-foreground/70 md:flex">
            <a href="#hero" className="transition hover:text-accent">Home</a>
            <a href="#projects" className="transition hover:text-accent">Projects</a>
            <a href="#skills" className="transition hover:text-accent">Skills</a>
            <a href="#contact" className="transition hover:text-accent">Contact</a>
          </div>
          <a href="#contact" className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-ink transition hover:bg-accent-strong sm:px-5">
            Let&apos;s talk
          </a>
        </nav>

        <div className="mx-auto flex max-w-4xl flex-col items-center pb-12 pt-24 text-center sm:pt-32 lg:pt-36">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-accent">AI/ML Engineer</p>
            <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Building AI that makes work feel <span className="text-accent">lighter.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              I&apos;m Inam ul Haq Tariq. I design intelligent automation systems that remove repetitive work and help teams move with clarity.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#projects" className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent-strong">
                View my work
              </a>
              <a href="#contact" className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-accent hover:text-accent">
                Start a conversation
              </a>
            </div>
          </div>

          <div className="relative mt-16 w-full max-w-3xl">
            <div className="rounded-window border-[8px] border-foreground/35 bg-surface p-4 shadow-panel sm:border-[10px] sm:p-6">
              <div className="mb-7 flex items-center gap-2" aria-hidden="true">
                <span className="size-3 rounded-full bg-foreground/70" />
                <span className="size-3 rounded-full bg-foreground/70" />
                <span className="size-3 rounded-full bg-foreground/70" />
              </div>
              <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-panel border border-line bg-ink p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Portfolio OS</p>
                  <p className="mt-10 text-3xl font-bold leading-none tracking-[-0.05em]">Systems built for people.</p>
                  <div className="mt-10 flex items-end gap-2" aria-hidden="true">
                    <span className="h-8 w-3 rounded-full bg-accent" />
                    <span className="h-14 w-3 rounded-full bg-accent/70" />
                    <span className="h-20 w-3 rounded-full bg-accent" />
                    <span className="h-11 w-3 rounded-full bg-foreground/30" />
                    <span className="h-16 w-3 rounded-full bg-foreground/50" />
                  </div>
                </div>
                <div className="flex min-h-64 flex-col justify-between rounded-panel bg-accent p-6 text-ink sm:p-7">
                  <div className="flex size-11 items-center justify-center rounded-full border border-ink/20 text-xl font-bold">AI</div>
                  <div>
                    <p className="text-5xl font-bold tracking-[-0.08em]">01</p>
                    <p className="mt-2 text-sm font-semibold">Automation, intelligence, impact.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-lg text-center text-xs font-bold uppercase tracking-[0.2em] text-foreground/45">Machine learning • workflow automation • applied AI</p>
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">What I work with</p>
          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-xl text-4xl font-bold leading-none tracking-[-0.05em] sm:text-5xl">Practical AI, from model to workflow.</h2>
            <p className="max-w-sm text-foreground/60">Tools and technologies selected to turn ideas into reliable, useful products.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Python", "Automation and data workflows"],
              ["PyTorch", "Applied machine learning"],
              ["LangChain", "LLM applications"],
              ["Next.js", "Fast product interfaces"],
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
            {["AI/ML Engineer Trainee — NTC", "Computer Systems Engineering — AI specialization"].map((item, index) => (
              <div key={item} className="flex gap-5 border-t border-line py-6">
                <span className="text-sm font-bold text-accent">0{index + 1}</span>
                <p className="text-lg font-bold">{item}</p>
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
              <a href="mailto:hello@example.com" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-foreground transition hover:bg-background">Get in touch</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
