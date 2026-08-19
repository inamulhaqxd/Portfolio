## What to build

Replace the Skills section with 17 technology cards in a 6-column grid. Each card shows a SimpleIcon logo and technology name. No descriptions, no numbering.

## Required context

- Current implementation: `web/src/app/page.tsx` lines 52-101
- Reference design: Card layout with circular icon container + technology name
- Icons: Use SimpleIcons for all technologies
- Grid: 6 columns desktop, 4 columns tablet, 3 columns small tablet, 2 columns mobile
- Card design: Rounded panel, circular icon container, technology name

## Acceptance criteria

- [x] Technology array contains exactly 17 items in the specified order
- [x] Each technology has a SimpleIcon
- [x] No descriptions or numbering — just icon + name
- [x] Grid uses 6 columns on desktop (≥1024px), 4 columns on tablet (≥768px), 3 columns on small tablet (≥640px), 2 columns on mobile
- [x] No layout overflow or truncation at any breakpoint
- [x] Card design: rounded panel, circular icon container, hover effect

## Covers

- User Stories: 1, 2
- Requirements: 1-8
- Interview Ledger: L1, L2, L3, L4 (no descriptions), L5 (5-column layout)

## Blocked by

None - ready to start
