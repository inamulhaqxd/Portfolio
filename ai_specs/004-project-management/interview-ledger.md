---
type: Interview Ledger
parent: spec.md
---

## Records

### L1

Status: current

Question: Should we implement the full auth flow (login page + session protection) as part of this work, or skip auth for now?

Recommended Answer: Implement auth as part of this work. The DAL and proxy infrastructure already exists — we just need a login page and to wire up the session check.

Answer: y

Decision: Implement login page + session protection as part of this work.

Reason: Prevents an unprotected admin panel from going live.

### L2

Status: current

Question: For image uploads, what's your preferred upload experience?

Recommended Answer: Single image upload to Supabase Storage bucket `project-images`. Upload images immediately on drop, store the resulting public URL.

Answer: single picture

Decision: Single image per project, keep existing schema (`images[]` + `thumbnail_url`), single image upload to Supabase Storage.

### L3

Status: current

Question: For the project description — rich text or markdown?

Recommended Answer: Markdown. Simpler to implement, no extra editor dependency, and you can use a basic `<textarea>` with a preview tab.

Answer: go with your recommendation

Decision: Markdown format for project descriptions, textarea with preview.

### L4

Status: current

Question: Should the slug be auto-generated from the title or editable manually?

Recommended Answer: Auto-generate from title (e.g., "Rice Crop Disease Detection" → `rice-crop-detection`), but make it editable.

Answer: recommended

Decision: Auto-generate slug from title, editable.

### L5

Status: current

Question: When you delete a project, what should happen to the uploaded image in Supabase Storage?

Recommended Answer: Delete the image from storage too. Show a confirmation dialog before proceeding.

Answer: recommended

Decision: Delete image from storage on project delete, confirmation dialog required.

### L6

Status: current

Question: Should projects be visible on the public site immediately after saving, or do you want a draft/published toggle?

Recommended Answer: No draft status — projects appear on the public site as soon as they're saved.

Answer: publish button

Decision: Projects saved as draft by default; "Publish" button makes them visible on the public site.

### L7

Status: current

Question: Which project fields should be required when creating/editing a project?

Recommended Answer: Required: `title`, `description`, `tech_tags`, `image`. Optional: `live_demo_url`, `github_url`, `youtube_url`.

Answer: recommended

Decision: Required fields: `title`, `description`, `tech_tags`, `image`. Optional: `live_demo_url`, `github_url`, `youtube_url`.

### L8

Status: current

Question: On the public projects page, how should projects be ordered?

Recommended Answer: Newest first (by `created_at` descending).

Answer: recommended

Decision: Order projects by `created_at` descending (newest first).
