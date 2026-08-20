import Link from "next/link";
import { SiteHeader } from "@/features/home/components/site-header";
import { ArrowLeft, Home } from "lucide-react";

const PROJECTS = [
  { title: "Intelligent document flow", slug: "intelligent-document-flow", description: "A document processing system that pulls structured data out of scanned PDFs, invoices, and forms.", image: "https://picsum.photos/seed/docflow/600/400" },
  { title: "AI knowledge assistant", slug: "ai-knowledge-assistant", description: "An internal chatbot that answers questions from company docs using semantic retrieval.", image: "https://picsum.photos/seed/knowledge/600/400" },
  { title: "Workflow insights", slug: "workflow-insights", description: "A dashboard that visualizes how business processes actually run and where bottlenecks form.", image: "https://picsum.photos/seed/workflow/600/400" },
  { title: "Sentiment analyzer", slug: "sentiment-analyzer", description: "Real-time sentiment analysis that classifies customer feedback into positive, negative, or neutral.", image: "https://picsum.photos/seed/sentiment/600/400" },
  { title: "Image classifier", slug: "image-classifier", description: "Detects and categorizes retail products from shelf camera feeds using computer vision.", image: "https://picsum.photos/seed/classifier/600/400" },
  { title: "Predictive maintenance", slug: "predictive-maintenance", description: "Predicts when industrial equipment is likely to fail before breakdowns happen.", image: "https://picsum.photos/seed/maintenance/600/400" },
  { title: "Chatbot framework", slug: "chatbot-framework", description: "A reusable base for building domain-specific chatbots without starting from scratch.", image: "https://picsum.photos/seed/chatbot/600/400" },
  { title: "Data pipeline", slug: "data-pipeline", description: "An ETL system that turns raw data into clean, versioned datasets for model training.", image: "https://picsum.photos/seed/datapipe/600/400" },
  { title: "Recommendation engine", slug: "recommendation-engine", description: "Personalized content suggestions based on user behavior and preferences.", image: "https://picsum.photos/seed/recommend/600/400" },
];

export default async function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:px-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="group inline-flex items-center justify-center rounded-full border border-line p-2 transition-all duration-300 hover:border-accent hover:text-accent" aria-label="Back to home">
            <Home className="h-4 w-4" />
          </Link>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-[-0.05em] sm:mt-8 sm:text-4xl md:text-5xl">All Case Studies</h1>
        <p className="mt-3 max-w-2xl text-sm text-foreground/60 sm:mt-4 sm:text-base">A collection of AI/ML projects I&apos;ve worked on.</p>
        <div className="stagger mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:mt-12 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="flex">
              <article className="group flex flex-col rounded-panel border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-lg hover:shadow-accent/10 sm:p-5 w-full">
                <div className="h-36 overflow-hidden rounded-2xl sm:h-44">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mt-4 text-lg font-bold transition-colors duration-300 group-hover:text-accent sm:mt-5 sm:text-xl">{project.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/60 sm:text-sm">{project.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
