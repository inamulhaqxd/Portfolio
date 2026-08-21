import { AnimatedCounter } from "./animated-counter";
import { RippleButton } from "./ripple-button";
import { TypingRole } from "./typing-role";

const SKILLS = [
  { name: "RAG", animation: "float-1" },
  { name: "AI Agents", animation: "float-2" },
  { name: "NLP", animation: "float-3" },
  { name: "Computer Vision", animation: "float-1" },
  { name: "LLMs", animation: "float-2" },
  { name: "Automations", animation: "float-3" },
];

const STATS = [
  { value: 3, suffix: "+", label: "Years Experience", icon: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" },
  { value: 10, suffix: "+", label: "Projects Delivered", icon: "M2 6h4m4 0h10M2 12h4m4 0h10M2 18h4m4 0h10" },
  { value: 5, suffix: "+", label: "Happy Clients", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-16 sm:py-20 md:py-28">
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
          <p className="reveal-up mt-8 max-w-lg text-sm leading-relaxed text-foreground/60 sm:mt-10 sm:text-base md:text-lg" style={{ animationDelay: "0.4s" }}>
            Building{" "}
            <span className="keyword-highlight font-bold text-foreground">intelligent automation</span>,{" "}
            <span className="keyword-highlight font-bold text-foreground">predictive models</span>, and{" "}
            <span className="keyword-highlight font-bold text-foreground">LLM/RAG integrations</span> that
            turn complex problems into reliable, useful products.
          </p>
          <div className="reveal-up mt-8 flex flex-wrap gap-3 sm:mt-10" style={{ animationDelay: "0.5s" }}>
            <RippleButton
              href="#projects"
              className="group rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-ink transition-all duration-300 hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/30 sm:px-6 sm:py-3 sm:text-sm"
            >
              View Projects
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </RippleButton>
            <RippleButton
              href="/#contact"
              className="rounded-full border border-line px-5 py-2.5 text-xs font-bold transition-all duration-300 hover:border-accent hover:text-accent sm:px-6 sm:py-3 sm:text-sm"
            >
              Let&apos;s Talk
            </RippleButton>
          </div>
          <div className="reveal-up mt-10 sm:mt-12" style={{ animationDelay: "0.6s" }}>
            <div className="mb-6 h-px w-full bg-line" />
            <div className="flex gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <svg className="mb-2 h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                  <p className="text-2xl font-black text-accent sm:text-3xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-foreground/50 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />
          <div className="glow-orb glow-orb-3" />
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
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
                  className={`absolute ${positions[i]} ${skill.animation} rounded-full border border-line bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground/70 backdrop-blur-sm select-none cursor-pointer transition-shadow duration-150 hover:border-accent hover:text-accent active:shadow-[0_0_20px_var(--accent)] active:border-accent active:text-accent sm:text-sm`}
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
