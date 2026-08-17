---
type: Work Item
title: E2E Testing
parent: ../spec.md
---

## What to build
Create a Playwright configuration file (if missing) and add a happy‑path E2E test that loads the homepage, follows the About navigation link, confirms the About heading and both CTAs, and verifies the Projects CTA reaches the existing Projects section.

## Required context
- The project uses Playwright for E2E tests; config should be at `web/playwright.config.ts`.
- If `playwright.config.ts` does not exist, create it with `baseURL: 'http://localhost:3010'` and a `webServer` block pointing to `pnpm dev` in the `web/` directory.
- E2E test files go in `web/tests/`.
- Use `getByRole` or `getByText` selectors; add `data-testid` only if accessible selectors cannot distinguish an element.
- No network mocks needed.

## Acceptance criteria
- [ ] `web/playwright.config.ts` exists with correct `baseURL` and `webServer` configuration.
- [ ] A Playwright test in `web/tests/` loads the homepage.
- [ ] The test follows the visible About navigation link.
- [ ] The test confirms the About heading is visible.
- [ ] The test confirms both CTAs ("View Projects" and "Get in touch") are visible with correct `href` attributes.
- [ ] The test clicks the "View Projects" CTA and verifies the page scrolls to the existing Projects section (`#projects`).
- [ ] The test passes with `pnpm test:e2e`.

## Covers
- Testing Strategy: 4

## Blocked by
1 - About Section Component
2 - Navigation Link Update