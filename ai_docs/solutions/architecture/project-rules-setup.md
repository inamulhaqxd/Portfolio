---
title: Project Rules Setup — Monorepo Architecture
date: 2026-07-23
work_type: architecture
tags: [monorepo, rules, conventions, nextjs, supabase]
confidence: high
references:
  - .agents/rules/project.md
  - ai_docs/portfolio-requirements.md
  - ai_docs/portfolio-interview-ledger.md
---

## Summary

Established project rules and guidelines for the portfolio website. Created `.agents/rules/project.md` as the canonical source of truth for all workflow skills. Updated `AGENTS.md` to reference these rules and define when they should be updated.

## Key Decisions

- **Feature-based architecture**: `app/` (thin pages) → `features/` (domain code) → `dal/` (DB queries) → `shared/` (cross-feature)
- **Monorepo**: Two Next.js 16 apps (`web/` + `admin/`) sharing `packages/` (supabase, types, dal)
- **proxy.ts**: Not deprecated `middleware.ts` — confirmed via Context7 MCP
- **Shared DAL**: Both apps import same DB queries from `packages/dal/`

## Reusable Insights

### Project Rules Pattern

- `.agents/rules/project.md` is the single source of truth for conventions
- `AGENTS.md` references it so all workflows know to read it before implementing
- Rules are updated by `act-workflow-compound` (session insights), `act-interview` (terminology), or manually
- Keep rules concise — 1-2 lines per entry, scannable

### Architecture Documentation

- PRD captures product requirements and user stories
- Interview Ledger traces decisions back to questions
- Project Rules capture implementation conventions
- All three are separate concerns — don't merge them

### File Organization

| File | Purpose | Updated by |
|---|---|---|
| `ai_docs/portfolio-requirements.md` | Product requirements (PRD) | act-interview, act-create-spec |
| `ai_docs/portfolio-interview-ledger.md` | Decision traceability | act-interview |
| `.agents/rules/project.md` | Implementation conventions | act-workflow-compound, manual |
| `GLOSSARY.md` | Canonical terminology | act-interview, act-workflow-compound |
| `AGENTS.md` | Workflow skill selection + rules reference | Manual |

## Pitfalls

- Don't put implementation conventions in the PRD — they belong in `.agents/rules/project.md`
- Don't put product requirements in project rules — they belong in `ai_docs/`
- Keep GLOSSARY.md for terms only, not behavior or implementation details

## Follow-ups

- Create `.agents/skills/LOCAL.md` when `act-web-setup-project` is run
- Add styling rules when Tailwind design system is finalized
- Add database rules when Supabase schema is implemented
