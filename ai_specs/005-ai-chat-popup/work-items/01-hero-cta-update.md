## What to build

Update the hero section CTAs: replace "View Projects" with "Ask AI" and "Contact Me" with "View Projects". "Ask AI" opens the AI chat overlay (built in WI-02). "View Projects" smooth-scrolls to the projects section.

## Required context

- Hero section is in `web/src/features/home/components/` or `web/src/app/page.tsx`
- Existing CTA buttons use `RippleButton` component
- Smooth scroll to sections uses `scrollIntoView({ behavior: 'smooth' })`
- Contact section remains below the hero, accessible via navbar link

## Acceptance criteria

- [ ] Hero has two CTA buttons: "Ask AI" (left) and "View Projects" (right)
- [ ] "Ask AI" button triggers the AI chat overlay open state (passed as prop or via context)
- [ ] "View Projects" button smooth-scrolls to the projects section
- [ ] "Contact Me" button is removed from the hero
- [ ] Contact section remains accessible via navbar "Contact" link
- [ ] Buttons match existing styling (glassmorphism, responsive)
- [ ] Component test: button renders with correct labels
- [ ] E2E test: click "View Projects" scrolls to projects section

## Covers

- User Stories: 1
- Requirements: 1-4

## Blocked by

None — ready to start
