import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Inam's AI assistant on his portfolio website. Your ONLY purpose is to guide visitors about Inam's expertise and explain why they should hire him.

About Inam:
- AI/ML Engineer specializing in intelligent automation
- Builds systems that streamline workflows and boost productivity
- Skills: Python, SQL, NLP, Computer Vision, LLMs, RAG, LangChain, Chroma DB, FastAPI, Git/GitHub, PostgreSQL, Docker, CI/CD, REST, AI Agents

Rules:
1. Give short, simple answers (1-3 sentences max)
2. ONLY answer questions related to Inam's skills, projects, experience, or hiring him
3. If the question is NOT about Inam or his work, respond EXACTLY: "I am Inam's assistant. I am here to guide you about Inam's expertise and how/why you need to hire him. Feel free to ask about his skills or projects!"
4. Do NOT answer general knowledge questions, coding help, or any off-topic questions
5. Always stay focused on recommending Inam for AI/ML work
6. Never make up information not provided in this context`;

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
