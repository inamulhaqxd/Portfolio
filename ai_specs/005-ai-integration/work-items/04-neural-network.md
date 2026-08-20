---
type: Work Item
title: Neural Network Visualization
parent: ../spec.md
---

## What to build

Build the ambient canvas animation for the homepage hero — a force-directed graph with mouse-reactive nodes.

### Files to create

- `web/src/features/ai/components/neural-network.tsx` — canvas component (`'use client'`).
- `web/src/features/ai/lib/neural-network-engine.ts` — pure logic (node positions, forces, edges, resize). Separated for testability.

### Implementation details

**NeuralNetwork component:**
- `'use client'` component, rendered only on the homepage.
- Canvas element with `absolute inset-0 -z-10` to sit behind hero text.
- Container uses `ResizeObserver` to track size changes.
- On mount: initialize engine, start `requestAnimationFrame` loop.
- On `visibilitychange` to hidden: call `cancelAnimationFrame`.
- On `visibilitychange` to visible: restart loop.
- On unmount: cancel animation, disconnect ResizeObserver, remove event listeners.
- Detect mobile via `window.matchMedia('(hover: none)')` — use simplified config.

**Engine (neural-network-engine.ts):**
- Pure functions, no React dependency.
- `createNodes(count, width, height)` — returns `Array<{ x, y, vx, vy, radius, color }>`.
- `updatePositions(nodes, mousePos, deltaTime)` — apply drift toward mouse within radius, with distance-based force falloff.
- `drawFrame(ctx, nodes, edges, width, height)` — clear canvas, draw edges (lines with distance-based opacity), draw nodes (circles with brand colors).
- `checkProximity(nodeA, nodeB, threshold)` — determines if two nodes should have an edge.
- Brand colors: read from CSS custom properties or use hardcoded palette matching the site's accent colors.

**Desktop config:**
- 40-50 nodes.
- Mouse interaction: nodes drift toward cursor within a radius. Force decreases with distance.
- Edge threshold: connect nodes within ~150px. Line opacity fades with distance.

**Mobile config (hover: none):**
- 20-25 nodes.
- No mouse interaction.
- Gentle ambient drift animation (sine-wave based movement).

**Performance:**
- `requestAnimationFrame` loop. Pause when tab hidden.
- Canvas resizes via `ResizeObserver` on container, not `window.resize`.
- Must maintain 30fps on mid-range devices.

**Graceful degradation:**
- If Canvas API is not supported, render nothing (component returns null).

## Required context

- Homepage: `web/src/app/page.tsx` — the visualization goes inside the hero `<section id="hero">`.
- Hero structure: contains a grid dot-pattern background div and a `.stagger` div with text content. Canvas should be a sibling with `absolute inset-0 -z-10`.
- Styling: Tailwind CSS. Node colors should match the site's accent/brand palette.
- Project rules: `features/` for domain code. Component lives in `features/ai/components/`.

## Acceptance criteria

- [x] Canvas element renders on the homepage hero with `absolute inset-0 -z-10`
- [x] ~40-50 nodes appear on desktop, ~20-25 on mobile
- [x] Nodes have different brand-palette colors
- [x] Lines connect nearby nodes with distance-based opacity
- [x] On desktop, moving mouse causes nodes to drift toward cursor
- [x] On mobile (`hover: none`), nodes drift gently with no mouse interaction
- [x] Animation pauses when browser tab is hidden (`visibilitychange`)
- [x] Animation resumes when browser tab becomes visible
- [x] Canvas resizes correctly on window resize (via ResizeObserver)
- [x] Animation loop is cleaned up on component unmount (no memory leak)
- [x] Canvas does NOT render on non-homepage routes
- [x] If Canvas is unsupported, hero renders normally without visualization
- [x] No clickable nodes, no labels, no functional data — purely decorative

## Covers

- User Stories: 12-15
- Requirements: 23-32, 34, 37
- Interview Ledger: L5, L7
- Testing Strategy: E2E tests — canvas renders on homepage, does not render elsewhere, animation pauses on visibility change

## Blocked by

None — ready to start (independent of chatbot track)
