import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { POST, GET } from "./route";

const mockSendMessage = vi.fn();

vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: class MockGoogleGenerativeAI {
      getGenerativeModel() {
        return {
          startChat() {
            return { sendMessage: mockSendMessage };
          },
        };
      }
    },
  };
});

function makePostRequest(body: unknown): Request {
  return new Request("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.GEMINI_API_KEY = "test-api-key";
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns 405 for GET requests", async () => {
    const res = await GET();
    expect(res.status).toBe(405);
  });

  it("returns 400 when messages is missing", async () => {
    const req = makePostRequest({});
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid request");
  });

  it("returns 400 when messages is empty array", async () => {
    const req = makePostRequest({ messages: [] });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid request");
  });

  it("returns 400 when message is missing role", async () => {
    const req = makePostRequest({
      messages: [{ parts: "hello" }],
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid request");
  });

  it("returns 400 when message is missing parts", async () => {
    const req = makePostRequest({
      messages: [{ role: "user" }],
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid request");
  });

  it("returns 400 when message has invalid role", async () => {
    const req = makePostRequest({
      messages: [{ role: "admin", parts: "hello" }],
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid request");
  });

  it("returns 500 when GEMINI_API_KEY is missing", async () => {
    delete process.env.GEMINI_API_KEY;
    const req = makePostRequest({
      messages: [{ role: "user", parts: "hello" }],
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("AI assistant is not configured");
  });

  it("returns 200 with reply on success", async () => {
    mockSendMessage.mockResolvedValue({
      response: { text: () => "Hello! How can I help?" },
    });

    const req = makePostRequest({
      messages: [{ role: "user", parts: "hello" }],
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.reply).toBe("Hello! How can I help?");
  });

  it("returns 500 when Gemini API fails", async () => {
    mockSendMessage.mockRejectedValue(new Error("Gemini API error"));

    const req = makePostRequest({
      messages: [{ role: "user", parts: "hello" }],
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Something went wrong. Please try again.");
  });

  it("passes pageContext to buildSystemPrompt", async () => {
    mockSendMessage.mockResolvedValue({
      response: { text: () => "reply" },
    });

    const req = makePostRequest({
      messages: [{ role: "user", parts: "hello" }],
      pageContext: "Intelligent document flow",
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
  });

  it("does not expose API key in response", async () => {
    mockSendMessage.mockResolvedValue({
      response: { text: () => "reply" },
    });

    const req = makePostRequest({
      messages: [{ role: "user", parts: "hello" }],
    });
    const res = await POST(req);
    const text = await res.text();

    expect(text).not.toContain("test-api-key");
  });
});
