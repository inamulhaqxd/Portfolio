import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  getDismissState,
  setDismissState,
  getMessages,
  setMessages,
  clearChat,
  CHAT_CLOSED_KEY,
  CHAT_MESSAGES_KEY,
} from "./chat-storage";

describe("chat-storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("getDismissState", () => {
    it("returns false when key does not exist", () => {
      expect(getDismissState()).toBe(false);
    });

    it("returns true when key is set to 'true'", () => {
      localStorage.setItem(CHAT_CLOSED_KEY, "true");
      expect(getDismissState()).toBe(true);
    });

    it("returns false when key is set to 'false'", () => {
      localStorage.setItem(CHAT_CLOSED_KEY, "false");
      expect(getDismissState()).toBe(false);
    });
  });

  describe("setDismissState", () => {
    it("stores true in localStorage", () => {
      setDismissState(true);
      expect(localStorage.getItem(CHAT_CLOSED_KEY)).toBe("true");
    });

    it("stores false in localStorage", () => {
      setDismissState(false);
      expect(localStorage.getItem(CHAT_CLOSED_KEY)).toBe("false");
    });
  });

  describe("getMessages", () => {
    it("returns empty array when key does not exist", () => {
      expect(getMessages()).toEqual([]);
    });

    it("returns parsed messages when key exists", () => {
      const messages = [
        { id: "1", role: "user", content: "hello", timestamp: 123 },
      ];
      localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
      expect(getMessages()).toEqual(messages);
    });

    it("returns empty array when stored value is invalid JSON", () => {
      localStorage.setItem(CHAT_MESSAGES_KEY, "not-json");
      expect(getMessages()).toEqual([]);
    });
  });

  describe("setMessages", () => {
    it("stores messages as JSON", () => {
      const messages = [
        { id: "1", role: "user" as const, content: "hello", timestamp: 123 },
      ];
      setMessages(messages);
      expect(JSON.parse(localStorage.getItem(CHAT_MESSAGES_KEY)!)).toEqual(
        messages
      );
    });
  });

  describe("clearChat", () => {
    it("removes both keys from localStorage", () => {
      localStorage.setItem(CHAT_CLOSED_KEY, "true");
      localStorage.setItem(CHAT_MESSAGES_KEY, "[]");
      clearChat();
      expect(localStorage.getItem(CHAT_CLOSED_KEY)).toBeNull();
      expect(localStorage.getItem(CHAT_MESSAGES_KEY)).toBeNull();
    });
  });
});
