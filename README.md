# Portfolio

My personal portfolio website — showcasing AI/ML projects and professional experience.

**Live:** [inamtariq.vercel.app](https://inamtariq.vercel.app/)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Testing:** Vitest + React Testing Library + Playwright
- **Monorepo:** pnpm workspaces + Turborepo

## Architecture

```
├── web/          ← User-facing portfolio (Vercel)
├── admin/        ← Admin dashboard (Vercel)
└── packages/     ← Shared code (supabase, types, dal)
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The web app runs at `http://localhost:3010`.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all apps |
| `pnpm test` | Unit + component tests (watch) |
| `pnpm test:run` | Unit + component tests (single run) |
| `pnpm test:e2e` | Playwright E2E tests |
| `pnpm lint` | Lint all apps |

## Project Structure

- `web/src/app/` — Thin pages (layout, page, loading, error)
- `web/src/features/` — Domain code (components, actions, types per feature)
- `web/src/shared/` — Cross-feature code (UI components, layout, supabase client)
- `packages/dal/` — Data access layer (Supabase queries)
- `packages/types/` — Shared TypeScript types

## Deployment

Deployed on Vercel as two separate projects from the same repo:

- **Web:** [inamtariq.vercel.app](https://inamtariq.vercel.app/)
- **Admin:** `/admin` route (hidden, not publicly linked)
