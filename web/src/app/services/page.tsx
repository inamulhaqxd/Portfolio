import Link from "next/link";
import { SiteHeader } from "@/features/home/components/site-header";
import { Home, Brain, Eye, MessageSquareText, BarChart3, Bot, Database } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "AI/ML services including intelligent automation, computer vision, NLP, predictive modeling, LLM/RAG integration, and data pipeline design.",
  openGraph: {
    title: "Services | Inam ul Haq Tariq",
    description: "AI/ML services including intelligent automation, computer vision, NLP, predictive modeling, LLM/RAG integration, and data pipeline design.",
  },
};

const SERVICES = [
  {
    icon: Brain,
    title: "Intelligent Automation",
    description: "Automate repetitive workflows with AI-driven document processing, data extraction, and decision pipelines. Reduce manual effort and error rates.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Image classification, object detection, and visual inspection systems. From retail shelf monitoring to industrial quality control.",
  },
  {
    icon: MessageSquareText,
    title: "NLP & Text Analytics",
    description: "Sentiment analysis, entity extraction, text classification, and document understanding. Turn unstructured text into structured insights.",
  },
  {
    icon: BarChart3,
    title: "Predictive Modeling",
    description: "Forecast demand, predict failures, and identify patterns in your data. Time-series analysis, anomaly detection, and risk scoring.",
  },
  {
    icon: Bot,
    title: "LLM & RAG Integration",
    description: "Build intelligent assistants that answer questions from your own documents. Semantic search, retrieval-augmented generation, and conversational AI.",
  },
  {
    icon: Database,
    title: "Data Pipeline Design",
    description: "End-to-end ETL systems that turn raw data into clean, versioned datasets. Automated feature engineering and model-ready data infrastructure.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:px-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="group inline-flex items-center justify-center rounded-full border border-line p-2 transition-all duration-300 hover:border-accent hover:text-accent" aria-label="Back to home">
            <Home className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 sm:mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">Services</p>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.05em] sm:text-4xl md:text-5xl">AI/ML solutions tailored to your needs.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60 sm:mt-5 sm:text-base">
            From concept to deployment — I help businesses and teams integrate practical AI systems that solve real problems and deliver measurable outcomes.
          </p>
        </div>

        <div className="stagger mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:mt-14 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="group rounded-panel glass p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-lg hover:shadow-accent/10 sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <service.icon className="h-6 w-6 text-accent" />
              </div>
              <h2 className="mt-5 text-lg font-bold sm:text-xl">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-window glass-deep p-6 text-center sm:mt-20 sm:p-10 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">Ready to start?</p>
          <h2 className="mt-4 text-2xl font-bold tracking-[-0.05em] sm:text-3xl md:text-4xl">Let&apos;s discuss your project</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-foreground/60 sm:text-base">
            Whether you have a specific problem in mind or just exploring what AI can do for your business — I&apos;m happy to chat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/#contact" className="group rounded-full metallic px-6 py-3 text-sm font-bold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-accent/30">
              Get in touch
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
            <a href="mailto:inamulhaq12290@gmail.com" className="rounded-full border border-line px-6 py-3 text-sm font-bold transition-all duration-300 hover:border-accent hover:text-accent">
              inamulhaq12290@gmail.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
