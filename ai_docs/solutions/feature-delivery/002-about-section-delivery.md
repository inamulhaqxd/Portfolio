---
title: About Section Feature Delivery
date: 2026-08-18
work_type: feature
tags: [nextjs, react, testing, vitest, playwright, tailwind]
confidence: high
references:
  - ai_specs/002-about-section/spec.md
  - web/src/features/home/components/about-section.tsx
  - web/src/features/home/components/about-section.test.tsx
  - web/src/features/home/components/site-header.test.tsx
  - web/playwright.config.ts
  - web/tests/about-section.spec.ts
---

## Summary

Delivered a complete About section feature for a Next.js portfolio site: Server Component with biography/facts/CTAs, navigation link update, Vitest component tests, and Playwright E2E test setup.

## Reusable Insights

### Test Cleanup is Critical in Vitest

Vitest does not automatically clean up DOM between test files. Without explicit cleanup, elements from previous renders leak into later tests, causing `Found multiple elements` errors.

**Fix:** Add to `src/test/setup.ts`:
```ts
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
afterEach(() => { cleanup(); });
```

### Next.js Link onClick Does Not Fire in jsdom

Clicking a Next.js `<Link>` component via `userEvent.click()` or `fireEvent.click()` in jsdom does not trigger the `onClick` callback. The click event does not propagate through React's synthetic event system in the test environment.

**Workaround:** Test that the link exists with correct `href` and `onClick` prop rather than testing the resulting state change. Alternatively, test the behavior via Playwright E2E where the real browser handles click events.

### Vitest Config Needs Playwright Exclusion

When Playwright tests live in `web/tests/`, Vitest may attempt to run them. Add explicit exclusion:
```ts
test: {
  exclude: ["tests/**", "node_modules/**"],
}
```

### Lockfile Drift Causes Install Failures

When `web/package.json` dependencies are updated but root lockfile is not, `pnpm install --frozen-lockfile` fails. Run `pnpm install` without `--frozen-lockfile` first, then commit the updated lockfile.

### Layout Pattern: Two-Column Grid with Aligned Content

For sections with heading + content on one side and a facts/key-value panel on the other, use the same grid pattern as the Experience section:
```tsx
<div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
  <div>{/* heading + prose + CTAs */}</div>
  <div className="space-y-0">{/* facts with border-t pattern */}</div>
</div>
```
This ensures the facts panel starts at the same vertical level as the heading, not the prose.

### Server Component Testing Strategy

For static Server Components with no client-side state:
- Test exported static content if a pure helper is introduced
- Use React Testing Library to verify heading, facts, CTAs, hrefs
- Verify absence of unwanted elements (images, location text)
- No network mocks needed

### Work Item Dependency Chain

When implementing multiple dependent work items sequentially:
1. Component first (creates the DOM target)
2. Navigation second (references the section ID)
3. Unit/component tests third (tests both)
4. E2E tests last (requires running app)

This order prevents test failures from missing targets.
