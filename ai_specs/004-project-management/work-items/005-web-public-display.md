## What to build

Public-facing project display: fetch published projects and show them as cards on the homepage and `/projects` page, plus a detail page at `/projects/[slug]` with full markdown description, image, tech tags, links, and YouTube embed.

## Required context

- Requires WI1 (Data Model & DAL) — `getPublishedProjects()` and `getProjectBySlug()` must exist
- Web app is at `web/src/`
- Homepage stub exists at `web/src/app/page.tsx` — currently has hardcoded placeholder cards
- `/projects` stub exists at `web/src/app/projects/page.tsx`
- `/projects/[slug]` stub exists at `web/src/app/projects/[slug]/page.tsx`
- Components should live in `web/src/features/projects/components/`
- Markdown rendering uses `react-markdown` (may need to install)
- YouTube embed via iframe when `youtube_url` is provided
- `thumbnail_url` is the source of truth for the project image
- Projects ordered by `created_at` descending (newest first)

## Acceptance criteria

- [ ] Homepage "Featured work" section fetches published projects and displays as cards
- [ ] Project card shows: thumbnail image, title, brief description (first ~100 chars)
- [ ] Project cards link to `/projects/[slug]` detail page
- [ ] `/projects` page lists all published projects as cards (newest first)
- [ ] `/projects/[slug]` detail page shows: title, full image, full markdown description (rendered), tech tags, links (live demo, GitHub), YouTube embed
- [ ] YouTube embed renders as iframe when `youtube_url` is provided
- [ ] YouTube embed not shown when `youtube_url` is null
- [ ] Links section only shows links that are not null
- [ ] Markdown description rendered correctly (headings, lists, code blocks, links)
- [ ] Back button/link from detail page to `/projects`
- [ ] 404 page shown for non-existent slugs
- [ ] Loading state shown while fetching projects
- [ ] Empty state shown when no published projects exist
- [ ] Unit tests for markdown rendering pass
- [ ] Component tests for project card, project detail pass
- [ ] E2E test for public journey (homepage → click project → view detail → back to list) passes

## Covers

- User Stories: 9, 10, 11
- Requirements: 25-29
- Interview Ledger: L8, L10, L11

## Blocked by

WI1 (Data Model & DAL Updates)
