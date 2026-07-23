---
type: Work Item
title: Monorepo Setup
parent: ../spec.md
---

## What to build
Set up pnpm workspaces, Turborepo, and directory structure (web/, admin/, packages/). Initialize Next.js app in web/ with Tailwind CSS, Inter font, and custom theme.

## Required context
- Monorepo structure: web/, admin/, packages/
- Use pnpm with workspaces, Turborepo for build orchestration
- Tailwind CSS for styling, with custom color palette and typography
- Next.js App Router with app/ directory structure
- Responsive design: mobile-first approach with Tailwind breakpoints

## Acceptance criteria
- [x] pnpm workspaces configured with root package.json
- [x] Turborepo configured for build orchestration
- [x] Directory structure created: web/, admin/, packages/
- [x] Next.js app initialized in web/ with App Router
- [x] Tailwind CSS installed and configured with custom theme
- [x] Space Grotesk font family added and configured
- [x] Custom charcoal and warm-yellow color palette defined
- [x] Basic layout and page structure working

## Covers
- User Stories: 7
- Requirements: 29-33
- Testing Strategy: Unit tests for utility functions, Component tests for interactive elements, E2E tests for critical user journeys
- Interview Ledger: L27, L28, L44, L51, L58

## Blocked by
None - ready to start
