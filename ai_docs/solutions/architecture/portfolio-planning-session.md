---
title: Portfolio Website — PRD-First Planning Session
date: 2026-07-23
work_type: investigation
tags: [planning, portfolio, nextjs, supabase, prd]
confidence: high
references:
  - ai_docs/portfolio-requirements.md
  - ai_docs/portfolio-interview-ledger.md
  - GLOSSARY.md
---

## Summary

Conducted a structured interview to define a portfolio website for an AI/ML engineer. Produced a PRD (26 user stories, data model, tech decisions) and interview ledger with 24 traced decisions. Key design choice: mock data structured to map 1:1 to future Supabase tables, avoiding migration friction.

## Reusable Insights

### Interview Technique

- **Start with audience, not features.** Asking "who is this for?" first shaped every downstream decision (dual-audience → services page, admin dashboard, project detail pages).
- **Dynamic vs static is a direction-setting question.** Ask it early — it determines data layer, admin needs, and deployment complexity.
- **"Design with mock data first" is a valid and powerful approach.** User explicitly requested it. Ensures schema is DB-ready without needing live Supabase during development. Key constraint: mock data structure must match future Supabase table schema exactly.
- **Ask about removal, not just addition.** User removed resume PDF download mid-interview — a decision that would have been wasted work if discovered during implementation.

### Architecture Decisions

- **Next.js App Router + Tailwind + Supabase + Vercel** is a strong default stack for portfolio sites with dynamic content and admin needs.
- **Resend** for transactional email (contact form notifications). Free tier (100/day) covers portfolio use case.
- **Hidden `/admin` route** with Supabase Auth — simple security model, no custom auth needed.
- **Static experience/timeline** — changes rarely, no DB overhead. Good default for content that doesn't need CMS.
- **Project slug from title** — simple, human-readable URLs. No need for UUID-based slugs at portfolio scale.

### Data Model Pattern

The `projects` table pattern (title, slug, description, tech_tags[], live_demo_url, github_url, youtube_url, images[], thumbnail_url, created_at, updated_at) is reusable for any portfolio or showcase site. The `messages` table (name, email, subject, message, is_read, created_at) is a standard contact form pattern.

### File Organization

- `ai_docs/` for product-level documents (PRD, interview ledgers) — not implementation specs
- `ai_docs/solutions/` for session insights and reusable knowledge
- `GLOSSARY.md` for canonical project terminology — create early, update inline during interviews

## Pitfalls

- **Don't assume features the user didn't ask for.** Resume download seemed obvious but was explicitly removed. Always confirm, don't infer.
- **Mock data ↔ DB schema alignment is critical.** If mock data doesn't match Supabase tables 1:1, migration becomes a rewrite. Enforce this constraint from the start.

## Follow-ups

- Break PRD into focused implementation specs (Homepage, Project System, Admin Dashboard, Contact Form, Services Page, SEO)
- Resolve remaining open questions: admin user setup in Supabase Auth
