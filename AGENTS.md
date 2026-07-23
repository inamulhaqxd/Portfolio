# ACT Skill Selection

This repo (and any Next.js project that installs its `global/` skills) uses the Next.js-specific ACT workflow variants, not the generic or Flutter versions.

## Project Rules

All workflows must read `.agents/rules/project.md` before implementing. This file contains canonical conventions for architecture, folder structure, styling, data, testing, and deployment.

**When to update project rules:**
- `act-workflow-compound` — when a session surfaces a new project convention
- `act-interview` — when terminology or architecture decisions change
- Manual — when architectural changes are made

## Workflow skill overrides

When the task involves interviewing, spec'ing, refining, decomposing, or implementing work for a Next.js project, use these skills instead of their generic or `-flutter` counterparts:

| Stage | Use this | Not this |
|---|---|---|
| Interview | `act-interview-nextjs` | `act-interview`, `act-interview-flutter` |
| Create Spec | `act-create-spec-nextjs` | `act-create-spec`, `act-create-spec-flutter` |
| Refine Spec | `act-refine-spec-nextjs` | `act-refine-spec`, `act-refine-spec-flutter` |
| Create Work Items | `act-create-issues-nextjs` | `act-create-issues`, `act-create-issues-flutter` |
| Implement | `act-implement-nextjs` | `act-implement`, `act-implement-flutter` |

