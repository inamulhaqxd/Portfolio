---
type: Work Item
title: Navigation Link Update
parent: ../spec.md
---

## What to build
Add an "About" link to the primary navigation (desktop and mobile) by inserting `{ href: "#about", label: "About" }` between "Home" and "Projects" in the `NAV_LINKS` array in `site-header.tsx`. Ensure the mobile menu closes when the link is selected.

## Required context
- The header component is a Client Component at `web/src/features/home/components/site-header.tsx`.
- The existing `NAV_LINKS` array is defined at lines 6‑11.
- Mobile menu close behavior is already implemented via `closeMobile` callback passed to each mobile nav link.
- No changes to scroll detection or other header logic are needed.

## Acceptance criteria
- [ ] `NAV_LINKS` array includes `{ href: "#about", label: "About" }` at index 1 (between Home and Projects).
- [ ] Desktop navigation renders the About link with correct `href`.
- [ ] Mobile navigation renders the About link with correct `href`.
- [ ] Selecting the About link from the open mobile menu closes the menu.
- [ ] No other navigation items are removed or reordered.

## Covers
- User Story: 3
- Requirement: 8
- Interview Ledger: L7

## Blocked by
1 - About Section Component (needs the `#about` section ID)