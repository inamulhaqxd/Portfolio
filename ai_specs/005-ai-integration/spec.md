---
type: Spec
title: AI Integration — Chatbot & Neural Network Visualization
---

## Problem

The portfolio site showcases AI/ML projects through written case studies but has zero AI functionality. Visitors have no way to experience Inam's AI capabilities directly on the site. The goal is to make visitors think "this person really knows AI" through interactive, lived experience — not just reading about it.

## Proposed Outcome

Two AI features added to the `web/` app:

1. **AI Chatbot** — A floating chat widget powered by Google Gemini that answers questions about Inam's projects, skills, and general AI topics. Lives on every page. Proves Inam builds with AI, not just talks about it.
2. **Neural Network Visualization** — An ambient canvas animation on the homepage hero that reacts to mouse movement. Creates immediate visual "wow" factor that signals AI expertise without words.

## User Stories

### Chatbot

1. As a visitor, I can see a chat bubble in the bottom-right corner on every page so I know I can talk to an AI assistant.
2. As a visitor, the chat auto-opens with a welcome message on my first visit so I immediately understand what the chatbot can do.
3. As a visitor, I can ask the chatbot about Inam's projects, skills, and experience and get accurate, grounded answers.
4. As a visitor, I can ask the chatbot general AI/ML questions and get helpful answers that connect to Inam's work when relevant.
5. As a visitor, I can close the chatbot and it stays closed on subsequent page loads (localStorage).
6. As a visitor, my conversation persists across page refreshes so I don't lose context (localStorage).
7. As a visitor, I can clear my conversation to start fresh.
8. As a visitor on mobile, the chat opens full-screen for a clean chat experience.
9. As a visitor, I see a typing indicator while the chatbot is generating a response.
10. As a visitor, I see an error message if the chatbot fails to respond, with a suggestion to try again.
11. As a visitor who is offline, I see a message telling me I need an internet connection to use the chatbot.

### Neural Network Visualization

12. As a visitor landing on the homepage, I see an animated neural network behind the hero content that immediately signals "AI."
13. As a visitor, I can move my mouse and see the nodes react — drifting toward my cursor.
14. As a visitor on mobile, I see a simplified version with fewer nodes and gentle ambient drift (no mouse interaction).
15. As a visitor, the visualization is purely decorative — no labels, no clicks, no functional data.

## Requirements

### Chatbot Widget

1. **Placement**: Floating chat bubble in bottom-right corner, expandable into a chat panel. Present on every page via root layout. [L4]
2. **Auto-greet**: On first visit, chat panel opens automatically with a welcome message. On return visits, stays closed if previously dismissed. [L4]
3. **Welcome message**: "Hi! I'm Inam's AI assistant. I can tell you about his AI/ML projects, skills, or experience. What are you curious about?"
4. **Dismiss behavior**: Clicking the chat bubble toggles the panel open/closed. Dismiss state stored in localStorage key `chatbot-closed`. [L4]
5. **Conversation memory**: Full chat history stored in localStorage key `chatbot-messages`. Persists across page refreshes. Clear conversation button removes the key and resets state. [L8]
6. **Message display**: User messages on the right (aligned-end), bot messages on the left (aligned-start). Timestamps not shown. Messages scroll to bottom on new message.
7. **Input**: Text input with send button. Enter key sends. Empty messages cannot be sent.
8. **Typing indicator**: Animated dots shown while waiting for API response.
9. **Error state**: If API call fails, show a friendly error message: "Something went wrong. Please try again." Include a retry button.
10. **Offline state**: If `navigator.onLine` is false, show "You need an internet connection to use the chatbot." Disable input until online.
11. **Page context**: The chatbot knows which page the visitor is on. API route receives optional `pageContext` string. If on a project detail page, include the project title and summary in context. [L6]
12. **Hydration safety**: Chat widget must not render from localStorage state on the server. Use `useEffect` to read localStorage after mount, with a loading skeleton or hidden state until hydrated.

### Chatbot API Route

