## What to build

Foundation layer: add `status: 'draft' | 'published'` field to the Project type and Database type, then add three new DAL functions for published-project queries and status changes.

## Required context

- Current `Project` type lives in `packages/types/project.ts`
- Current `Database` type lives in `packages/types/database.ts`
- DAL functions live in `packages/dal/projects.ts`
- `status` should be optional in the `Insert` type with database-level default `'draft'`
- `thumbnail_url` is the source of truth for the single project image; `images` array stays in schema but is not populated for new projects

## Acceptance criteria

- [ ] `Project` type includes `status: 'draft' | 'published'`
- [ ] `Database` type's `projects` table includes `status` in Row, Insert (optional), and Update types
- [ ] `getPublishedProjects()` returns only projects where `status = 'published'`, ordered by `created_at` desc
- [ ] `publishProject(id)` sets `status: 'published'` and updates `updated_at`
- [ ] `unpublishProject(id)` sets `status: 'draft'` and updates `updated_at`
- [ ] All existing DAL functions continue to work unchanged
- [ ] Unit tests for new DAL functions pass

## Covers

- User Stories: 6, 7
- Requirements: 30-36
- Interview Ledger: L6, L8

## Blocked by

None — ready to start
