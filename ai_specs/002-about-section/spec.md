---
type: Spec
title: Homepage About Section
---

## Problem

The homepage moves from a brief Hero introduction directly into Skills, leaving visitors without a concise account of Inam's current position, completed education, practical AI/ML direction, or a clear path from that profile to work and contact information.

## Proposed Outcome

Add a responsive, text-first About section between Hero and Skills. It will give HR professionals, freelance clients, and fellow developers a factual professional snapshot, show Inam's current role without turning it into a permanent identity, and direct visitors to existing Projects and Contact sections. [L1, L3, L5, L6]

## User Stories

1. As an HR professional, I can quickly understand Inam's current AI/ML position, completed degree, and practical direction without seeing private location details. [L2, L3, L4, L8]
2. As a freelance client, I can assess the types of practical AI systems Inam is building and continue to Projects or Contact from the About section. [L4, L5]
3. As a fellow developer, I can navigate directly to the About section from either the desktop or mobile primary navigation. [L7]

## Requirements

1. Render an About section with `id="about"` immediately after `#hero` and before the existing `#skills` section. The current homepage sections after Skills are `#projects`, `#experience`, and `#contact`. All three remain in their current positions. [L1]
2. Use the visible section label "About me" and a concise, professional heading chosen to match the existing direct, practical portfolio voice. The copy must not claim seniority, production outcomes, client work, metrics, or credentials not supplied by Inam. [L4]
3. The biography must communicate all of the following facts in natural prose:
   - Inam is a Computer Systems Engineering graduate of Mirpur University of Science and Technology.
   - He is currently an AI/ML Engineer Trainee at National Telecommunication Corporation (NTC).
   - He is building practical AI systems through intelligent automation, predictive models, computer vision, and LLM/RAG integrations, with an emphasis on useful, reliable workflows. [L2, L4, L8]
4. Do not display Islamabad or any other location. Do not promote "AI/ML Engineer Trainee" as the Hero title, metadata title, permanent personal brand, or a replacement for the existing "AI/ML Engineer" title. It is only a time-bound current-role fact. [L2, L3]
5. Use a mobile-first text-first layout: one biography column and one compact facts panel that stacks cleanly on small viewports and becomes two columns on larger viewports. Use a bordered list or key-value row pattern consistent with the existing Experience section's `border-t` list style. Do not add a headshot, decorative illustration, remote media request, or image asset. [L6]
6. The facts panel must expose these labels and values:
   - "Current role": "AI/ML Engineer Trainee"
   - "Organization": "National Telecommunication Corporation (NTC)"
   - "Education": "Computer Systems Engineering graduate"
   - "University": "Mirpur University of Science and Technology" [L2, L3, L8]
7. Include exactly two visible About CTAs:
   - "View Projects" with `href="#projects"` — primary CTA, filled accent style (`bg-accent`)
   - "Get in touch" with `href="#contact"` — secondary CTA, outlined style (`border border-line`)
   They must retain normal anchor behavior and must not introduce a resume download, social links, a booking tool, or a form in the About section. [L5]
8. Add "About" with `href="#about"` between "Home" and "Projects" in the shared desktop and mobile primary navigation by adding an entry to the existing `NAV_LINKS` array in `site-header.tsx`. Do not extract navigation data to a separate file. The existing smooth-scroll behavior must apply; selecting it in the mobile menu must close that menu. [L7]
9. Preserve existing color-token usage, panel radii, responsive spacing, semantic heading hierarchy, and accessible link names. The About section component itself has only static local content and requires no client-side loading, empty, error, offline, retry, or concurrent-action states. Route-level `loading.tsx` and `error.tsx` remain unchanged. [L1, L5, L6]

## Technical Decisions

- The `web` application uses Next.js 16.2.11 App Router. Keep the homepage and static About content server-rendered; only the existing `SiteHeader` remains a Client Component because it manages scroll and mobile-menu state.
- Follow the project architecture: keep `app/page.tsx` thin and put any new homepage component under `web/src/features/home/components/`. No Server Action, Route Handler, Supabase access, mock-data change, or persistence is needed.
- Cache Components are not enabled in `web/next.config.ts`; do not use `'use cache'`, `cacheLife`, or cache tags for static local copy.
- Use Tailwind CSS v4 utilities backed by the existing CSS custom-property theme tokens in `app/globals.css`; do not hardcode new color classes or create a Tailwind configuration file.
- The project is single-locale. Preserve `lang="en"`; no i18n routing or translation layer is in scope.
- Primary navigation continues using existing hash anchors. The header's current close-on-link behavior is the test seam for the new mobile About link.
- If `web/playwright.config.ts` does not exist, create it with `baseURL: 'http://localhost:3010'` and a `webServer` block pointing to `pnpm dev` in the `web/` directory before writing E2E tests.

## Testing Strategy

- Follow a red-green-refactor cycle. Add a focused unit test for the exported static About facts/content model if one is introduced; otherwise add a small pure helper only when it has meaningful behavior to test. Do not invent business logic merely to satisfy a test count.
- Add a React Testing Library component test for the About component covering its heading, required facts, exact CTAs and hrefs, and the absence of image elements and location copy.
- Extend `site-header.test.tsx` to verify that the new About link has `href="#about"` and that selecting it from the open mobile menu closes the menu.
- Add a Playwright happy-path test in `web/tests/` for loading the homepage, following the visible About navigation link, confirming the About heading and both CTAs, and confirming the Projects CTA reaches the existing Projects section. Use `getByRole` or `getByText` selectors; add `data-testid` only if accessible selectors cannot distinguish an element.
- Use no network mocks because the section has no external dependency. Run the application test commands defined in the root workspace: `pnpm test:run` and `pnpm test:e2e`.

## Out of Scope

- Headshots, illustrations, image uploads, and other About media.
- Location, dates, resume downloads, social links, booking tools, or an embedded contact form.
- Changes to the Hero title, page metadata, Supabase schema, mock data, Server Actions, or contact submission.
- Claims of senior-level expertise, completed client projects, or quantified outcomes not supplied by Inam.

## Notes

- Current homepage copy already identifies Inam as an "AI/ML Engineer." The new current-role fact must coexist with that identity rather than replacing it. [L3]
