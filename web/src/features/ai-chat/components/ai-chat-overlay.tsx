"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

const WORD_DELAY = 30; // ms between words

export function AiChatOverlay({ isOpen, onClose }: AiChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: "Hi! I am Inam's assistant. I am here to guide you about Inam's expertise and how/why you need to hire him. Feel free to ask about his skills or projects!",
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typeWords = useCallback((messageId: string, fullText: string) => {
    setIsTyping(true);
    const words = fullText.split(" ");
    let currentIndex = 0;

    const addNextWord = () => {
      if (currentIndex < words.length) {
        const currentContent = words.slice(0, currentIndex + 1).join(" ");
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, content: currentContent } : msg
          )
        );
        currentIndex++;
        typingRef.current = setTimeout(addNextWord, WORD_DELAY);
      } else {
        setIsTyping(false);
      }
    };

    addNextWord();
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading || isTyping) return;

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
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.success) {
        typeWords(assistantMessage.id, data.response);
      } else {
        typeWords(assistantMessage.id, "Something went wrong. Please try again.");
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, errorMessage]);
      typeWords(errorMessage.id, "Something went wrong. Please try again.");
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
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C16 2 18 8 22 12C26 16 32 16 32 16C32 16 26 16 22 20C18 24 16 30 16 30C16 30 14 24 10 20C6 16 0 16 0 16C0 16 6 16 10 12C14 8 16 2 16 2Z" fill="url(#gemini-gradient-header)" />
              <path d="M26 22C26 22 27 24.5 28.5 26C30 27.5 32 28 32 28C32 28 30 28 28.5 29.5C27 31 26 32 26 32C26 32 25 31 23.5 29.5C22 28 20 28 20 28C20 28 22 28 23.5 26.5C25 25 26 22 26 22Z" fill="url(#gemini-gradient-small-header)" />
              <defs>
                <linearGradient id="gemini-gradient-header" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4285F4">
                    <animate attributeName="stop-color" values="#4285F4;#9B72CB;#D81B60;#4285F4" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="0.5" stopColor="#9B72CB">
                    <animate attributeName="stop-color" values="#9B72CB;#D81B60;#4285F4;#9B72CB" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="1" stopColor="#D81B60">
                    <animate attributeName="stop-color" values="#D81B60;#4285F4;#9B72CB;#D81B60" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
                <linearGradient id="gemini-gradient-small-header" x1="20" y1="22" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9B72CB">
                    <animate attributeName="stop-color" values="#9B72CB;#D81B60;#4285F4;#9B72CB" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="1" stopColor="#D81B60">
                    <animate attributeName="stop-color" values="#D81B60;#4285F4;#9B72CB;#D81B60" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="text-lg font-bold">Ask AI</h2>
          </div>
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
                  {isTyping && message.role === "assistant" && message.content === "" && (
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Suggested questions (show only when there's just the greeting) */}
            {messages.length === 1 && !isTyping && (
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
              disabled={isLoading || isTyping}
            />
            <button
              type="button"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading || isTyping}
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
