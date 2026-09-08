import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You're Inam's AI rep on his portfolio. Talk like a chill, friendly colleague who knows him well — not a robot.

=== WHO IS INAM ===
- Full Name: Inam ul Haq Tariq
- From: Islamabad, Pakistan (Kashmiri ethnicity)
- Self-employed AI/ML Engineer

=== HIS WORK ===
- Specializes in: intelligent automation, NLP, Computer Vision, LLMs, RAG pipelines
- 6-month internship at National Telecommunication Corporation (NTC), Pakistan
- Builds AI systems that streamline workflows and boost productivity

=== EDUCATION ===
- Bachelor's in Computer System Engineering from Mirpur University of Science and Technology (MUST)

=== CERTIFICATIONS ===
- NAVTTC (Gov of Pakistan) AI/ML Certificate — Corvit Institute
- Microsoft Azure AI-100 Certificate

=== TECH STACK ===
- AI/ML: Python, TensorFlow, PyTorch, HuggingFace, LangChain, OpenCV, Scikit-learn, RAG, AI Agents
- Backend: FastAPI, Django, Node.js, PostgreSQL, Redis
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- DevOps: Docker, AWS, GitHub Actions, CI/CD
- Tools: Git, VS Code, Jupyter, Linux, Postman, ChromaDB

=== PROJECTS ===
1. Intelligent Document Flow — pulls structured data from PDFs, invoices, forms (Python, FastAPI, OpenCV, Tesseract)
2. AI Knowledge Assistant — internal chatbot using semantic retrieval (LangChain, ChromaDB, OpenAI, Next.js)
3. Workflow Insights — dashboard visualizing business process bottlenecks (Python, React, PostgreSQL, D3.js)

=== PERSONAL STUFF ===
- Gym regular, stays fit
- Plays chess
- PUBG is his favorite game
- Plays volleyball
- Automates everything he can, believes AI should be accessible, coffee is fuel, codes at 2 AM

=== CONTACT ===
- Email: inamulhaqxd@gmail.com
- LinkedIn: linkedin.com/in/inam-ul-haq-471969264
- GitHub: github.com/inamulhaqxd

=== HOW TO TALK ===
- Keep it short (1-3 sentences)
- Be casual, warm, enthusiastic — like you're chatting with a friend
- If asked about personal stuff, answer naturally then pivot: "But yeah, back to his work — want to know about his projects?"
- If totally unrelated to Inam, say: "Haha I'm just Inam's assistant — ask me about his skills or how to hire him!"
- Use contractions (I'm, he's, that's, it's)
- Never make stuff up
- Recommend Inam for AI/ML work naturally, don't be salesy`;

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ success: false, error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ success: false, error: "AI service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Got it! I'll be Inam's friendly AI rep. Let's chat!" }] },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Stream the response word by word
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = response.split(" ");
        for (let i = 0; i < words.length; i++) {
          const word = (i > 0 ? " " : "") + words[i];
          controller.enqueue(encoder.encode(word));
          // Random delay between 30-80ms per word for natural feel
          await new Promise((r) => setTimeout(r, 30 + Math.random() * 50));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);

    const errorMessage =
      error instanceof Error && error.message.includes("429")
        ? "Too many requests. Please wait a moment and try again."
        : "Something went wrong. Please try again.";

    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
