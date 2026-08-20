"use client";

import { useRef, useEffect } from "react";
import type { ChatMessage as ChatMessageType } from "../lib/chat-storage";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

interface ChatPanelProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  isOffline: boolean;
  onSend: (message: string) => void;
  onClear: () => void;
  onClose: () => void;
  onRetry: () => void;
  error: string | null;
}

export function ChatPanel({
  messages,
  isLoading,
  isOffline,
  onSend,
  onClear,
  onClose,
  onRetry,
  error,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOffline) {
      inputRef.current?.focus();
    }
  }, [isOffline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input || !input.value.trim() || isLoading || isOffline) return;
    onSend(input.value.trim());
    input.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      form?.requestSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:h-[520px] sm:w-[380px] sm:rounded-2xl sm:border sm:border-line sm:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="text-sm font-bold">AI Assistant</h2>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            aria-label="Clear conversation"
            className="rounded-lg p-1.5 text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="rounded-lg p-1.5 text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}
          {error && (
            <ChatMessage
              role="model"
              content={error}
              isError
              onRetry={onRetry}
            />
          )}
          {isOffline && (
            <ChatMessage
              role="model"
              content="You need an internet connection to use the chatbot."
            />
          )}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-line px-4 py-3"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={isOffline ? "Offline..." : "Ask me anything..."}
            disabled={isLoading || isOffline}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-foreground/30 focus:border-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || isOffline}
            aria-label="Send message"
            className="rounded-xl bg-accent px-3 py-2 text-ink transition-all hover:bg-accent-strong disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
