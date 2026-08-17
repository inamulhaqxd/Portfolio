const FACTS = [
  { label: "Current role", value: "AI/ML Engineer Trainee" },
  { label: "Organization", value: "National Telecommunication Corporation (NTC)" },
  { label: "Education", value: "Computer Systems Engineering graduate" },
  { label: "University", value: "Mirpur University of Science and Technology" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            About me
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-none tracking-[-0.05em] sm:text-5xl">
            Building practical AI, one workflow at a time.
          </h2>
          <p className="mt-7 text-base leading-relaxed text-foreground/70 sm:text-lg">
            I am a Computer Systems Engineering graduate from Mirpur University
            of Science and Technology, currently working as an AI/ML Engineer
            Trainee at National Telecommunication Corporation (NTC). My focus is
            on building practical AI systems — from intelligent automation and
            predictive models to computer vision and LLM/RAG integrations. I care
            about creating useful, reliable workflows that solve real problems.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent-strong"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="space-y-0">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-t border-line py-6">
              <p className="text-sm font-bold text-foreground/50">
                {fact.label}
              </p>
              <p className="mt-1 text-lg font-bold">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
