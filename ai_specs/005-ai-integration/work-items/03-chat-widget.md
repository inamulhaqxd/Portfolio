---
type: Work Item
title: Chat Widget
parent: ../spec.md
---

## What to build

Build the complete chat widget component and integrate it into the root layout so it appears on every page.

### Files to create

- `web/src/features/ai/components/chat-widget.tsx` — main orchestrator component (`'use client'`).
- `web/src/features/ai/components/chat-bubble.tsx` — floating bubble button.
- `web/src/features/ai/components/chat-panel.tsx` — expandable chat panel with header, messages, input.
- `web/src/features/ai/components/chat-message.tsx` — single message bubble (user or bot).
- `web/src/features/ai/components/typing-indicator.tsx` — animated dots.
- `web/src/features/ai/lib/chat-storage.ts` — localStorage read/write helpers.
- `web/src/features/ai/lib/format-chat-messages.ts` — converts UI messages to Gemini API format.
- `web/src/features/ai/components/chat-widget.test.tsx` — component tests.

### Files to modify

- `web/src/app/layout.tsx` — add `<ChatWidget />` after `{children}`.

### Implementation details

**ChatWidget orchestrator:**
- `'use client'` component.
- Uses `useState` for: `isOpen` (boolean), `messages` (array), `isLoading` (boolean), `isHydrated` (boolean).
- On mount (`useEffect`): read `chatbot-closed` and `chatbot-messages` from localStorage, set `isHydrated = true`.
- On first visit (no `chatbot-closed` key): auto-open panel, add welcome message.
- On close: store `chatbot-closed: "true"` in localStorage.
- On new message: store `chatbot-messages` JSON in localStorage.
- On clear: remove both keys, reset messages to empty.
- Messages shape: `{ id: string, role: "user" | "model", content: string, timestamp: number }`.

**Chat bubble:**
- Fixed position `bottom-6 right-6` (or `bottom-20 right-6` when chat is open on mobile).
- Shows a chat icon. Toggle panel on click.
- Subtle shadow, brand accent background.
- Badge showing unread count (optional, low priority).

**Chat panel (desktop):**
- Fixed position, bottom-right corner, `w-[380px] h-[520px]`.
- Header with title "AI Assistant" and close/clear buttons.
- Messages area with auto-scroll to bottom.
- Input area: text input + send button. Enter sends. Disabled when loading.
- Typing indicator shows while `isLoading` is true.

**Chat panel (mobile ≤768px):**
- `fixed inset-0 z-50` full-screen overlay.
- Same header, messages, input layout but full viewport.
- Close button returns to bubble.

**Message display:**
- User messages: right-aligned, brand accent background, white text.
- Bot messages: left-aligned, neutral background, slight tint.
- No timestamps.

**Error state:**
- If API returns error: show "Something went wrong. Please try again." with a retry button.
- Retry resends the last user message.

**Offline state:**
- Check `navigator.onLine` on mount and on `offline`/`online` events.
- When offline: show "You need an internet connection to use the chatbot." Disable input.

**Hydration safety:**
- While `isHydrated` is false, render bubble but hide panel content (or show skeleton).
- localStorage reads only happen in `useEffect`.

**Root layout integration:**
- Import `ChatWidget` in `layout.tsx`, render after `{children}` inside `<body>`.

## Required context

- API route: `web/src/app/api/chat/route.ts` (WI 02) — call `POST /api/chat`.
- Chat data utilities from WI 01 — not directly imported by widget, but `pageContext` is computed from URL.
- Root layout: `web/src/app/layout.tsx` — add ChatWidget after `{children}`.
- Styling: Tailwind CSS, light/clean aesthetic, use CSS custom properties for colors.
- Project rules: `app/` is thin pages only — widget lives in `features/ai/`.

## Acceptance criteria

- [x] Chat bubble renders in bottom-right corner on every page
- [x] Clicking bubble toggles chat panel open/closed
- [x] On first visit, panel auto-opens with welcome message
- [x] On return visits, panel stays closed if previously dismissed
- [x] User messages appear right-aligned, bot messages left-aligned
- [x] Typing indicator shows while waiting for API response
- [x] Error message with retry button appears on API failure
- [x] Offline message appears when `navigator.onLine` is false
- [x] Clear conversation button resets messages and localStorage
- [x] Conversation persists across page refreshes
- [x] On mobile (≤768px), chat opens as full-screen overlay
- [x] Empty messages cannot be sent
- [x] Enter key sends message
- [x] Messages auto-scroll to bottom on new message
- [x] Widget does not render chat content until hydrated (no hydration mismatch)
- [x] Component tests cover: render, open/close, auto-greet, dismiss, message alignment, typing indicator, error state, clear, mobile mode, hydration

## Covers

- User Stories: 1-10
- Requirements: 1-12, 33, 35-36, 38, 40, 42
- Interview Ledger: L1, L4, L7, L8
- Testing Strategy: Component tests — all interactive states; E2E tests — chatbot journeys

## Blocked by

- `02-chat-api.md`
