import Link from "next/link";
import { SiteHeader } from "@/features/home/components/site-header";

const PROJECTS = [
  { name: "Intelligent document flow", slug: "intelligent-document-flow", fullDescription: "Built an intelligent document processing system that uses OCR and NLP to extract structured data from unstructured documents. The system automates data entry, reduces manual processing time by 70%, and integrates with existing enterprise workflows.", tech: ["Python", "Tesseract OCR", "spaCy", "FastAPI"] },
  { name: "AI knowledge assistant", slug: "ai-knowledge-assistant", fullDescription: "Developed a retrieval-augmented generation (RAG) chatbot that answers questions from internal company documents. Uses vector embeddings for semantic search and maintains context across conversations.", tech: ["LangChain", "OpenAI", "ChromaDB", "React"] },
  { name: "Workflow insights", slug: "workflow-insights", fullDescription: "Created an analytics dashboard that visualizes business process metrics and identifies bottlenecks. Uses machine learning to predict process outcomes and suggest optimizations.", tech: ["Python", "Pandas", "Scikit-learn", "Next.js"] },
  { name: "Sentiment analyzer", slug: "sentiment-analyzer", fullDescription: "Built a real-time sentiment analysis system that processes customer reviews and social media comments. Classifies feedback into positive, negative, and neutral categories with 92% accuracy.", tech: ["Python", "Transformers", "FastAPI", "PostgreSQL"] },
  { name: "Image classifier", slug: "image-classifier", fullDescription: "Developed a custom image classification model for detecting products in retail environments. Trained on 10,000+ images with transfer learning achieving 95% accuracy.", tech: ["Python", "TensorFlow", "OpenCV", "Docker"] },
  { name: "Predictive maintenance", slug: "predictive-maintenance", fullDescription: "Built an ML pipeline that predicts equipment failures before they occur. Uses sensor data and historical maintenance records to forecast failures with 85% accuracy.", tech: ["Python", "XGBoost", "Airflow", "AWS"] },
  { name: "Chatbot framework", slug: "chatbot-framework", fullDescription: "Created a reusable chatbot framework supporting multi-turn conversations with context retention. Includes intent recognition, entity extraction, and response generation.", tech: ["Python", "Rasa", "FastAPI", "Redis"] },
  { name: "Data pipeline", slug: "data-pipeline", fullDescription: "Designed an automated ETL pipeline that ingests, transforms, and prepares data for ML model training. Handles data validation, feature engineering, and versioning.", tech: ["Python", "Apache Spark", "Airflow", "S3"] },
  { name: "Recommendation engine", slug: "recommendation-engine", fullDescription: "Built a recommendation engine that provides personalized content suggestions based on user behavior and preferences. Uses collaborative filtering and content-based approaches.", tech: ["Python", "Surprise", "FastAPI", "Redis"] },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <Link href="/projects" className="text-sm font-bold text-accent underline decoration-1 underline-offset-4 hover:text-accent-strong">← Back to projects</Link>
          <h1 className="mt-8 text-4xl font-bold">Project not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Link href="/projects" className="text-sm font-bold text-accent underline decoration-1 underline-offset-4 hover:text-accent-strong">← Back to projects</Link>
        <h1 className="mt-8 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">{project.name}</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full bg-surface px-4 py-1.5 text-xs font-bold text-foreground/70">{t}</span>
          ))}
        </div>
        <div className="mt-10 rounded-window bg-surface p-7 sm:p-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-accent">About this project</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">{project.fullDescription}</p>
        </div>
        <div className="mt-10 rounded-window bg-surface p-7 sm:p-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Key features</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            <li>• End-to-end implementation from data processing to deployment</li>
            <li>• Scalable architecture for production use</li>
            <li>• Comprehensive testing and documentation</li>
            <li>• Performance optimized for real-time inference</li>
          </ul>
        </div>
        <div className="mt-10 flex gap-4">
          <a href="#contact" className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent-strong">Discuss this project</a>
          <Link href="/projects" className="rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-accent hover:text-accent">View more projects</Link>
        </div>
      </div>
    </main>
  );
}
