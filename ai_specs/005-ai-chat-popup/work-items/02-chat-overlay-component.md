## What to build

Build the AI chat overlay component: a full-screen centered modal with header, scrollable message area, input field, and close functionality. Matches existing `ContactModal` pattern.

## Required context

- Existing `ContactModal` in `web/src/features/contact/components/contact-modal.tsx` — use as pattern
- Modal uses `useState(false)` for open/close, `role="dialog"`, `aria-modal="true"`
- Backdrop: `fixed inset-0` with blur, `z-[100]`
- Body scroll lock when open
- Close via X button (Lucide `X` icon) or backdrop click
- Styling: Tailwind CSS v4, glassmorphism utilities (`.glass`, `.metallic-glass`)
- Icons: `lucide-react`

## Acceptance criteria

- [ ] Component: `AiChatOverlay` in `web/src/features/ai-chat/components/ai-chat-overlay.tsx`
- [ ] Props: `isOpen: boolean`, `onClose: () => void`
- [ ] Full-screen centered modal with backdrop blur
- [ ] Header: "Ask AI" title + close button (X icon)
- [ ] Scrollable message area (flex-1, overflow-y-auto)
- [ ] Input field at bottom with Send button
- [ ] Body scroll locked when open
- [ ] Close on backdrop click
- [ ] Close on X button
- [ ] `role="dialog"` and `aria-modal="true"` for accessibility
- [ ] Component test: renders when open, hidden when closed
- [ ] Component test: close button calls onClose
- [ ] Component test: backdrop click calls onClose

## Covers

- User Stories: 2, 4
- Requirements: 5-10

## Blocked by

WI-01 (hero button triggers open state)
