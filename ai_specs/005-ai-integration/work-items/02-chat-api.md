---
type: Work Item
title: Chat API Route
parent: ../spec.md
---

## What to build

Create the `POST /api/chat` Next.js Route Handler that calls Google Gemini and returns a reply.

### Files to create

- `web/src/app/api/chat/route.ts` — Route Handler.
- `web/src/app/api/chat/route.test.ts` — unit tests for validation and error handling.

### Implementation details

**Request shape:**
```ts
{ messages: Array<{ role: "user" | "model", parts: string }>, pageContext?: string }
```

**Response shape:**
```ts
{ reply: string }  // HTTP 200
{ error: string }  // HTTP 400 or 500
```

**Behavior:**
1. Only allow `POST` method. Return HTTP 405 for other methods.
2. Parse and validate request body:
   - `messages` must be a non-empty array
   - Each message must have `role` ("user" | "model") and `parts` (string)
   - Return HTTP 400 with `{ error: "Invalid request" }` on failure
3. Check `GEMINI_API_KEY` exists in `process.env`. If missing, return HTTP 500 with `{ error: "AI assistant is not configured" }`.
4. Import `buildSystemPrompt` from `@/features/ai/lib/build-system-prompt`.
5. Initialize `GoogleGenerativeAI` with the API key.
6. Convert messages to Gemini `Content[]` format (user → "user", model → "model").
7. Call `gemini.chat.send()` or `gemini.chat.sendMessage()` with the system prompt and message history.
8. Return `{ reply: response.text }` on success.
9. On Gemini API error, return HTTP 500 with `{ error: "Something went wrong. Please try again." }`.
10. Never expose the API key to the client.

**Dependencies to install:**
- `@google/generative-ai` in `web/package.json`

## Required context

- System prompt builder: `web/src/features/ai/lib/build-system-prompt.ts` (WI 01).
- API route convention: Next.js 16 Route Handler (`export async function POST(request: Request)`).
- Project rules: env vars in Vercel, `GEMINI_API_KEY` not yet in deployment checklist.

## Acceptance criteria

- [x] `POST /api/chat` with valid messages returns `{ reply: string }` (HTTP 200)
- [x] `POST /api/chat` with missing/empty `messages` returns `{ error: string }` (HTTP 400)
- [x] `POST /api/chat` with malformed message objects returns HTTP 400
- [x] `POST /api/chat` when `GEMINI_API_KEY` is missing returns `{ error: "AI assistant is not configured" }` (HTTP 500)
- [x] `POST /api/chat` when Gemini API fails returns `{ error: "Something went wrong. Please try again." }` (HTTP 500)
- [x] GET/PUT/etc. requests return HTTP 405
- [x] API key is never sent in the response body or headers
- [x] `pageContext` is passed to `buildSystemPrompt()` when provided in the request
- [x] Unit tests cover all validation and error paths

## Covers

- User Stories: 3, 4, 10, 11
- Requirements: 13-22
- Interview Ledger: L3, L6
- Testing Strategy: Unit tests — validation, error handling; E2E tests — mock Gemini API

## Blocked by

- `01-chat-data.md`
