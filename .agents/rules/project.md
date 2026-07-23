# Project Rules

Canonical conventions for the Portfolio Website project. All workflows must read these before implementing.

Last updated: 2026-07-23

## Architecture

- **Monorepo**: pnpm workspaces + Turborepo
- **Apps**: `web/` (user-facing, Vercel #1) and `admin/` (dashboard, Vercel #2)
- **Shared code**: `packages/` (supabase, types, dal)
- **One database**: Supabase (shared between both apps)

## Folder Structure

```
├── web/src/          ← app/, features/, shared/
├── admin/src/        ← app/, features/, shared/
└── packages/         ← supabase/, types/, dal/
```

### Rules

- `app/` = thin pages only (layout, page, loading, error, not-found)
- `features/` = domain code (components, actions, types per feature)
- `shared/` = cross-feature code (ui components, layout, supabase client, types)
- `packages/dal/` = only code that touches Supabase database
- No circular imports — `app/` → `features/` → `dal/` → `shared/` (one direction)

## Next.js

- **Version**: Next.js 16 (App Router)
- **Proxy**: Use `proxy.ts` (not deprecated `middleware.ts`)
- **Export**: `proxy()` function (not `middleware()`)
- **Runtime**: Node.js only in proxy (no Edge runtime)

## Styling

- **Framework**: Tailwind CSS
- **Theme**: Light/clean design
- **Colors**: Use CSS custom properties, never hardcode Tailwind color classes
- **Responsive**: Mobile-first, fully responsive across all breakpoints

## Data

- **Database**: Supabase (PostgreSQL)
- **Mock data**: TypeScript arrays in `lib/mock-data.ts` — must map 1:1 to Supabase table schema
- **DAL**: Shared in `packages/dal/` — both apps import same queries
- **Types**: Shared in `packages/types/`

## Forms

- **Public forms** (contact): Server Actions
- **Admin forms**: Client-side handling with Supabase direct calls

## Authentication

- **Provider**: Supabase Auth (email/password)
- **Admin only**: Single admin user (Inam)
- **Route**: Hidden `/admin` — no public link
- **Session**: `proxy.ts` handles session refresh

## Testing

Every feature MUST include all three test types before being considered complete.

### Unit Tests (Vitest)

- Test business logic, utilities, helpers, form validation, slug generation
- Test edge cases: empty inputs, null values, boundary conditions, error states
- Mock external dependencies (Supabase, Resend) at boundary only
- File pattern: `*.test.ts` or `*.test.tsx` co-located with source

### Component Tests (Vitest + React Testing Library)

- Test all interactive elements: forms, buttons, navigation, modals
- Test states: loading, empty, error, success, disabled
- Test user interactions: click, type, submit, navigation
- Test responsive behavior at breakpoints
- File pattern: `*.test.tsx` co-located with component

### Integration/E2E Tests (Playwright)

- Test every critical user journey end-to-end
- Test form submissions with valid and invalid data
- Test navigation between pages
- Test admin login → CRUD operations → logout
- Test contact form → Supabase storage → email notification
- Test project detail page with images and YouTube embed
- File pattern: `tests/*.spec.ts` in each app

### Coverage Requirements

- Every new component: at least 1 unit test + 1 component test
- Every new feature: at least 1 E2E test covering happy path
- Edge cases: null, empty, invalid, unauthorized, network failure
- No feature is complete without tests — block merge if tests missing

### Test Commands

```bash
pnpm test          # Unit + component tests (watch)
pnpm test:run      # Unit + component tests (single run)
pnpm test:e2e      # Playwright E2E tests
```

## Deployment

- **Platform**: Vercel (two separate projects)
- **Repo**: Same GitHub repo, different root directories
- **Env vars**: Supabase keys + Resend API key

## Updating These Rules

These rules are updated by:
- `act-workflow-compound` — when a session surfaces a new project convention
- `act-interview` — when terminology or architecture decisions change
- Manual updates — when architectural changes are made

To update: edit this file directly. Keep entries concise (1-2 lines each).
