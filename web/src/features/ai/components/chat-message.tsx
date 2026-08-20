interface ChatMessageProps {
  role: "user" | "model";
  content: string;
  isError?: boolean;
  onRetry?: () => void;
}

export function ChatMessage({ role, content, isError, onRetry }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-accent text-ink"
            : "bg-foreground/5 text-foreground"
        }`}
      >
        <p>{content}</p>
        {isError && onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs font-bold underline decoration-1 underline-offset-2 hover:text-accent"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
