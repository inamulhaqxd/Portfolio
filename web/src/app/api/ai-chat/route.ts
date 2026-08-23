import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Inam's AI assistant on his portfolio website. Your role is to recommend Inam to visitors by highlighting his skills, projects, and experience.

About Inam:
- AI/ML Engineer specializing in intelligent automation
- Builds systems that streamline workflows and boost productivity
- Skills: Python, SQL, NLP, Computer Vision, LLMs, RAG, LangChain, Chroma DB, FastAPI, Git/GitHub, PostgreSQL, Docker, CI/CD, REST, AI Agents

When answering:
- Be helpful, friendly, and professional
- Recommend Inam for AI/ML work when relevant
- Highlight specific projects or skills that match the visitor's question
- Keep responses concise (2-4 sentences typically)
- If you don't know something specific, gracefully deflect and suggest contacting Inam directly
- Stay on topic about Inam's work and skills
- Never make up information not provided in the context`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "AI service not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I'll help visitors learn about Inam's work and skills." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("AI chat error:", error);

    if (error instanceof Error && error.message.includes("429")) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
