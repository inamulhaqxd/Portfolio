---
type: Spec
title: AI Chat Popup — Visitor Recommendations
---

## Problem

The portfolio website currently has no interactive way for visitors to learn about Inam's skills, projects, and availability. The only contact method is a static form. An AI-powered chat popup would allow visitors to ask questions and receive personalized recommendations about Inam's work.

## Proposed Outcome

An AI chat feature that:
- Replaces the hero "View Projects" CTA with "Ask AI" (opens chat) and "Contact Me" with "View Projects"
- Provides a full-screen chat overlay powered by Gemini API
- Uses portfolio data + future admin-managed knowledge base as context
- Works as a session-only conversation (no persistence)
- Greets visitors with suggested questions
- Gracefully deflects off-topic or unknown questions

## User Stories

### Visitor Stories

1. As a visitor, I can click "Ask AI" in the hero section to open a chat popup.
2. As a visitor, I can see suggested questions when the chat opens.
3. As a visitor, I can type a question and receive an AI-generated response about Inam's work.
4. As a visitor, I can close the chat via X button or clicking the backdrop.
5. As a visitor, I can ask about Inam's projects, skills, experience, and availability.
6. As a visitor, I receive a graceful deflection when I ask something off-topic.

## Requirements

### Hero Section Updates

1. Hero section has two CTA buttons: "Ask AI" (left) and "View Projects" (right). [L1]
2. "Ask AI" button opens the AI chat overlay. [L1]
3. "View Projects" button scrolls to the projects section (smooth scroll). [L1]
4. "Contact Me" button is removed from the hero. [L1]

### Chat Overlay

5. Chat opens as a full-screen centered modal overlay (fixed inset-0). [L2]
6. Modal uses backdrop blur, matching existing ContactModal pattern (`z-[100]`). [L2]
7. Close via X button (top-right) or clicking backdrop. [L2]
8. Body scroll is locked when chat is open. [L2]
9. Chat panel has a header with title "Ask AI" and close button. [L2]
10. Chat panel has a scrollable message area and input field at bottom. [L2]

### Chat Behavior

11. AI greets visitor with: "Hi! I'm Inam's AI assistant. Ask me about his projects, skills, or availability." [L3]
12. Below greeting, show 4 suggested question chips: [L3]
    - "What projects has Inam built?"
    - "What technologies does Inam use?"
    - "Is Inam available for hire?"
    - "Tell me about Inam's AI/ML experience"
13. Clicking a chip sends it as a user message. [L3]
14. Visitor can type custom questions in the input field. [L3]
15. Visitor can press Enter or click Send button to submit. [L3]
16. AI responds with a typing indicator (animated dots) while processing. [L3]
17. Messages display in a chat bubble layout (user right, AI left). [L3]

### AI Agent Behavior

18. AI uses Gemini API for responses. [L4]
19. AI context includes: all portfolio projects (title, description, tech tags, links), skills section data, about section data, and future knowledge base entries. [L4]
20. AI system prompt instructs it to recommend Inam for AI/ML work, highlight relevant projects, and answer questions about experience/availability. [L4]
21. Off-topic questions get graceful deflection: "I'm here to help with questions about Inam's work and skills. Feel free to ask about his projects or experience!" [L4]
22. Questions with no available info get: "I don't have that information, but you can reach out to Inam directly via the contact form or WhatsApp." [L4]

### Knowledge Base (Admin Setup — Later Phase)

23. Knowledge base entries are stored in Supabase table `knowledge_base`. [L5]
24. Schema: `id`, `question` (text), `answer` (text), `category` (text), `created_at`, `updated_at`. [L5]
25. Admin CRUD for knowledge base is deferred to a later Spec. [L5]
26. AI chat reads from `knowledge_base` table when responding. [L5]

### Data Fetching

27. Projects are fetched via existing DAL `getPublishedProjects()`. [L6]
28. Skills and about data are sourced from the homepage's existing data (mock data or Supabase). [L6]
29. AI API call is made via a Next.js Server Action or Route Handler (not client-side). [L6]

### Loading / Error States

30. Typing indicator (three animated dots) shown while AI generates response. [L7]
31. Error state: Show "Something went wrong. Please try again." with retry button if Gemini API fails. [L7]
32. Rate limit: If API returns 429, show "Too many requests. Please wait a moment and try again." [L7]
33. Empty input: Send button is disabled when input is empty. [L7]

## Technical Decisions

- **AI Provider**: Google Gemini API (gemini-2.0-flash or latest stable model).
- **Server/Client boundary**:
  - Chat overlay component: Client Component (`"use client"`) — manages chat state, input, message rendering.
  - AI response generation: Server Action or Route Handler — calls Gemini API server-side to protect API key.
- **Styling**: Tailwind CSS v4, reusing existing glassmorphism utilities (`.glass`, `.metallic-glass`) and CSS custom properties.
- **Font**: Space Grotesk (already in layout).
- **Icons**: Lucide React (already installed).
- **Package**: Install `@google/generative-ai` SDK in `web/`.
- **Router**: App Router (existing).
- **No persistence**: Chat state is local React state (useState). No Supabase storage for conversations.

## Testing Strategy

- **Unit Tests (Vitest)**: AI response formatting, suggested questions data, input validation (empty check).
- **Component Tests (Vitest + RTL)**: Chat overlay open/close, message rendering, chip click sends message, input field behavior, typing indicator, error state.
- **E2E Tests (Playwright)**: Hero button click → chat opens → type question → AI responds → close chat.
- **Test Seams**: Mock Gemini API calls at boundary. Mock portfolio data fetch.

## Out of Scope

- Admin knowledge base CRUD (deferred to later Spec)
- Chat history persistence (session-only for now)
- Agent capabilities (tool use, actions) — expandable later
- Multi-language support
- Voice input
- File/image upload in chat
- Conversation analytics

## Blocking Questions

(none)

## Open Questions

- Maximum message length for visitor input (default: 500 chars)?
- Should the AI respond with markdown formatting (bold, lists, links)?

## Follow-Ups

- After Spec approval, create Work Items for implementation.
- Knowledge base admin CRUD to be created in a separate Spec.
- Agent capabilities (tool use, actions) to be designed when ready.
