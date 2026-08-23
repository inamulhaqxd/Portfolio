import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AiChatOverlay } from "./ai-chat-overlay";

beforeEach(() => {
  // Mock scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();
});

describe("AiChatOverlay", () => {
  it("renders nothing when closed", () => {
    render(<AiChatOverlay isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog when open", () => {
    render(<AiChatOverlay isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("displays greeting message", () => {
    render(<AiChatOverlay isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Hi! I'm Inam's AI assistant. Ask me about his projects, skills, or availability.")).toBeInTheDocument();
  });

  it("displays suggested questions", () => {
    render(<AiChatOverlay isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("What projects has Inam built?")).toBeInTheDocument();
    expect(screen.getByText("What technologies does Inam use?")).toBeInTheDocument();
    expect(screen.getByText("Is Inam available for hire?")).toBeInTheDocument();
    expect(screen.getByText("Tell me about Inam's AI/ML experience")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<AiChatOverlay isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("disables send button when input is empty", () => {
    render(<AiChatOverlay isOpen={true} onClose={vi.fn()} />);
    const sendButton = screen.getByLabelText("Send message");
    expect(sendButton).toBeDisabled();
  });
});
