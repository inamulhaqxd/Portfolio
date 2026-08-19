## What to build

Admin project list page at `/projects` showing all projects (draft + published) with status badges, action buttons (Edit, Publish/Unpublish, Delete), empty state, and delete with confirmation dialog and storage cleanup.

## Required context

- Requires WI1 (Data Model & DAL) — `getAllProjects()` and `publishProject()`, `unpublishProject()`, `deleteProject()` must exist
- Route stub does not exist yet — needs to be created at `admin/src/app/projects/page.tsx`
- Components should live in `admin/src/features/projects/components/`
- Server actions for publish/unpublish/delete should live in `admin/src/features/projects/`
- Delete must also remove image from Supabase Storage `project-images` bucket

## Acceptance criteria

- [ ] `/projects` route shows all projects (draft + published) in a table or card grid
- [ ] Each entry shows: title, status badge (Draft/Published), created date
- [ ] Each entry has action buttons: Edit (link to `/projects/:id/edit`), Publish/Unpublish toggle, Delete
- [ ] Publish button appears on draft projects, sets status to `published`
- [ ] Unpublish button appears on published projects, sets status to `draft`
- [ ] Status change takes effect immediately (no confirmation needed)
- [ ] Delete button shows confirmation dialog: "Delete '{title}'? This cannot be undone."
- [ ] On confirm: delete project from database AND delete image from Supabase Storage
- [ ] Empty state: "No projects yet. Create your first project." with link to `/projects/new`
- [ ] Loading state shown while fetching projects
- [ ] Error state shown if fetch fails
- [ ] "Create New Project" button visible on project list page
- [ ] Unit tests for server actions (publish, unpublish, delete) pass
- [ ] Component tests for project list (loading, empty, populated, delete confirmation) pass
- [ ] E2E test for project list journey (view list → publish → unpublish → delete with confirmation) passes

## Covers

- User Stories: 2, 6, 7, 8
- Requirements: 5-7, 15-20
- Interview Ledger: L5, L6

## Blocked by

WI1 (Data Model & DAL Updates)
