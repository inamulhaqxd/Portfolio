import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "./about-section";

describe("AboutSection", () => {
  it("renders the About heading", () => {
    render(<AboutSection />);

    expect(
      screen.getByRole("heading", { name: /building practical ai/i })
    ).toBeInTheDocument();
    expect(screen.getByText("About me")).toBeInTheDocument();
  });

  it("displays all four facts", () => {
    render(<AboutSection />);

    expect(screen.getByText("Current role")).toBeInTheDocument();
    expect(screen.getByText("AI/ML Engineer Trainee")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(
      screen.getByText("National Telecommunication Corporation (NTC)")
    ).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(
      screen.getByText("Computer Systems Engineering graduate")
    ).toBeInTheDocument();
    expect(screen.getByText("University")).toBeInTheDocument();
    expect(
      screen.getByText("Mirpur University of Science and Technology")
    ).toBeInTheDocument();
  });

  it("renders both CTAs with correct hrefs", () => {
    render(<AboutSection />);

    const viewProjects = screen.getByRole("link", { name: /view projects/i });
    expect(viewProjects).toHaveAttribute("href", "#projects");

    const getInTouch = screen.getByRole("link", { name: /get in touch/i });
    expect(getInTouch).toHaveAttribute("href", "#contact");
  });

  it("does not mention location", () => {
    render(<AboutSection />);

    expect(screen.queryByText(/islamabad/i)).not.toBeInTheDocument();
  });

  it("does not contain image elements", () => {
    const { container } = render(<AboutSection />);

    expect(container.querySelector("img")).not.toBeInTheDocument();
  });
});
