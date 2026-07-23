import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("renders a Coming Soon heading and a link back to the homepage", () => {
    render(<ServicesPage />);

    expect(screen.getByRole("heading", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
