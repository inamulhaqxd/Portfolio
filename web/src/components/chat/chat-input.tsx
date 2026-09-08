"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatInputProps {
  onSubmit?: (message: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isAnimating) return;

    const userMessage = value.trim();
    setValue("");
    setIsAnimating(true);
    onSubmit?.(userMessage);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.error || "Something went wrong. Please try again." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Failed to connect. Please try again." }]);
    } finally {
      setIsAnimating(false);
    }
  };

  const handleBack = () => {
    setMessages([]);
    setValue("");
  };

  return (
    <div className="z-10 mt-2 flex w-full flex-col items-center justify-center md:px-0">
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.form
            key="input"
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300">
              <input
                type="text"
                placeholder="Ask me anything…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!value.trim()}
                aria-label="Submit question"
                className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="chat"
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="rounded-3xl border border-neutral-200 bg-white/40 p-4 backdrop-blur-lg">
              <div className="mb-3 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </div>
              <div className="max-h-64 space-y-3 overflow-y-auto">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-[#0171E3] text-white"
                          : "bg-neutral-100 text-neutral-800"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isAnimating && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="rounded-2xl bg-neutral-100 px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask another question…"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 border-none bg-transparent text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!value.trim() || isAnimating}
                  className="flex items-center justify-center rounded-full bg-[#0171E3] p-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-70"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
