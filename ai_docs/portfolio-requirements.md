---
type: Spec
title: AI/ML Portfolio Website — Product Requirements Document
---

## Problem

Inam ul Haq Tariq needs a professional portfolio website to showcase AI/ML work to both job recruiters and freelance clients. The site must be dynamic — projects can be added over time without code changes — and structured so mock data today maps cleanly to a Supabase backend in the future.

## Proposed Outcome

A fully responsive, light/clean portfolio website built with Next.js + Tailwind CSS, deployed on Vercel. Projects and contact form messages are managed through a hidden admin dashboard backed by Supabase. The site serves as a single source of truth for Inam's professional presence online.

## User Stories

### Visitor Stories

1. As a visitor, I can land on the homepage and see a hero section with Inam's name, title, brief intro, and a CTA to view projects or contact.
2. As a visitor, I can scroll to a Skills section showing AI/ML technologies Inam works with.
3. As a visitor, I can scroll to a Projects grid showing featured projects with thumbnails and titles.
4. As a visitor, I can click a project card to view a detail page with full description, multiple images, and an embedded YouTube video.
5. As a visitor, I can scroll to an Experience/Timeline section showing work history and education.
6. As a visitor, I can scroll to a Contact section with a working contact form and social links.
7. As a visitor, I can submit the contact form and receive confirmation that my message was sent.
8. As a visitor, I can navigate to a Services page listing freelance AI/ML offerings.
9. As a visitor, I can see the site looks great on mobile, tablet, and desktop.
10. As a visitor, I can find the site via search engines (SEO-optimized meta tags, Open Graph, sitemap).

### Admin Stories

12. As the admin, I can log in to the hidden /admin route using email/password via Supabase Auth.
13. As the admin, I can add a new project with title, description, tech tags, live demo URL, GitHub URL, images, and YouTube video URL.
14. As the admin, I can edit existing projects.
15. As the admin, I can delete projects.
16. As the admin, I can upload project images to Supabase Storage through the admin panel.
17. As the admin, I can view contact form submissions in the admin dashboard.
18. As the admin, I can mark messages as read/unread.

## Requirements

### Homepage

1. **Hero Section**: Displays full name ("Inam ul Haq Tariq"), professional title ("AI/ML Engineer"), 1-2 sentence intro, CTA buttons (View Projects, Contact Me). [L1, L8]
2. **Skills Section**: Grid/list of AI/ML technologies — Python, TensorFlow, PyTorch, OpenCV, LangChain, RAG, Supabase, Next.js, and related tools. [L15]
3. **Projects Grid**: Displays all projects from Supabase (or mock data) as cards with thumbnail image, title, and brief description. Sorted by creation date (newest first). [L4, L5]
4. **Experience/Timeline Section**: Static content showing work experience at NTC (AI/ML Engineer Trainee) and Computer System Engineering degree specialized in AI. Hardcoded in source. [L9]
5. **Contact Section**: Contact form (name, email, subject, message) + social links (GitHub, LinkedIn, email). [L3]

### Project Detail Page

6. **Route**: `/projects/[slug]` — each project has a unique slug derived from the title. [L6]
7. **Content**: Full project description, multiple image gallery, embedded YouTube video player (using react-youtube or iframe). [L6]
8. **Navigation**: Back button to projects grid. Previous/next project links.

### Services Page

9. **Route**: `/services` [L10]
10. **Services Listed**: AI Chatbots & RAG, Computer Vision, ML Prediction Models, AI Automation. Each with title, description, and relevant tech tags. [L16]

### Admin Dashboard

11. **Route**: `/admin` — hidden, no visible link on the public site. [L19]
12. **Authentication**: Supabase Auth with email/password. Only one admin user (Inam). [L7]
13. **Project Management**: CRUD operations for projects — add, edit, delete. Form fields: title (text), description (rich text or markdown), tech tags (comma-separated), live demo URL, GitHub URL, YouTube video URL, images (multi-file upload). [L4, L5]
14. **Image Upload**: Upload images to Supabase Storage bucket via admin panel. [L20]
15. **Messages View**: List of contact form submissions with name, email, subject, message, timestamp, read/unread status. [L23]

### Contact Form

16. **Fields**: Name, email, subject, message (textarea). All required.
17. **Storage**: Submit to Supabase `messages` table. [L14]
18. **Email**: Send email notification to Inam on submission (via Resend or similar). [L14]
19. **Confirmation**: Show success message after submission. Validation errors for empty/invalid fields.

### Navigation

20. **Navbar**: Home, Projects, Services, Contact. [L18]
21. **Footer**: Social links (GitHub, LinkedIn, email), copyright notice.
22. **Mobile**: Hamburger menu for responsive navigation. [L21]

### SEO

23. **Meta Tags**: Dynamic title and description per page. [L22]
24. **Open Graph**: OG image, title, description for social sharing. [L22]
25. **Sitemap**: Auto-generated sitemap.xml. [L22]
26. **Robots.txt**: Allow all crawling. [L22]

## Technical Decisions

