"use client";

import { useEffect, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

const HIGHLIGHTS = [
  { title: "AI/ML Engineer", desc: "Building practical AI systems that automate workflows and solve real problems." },
  { title: "NTC", desc: "Currently working on intelligent automation and predictive models." },
  { title: "Specialization", desc: "Focused on LLMs, RAG systems, computer vision, and intelligent automation." },
];

export function AboutSection() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);

    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative z-10 py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          <div className="rounded-2xl bg-surface p-5 sm:col-span-2 sm:p-6 lg:col-span-5">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Inam ul Haq
            </h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground/50 sm:text-sm">Senior AI/ML Engineer</p>
          </div>

          <div className="hidden rounded-2xl bg-surface p-4 sm:col-span-2 lg:col-span-7 lg:grid lg:grid-cols-3 lg:gap-3">
            <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 sm:text-xs lg:col-span-3">Hover to read more</p>
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-xl bg-background p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">{item.title}</p>
                <p className="mt-2 text-[10px] leading-relaxed text-foreground/60 sm:text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-surface p-5 sm:col-span-1 sm:self-start lg:col-span-3">
            <h3 className="text-xl font-bold sm:text-2xl">Mindset</h3>
            <p className="mt-3 text-xs leading-relaxed text-foreground/70 sm:text-sm">
              Building <span className="font-bold text-foreground">practical AI</span> that solves real problems. I focus on <span className="font-bold text-foreground">reliable workflows</span> over fancy demos.
            </p>
          </div>

          <div className="rounded-2xl bg-surface sm:col-span-1 sm:row-span-2 sm:flex sm:items-center sm:justify-center sm:p-0 sm:overflow-hidden lg:col-span-6">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-72 lg:h-full lg:min-h-[280px]">
              <img
                src={theme === "light" ? "/photo-light.jpg" : "/photo-dark.jpg"}
                alt="Inam ul Haq"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-surface p-5 sm:col-span-1 sm:self-start lg:col-span-3">
            <h3 className="text-xl font-bold sm:text-2xl">Craft</h3>
            <p className="mt-3 text-xs leading-relaxed text-foreground/70 sm:text-sm">
              Building <span className="font-bold text-foreground">intelligent automation</span>, <span className="font-bold text-foreground">predictive models</span>, and <span className="font-bold text-foreground">LLM integrations</span> that streamline workflows.
            </p>
          </div>

          <div className="rounded-2xl bg-surface p-5 sm:col-span-1 lg:col-span-3">
            <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm">
              Mastering <span className="font-bold text-foreground">machine learning</span> and <span className="font-bold text-foreground">AI engineering</span> is my path to <span className="font-bold text-accent">excellence</span>.
            </p>
          </div>

          <div className="rounded-2xl bg-surface p-5 sm:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <p className="text-sm font-bold">Islamabad, Pakistan</p>
            </div>
            <p className="mt-2 text-[10px] text-foreground/40 sm:text-xs">33.6844° N, 73.0479° E · PKT (UTC+5)</p>
          </div>

          <div className="rounded-2xl bg-surface p-5 sm:col-span-2 lg:col-span-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:inamulhaq12290@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-ink transition hover:bg-accent-strong sm:px-6 sm:text-sm"
                >
                  Book a free consultation
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-xs font-bold transition hover:border-accent hover:text-accent sm:px-6 sm:text-sm"
                >
                  View my work
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-xs font-bold text-foreground/60 sm:text-sm">Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
