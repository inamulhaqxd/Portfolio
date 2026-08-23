## What to build

Create the `knowledge_base` table in Supabase and add DAL functions for future admin CRUD. The AI chat reads from this table when responding. Admin interface is deferred.

## Required context

- Supabase migrations in `supabase/migrations/`
- DAL functions in `packages/dal/`
- Types in `packages/types/`
- AI chat reads from this table in WI-03 (system prompt context)

## Acceptance criteria

- [ ] Migration: `knowledge_base` table created with columns:
  - `id: uuid` (primary key, default `gen_random_uuid()`)
  - `question: text` (not null)
  - `answer: text` (not null)
  - `category: text` (default `'general'`)
  - `created_at: timestamptz` (default `now()`)
  - `updated_at: timestamptz` (default `now()`)
- [ ] `KnowledgeBase` type added to `packages/types/`
- [ ] `Database` type updated with `knowledge_base` table
- [ ] DAL functions in `packages/dal/knowledge-base.ts`:
  - `getKnowledgeBaseEntries()` — returns all entries
  - `getKnowledgeBaseByCategory(category)` — returns entries by category
  - `createKnowledgeBaseEntry(entry)` — insert new entry
  - `updateKnowledgeBaseEntry(id, updates)` — update entry
  - `deleteKnowledgeBaseEntry(id)` — delete entry
- [ ] Unit tests for DAL functions
- [ ] AI system prompt includes knowledge base entries in context

## Covers

- Requirements: 23-26

## Blocked by

None — can create data model independently
