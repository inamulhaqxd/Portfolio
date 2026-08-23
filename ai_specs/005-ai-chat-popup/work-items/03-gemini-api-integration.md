## What to build

Set up the Gemini API integration: install SDK, create a Server Action (or Route Handler) that calls Gemini with portfolio context, and returns AI responses. Protects API key server-side.

## Required context

- AI Provider: Google Gemini API
- Package: `@google/generative-ai` (install in `web/`)
- Server Actions pattern: `"use server"` functions in `web/src/features/ai-chat/actions.ts`
- Existing Server Action pattern: `web/src/features/contact/actions.ts`
- Environment variable: `GEMINI_API_KEY` in `.env.local`
- Portfolio data: projects from `getPublishedProjects()`, skills/about from mock data or Supabase

## Acceptance criteria

- [ ] `@google/generative-ai` installed in `web/`
- [ ] `GEMINI_API_KEY` added to `.env.local` (not committed)
- [ ] Server Action `getAiResponse(message: string)` in `web/src/features/ai-chat/actions.ts`
- [ ] System prompt instructs AI to recommend Inam, highlight projects, answer about skills/availability
- [ ] System prompt includes portfolio context: projects (title, description, tech tags), skills, about info
- [ ] API call made server-side (API key never exposed to client)
- [ ] Returns `{ success: true, response: string }` on success
- [ ] Returns `{ success: false, error: string }` on failure
- [ ] Rate limit (429) handled with user-friendly error message
- [ ] Unit test: system prompt construction
- [ ] Unit test: error handling for API failures

## Covers

- User Stories: 3, 5
- Requirements: 18-20, 27-29

## Blocked by

None — can set up API integration independently
