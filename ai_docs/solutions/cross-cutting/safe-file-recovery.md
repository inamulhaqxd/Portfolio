---
title: Safe File Recovery and Cleanup Discipline
date: 2026-08-17
work_type: bugfix
tags: [git, recovery, file-safety, workflow]
confidence: high
references:
  - .agents/rules/project.md
  - ai_specs/001-homepage-ui-mockup/
  - web/package.json
---

## Summary

Recovered the deleted `ai_specs/001-homepage-ui-mockup/` specification and work-item files from Git, then restored the original tracked public-app source, tests, and assets that had been overwritten during a scaffold attempt. The public app port change to `3010` was reapplied after recovery.

## Reusable Insights

- Do not treat existing project folders as stale based on a quick directory inspection. Confirm ownership and purpose before cleanup.
- Before any deletion or bulk replacement, run `git status --short` and list the exact files targeted. Obtain explicit approval for destructive changes.
- Recovery should be path-scoped: use Git to restore only confirmed deleted or overwritten paths, then verify with file listing and `git diff --name-only -- <paths>`.
- Keep intentional changes separate from recovery. Here, the original web app was restored first; only the requested `web/package.json` port change was reapplied afterward.

## Validation

- Restored 9 files in `ai_specs/001-homepage-ui-mockup/`.
- Restored the original homepage/header tests and public assets under `web/`.
- Confirmed the public app responds at `http://localhost:3010`.

## Pitfall

`Remove-Item -Recurse -Force` is irreversible outside version control. Do not use it for inferred cleanup. If a directory is suspected to be obsolete, ask before deleting it.
