---
type: Interview Ledger
parent: portfolio-requirements.md
---

## Records

### L1

Status: current

Question: What tech stack should the portfolio website use?

Recommended Answer: Next.js + Tailwind CSS — modern, fast, good for SEO, easy to deploy on Vercel.

Answer: Next.js + Tailwind

Decision: Tech stack is Next.js with Tailwind CSS, deployed on Vercel.

### L2

Status: current

Question: Who is the primary audience for the portfolio?

Recommended Answer: Both job recruiters and freelance clients equally.

Answer: Both equally

Decision: The site must serve both job seekers and freelance clients.

### L3

Status: current

Question: How should visitors contact you?

Recommended Answer: Both contact links (email, LinkedIn, GitHub) in header/footer AND a working contact form on the site.

Answer: Both

Decision: Include social/contact links in header/footer AND a functional contact form.

### L4

Status: current

Question: How should projects be managed — static or dynamic?

Recommended Answer: Dynamic system via Supabase, allowing future project uploads without code changes.

Answer: Dynamic via Supabase

Decision: Projects are stored in Supabase and managed through an admin dashboard.

### L5

Status: current

Question: What fields should each project have?

Recommended Answer: All of: title, description, tech stack tags, live demo link, GitHub link, images.

Answer: All of the above

Decision: Projects include: title, description, tech tags, live demo URL, GitHub URL, images.

### L6

Status: current

Question: Should there be a project detail page?

Recommended Answer: Yes — full description, multiple images, YouTube video embed.

Answer: Yes, detail page with multiple images and YouTube video player

Decision: Each project has a detail page showing full description, multiple images, and embedded YouTube video.

### L7

Status: current

Question: How should the admin log in?

Recommended Answer: Supabase Auth with email/password — built into Supabase, secure, easy to manage.

Answer: Supabase Auth

Decision: Admin authentication uses Supabase Auth (email/password).

### L8

Status: current

Question: What sections should the homepage include?

Recommended Answer: Hero, Skills/Tech stack, Projects grid, Experience/Timeline, Contact.

Answer: All of them

Decision: Homepage has 5 sections: Hero, Skills, Projects grid, Experience/Timeline, Contact.

### L9

Status: current

Question: Should experience/education be static or dynamic?

Recommended Answer: Static in code — changes rarely, no need for DB management.

Answer: Static in code

Decision: Experience and education content is hardcoded in the site source.

### L10

Status: current

Question: Should there be a freelance/services page?

Recommended Answer: Yes, a separate page listing AI/ML services.

Answer: Yes, separate page

Decision: Dedicated /services page for freelance offerings.

### L11

Status: current

Question: Where should the site be hosted?

Recommended Answer: Vercel — free tier, perfect for Next.js.

Answer: Vercel

Decision: Deploy to Vercel.

### L12

Status: current

Question: What visual style should the site have?

Recommended Answer: Light/clean — professional, minimal, tech-focused.

Answer: Light/clean

Decision: Light, clean visual design.

### L13

Status: current

Question: Do you have a Supabase project ready?

Answer: Design with mock data first, structure so it maps perfectly to future Supabase schema.

Decision: Build with mock data first, schema must match future Supabase structure.

### L14

Status: current

Question: Where should contact form submissions go?

Recommended Answer: Store in Supabase AND send email notification.

Answer: Both storage + email

Decision: Contact form stores messages in Supabase AND sends email notification.

### L15

Status: current

Question: What skills should be listed?

Recommended Answer: AI/ML focused — Python, TensorFlow, PyTorch, OpenCV, LangChain, RAG, Supabase, Next.js, etc.

Answer: AI/ML focused

Decision: Skills section shows AI/ML focused technologies.

### L16

Status: current

Question: What freelance services should be offered?

Recommended Answer: AI Chatbots & RAG, Computer Vision, ML Prediction Models, AI Automation.

Answer: All plus custom list

