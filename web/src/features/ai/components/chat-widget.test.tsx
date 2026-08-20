import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ChatWidget } from "./chat-widget";
import { CHAT_CLOSED_KEY, CHAT_MESSAGES_KEY } from "../lib/chat-storage";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

function setOnline() {
  Object.defineProperty(navigator, "onLine", { value: true, writable: true });
}

function setOffline() {
  Object.defineProperty(navigator, "onLine", { value: false, writable: true });
}

describe("ChatWidget", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    setOnline();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "Hello from bot!" }),
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders chat bubble when dismissed", () => {
    localStorage.setItem(CHAT_CLOSED_KEY, "true");
    render(<ChatWidget />);
    expect(screen.getByRole("button", { name: /open chat/i })).toBeInTheDocument();
  });

  it("auto-opens panel on first visit with welcome message", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Hi! I'm Inam's AI assistant/)
    ).toBeInTheDocument();
  });

  it("stays closed if previously dismissed", () => {
    localStorage.setItem(CHAT_CLOSED_KEY, "true");
    render(<ChatWidget />);
    expect(screen.queryByText("AI Assistant")).not.toBeInTheDocument();
  });

  it("opens panel when bubble is clicked", async () => {
    localStorage.setItem(CHAT_CLOSED_KEY, "true");
    render(<ChatWidget />);

    const bubble = screen.getByRole("button", { name: /open chat/i });
    await userEvent.click(bubble);

    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
  });

  it("closes panel when panel close button is clicked", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    // The panel's close button is inside the panel container
    const panel = screen.getByText("AI Assistant").closest("div[class*='fixed']") as HTMLElement;
    const closeBtn = within(panel).getByRole("button", { name: /close chat/i });
    await userEvent.click(closeBtn);

    expect(screen.queryByText("AI Assistant")).not.toBeInTheDocument();
  });

  it("sends a message and displays bot reply", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Ask me anything...");
    await userEvent.type(input, "What projects do you have?");
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Hello from bot!")).toBeInTheDocument();
    });

    expect(screen.getByText("What projects do you have?")).toBeInTheDocument();
  });

  it("shows error message when API fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Something went wrong." }),
    });

    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Ask me anything...");
    await userEvent.type(input, "Test");
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });
  });

  it("does not send empty messages", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Ask me anything...");
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  it("clears conversation when clear button is clicked", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    const clearBtn = screen.getByRole("button", { name: /clear conversation/i });
    await userEvent.click(clearBtn);

    await waitFor(() => {
      expect(screen.getByText(/Hi! I'm Inam's AI assistant/)).toBeInTheDocument();
    });
  });

  it("shows offline message when navigator.onLine is false", async () => {
    setOffline();
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    expect(
      screen.getByText("You need an internet connection to use the chatbot.")
    ).toBeInTheDocument();
  });

  it("persists dismissed state to localStorage", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    const panel = screen.getByText("AI Assistant").closest("div[class*='fixed']") as HTMLElement;
    const closeBtn = within(panel).getByRole("button", { name: /close chat/i });
    await userEvent.click(closeBtn);

    expect(localStorage.getItem(CHAT_CLOSED_KEY)).toBe("true");
  });

  it("persists messages to localStorage", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Ask me anything...");
    await userEvent.type(input, "Hello");
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(CHAT_MESSAGES_KEY)!);
      expect(stored.length).toBeGreaterThan(0);
    });
  });

  it("user messages appear right-aligned", async () => {
    render(<ChatWidget />);

    await waitFor(() => {
      expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Ask me anything...");
    await userEvent.type(input, "Test message");
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      const userMsg = screen.getByText("Test message");
      const container = userMsg.closest("div[class*='justify-end']");
      expect(container).toBeInTheDocument();
    });
  });
});
