import Link from "next/link";
import { SiteHeader } from "@/features/home/components/site-header";
import { ArrowLeft, Home } from "lucide-react";
import { ImageGallery } from "@/features/home/components/image-gallery";

const PROJECTS = [
  {
    name: "Intelligent document flow",
    slug: "intelligent-document-flow",
    images: [
      "https://picsum.photos/seed/docflow1/800/450",
      "https://picsum.photos/seed/docflow2/800/450",
      "https://picsum.photos/seed/docflow3/800/450",
    ],
    about: "A document processing system that pulls structured data out of scanned PDFs, invoices, and forms. It combines OCR with named-entity recognition to extract fields like dates, amounts, and vendor names — then pushes them into a structured JSON output. Built for a team that was manually re-keying data from hundreds of documents per week.",
    built: "Tesseract handles the OCR layer, spaCy does entity extraction on top. FastAPI wraps both into a single endpoint. Documents are preprocessed with OpenCV for deskewing and noise reduction before OCR. Output is normalized into a consistent JSON schema regardless of input format. Deployed as a Docker container behind a simple upload UI.",
    tech: ["Python", "Tesseract OCR", "spaCy", "FastAPI"],
  },
  {
    name: "AI knowledge assistant",
    slug: "ai-knowledge-assistant",
    images: [
      "https://picsum.photos/seed/knowledge1/800/450",
      "https://picsum.photos/seed/knowledge2/800/450",
      "https://picsum.photos/seed/knowledge3/800/450",
    ],
    about: "An internal chatbot that answers questions from company docs — wikis, SOPs, product specs. Instead of keyword search, it uses semantic retrieval so employees can ask in plain language and get accurate answers with source links.",
    built: "Documents are chunked and embedded with OpenAI embeddings, stored in ChromaDB. At query time, LangChain retrieves the top-k relevant chunks and passes them as context to GPT-4. Conversation history is maintained in Redis for multi-turn support. Frontend is a minimal React chat widget that can be embedded in any internal tool.",
    tech: ["LangChain", "OpenAI", "ChromaDB", "React"],
  },
  {
    name: "Workflow insights",
    slug: "workflow-insights",
    images: [
      "https://picsum.photos/seed/workflow1/800/450",
      "https://picsum.photos/seed/workflow2/800/450",
      "https://picsum.photos/seed/workflow3/800/450",
    ],
    about: "A dashboard that visualizes how business processes actually run — where tasks pile up, which steps take longest, and where bottlenecks form. Uses historical process data to predict future delays before they happen.",
    built: "Data pipelines pull event logs from internal systems into a Postgres warehouse. Pandas handles transformation and feature engineering. Scikit-learn models predict cycle times and flag anomalies. Next.js frontend renders interactive charts with date range filters and drill-down views. Deployed on Vercel with server-side data fetching.",
    tech: ["Python", "Pandas", "Scikit-learn", "Next.js"],
  },
  {
    name: "Sentiment analyzer",
    slug: "sentiment-analyzer",
    images: [
      "https://picsum.photos/seed/sentiment1/800/450",
      "https://picsum.photos/seed/sentiment2/800/450",
      "https://picsum.photos/seed/sentiment3/800/450",
    ],
    about: "Processes customer reviews and social media comments in real-time, classifying each as positive, negative, or neutral. Used by a support team that was drowning in unstructured feedback with no way to prioritize angry customers.",
    built: "A fine-tuned DistilBERT model handles classification, served through a FastAPI endpoint. Ingestion pipeline reads from a message queue, classifies in batch, and writes results to PostgreSQL. A simple admin dashboard shows sentiment trends over time. Achieved 92% accuracy on the test set after fine-tuning on domain-specific labeled data.",
    tech: ["Python", "Transformers", "FastAPI", "PostgreSQL"],
  },
  {
    name: "Image classifier",
    slug: "image-classifier",
    images: [
      "https://picsum.photos/seed/classifier1/800/450",
      "https://picsum.photos/seed/classifier2/800/450",
      "https://picsum.photos/seed/classifier3/800/450",
    ],
    about: "Detects and categorizes retail products from shelf camera feeds. The store was doing manual inventory counts — this automates it with computer vision, flagging out-of-stock items in real-time.",
    built: "Transfer learning on MobileNetV2, fine-tuned on 10k+ labeled product images. OpenCV handles frame extraction from camera streams. Model runs inference per frame and aggregates counts over configurable time windows. Deployed with Docker on edge devices near the cameras for low-latency processing. REST API serves predictions to the store's inventory dashboard.",
    tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
  },
  {
    name: "Predictive maintenance",
    slug: "predictive-maintenance",
    images: [
      "https://picsum.photos/seed/maintenance1/800/450",
      "https://picsum.photos/seed/maintenance2/800/450",
      "https://picsum.photos/seed/maintenance3/800/450",
    ],
    about: "Predicts when industrial equipment is likely to fail, so maintenance can be scheduled before breakdowns happen. The plant was losing thousands per hour on unplanned downtime with no early warning system.",
    built: "Sensor data (temperature, vibration, pressure) is ingested via Kafka into S3. Airflow orchestrates daily feature engineering and model retraining. XGBoost model trained on historical failure patterns, with features engineered from time-window aggregations. Predictions pushed to an alerting system that notifies maintenance teams 48-72 hours before likely failure.",
    tech: ["Python", "XGBoost", "Airflow", "AWS"],
  },
  {
    name: "Chatbot framework",
    slug: "chatbot-framework",
    images: [
      "https://picsum.photos/seed/chatbot1/800/450",
      "https://picsum.photos/seed/chatbot2/800/450",
      "https://picsum.photos/seed/chatbot3/800/450",
    ],
    about: "A reusable base for building domain-specific chatbots without starting from scratch every time. Handles the hard parts — intent recognition, context management, conversation flow — so new bots can be spun up in days instead of weeks.",
    built: "Rasa handles NLU (intent classification + entity extraction). FastAPI serves as the conversation engine with a plugin architecture for custom actions. Redis stores conversation state with TTL-based cleanup. Designed to be multi-tenant — each deployment gets its own NLU model and action server, but shares the core framework. Includes a CLI for scaffolding new bot projects.",
    tech: ["Python", "Rasa", "FastAPI", "Redis"],
  },
  {
    name: "Data pipeline",
    slug: "data-pipeline",
    images: [
      "https://picsum.photos/seed/datapipe1/800/450",
      "https://picsum.photos/seed/datapipe2/800/450",
      "https://picsum.photos/seed/datapipe3/800/450",
    ],
    about: "An ETL system that takes raw, messy data from multiple sources and turns it into clean, versioned datasets ready for model training. The data science team was spending 60% of their time on data prep — this automates the whole thing.",
    built: "Apache Spark handles distributed processing for large datasets. Airflow orchestrates the pipeline DAG — extract, validate, transform, feature-engineer, version. Data quality checks run at each stage with configurable thresholds. Output lands in S3 with Delta Lake for versioning and time-travel queries. Schema registry ensures compatibility between pipeline runs.",
    tech: ["Python", "Apache Spark", "Airflow", "S3"],
  },
  {
    name: "Recommendation engine",
    slug: "recommendation-engine",
    images: [
      "https://picsum.photos/seed/recommend1/800/450",
      "https://picsum.photos/seed/recommend2/800/450",
      "https://picsum.photos/seed/recommend3/800/450",
    ],
    about: "Suggests content to users based on what they've interacted with before and what similar users liked. Replaced a generic 'popular items' feed that wasn't driving engagement.",
    built: "Hybrid approach: collaborative filtering (user-item matrix factorization via Surprise) combined with content-based similarity (TF-IDF on item metadata). FastAPI serves recommendations with Redis caching for sub-100ms response times. Includes an A/B testing framework to compare model variants. Retrains nightly on new interaction data via an Airflow DAG.",
    tech: ["Python", "Surprise", "FastAPI", "Redis"],
  },
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
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:px-12">
          <div className="flex items-center gap-3">
            <Link href="/projects" className="group inline-flex items-center justify-center rounded-full border border-line p-2 transition-all duration-300 hover:border-accent hover:text-accent" aria-label="Back to projects">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
            <Link href="/" className="group inline-flex items-center justify-center rounded-full border border-line p-2 transition-all duration-300 hover:border-accent hover:text-accent" aria-label="Back to home">
              <Home className="h-4 w-4" />
            </Link>
          </div>
          <h1 className="mt-8 text-3xl font-bold sm:text-4xl">Case study not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:px-12">
        <div className="flex items-center gap-3">
          <Link href="/projects" className="group inline-flex items-center justify-center rounded-full border border-line p-2 transition-all duration-300 hover:border-accent hover:text-accent" aria-label="Back to projects">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
          <Link href="/" className="group inline-flex items-center justify-center rounded-full border border-line p-2 transition-all duration-300 hover:border-accent hover:text-accent" aria-label="Back to home">
            <Home className="h-4 w-4" />
          </Link>
        </div>

        <header className="mt-8 animate-fade-in sm:mt-10">
          <ImageGallery images={project.images} alt={project.name} />
          <h1 className="mt-6 text-3xl font-bold tracking-[-0.05em] sm:mt-8 sm:text-4xl md:text-5xl">{project.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
            {project.tech.map((t, i) => (
              <span key={t} className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-foreground/70 transition-all duration-300 hover:bg-accent hover:text-ink sm:px-4 sm:py-1.5" style={{ animationDelay: `${i * 50}ms` }}>{t}</span>
            ))}
          </div>
        </header>

        <div className="my-10 h-px bg-line sm:my-12" />

        <div className="space-y-10 sm:space-y-14">
          <section className="animate-fade-in delay-200">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">About the project</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70 sm:mt-4 sm:text-base">{project.about}</p>
          </section>

          <section className="animate-fade-in delay-300">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">How it was built</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70 sm:mt-4 sm:text-base">{project.built}</p>
          </section>
        </div>

        <div className="my-10 h-px bg-line sm:my-12" />

        <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
          <a href="#contact" className="group rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-ink transition-all duration-300 hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/30 sm:px-6 sm:py-3 sm:text-sm">
            Discuss this project
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
          <Link href="/projects" className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs font-bold text-center transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-lg hover:shadow-accent/10 sm:px-6 sm:py-3 sm:text-sm">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            View more case studies
          </Link>
        </div>
      </article>
    </main>
  );
}
