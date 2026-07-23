import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-accent">Coming Soon</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Services</h1>
      <p className="mt-5 max-w-md text-foreground/60">
        This page is under construction. Check back soon for details on what I offer.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent-strong"
      >
        Back to home
      </Link>
    </main>
  );
}
