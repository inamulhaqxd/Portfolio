## What to build

Add E2E tests covering the critical user journey: hero click → chat opens → type question → AI responds → close chat.

## Required context

- Playwright tests in `web/tests/`
- Existing E2E patterns: `web/tests/*.spec.ts`
- AI chat overlay from WI-02
- Chat behavior from WI-04
- Test command: `pnpm test:e2e`

## Acceptance criteria

- [ ] E2E test: click "Ask AI" button → chat overlay opens
- [ ] E2E test: suggested questions chips are visible
- [ ] E2E test: click a chip → message appears in chat
- [ ] E2E test: type a question → AI responds (mock Gemini API)
- [ ] E2E test: close chat via X button → overlay closes
- [ ] E2E test: close chat via backdrop click → overlay closes
- [ ] E2E test: empty input → send button disabled
- [ ] Tests use stable selectors (getByRole, getByLabel, data-testid)
- [ ] Tests mock Gemini API at boundary

## Covers

- User Stories: 1, 2, 3, 4
- Requirements: 1-4, 5-10, 11-17

## Blocked by

WI-01, WI-02, WI-03, WI-04
