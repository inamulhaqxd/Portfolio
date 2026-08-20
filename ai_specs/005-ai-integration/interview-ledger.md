---
type: Interview Ledger
parent: spec.md
---

## Records

### L1

Status: current

Question: What kind of AI experience should visitors have on the site?

Answer: Two features — an Interactive AI Chatbot (Option A) and a Neural Network Visualization (Option D). The chatbot proves AI building ability; the visualization creates visual wow factor.

Decision: Site will have two AI features: a floating chatbot widget and a homepage hero neural network animation.

### L2

Status: current

Question: What should the chatbot know about?

Recommended Answer:
- Portfolio data + general AI knowledge.
- Chatbot can answer general AI questions while grounding answers in Inam's work when relevant.
- This is the highest-impact combo — visitors asking "what is RAG?" get a great answer plus "I built a RAG system for X."

Answer: y

Decision: Chatbot uses portfolio data + general AI knowledge. System prompt auto-injects project data at runtime.

### L3

Status: current

Question: Which LLM provider should power the chatbot?

Answer: Google Gemini (`gemini-1.5-flash`). Cheapest option (~$0.075/1M input tokens), generous free tier (15K requests/day), no financial risk for a portfolio site.

Decision: Google Gemini API with `gemini-1.5-flash` model.

### L4

Status: current

Question: How should the chatbot be placed and what opening behavior should it use?

Recommended Answer:
- Floating widget on every page (bottom-right corner, expandable chat panel).
- Auto-greet: chat opens automatically with a welcome message framing the chatbot's scope.
- Widget is dismissible and remembers closed state via localStorage.

Answer: y

Decision: Floating widget on every page with auto-greeting. localStorage for dismiss state.

### L5

Status: current

Question: Where should the neural network visualization live and what interaction style?

Recommended Answer:
- Homepage hero background — nodes and edges behind name/title.
- Mouse-reactive — nodes drift toward cursor, ambient and decorative.
- No labels, no clicks. Pure visual "wow" signal.
- Canvas/SVG with `requestAnimationFrame`, ~40–50 nodes on desktop.

Answer: y

Decision: Canvas animation as hero background. Mouse-reactive force-directed graph with ~40–50 nodes. Ambient/decorative.

### L6

Status: current

Question: How should the server handle API calls and abuse prevention?

Recommended Answer:
- Next.js API route (`/api/chat`) calls Gemini server-side. Client never sees the key.
- No rate limiting — Gemini free tier (15K requests/day) acts as natural cap.
- API key in Vercel environment variables (`GEMINI_API_KEY`).
- API contract: `POST /api/chat` accepts `{ messages, pageContext? }`, returns `{ reply }`.

Answer: y

Decision: Next.js API route at `/api/chat`. No rate limiting. Gemini free tier as natural ceiling.

### L7

Status: current

Question: How should the chatbot and visualization behave on mobile?

Recommended Answer:
- Chatbot: Full-screen takeover when chat bubble is tapped. Standard mobile chat UX.
- Visualization: Simplified version — fewer nodes (20–25), gentle ambient drift, no mouse interaction. Use `matchMedia` or Tailwind breakpoint to swap.

Answer: y

Decision: Full-screen chat on mobile. Simplified visualization (20–25 nodes, ambient drift) on mobile.

### L8

Status: current

Question: How should conversation memory work and what goes in the system prompt?

Recommended Answer:
- localStorage for conversation memory. Chat persists across page refreshes. Clear conversation = new session.
- System prompt auto-built from project data at runtime. Includes: identity, skills, project summaries, experience, services, behavioral rules.
- When projects are added to mock data/Supabase, chatbot learns automatically.

Answer: y

Decision: localStorage for memory. System prompt auto-injected from project data. Behavioral rules: be helpful, stay on-topic, redirect off-topic, never fabricate projects.