13. **Route**: `POST /api/chat` in `web/`. [L6]
14. **Request shape**: `{ messages: Array<{ role: "user" | "model", parts: string }>, pageContext?: string }`
15. **Response shape**: `{ reply: string }` on success, `{ error: string }` on failure.
16. **Server-side**: Calls Google Gemini API. `GEMINI_API_KEY` stored in Vercel environment variables. Key never exposed to client. [L6]
17. **Missing key guard**: If `GEMINI_API_KEY` is not set, return `{ error: "AI assistant is not configured" }` with HTTP 500. Do not throw an unhandled exception.
18. **Model**: `gemini-1.5-flash`. [L3]
19. **System prompt**: Built at runtime from hardcoded project data. Structure: [L2, L8]

```
You are Inam's AI portfolio assistant. Be helpful, concise, and friendly.
Always connect answers to Inam's work when relevant.

## About Inam
- AI/ML Engineer
- Experience: [hardcoded]
- Skills: [hardcoded]

## Projects
[Hardcoded list — title, summary, tech tags, links]

## Rules
- If asked about something not in your knowledge, say so honestly
- If asked to do something outside scope, redirect to the portfolio
- Never make up projects or skills Inam doesn't have
```

20. **Input validation**: Validate request body before calling Gemini. Reject with HTTP 400 if `messages` is missing, empty, or contains objects without `role`/`parts` fields.
21. **Client-side debounce**: Throttle user messages to max 1 per second on the client to prevent spam.
22. **No server-side rate limiting**: Gemini free tier (15K requests/day) acts as natural cap. [L6]

### Neural Network Visualization

23. **Location**: Homepage hero background only. Canvas element positioned behind hero text content via `absolute inset-0 -z-10`. [L5]
24. **Technology**: HTML5 Canvas with `requestAnimationFrame` loop. No external library required. [L5]
25. **Nodes**: ~40–50 nodes on desktop, ~20–25 on mobile. Nodes are circles with brand colors from CSS custom properties. [L5]
26. **Edges**: Lines connecting nearby nodes within a distance threshold. Line opacity fades with distance.
27. **Mouse interaction**: Nodes gently drift toward cursor position within a radius. Force strength decreases with distance. [L5]
28. **Mobile behavior**: Simplified version — fewer nodes, gentle floating drift animation, no mouse interaction. Detect via `window.matchMedia('(hover: none)')`. [L7]
29. **Performance**: Use `requestAnimationFrame`. Pause animation when tab is not visible via `visibilitychange` event (call `cancelAnimationFrame`). Canvas resizes via `ResizeObserver` on the container element. Must not drop below 30fps on mid-range devices.
30. **Cleanup**: Animation loop must be cancelled on component unmount. Canvas must be removed from `ResizeObserver` on unmount.
31. **Graceful degradation**: If Canvas is not supported (very rare), hero renders normally without the visualization. No error shown.
32. **Decorative only**: No labels, no clickable nodes, no data. Pure ambient visual. [L5]

### Mobile

33. **Chatbot**: Full-screen overlay on mobile (≤768px). Uses `fixed inset-0 z-50` to cover the viewport. Tapping chat bubble opens full-screen view. [L7]
34. **Visualization**: Simplified ambient animation on mobile. No mouse-reactive behavior. [L7]

### Styling

35. **Chat widget**: Follows existing Tailwind design system. Matches site's light/clean aesthetic. Chat bubble uses a subtle shadow and brand accent color.
36. **Chat panel**: Clean card layout, rounded corners, subtle border. Messages use neutral backgrounds. Bot messages have a slight tint.
37. **Visualization colors**: Nodes use brand palette colors from CSS custom properties. Must look cohesive with hero content, not like a separate demo.

### Feature Structure

38. **Chatbot components**: `web/src/features/ai/components/chat-widget.tsx`, `chat-bubble.tsx`, `chat-panel.tsx`, `chat-message.tsx`, `typing-indicator.tsx`.
39. **Visualization component**: `web/src/features/ai/components/neural-network.tsx`.
40. **Chatbot utilities**: `web/src/features/ai/lib/build-system-prompt.ts`, `format-chat-messages.ts`, `chat-storage.ts`.
41. **API route**: `web/src/app/api/chat/route.ts`.
42. **Root layout integration**: `<ChatWidget />` added to `web/src/app/layout.tsx` so it appears on every page.

