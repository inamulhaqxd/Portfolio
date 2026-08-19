## What to build

Admin project form for creating and editing projects, with image upload to Supabase Storage, markdown description with preview, slug generation, form validation, and error handling.

## Required context

- Requires WI1 (Data Model & DAL) — `createProject()`, `updateProject()`, `getProjectById()` must exist
- Route stubs exist: `admin/src/app/projects/new/page.tsx` and `admin/src/app/projects/[id]/edit/page.tsx`
- Components should live in `admin/src/features/projects/components/`
- Server actions for create/update should live in `admin/src/features/projects/`
- Image upload goes to Supabase Storage bucket `project-images`
- `thumbnail_url` is the source of truth for the single image
- Slug auto-generates from title as user types (for new projects), editable afterward
- Markdown preview uses `react-markdown` or similar

## Acceptance criteria

- [ ] Create form at `/projects/new` with all fields: title, slug, description, tech_tags, image, live_demo_url, github_url, youtube_url
- [ ] Edit form at `/projects/:id/edit` loads existing project data into form
- [ ] Title field: text input, required
- [ ] Slug field: auto-generated from title as user types (new projects only), editable, required
- [ ] Description field: textarea with markdown preview toggle, required
- [ ] Tech tags field: comma-separated text input, converts to array on save, required
- [ ] Image field: file input, required for new projects, optional on edit (keeps existing image if not changed)
- [ ] Image preview shown after upload
- [ ] URL fields: live_demo_url, github_url, youtube_url — all optional, validated URL format
- [ ] On save (create): project created with `status: 'draft'`, redirect to `/projects`
- [ ] On save (update): project updated, redirect to `/projects`
- [ ] Form validation: required fields enforced, URLs validated, errors shown inline
- [ ] Slug conflict: if auto-generated slug exists, append number (e.g., `rice-crop-detection-2`)
- [ ] Image upload failure: show error message below upload area with retry option
- [ ] Form submission failure: toast notification for server errors
- [ ] Network/unreachable Supabase: "Something went wrong" message with retry button
- [ ] Unit tests for slug generation, form validation pass
- [ ] Component tests for form states (loading, error, success, validation errors) pass
- [ ] E2E test for create journey (fill form → upload image → save → verify in list) passes
- [ ] E2E test for edit journey (open edit → change fields → save → verify changes) passes

## Covers

- User Stories: 3, 4, 5
- Requirements: 8-14, 21-24
- Interview Ledger: L2, L3, L4, L7

## Blocked by

WI1 (Data Model & DAL Updates)
