import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens the mobile navigation and exposes the Services route", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /open navigation/i }));

    const mobilePanel = screen.getByRole("button", { name: /close navigation/i }).closest("div")!.parentElement!;
    const servicesLink = within(mobilePanel).getByRole("link", { name: "Services" });

    expect(servicesLink).toHaveAttribute("href", "/services");
    expect(screen.getByRole("button", { name: /close navigation/i })).toBeInTheDocument();
  });

  it("adds solid background styling after the visitor scrolls", () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(24);

    const { container } = render(<SiteHeader />);
    const header = container.querySelector("header");

    window.dispatchEvent(new Event("scroll"));

    expect(header).toHaveAttribute("data-scrolled", "true");
  });

  it("renders the About link with correct href in desktop navigation", () => {
    render(<SiteHeader />);

    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    const desktopAboutLink = aboutLinks.find(
      (link) => !link.closest("[class*='md:hidden']")
    );
    expect(desktopAboutLink).toHaveAttribute("href", "#about");
  });

  it("has About link in mobile navigation with correct href", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /open navigation/i }));

    const mobilePanel = screen.getByRole("button", { name: /close navigation/i }).closest("div")!.parentElement!;
    const aboutLink = within(mobilePanel).getByRole("link", { name: "About" });

    expect(aboutLink).toHaveAttribute("href", "#about");
  });
});