## Technical Decisions

- **Router**: App Router (Next.js 16) — existing `web/src/app/` structure. [Existing]
- **LLM**: Google Gemini `gemini-1.5-flash` via `@google/generative-ai` package. [L3]
- **API route**: `web/src/app/api/chat/route.ts` — Next.js Route Handler. [L6]
- **State management**: React `useState` for chat UI state. localStorage for persistence. No global state needed. [L8]
- **Canvas**: Raw HTML5 Canvas API. No library (e.g., no p5.js, no d3). Keep bundle small. [L5]
- **Styling**: Tailwind CSS (existing design system). No new UI libraries. [Existing]
- **Server/Client boundary**: Chat widget and visualization are `'use client'` components. API route is server-only. [Existing]
- **Data source for system prompt**: Hardcoded TypeScript data in `web/src/features/ai/lib/chat-data.ts`. No database connection in v1. Replace with Supabase DAL calls (`packages/dal/projects.ts`) when ready. [L2, L8]
- **Environment variable**: `GEMINI_API_KEY` in Vercel project settings. Add to deployment checklist. [L6]

## Testing Strategy

### Unit Tests (Vitest)

- `buildSystemPrompt()` — generates correct prompt from hardcoded project data. Edge cases: empty projects array, missing fields.
- `formatChatMessages()` — converts UI message state to Gemini API format.
- Chat message localStorage serialization/deserialization (`chat-storage.ts`).
- Input validation — rejects malformed request body.

### Component Tests (Vitest + React Testing Library)

- Chat widget renders chat bubble, opens/closes panel on click.
- Chat widget auto-opens on first visit (mock localStorage as empty).
- Chat widget stays closed if previously dismissed (mock localStorage with `chatbot-closed: true`).
- Messages render in correct alignment (user right, bot left).
- Typing indicator appears during loading state.
- Error state renders with retry button.
- Offline state renders when `navigator.onLine` is false.
- Clear conversation button resets messages.
- Mobile detection triggers full-screen overlay mode.
- Widget does not render chat content until hydration (useEffect has fired).

### E2E Tests (Playwright)

- Chatbot: Send a message, verify bot response appears (mock Gemini API via route interception).
- Chatbot: Auto-greet appears on first visit.
- Chatbot: Conversation persists after page refresh.
- Chatbot: Clear conversation resets chat.
- Chatbot: Offline state appears when network is disabled.
- Chatbot: Missing API key returns graceful error (set env var to empty).
- Neural network: Canvas element renders on homepage.
- Neural network: Canvas does NOT render on non-homepage routes.
- Neural network: Animation pauses when tab loses focus.
- Mobile: Chat opens full-screen on small viewport.
- Mobile: Visualization uses simplified animation.

## Out of Scope

- Voice input / speech-to-text
- Chatbot personality customization
- Chat history analytics / what visitors ask
- Streaming responses (Gemini supports it, but not needed for v1)
- Multi-language chatbot
- Chatbot training on external documents
- Other pages besides homepage for the visualization
- Supabase data integration (deferred — hardcoded data in v1, connect DAL later)

## Blocking Questions

(none)

## Open Questions

- Welcome message exact copy — finalize during implementation
- Node colors for visualization — should match brand palette, finalize with design

## Follow-Ups

- Run `act-create-issues` to decompose into Work Items
- Consider adding streaming responses in v2 for faster perceived response time
- Connect system prompt to Supabase via `packages/dal/projects.ts` when ready

## Notes

- The `@google/generative-ai` SDK must be added to `web/package.json` as a dependency.
- The visualization should gracefully degrade — if Canvas is unsupported, hero shows normally without it.
- The chatbot should work even if Gemini API is down — show a friendly "AI is temporarily unavailable" message.
- localStorage keys: `chatbot-closed` (boolean), `chatbot-messages` (JSON array).
- Add `GEMINI_API_KEY` to Vercel environment variables in deployment checklist.
