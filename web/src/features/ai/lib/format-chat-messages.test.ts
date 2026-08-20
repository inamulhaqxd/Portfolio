import { describe, expect, it } from "vitest";
import { formatChatMessages } from "./format-chat-messages";

describe("formatChatMessages", () => {
  it("converts UI messages to Gemini API format", () => {
    const messages = [
      { id: "1", role: "user" as const, content: "Hello", timestamp: 1 },
      { id: "2", role: "model" as const, content: "Hi there", timestamp: 2 },
    ];

    const result = formatChatMessages(messages);

    expect(result).toEqual([
      { role: "user", parts: "Hello" },
      { role: "model", parts: "Hi there" },
    ]);
  });

  it("returns empty array for empty input", () => {
    expect(formatChatMessages([])).toEqual([]);
  });

  it("preserves message order", () => {
    const messages = [
      { id: "1", role: "user" as const, content: "Q1", timestamp: 1 },
      { id: "2", role: "model" as const, content: "A1", timestamp: 2 },
      { id: "3", role: "user" as const, content: "Q2", timestamp: 3 },
    ];

    const result = formatChatMessages(messages);

    expect(result[0].parts).toBe("Q1");
    expect(result[1].parts).toBe("A1");
    expect(result[2].parts).toBe("Q2");
  });
});
