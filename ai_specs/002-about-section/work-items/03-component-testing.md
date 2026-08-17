---
type: Work Item
title: Component Testing
parent: ../spec.md
---

## What to build
Add unit and component tests for the About section and extend the existing site‑header tests to cover the new About navigation link.

## Required context
- The project uses Vitest + React Testing Library for unit/component tests.
- Existing site‑header test is at `web/src/features/home/components/site-header.test.tsx`.
- The About component will be a Server Component; test its exported static content if a pure helper is introduced.
- The site‑header test already mocks scroll events and verifies mobile nav open/close.

## Acceptance criteria
- [ ] A focused unit test exists for any exported static About facts/content model (if one is introduced).
- [ ] A React Testing Library component test for the About component covers: heading, required facts, exact CTAs and `href`s, and absence of image elements and location copy.
- [ ] `site-header.test.tsx` extended to verify the new About link has `href="#about"` and that selecting it from an open mobile menu closes the menu.
- [ ] All tests pass with `pnpm test:run`.
- [ ] No network mocks are used (section has no external dependency).

## Covers
- Testing Strategy: 1, 2, 3

## Blocked by
1 - About Section Component
2 - Navigation Link Update