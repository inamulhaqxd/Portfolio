---
type: Spec
title: Homepage UI Mockup
---

## Problem

Inam needs a static homepage UI mockup for his AI/ML portfolio website, built with Next.js, Tailwind CSS, and a monorepo structure. The homepage must be responsive, professional, and include specific sections with defined layouts and interactions.

## Proposed Outcome

A fully responsive, static homepage with five sections (Hero, Skills, Projects Grid, Experience/Timeline, Contact), a transparent-then-solid navbar, alternating dark/light backgrounds, and a professional color scheme. The implementation uses mock data and does not connect to Supabase.

## User Stories

1. As a visitor, I land on the homepage and see a Hero section with Inam's name, title, intro, and two CTA buttons that scroll to other sections.
2. As a visitor, I scroll to a Skills section showing a grid of AI/ML technology brand logos.
3. As a visitor, I scroll to a Projects Grid section displaying featured projects as cards with animated hover effects.
4. As a visitor, I scroll to an Experience/Timeline section showing work history and education in a vertical timeline.
5. As a visitor, I scroll to a Contact section with a form on the left and social links on the right.
6. As a visitor, I use the navbar to navigate between sections; the navbar is transparent over the Hero and becomes solid on scroll.
7. As a visitor, I see the site looks great on mobile, tablet, and desktop with appropriate typography and spacing.

## Requirements

### Hero Section

1. Displays full name "Inam ul Haq Tariq", professional title "AI/ML Engineer", and intro: "AI/ML engineer specializing in intelligent automation. I build systems that streamline workflows and boost productivity." [L6]
2. Center-aligned layout. [L8]
3. Background: special, related to AI/ML field, professional, good UI/UX (e.g., subtle neural network pattern). [L9]
4. Color scheme: dark theme with indigo accent, chosen by developer to feel like personal brand, not AI slop. [L10, L28, L44, L51, L58]
5. Two CTA buttons: "View Projects" (primary solid) and "Contact Me" (secondary outline). [L11]
6. Buttons scroll to Projects Grid and Contact sections respectively. [L7]
7. Responsive typography and spacing for mobile, tablet, desktop. [L28, L44, L51, L58]

### Navbar

8. Includes logo text "Inam". [L14, L36]
9. Links: Home, Projects, Services, Contact. (Home and Projects are sections on homepage; Services and Contact are separate pages). Services route exists as a placeholder — will show "Coming Soon" until the Services page Spec is implemented. [PRD-L18]
10. Transparent over Hero section, becomes solid on scroll. [L13, L35]
11. Responsive: hamburger menu on mobile. [L21]

### Skills Section

12. Grid of brand logos (Python, TensorFlow, PyTorch, OpenCV, LangChain, RAG, Supabase, Next.js). Use a consistent icon set (e.g., SimpleIcons). Technologies without a standard logo (e.g., RAG) use a text badge or generic icon. All icons monochrome or same style. [L19, L20, L40, L41, L54, L55]
13. 4 columns on desktop, responsive for smaller screens. [L21, L42, L56]
14. Light background (alternating with dark sections). [L22, L43, L57]

### Projects Grid Section

15. Heading: "Featured Projects". [L24, L47]
16. 3 columns on desktop, responsive. [L23, L46]
17. Cards: image on top, text below (title and brief description). [L17, L39, L53]
18. Animated hover effects (not just subtle — noticeable scale, shadow, or motion transitions). [L29, L45, L52, L59]
19. Dark background (alternating). [L22, L43, L57]
20. Data sourced from mock data (TypeScript arrays mimicking Supabase schema). [L1]

### Experience/Timeline Section

21. Vertical timeline layout. [L25, L48]
22. Static content: work experience at NTC (AI/ML Engineer Trainee) and Computer System Engineering degree specialized in AI. [L9]
23. Light background (alternating). [L22, L43, L57]

### Contact Section

24. Form on left, social links on right. [L26, L49]
25. Form fields: name, email, subject, message (all required). [PRD-L3]
26. Social links: GitHub, LinkedIn, email. [PRD-L3]
27. Dark background (alternating). [L22, L43, L57]
28. Form is static (no submission) for now; will be connected to Supabase later. [L1]

### General

29. Monorepo structure: web/, admin/, packages/. [L27, L50]
30. Use pnpm with workspaces, Turborepo for build orchestration. [PRD-L29, L30]
31. Tailwind CSS for styling, with custom color palette and typography. [L1]
32. Responsive design: mobile-first approach with Tailwind breakpoints. [L21, L28, L44, L51, L58]
33. Sections have alternating dark/light backgrounds. Dark sections (#0f172a) are an intentional departure from the parent PRD's "light/clean" global direction — used for visual rhythm and contrast between sections. [L22, L43, L57]
34. Homepage sections appear in this order from top to bottom: Hero, Skills, Projects Grid, Experience/Timeline, Contact.
35. Footer: social links (GitHub, LinkedIn, email) and copyright notice. Minimal content; no complex layout.
36. Navbar "Home" link scrolls to the top of the page (smooth scroll).

## Technical Decisions

- Use Next.js App Router with `app/` directory structure. [L1]
- Styling: Tailwind CSS with custom theme (dark background #0f172a, light background #f8fafc, accent indigo-500). [L10, L28, L44, L51, L58]
- Typography: Inter font family, responsive font sizes. [L28, L44, L51, L58]
- Mock data: TypeScript objects matching Supabase schema, located in `packages/dal/mock-data.ts`. [L1]
- Static generation: Homepage is statically generated at build time. [L1]
- No backend connections; all data is mocked. [L1]

## Testing Strategy

- Unit tests (Vitest) for utility functions (slug generation, data formatting). [PRD-L31]
- Component tests (Vitest + React Testing Library) for interactive elements (navbar, buttons, form). [PRD-L31]
- E2E tests (Playwright) for critical user journeys: homepage load, section navigation, responsive behavior. [PRD-L31]
- Every new component must have at least 1 unit + 1 component test. [PRD-L31]
- Every new feature must have 1 E2E happy path test. [PRD-L31]

## Out of Scope

- Backend connections (Supabase, Resend).
- Admin dashboard functionality.
- Contact form submission.
- Project detail pages.
- Services page content (only placeholder route with "Coming Soon" message).
- SEO optimization (meta tags, sitemap).
- Email notifications.
- Image uploads.

## Blocking Questions

(none)

## Open Questions

- Exact background pattern for Hero section (to be designed by developer).
- Responsive breakpoints and typography scale (to be defined during implementation).

## Follow-Ups

- After homepage UI mockup, implement Skills section with actual brand logos.
- Then implement Projects Grid with mock data.
- Then implement Experience/Timeline with static content.
- Then implement Contact section with static form.
- Then connect to Supabase for dynamic data.
- Then add admin dashboard.

## Notes

- The homepage must map 1:1 to future Supabase schema when connected.
- The design should avoid generic AI slop; colors and typography should feel like a personal brand.
- The implementation should follow the project structure defined in the existing PRD.