- **Architecture**: Monorepo with two Next.js apps (`web/` + `admin/`) and shared `packages/`. [L25]
- **Router**: App Router (Next.js 16) — `app/` directory structure. [L1]
- **Proxy**: `proxy.ts` (not deprecated `middleware.ts`) for auth session refresh. [L26]
- **Styling**: Tailwind CSS with light/clean design system. [L12]
- **Data Layer**: Supabase (Auth, PostgreSQL, Storage) — mock data first, schema designed to match future DB. [L4, L13]
- **DAL**: Shared in `packages/dal` — both apps import same DB queries. [L27]
- **Mock Data**: TypeScript arrays/objects mimicking Supabase table structure. Located in `packages/` or `lib/mock-data.ts`. Schema matches future Supabase tables exactly.
- **Deployment**: Two separate Vercel projects from same repo. [L11, L28]
- **Email**: Resend for contact form notifications (free tier: 100 emails/day). [L14, L24]
- **Video Embed**: `react-youtube` or raw iframe for YouTube player on project detail pages. [L6]
- **Image Handling**: Next.js `Image` component with Supabase Storage URLs (or placeholder URLs for mock data). [L20]
- **State Management**: React Server Components by default; `'use client'` only for interactive elements (forms, admin dashboard, mobile menu).
- **Forms**: Server Actions for contact form submission; client-side form handling in admin dashboard.
- **Package Manager**: pnpm with workspaces. [L29]
- **Build**: Turborepo for monorepo build orchestration. [L30]

## Data Model (Mock → Supabase)

### Projects Table

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Project name |
| slug | text | URL-safe, derived from title |
| description | text | Full markdown/rich text |
| tech_tags | text[] | Array of technology names |
| live_demo_url | text | Nullable |
| github_url | text | Nullable |
| youtube_url | text | Nullable |
| images | text[] | Array of image URLs |
| thumbnail_url | text | Primary image for grid card |
| created_at | timestamp | Auto-generated |
| updated_at | timestamp | Auto-generated |

### Messages Table

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Sender name |
| email | text | Sender email |
| subject | text | Message subject |
| message | text | Message body |
| is_read | boolean | Default false |
| created_at | timestamp | Auto-generated |

### Supabase Storage

- **Bucket**: `project-images`
- **Policy**: Public read, admin-only write (via RLS or service role in admin)

## Project Structure

```
├── web/                        ← User-facing site (Vercel #1)
│   ├── src/
│   │   ├── app/                ← Pages only (thin)
│   │   ├── features/           ← projects, contact, home
│   │   └── shared/             ← ui, layout, supabase client, types
│   └── package.json
│
├── admin/                      ← Admin dashboard (Vercel #2)
│   ├── src/
│   │   ├── app/                ← Pages only (thin)
│   │   ├── features/           ← projects, messages, auth
│   │   └── shared/             ← ui, layout, supabase client, types
│   └── package.json
│
├── packages/                   ← Shared code
│   ├── supabase/               ← client.ts, server.ts, proxy.ts
│   ├── types/                  ← project.ts, message.ts
│   └── dal/                    ← projects.ts, messages.ts
│
├── package.json                ← Root (pnpm workspaces + turborepo)
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

Key rules:
- `app/` = thin pages only, no business logic
- `features/` = domain code, imports from `dal/` and `shared/`
- `dal/` = only code that touches Supabase (in `packages/`)
- No circular imports — `features/` → `dal/` → `shared/` (one direction)

## Testing Strategy

Every feature MUST include all three test types before being considered complete.

- **Unit Tests (Vitest)**: Business logic, utilities, helpers, form validation, slug generation. Test edge cases: empty inputs, null values, boundary conditions, error states. File: `*.test.ts` co-located.
- **Component Tests (Vitest + React Testing Library)**: All interactive elements, states (loading, empty, error, success), user interactions (click, type, submit), responsive behavior. File: `*.test.tsx` co-located.
- **E2E Tests (Playwright)**: Every critical user journey — homepage load, project navigation, contact form submission, admin login, project CRUD, form validation errors. File: `tests/*.spec.ts`.
- **Coverage**: Every new component needs 1 unit + 1 component test. Every new feature needs 1 E2E happy path. Edge cases: null, empty, invalid, unauthorized, network failure.
- **No feature is complete without tests** — block merge if tests missing.

## Out of Scope

- Blog/articles section
- Multi-language/i18n support
- Dark mode toggle
- Analytics dashboard
- Project categories/filtering (can be added later)
- User comments on projects
- Newsletter subscription

## Blocking Questions

(none)

## Open Questions

- Resume PDF: Removed per user decision.
- Admin user setup: How to create the initial admin user in Supabase Auth?

## Follow-Ups

- After PRD approval, break into focused specs: Homepage, Project System, Admin Dashboard, Contact Form, Services Page, SEO.
- Each focused spec can be implemented independently with clear acceptance criteria.

## Notes

- Mock data must be structured to map 1:1 to Supabase tables — no reformatting needed when switching to live DB.
- The admin dashboard is hidden at /admin with no public link. Security through obscurity + Supabase Auth.
- Site is fully responsive (mobile-first approach with Tailwind breakpoints).
