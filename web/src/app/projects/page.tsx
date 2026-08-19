import Link from "next/link";
import { SiteHeader } from "@/features/home/components/site-header";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ProjectsPage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const projectList = projects || [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Link href="/" className="text-sm font-bold text-accent underline decoration-1 underline-offset-4 hover:text-accent-strong">← Back to home</Link>
        <h1 className="mt-8 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">All Projects</h1>
        <p className="mt-4 max-w-2xl text-foreground/60">A collection of AI/ML projects I&apos;ve worked on.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project, index) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <article className="group rounded-panel border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-accent">
                <div className={`flex h-40 items-end rounded-2xl p-5 ${index % 3 === 1 ? "bg-accent text-ink" : "bg-surface-muted"}`}>
                  <span className="text-5xl font-bold tracking-[-0.08em]">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{project.description.slice(0, 100)}...</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
