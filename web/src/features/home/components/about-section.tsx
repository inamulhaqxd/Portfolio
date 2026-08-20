const FACTS = [
  { label: "Current role", value: "AI/ML Engineer" },
  { label: "Organization", value: "National Telecommunication Corporation (NTC)" },
  { label: "Education", value: "Computer Systems Engineering graduate" },
  { label: "University", value: "Mirpur University of Science and Technology" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-16 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:gap-10 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">
            About me
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-none tracking-[-0.05em] sm:mt-5 sm:text-4xl md:text-5xl">
            Building practical AI, one workflow at a time.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-foreground/70 sm:mt-7 sm:text-base md:text-lg">
            I am a Computer Systems Engineering graduate from Mirpur University
            of Science and Technology, currently working as an AI/ML Engineer
            at National Telecommunication Corporation (NTC). My focus is
            on building practical AI systems — from intelligent automation and
            predictive models to computer vision and LLM/RAG integrations. I care
            about creating useful, reliable workflows that solve real problems.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
            <a
              href="#projects"
              className="rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-ink transition hover:bg-accent-strong sm:px-6 sm:py-3 sm:text-sm"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-5 py-2.5 text-xs font-bold transition hover:border-accent hover:text-accent sm:px-6 sm:py-3 sm:text-sm"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="space-y-0">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-t border-line py-4 sm:py-6">
              <p className="text-xs font-bold text-foreground/50 sm:text-sm">
                {fact.label}
              </p>
              <p className="mt-1 text-base font-bold sm:text-lg">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