Decision: Services page lists: AI Chatbots & RAG, Computer Vision, ML Prediction Models, AI Automation.

### L17

Status: current

Question: Should there be a downloadable resume?

Answer: No — removed. No resume PDF download on the site.

Decision: No downloadable resume. Resume info is covered by the Experience section and project showcase.

### L18

Status: current

Question: What should the navigation contain?

Recommended Answer: Home, Projects, Services, Contact.

Answer: Home, Projects, Services, Contact

Decision: Navbar has 4 links: Home, Projects, Services, Contact.

### L19

Status: current

Question: How should the admin dashboard be accessed?

Recommended Answer: Hidden at /admin — no visible link on the site.

Answer: Hidden at /admin

Decision: Admin route is /admin with no visible navigation link.

### L20

Status: current

Question: Where should project images be stored?

Recommended Answer: Supabase Storage bucket — integrated, managed via admin panel.

Answer: Supabase Storage

Decision: Project images uploaded and stored in Supabase Storage.

### L21

Status: current

Question: How important is mobile responsiveness?

Recommended Answer: Fully responsive, looks great on all devices.

Answer: Yes, fully responsive

Decision: Site must be fully responsive across all device sizes.

### L22

Status: current

Question: Should the site have SEO optimization?

Recommended Answer: Yes — meta tags, Open Graph, sitemap, robots.txt.

Answer: Yes, full SEO

Decision: Full SEO with meta tags, Open Graph, sitemap.xml, robots.txt.

### L23

Status: current

Question: Should the admin dashboard show contact form messages?

Recommended Answer: Yes — view and manage messages from the admin panel.

Answer: Yes, show in admin

Decision: Admin dashboard includes a messages view for contact form submissions.

### L24

Status: current

Question: Which email provider for contact form notifications?

Answer: Resend

Decision: Use Resend for sending contact form email notifications. Free tier (100 emails/day) is sufficient.

### L25

Status: current

Question: Should the admin and user-facing site be separate apps?

Answer: Yes — one shared Supabase database, two separate Next.js apps with different deployments.

Decision: Monorepo with `web/` (user-facing) and `admin/` (dashboard) as separate Vercel projects sharing `packages/` (DAL, types, Supabase client).

### L26

Status: current

Question: Should we use middleware.ts or proxy.ts?

Recommended Answer: proxy.ts — middleware.ts is deprecated in Next.js 16. proxy.ts uses Node.js runtime only (no Edge).

Answer: proxy.ts

Decision: Use `proxy.ts` (not deprecated `middleware.ts`) for auth session refresh. Export function renamed from `middleware` to `proxy`.

### L27

Status: current

Question: Where should the Data Access Layer live?

Recommended Answer: Shared in `packages/dal` — both apps import the same DB queries, no duplication.

Answer: Shared in packages/

Decision: DAL is shared in `packages/dal/` with projects.ts and messages.ts.

### L28

Status: current

Question: How should the two apps be deployed?

Recommended Answer: Two separate Vercel projects from the same GitHub repo.

Answer: Two Vercel projects

Decision: `web/` and `admin/` deployed as separate Vercel projects from the monorepo.

### L29

Status: current

Question: Which package manager for the monorepo?

Recommended Answer: pnpm — fast, disk-efficient, strict dependency resolution.

Answer: pnpm

Decision: Use pnpm with workspaces for the monorepo.

### L30

Status: current

Question: Which build tool for monorepo orchestration?

Recommended Answer: Turborepo — built into Next.js ecosystem, simple setup.

Answer: Turborepo

Decision: Use Turborepo for build orchestration across both apps.

### L31

Status: current

Question: What testing requirements should every feature follow?

Recommended Answer: Every feature must include unit tests (Vitest), component tests (Vitest + React Testing Library), and E2E tests (Playwright) covering all edge cases before being considered complete.

Answer: All three test types mandatory for every feature

Decision: Every feature MUST include unit tests, component tests, and E2E tests. No feature is complete without tests. Block merge if tests missing.
