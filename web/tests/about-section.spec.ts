import { test, expect } from "@playwright/test";

test.describe("About section", () => {
  test("navigates to About section and verifies CTAs", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "About" }).click();

    await expect(
      page.getByRole("heading", { name: /about me/i })
    ).toBeVisible();

    const viewProjects = page.getByRole("link", { name: /view projects/i });
    await expect(viewProjects).toBeVisible();
    await expect(viewProjects).toHaveAttribute("href", "#projects");

    const getInTouch = page.getByRole("link", { name: /get in touch/i });
    await expect(getInTouch).toBeVisible();
    await expect(getInTouch).toHaveAttribute("href", "#contact");
  });

  test("View Projects CTA scrolls to the Projects section", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "About" }).click();
    await page.getByRole("link", { name: /view projects/i }).click();

    const projectsSection = page.locator("#projects");
    await expect(projectsSection).toBeVisible();
  });
});
