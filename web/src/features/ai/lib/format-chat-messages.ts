import type { ChatMessage } from "./chat-storage";

interface GeminiMessage {
  role: "user" | "model";
  parts: string;
}

export function formatChatMessages(messages: ChatMessage[]): GeminiMessage[] {
  return messages.map((m) => ({
    role: m.role,
    parts: m.content,
  }));
}
