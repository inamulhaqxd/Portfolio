## What to build

Wire up the chat behavior: message rendering, user input, suggested questions, typing indicator, error states, and graceful deflection for off-topic questions.

## Required context

- `AiChatOverlay` component from WI-02
- `getAiResponse` Server Action from WI-03
- Suggested questions: 4 static chips below AI greeting
- Chat bubble layout: user messages right, AI messages left
- Typing indicator: three animated dots while AI processes

## Acceptance criteria

- [ ] AI greeting message: "Hi! I'm Inam's AI assistant. Ask me about his projects, skills, or availability."
- [ ] 4 suggested question chips below greeting:
  - "What projects has Inam built?"
  - "What technologies does Inam use?"
  - "Is Inam available for hire?"
  - "Tell me about Inam's AI/ML experience"
- [ ] Clicking a chip sends it as a user message
- [ ] User can type custom question in input field
- [ ] Send button disabled when input is empty
- [ ] Enter key sends message
- [ ] Messages display in chat bubble layout (user right, AI left)
- [ ] Typing indicator (animated dots) shown while AI generates response
- [ ] AI response displayed in chat bubble
- [ ] Error state: "Something went wrong. Please try again." with retry button
- [ ] Rate limit state: "Too many requests. Please wait a moment and try again."
- [ ] Off-topic deflection: "I'm here to help with questions about Inam's work and skills..."
- [ ] No info deflection: "I don't have that information, but you can reach out to Inam directly..."
- [ ] Chat state is local (useState), no persistence
- [ ] Component test: greeting and chips render on open
- [ ] Component test: chip click sends message
- [ ] Component test: empty input disables send
- [ ] Component test: typing indicator appears during load
- [ ] Component test: error state renders on API failure

## Covers

- User Stories: 2, 3, 5, 6
- Requirements: 11-17, 21-22, 30-33

## Blocked by

WI-02 (chat overlay component), WI-03 (Gemini API integration)
