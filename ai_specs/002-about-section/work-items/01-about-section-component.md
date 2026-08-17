---
type: Work Item
title: About Section Component
parent: ../spec.md
---

## What to build
Create a responsive About section component with biography text, facts panel (using border‑t list style), and two CTAs ("View Projects" and "Get in touch"). Insert `<section id="about">` between the existing `#hero` and `#skills` sections in `page.tsx`.

## Required context
- The component must be placed in `web/src/features/home/components/about-section.tsx` (Server Component).
- Use the existing CSS custom‑property theme tokens; do not hardcode colors.
- Facts panel must follow the `border-t border-line py‑6` pattern used in the Experience section.
- Biography must include all required facts (education, current role, AI/ML focus) without mentioning location.
- CTAs must be anchor links with `href="#projects"` and `href="#contact"`; primary CTA uses `bg-accent`, secondary uses `border border-line`.
- No client‑side states, images, or additional interactive elements.

## Acceptance criteria
- [ ] `about-section.tsx` created with biography, facts panel, and two CTAs.
- [ ] `page.tsx` updated to render `<section id="about">` between `#hero` and `#skills`.
- [ ] Facts panel includes all four key‑value pairs (Current role, Organization, Education, University).
- [ ] Biography copy matches spec requirement 3 and does not mention location.
- [ ] CTAs have correct `href`, styling, and are the only two visible CTAs.
- [ ] Component uses only static local content; no client‑side loading or interactive states.
- [ ] Existing color tokens, panel radii, responsive spacing, and heading hierarchy preserved.

## Covers
- User Stories: 1, 2
- Requirements: 1‑7
- Testing Strategy: 1, 2
- Interview Ledger: L1‑L6, L8

## Blocked by
None - ready to start