---
type: Spec
title: Skills Section Technology List Update
---

## Problem

The current Skills section displays 8 technologies. The user wants to expand this to 17 technologies to better represent their AI/ML engineering skill set, including databases, infrastructure tools, AI/ML frameworks, and development tools.

## Proposed Outcome

Update the Skills section technology list from 8 to 17 items, maintaining the flat list format without categorical grouping. The section will display technologies as icon cards with a circular icon container (SimpleIcon or fallback letter) and technology name.

## User Stories

1. As a visitor, I can see a comprehensive list of 17 technologies that Inam works with, displayed as a flat grid without categorical grouping.
2. As a visitor, I can view each technology with its icon and name in a card format.

## Requirements

### Technology List

1. Display exactly 17 technologies in the following order: [L2]
   - Python
   - SQL
   - Chroma DB
   - PostgreSQL
   - Supabase
   - Firebase
   - Docker
   - Git/ GitHub
   - AI Agents
   - RAG
   - NLP
   - Computer Vision
   - LLMs
   - Kubernetes
   - Vector Database
   - Lang Chain
   - Hugging Face

2. Technologies must be displayed as a flat list without categorical grouping. [L3]

3. Each technology is displayed as a card with:
   - Circular icon container with SimpleIcon
   - Technology name

### Layout

4. Maintain the existing section structure with heading "Practical AI, from model to workflow." and subheading "What I work with"

5. Grid layout: 6 columns on desktop (≥1024px), 4 columns on tablet (≥768px), 3 columns on small tablet (≥640px), 2 columns on mobile [L5]

### Visual Design

6. Card design: rounded panels, circular icon container (size-12, bg-foreground/5), border, hover effects (translate-y-1, border-accent)

7. Maintain alternating dark/light section backgrounds consistent with homepage design

8. No descriptions — clean icon + name design only [L4]

## Technical Decisions

- Update the technology array in `web/src/app/page.tsx` within the Skills section
- Use SimpleIcons for all technology logos:
  - Python: siPython
  - SQL: siMysql
  - Chroma DB: siChromatic
  - PostgreSQL: siPostgresql
  - Supabase: siSupabase
  - Firebase: siFirebase
  - Docker: siDocker
  - Git/ GitHub: siGithub
  - AI Agents: siBraintrust
  - RAG: siElasticsearch
  - NLP: siLanguagetool
  - Computer Vision: siEyeem
  - LLMs: siOpenaigym
  - Kubernetes: siKubernetes
  - Vector Database: siMeilisearch
  - Lang Chain: siLangchain
  - Hugging Face: siHuggingface
- No changes to component structure or data models required
- No Supabase or backend changes needed - this is a static content update

## Testing Strategy

- Visual verification: Confirm 17 technologies display correctly on desktop, tablet, and mobile
- Responsive testing: Verify grid layout adapts properly (6 columns desktop, 4 tablet, 3 small tablet, 2 mobile)
- Icon verification: Confirm SimpleIcons display correctly for all technologies
- No new unit or component tests required for static content update
- Manual verification of technology order and card layout

## Out of Scope

- Changes to other homepage sections (Hero, About, Projects, Experience, Contact)
- Backend or database modifications
- New component creation
- Technology descriptions — removed for clean design [L4]
- Animation or interaction changes

## Blocking Questions

(none)

## Open Questions

(none)

## Follow-Ups

- Consider creating a separate Spec for icon refinements if needed

## Notes

- The current Skills section uses a 5-column grid on desktop
- The section is part of the homepage defined in `001-homepage-ui-mockup` Spec
- This update is a content and design change from numbered cards to icon cards
