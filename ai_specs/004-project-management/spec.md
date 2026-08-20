---
type: Spec
title: Project Management — Public Display
---

## Problem

The portfolio website needs a dynamic project management system so published projects display on the public site. Currently, the homepage has hardcoded placeholder cards and no project data flows from Supabase to the public site.

**Note**: Admin portal (login, CRUD, image upload) is deferred to a later phase. This Spec covers only the public-facing project display.

## Proposed Outcome

A public project display feature covering:
- Web app: fetch published projects, display on homepage grid and `/projects` page, detail page with image + markdown description + YouTube embed
- Shared: DAL functions for published projects

## User Stories

### Visitor Stories

1. As a visitor, I can see published projects displayed as cards on the homepage (newest first).
2. As a visitor, I can navigate to `/projects` to see all published projects.
3. As a visitor, I can click a project card to view a detail page with full description, image, and embedded YouTube video.

## Requirements

### Public Project Display

1. Homepage: fetch published projects, display as cards in "Featured work" section (newest first). Order by `created_at` descending — editing does not change position. [L8]
2. `/projects` page: list all published projects as cards (newest first). Page heading: "All Case Studies". Back link to home uses Lucide `ArrowLeft` icon (no text). [L8, L10, L12]
3. Project card shows: thumbnail image, title, brief description (first ~100 chars of description). [L10]
4. `/projects/[slug]` detail page: case study layout with structured sections. Back link to `/projects` uses Lucide `ArrowLeft` icon (no text). [L11, L12]
5. YouTube embed via iframe when `youtube_url` is provided. Accept `youtube.com/watch?v=`, `youtu.be/`, and `youtube.com/embed/` formats. Extract video ID for embedding. [L11]

### Case Study Format (Detail Page)

6. Detail page sections: "About the project" and "How it was built". [L12]
7. Each section has a heading + paragraph (3-5 sentences, specific and concrete). [L12]
8. Tech Stack section displays tags as pills (existing badge style). [L12]
9. Mock projects include dummy case study content for all 9 projects. [L12]

### Loading / Error / Empty States

6. Loading state: Show skeleton cards while fetching projects.
7. Error state: Show "Something went wrong" message with retry button if Supabase is unreachable.
8. Empty state: Show "No projects published yet" if no published projects exist.

### Data Model (Already Implemented)

9. `status: 'draft' | 'published'` field exists in `Project` type in `packages/types/project.ts`. [L6]
10. `thumbnail_url` is the source of truth for the single project image. `images` array stays in schema for compatibility but is not populated for new projects. [L2]

### DAL (Already Implemented)

11. `getPublishedProjects()` — returns only projects where `status = 'published'`, ordered by `created_at` desc. [L8]

## Technical Decisions

- **Markdown rendering**: Install `react-markdown` in `web/` for rendering project descriptions. [L3]
- **Server/Client boundaries**:
  - Public project pages (`/projects`, `/projects/[slug]`): Server Components with async data fetching
  - Project cards: Server Components (no interactivity)
- **Data source**: Fetch from Supabase via DAL functions in Server Components.

## Testing Strategy

- **Unit Tests (Vitest)**: Markdown rendering, DAL functions.
- **Component Tests (Vitest + RTL)**: Project card, project detail page.
- **E2E Tests (Playwright)**: Public project journey (homepage → /projects → /projects/[slug] detail).
- **Test Seams**: Mock Supabase client for unit/component tests.

## Out of Scope

- Admin portal (login, CRUD, image upload, publish/unpublish) — deferred to later phase
- Project categories/filtering (can be added later)
- Manual project ordering (newest first is sufficient)
- Rich text editor (Markdown is sufficient)
- Bulk operations (delete multiple, publish multiple)
- Project versioning or rollback

## Blocking Questions

(none)

## Open Questions

(none)

## Follow-Ups

- After Spec approval, create Work Items for implementation.
- Consider adding Supabase Storage bucket setup instructions.
- Admin portal Spec to be created separately when ready.

## Notes

- The `images` array field stays in the schema for compatibility but is not populated for new projects. [L2]
- Existing DAL functions (`getAllProjects`, `getProjectBySlug`, etc.) remain for future admin use. [L8]
