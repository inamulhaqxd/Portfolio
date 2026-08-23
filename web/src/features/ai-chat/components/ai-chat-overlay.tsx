"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AiChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Inam built?",
  "What technologies does Inam use?",
  "Is Inam available for hire?",
  "Tell me about Inam's AI/ML experience",
];

export function AiChatOverlay({ isOpen, onClose }: AiChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: "Hi! I'm Inam's AI assistant. Ask me about his projects, skills, or availability.",
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content.trim() }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.success ? data.response : "Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 flex h-[80vh] w-full max-w-2xl flex-col rounded-window glass-deep shadow-panel">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-lg font-bold">Ask AI</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-background/60 backdrop-blur-sm text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    message.role === "user"
                      ? "bg-accent text-ink"
                      : "bg-surface/60 text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {/* Suggested questions (show only when there's just the greeting) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleSend(question)}
                    className="rounded-full border border-line bg-surface/40 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all duration-200 hover:border-accent hover:text-accent"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-surface/60 px-4 py-3 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-line px-6 py-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Inam's work..."
              maxLength={500}
              className="flex-1 rounded-full border border-line bg-surface/40 px-4 py-2.5 text-sm text-foreground placeholder-foreground/40 outline-none transition-all duration-200 focus:border-accent"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