Each `-nextjs` skill is a thin wrapper: it calls the matching core skill from the [Agentic Coding Toolkit](https://github.com/CodeWithAndreaPro/agentic-coding-toolkit) and layers Next.js-specific guidance (App Router vs Pages Router, Server/Client boundaries, Cache Components, TypeScript conventions, Tailwind styling, i18n, Vitest/Playwright testing split) on top. The core skill still owns workflow order, storage, and artifact shape.

## Not wrapped

- `act-workflow-compound` — session-insight capture is framework-agnostic; use the toolkit's version directly, no `-nextjs` variant exists or is needed. See the convention-capture override below, though — it changes one part of this skill's behavior for Next.js projects.
- `act-config`, `act-git-*` — framework-agnostic toolkit skills, used as-is.

## Compound overrides: where else to save session output

`act-workflow-compound` normally only writes reusable insights to `ai_docs/solutions/`. In a Next.js project, extend it with two more targets — each triggers independently; a session can hit zero, one, or both:

### 1. Project conventions → `.agents/skills/LOCAL.md`

If the session surfaced or confirmed a **project convention** — not just a one-off lesson — also write it to `.agents/skills/LOCAL.md` (created by `act-web-setup-project`), not only `ai_docs/solutions/`. A convention is something that should apply to *every future task* in a category `act-implement-nextjs`'s "Match existing project conventions" table already checks for: UI library choice, styling shorthand (e.g. `size-4` vs `h-4 w-4`), file/folder naming, import style, state management pattern, error handling shape, data fetching split, form handling, or test placement.

How to apply it:

1. Read `.agents/skills/LOCAL.md` if it exists.
2. If the session established or confirmed a convention that isn't already documented there, append it under the matching `### <Category>` heading (add the heading if missing) — a one- or two-line note, not a full lesson writeup.
3. Do not duplicate content that's already in `LOCAL.md` — check first, only add what's new or was previously left as a `<!-- -->` placeholder.

If the project has no `LOCAL.md` (not set up via `act-web-setup-project`), skip this target.

### 2. Canonical terminology → `GLOSSARY.md`

`act-interview` normally owns `GLOSSARY.md` (root of the project), updating it live during interviews when terminology is resolved. But a naming/terminology decision can also surface **outside** an interview — e.g. mid-implementation, when two names for the same concept collide in code review. When that happens in this session, also append it to `GLOSSARY.md`, using the exact format `act-interview` already uses (read `~/.claude` or the upstream toolkit's `act-interview/references/glossary-format.md` for the shape: `## Terminology` heading, `**Term**:` + one-line definition, optional `_Avoid_: ...` line for confused/overloaded alternatives).

How to apply it:

1. Read `GLOSSARY.md` at the project root if it exists.
2. Only add a term if it's genuinely durable, project-specific terminology (not implementation detail) and isn't already documented.
3. Preserve the existing document's structure — don't restructure it, only append under `## Terminology` (or the closest matching subheading if the glossary groups terms).
4. If no `GLOSSARY.md` exists yet, don't create one from compound — that's `act-interview`'s job on first use. Skip this target instead.

### Reporting

For any target actually written to (`ai_docs/solutions/`, `LOCAL.md`, `GLOSSARY.md`), mention all of them in the report to the user — don't silently write to more than one file without saying so.

## One-time setup per project

Run `/act-config` once in a new Next.js project to set up Spec storage before using any `-nextjs` workflow skill.

## Other skills in this repo

Beyond the 5-stage workflow, `global/` has reference and support skills. Load them by name when the task matches — they are not part of the interview→implement pipeline itself, but the `-nextjs` workflow skills already call out several of these where relevant.

### Testing

Every feature MUST include all three test types. No feature is complete without tests.

| Skill | Use for |
|---|---|
| `act-web-tdd-vitest` | Vertical-slice TDD discipline (Vitest + React Testing Library) for business logic, services, API routes |
| `act-web-e2e-playwright` | End-to-end tests (Playwright) for critical user journeys — setup, page objects, stable selectors, CI |

### Next.js / React patterns

| Skill | Use for |
|---|---|
| `next-best-practices` | File conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers |
| `typescript-nextjs-practices` | TypeScript for Next.js 16 / React 19 — async `params`/`searchParams`, typed Server Actions, `satisfies`, inferred type predicates, React Compiler interaction |
| `next-cache-components` | Cache Components (`'use cache'`, `cacheLife`, `cacheTag`, PPR) |
| `next-upgrade` | Migrating to a newer Next.js version (official guides + codemods) |
| `next-i18n` | Internationalization for App Router with `next-intl` — locale routing, `setRequestLocale`, Server/Client translations |
| `react-composition-patterns` | Component architecture — avoiding boolean-prop proliferation, building flexible/reusable components |
| `vercel-react-best-practices` | React/Next.js performance — 40+ rules (waterfalls, bundle size, RSC boundaries, Web Vitals) in its local `AGENTS.md` |

### Design and UI

| Skill | Use for |
|---|---|
| `tailwind-best-practices` | Tailwind CSS v4 — CSS-first `@theme` config, design token namespaces, dark mode, shadcn/ui integration |
| `design-system` | Generating or auditing a design-token system (colors, typography, spacing, radii, shadows) |
| `web-design-guidelines` | Broad UI/UX review of a page or flow — layout, clarity, CTA emphasis, consistency, accessibility basics |
| `motion-patterns` | Animation with `motion/react` — buttons, modals, toasts, stagger lists, transitions, scroll reveal |

### Data and infrastructure

| Skill | Use for |
|---|---|
| `supabase` | Any task touching Supabase (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues) |
| `supabase-postgres-best-practices` | Postgres schema design and query performance/optimization |
| `ci-security-scanning` | Setting up GitHub Actions security gates — secrets scanning, SAST, dependency/SCA scanning |

### Project setup and maintenance

| Skill | Use for |
|---|---|
| `act-web-setup-project` | Install supporting skills and project overrides into a new/existing Next.js project |
| `act-web-refresh-docs` | Refresh version-pinned skill content (`pinned_versions`) when a framework releases a new version |
| `act-web-system-design` | Whole-system design (ERD, architecture, API/data-flow, scale plan) before building — once per project or before a major new subsystem, not for single small features. `--check-drift` audits an existing design doc against the current codebase without editing anything |

## ACT Workflow

ACT workflow storage for new Specs is configured in `.act/config.yaml`.

ACT workflow semantics, Workflow Storage selection, artifact vocabulary, and domain-doc guidance are defined in `.act/workflow.md`.
