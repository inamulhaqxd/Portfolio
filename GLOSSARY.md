# Portfolio Website Glossary

Canonical terms for the AI/ML Portfolio Website project.

## Terminology

**Project**:
A showcased work item displayed on the portfolio site. Each project has a title, description, tech tags, media (images, YouTube video), and optional links (live demo, GitHub).
_Avoid_: work, item, piece

**Admin Dashboard**:
The hidden `/admin` route where Inam manages projects and views contact form messages. Accessible only via Supabase Auth login.
_Avoid_: control panel, backend UI, CMS

**Tech Tags**:
Array of technology names associated with a project (e.g., Python, TensorFlow, RAG). Used for filtering and display on project cards.
_Avoid_: skills, technologies, stack

**Slug**:
URL-safe identifier derived from a project title. Used in `/projects/[slug]` routes.
_Avoid_: id, url, handle

**Mock Data**:
TypeScript data structures that mimic Supabase table schemas. Used during development before connecting to a live database. Must map 1:1 to future Supabase tables.
_Avoid_: fake data, placeholder data, seed data

**Contact Form Messages**:
Submissions from the public contact form, stored in Supabase and optionally emailed to Inam.
_Avoid_: inquiries, submissions, messages

**Proxy**:
Next.js 16 file (replaces deprecated `middleware.ts`) used for auth session refresh. Located in `packages/supabase/proxy.ts`.
_Avoid_: middleware, middleware.ts

**DAL (Data Access Layer)**:
Server-only code in `packages/dal/` that contains all Supabase database queries. Both `web/` and `admin/` import from here.
_Avoid_: db layer, data layer, repository
