import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "./about-section";

describe("AboutSection", () => {
  it("renders the About heading and label", () => {
    render(<AboutSection />);

    expect(screen.getByText("I'm an")).toBeInTheDocument();
    expect(screen.getByText("About me")).toBeInTheDocument();
  });

  it("displays stat counters", () => {
    render(<AboutSection />);

    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("Projects Delivered")).toBeInTheDocument();
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
  });

  it("displays skill pills", () => {
    render(<AboutSection />);

    expect(screen.getByText("RAG")).toBeInTheDocument();
    expect(screen.getByText("AI Agents")).toBeInTheDocument();
    expect(screen.getByText("NLP")).toBeInTheDocument();
    expect(screen.getByText("LLMs")).toBeInTheDocument();
  });

  it("renders both CTAs with correct hrefs", () => {
    render(<AboutSection />);

    const viewProjects = screen.getByRole("link", { name: /view projects/i });
    expect(viewProjects).toHaveAttribute("href", "#projects");

    const letsTalk = screen.getByRole("link", { name: /let's talk/i });
    expect(letsTalk).toHaveAttribute("href", "/#contact");
  });

  it("does not mention location", () => {
    render(<AboutSection />);

    expect(screen.queryByText(/islamabad/i)).not.toBeInTheDocument();
  });

  it("renders profile images", () => {
    const { container } = render(<AboutSection />);

    const images = container.querySelectorAll("img");
    expect(images.length).toBe(2);
  });
});
