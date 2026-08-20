export const CHAT_CLOSED_KEY = "chatbot-closed";
export const CHAT_MESSAGES_KEY = "chatbot-messages";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: number;
}

export function getDismissState(): boolean {
  try {
    return localStorage.getItem(CHAT_CLOSED_KEY) === "true";
  } catch {
    return false;
  }
}

export function setDismissState(closed: boolean): void {
  try {
    localStorage.setItem(CHAT_CLOSED_KEY, String(closed));
  } catch {
    // localStorage unavailable
  }
}

export function getMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(CHAT_MESSAGES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function setMessages(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
  } catch {
    // localStorage unavailable
  }
}

export function clearChat(): void {
  try {
    localStorage.removeItem(CHAT_CLOSED_KEY);
    localStorage.removeItem(CHAT_MESSAGES_KEY);
  } catch {
    // localStorage unavailable
  }
}
