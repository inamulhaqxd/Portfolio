import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "./build-system-prompt";

describe("buildSystemPrompt", () => {
  it("returns a string containing the assistant identity", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("Inam's AI portfolio assistant");
    expect(prompt).toContain("Be helpful, concise, and friendly");
  });

  it("includes profile name and role", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("Inam ul Haq Tariq");
    expect(prompt).toContain("AI/ML Engineer");
  });

  it("includes skills list", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("Python");
    expect(prompt).toContain("LLMs");
    expect(prompt).toContain("RAG");
  });

  it("includes experience", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("NTC");
  });

  it("includes all project titles", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("Intelligent document flow");
    expect(prompt).toContain("AI knowledge assistant");
    expect(prompt).toContain("Workflow insights");
  });

  it("includes project tech tags", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("FastAPI");
    expect(prompt).toContain("LangChain");
  });

  it("includes behavioral rules", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("say so honestly");
    expect(prompt).toContain("redirect to the portfolio");
    expect(prompt).toContain("Never make up projects");
  });

  it("appends page context when provided", () => {
    const prompt = buildSystemPrompt("Intelligent document flow");

    expect(prompt).toContain("The visitor is currently viewing: Intelligent document flow");
  });

  it("does not append page context when undefined", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).not.toContain("The visitor is currently viewing");
  });

  it("does not append page context when empty string", () => {
    const prompt = buildSystemPrompt("");

    expect(prompt).not.toContain("The visitor is currently viewing");
  });
});
