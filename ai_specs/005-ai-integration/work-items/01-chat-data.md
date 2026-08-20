---
type: Work Item
title: Chat Data & System Prompt Builder
parent: ../spec.md
---

## What to build

Create the hardcoded project data source and the `buildSystemPrompt()` function that generates the Gemini system prompt from it.

### Files to create

- `web/src/features/ai/lib/chat-data.ts` — hardcoded project data (title, description, tech_tags, links) and profile info (name, role, skills, experience). Shape must match the `Project` type from `packages/types/project.ts` for easy swap later.
- `web/src/features/ai/lib/build-system-prompt.ts` — exports `buildSystemPrompt(pageContext?: string): string`. Generates the system prompt string with profile data, project list, and behavioral rules.
- `web/src/features/ai/lib/build-system-prompt.test.ts` — unit tests.

### Implementation details

`chat-data.ts` exports:
```ts
export const profileData = { name, role, skills: string[], experience: string }
export const projectsData: Array<{ title, slug, description, tech_tags, links }>
```

`build-system-prompt.ts` generates:
```
You are Inam's AI portfolio assistant. Be helpful, concise, and friendly.
Always connect answers to Inam's work when relevant.

## About Inam
- AI/ML Engineer
- Experience: [from profileData]
- Skills: [from profileData]

## Projects
[Auto-generated from projectsData — title, summary, tech tags, links]

## Rules
- If asked about something not in your knowledge, say so honestly
- If asked to do something outside scope, redirect to the portfolio
- Never make up projects or skills Inam doesn't have
```

If `pageContext` is provided (e.g., project title), append a note to the prompt: "The visitor is currently viewing: {pageContext}."

## Required context

- Project type: `packages/types/project.ts` — use same field names for the hardcoded data so the swap to Supabase DAL is a single import change.
- Existing feature structure: `web/src/features/home/components/` — follow same pattern under `web/src/features/ai/lib/`.
- Project rules: `app/` → `features/` → `dal/` → `shared/` import direction.

## Acceptance criteria

- [x] `chat-data.ts` exports `profileData` and `projectsData` with correct shapes
- [x] `buildSystemPrompt()` returns a string containing profile name, skills, experience, and all project titles
- [x] `buildSystemPrompt("Project Title")` appends the page context to the prompt
- [x] `buildSystemPrompt()` with empty `projectsData` returns a valid prompt (no crash)
- [x] Unit tests cover: normal case, with pageContext, empty projects, missing optional fields
- [x] No import from `packages/` or Supabase — data is fully hardcoded

## Covers

- User Stories: 3, 4
- Requirements: 19
- Interview Ledger: L2, L8
- Testing Strategy: Unit tests — `buildSystemPrompt()` edge cases

## Blocked by

None — ready to start
