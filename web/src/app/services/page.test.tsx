import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("renders the services heading and service cards", () => {
    render(<ServicesPage />);

    expect(screen.getByRole("heading", { name: /AI\/ML solutions tailored/ })).toBeInTheDocument();
    expect(screen.getByText("Intelligent Automation")).toBeInTheDocument();
    expect(screen.getByText("Computer Vision")).toBeInTheDocument();
    expect(screen.getByText("NLP & Text Analytics")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
