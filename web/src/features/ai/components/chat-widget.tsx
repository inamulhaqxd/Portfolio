"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatBubble } from "./chat-bubble";
import { ChatPanel } from "./chat-panel";
import {
  getDismissState,
  setDismissState,
  getMessages,
  setMessages,
  clearChat,
  type ChatMessage,
} from "../lib/chat-storage";
import { formatChatMessages } from "../lib/format-chat-messages";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "model",
  content:
    "Hi! I'm Inam's AI assistant. I can tell you about his AI/ML projects, skills, or experience. What are you curious about?",
  timestamp: Date.now(),
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessagesState] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    const dismissed = getDismissState();
    const saved = getMessages();
    setIsOffline(!navigator.onLine);

    if (saved.length > 0) {
      setMessagesState(saved);
    } else if (!dismissed) {
      setMessagesState([WELCOME_MESSAGE]);
    }

    setIsOpen(!dismissed);
    setIsHydrated(true);
  }, []);

  // Online/offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Persist messages
  useEffect(() => {
    if (isHydrated && messages.length > 0) {
      setMessages(messages);
    }
  }, [messages, isHydrated]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      setDismissState(!next);
      return next;
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setDismissState(true);
  }, []);

  const handleClear = useCallback(() => {
    clearChat();
    setMessagesState([WELCOME_MESSAGE]);
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      setError(null);
      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content,
        timestamp: Date.now(),
      };
      setMessagesState((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // Only send messages from the first user message onward
        const allMessages = [...messages, userMsg];
        const firstUserIdx = allMessages.findIndex((m) => m.role === "user");
        const apiMessages = firstUserIdx >= 0 ? allMessages.slice(firstUserIdx) : [userMsg];
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: formatChatMessages(apiMessages),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          return;
        }

        const botMsg: ChatMessage = {
          id: generateId(),
          role: "model",
          content: data.reply,
          timestamp: Date.now(),
        };
        setMessagesState((prev) => [...prev, botMsg]);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const handleRetry = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      // Remove the error by re-setting
      setError(null);
      sendMessage(lastUserMsg.content);
    }
  }, [messages, sendMessage]);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <ChatBubble isOpen={isOpen} onClick={handleToggle} />
      {isOpen && (
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          isOffline={isOffline}
          onSend={sendMessage}
          onClear={handleClear}
          onClose={handleClose}
          onRetry={handleRetry}
          error={error}
        />
      )}
    </>
  );
}
