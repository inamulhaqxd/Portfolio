import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt } from "@/features/ai/lib/build-system-prompt";

const VALID_ROLES = ["user", "model"] as const;

interface ChatMessage {
  role: string;
  parts: string;
}

function validateMessages(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  return messages.every(
    (m) =>
      typeof m === "object" &&
      m !== null &&
      "role" in m &&
      "parts" in m &&
      VALID_ROLES.includes((m as ChatMessage).role as (typeof VALID_ROLES)[number]) &&
      typeof (m as ChatMessage).parts === "string"
  );
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { messages, pageContext } = body;

  if (!validateMessages(messages)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI assistant is not configured" },
      { status: 500 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: buildSystemPrompt(
        typeof pageContext === "string" ? pageContext : undefined
      ),
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.parts }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.parts);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
