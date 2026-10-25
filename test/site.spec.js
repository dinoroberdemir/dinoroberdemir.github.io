const { test, expect } = require("@playwright/test");

const origin = "https://dinoroberdemir.github.io";
const preview = "http://127.0.0.1:4173";

test.beforeEach(async ({ context }) => {
  // Serve the unmodified production build locally, including absolute asset URLs.
  await context.route(`${origin}/**`, async (route) => {
    const target = new URL(route.request().url());
    const response = await context.request.get(`${preview}${target.pathname}${target.search}`);
    await route.fulfill({ response });
  });
});

test("Academic Pages renders the profile and loads its assets", async ({ page }, testInfo) => {
  const failures = [];
  page.on("response", (response) => {
    if (response.url().startsWith(origin) && response.status() >= 400) failures.push(response.url());
  });
  page.on("pageerror", (error) => failures.push(error.message));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".author__name")).toHaveText("Dino-Rober Demir");
  await expect(page.getByRole("heading", { name: "About me", exact: true })).toBeVisible();
  await expect(page.locator('.page__footer a[href*="academicpages"]')).toBeVisible();
  const avatar = page.locator(".author__avatar img");
  await expect(avatar).toBeVisible();
  expect(await avatar.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('link[href$="/assets/css/main.css"]').evaluate((link) => link.sheet.cssRules.length)).toBeGreaterThan(0);
  if (testInfo.project.name === "desktop") {
    const sidebar = await page.locator(".sidebar").boundingBox();
    const content = await page.locator(".page__content").boundingBox();
    expect(sidebar.x + sidebar.width).toBeLessThanOrEqual(content.x);
  }
  await page.screenshot({ path: `output/playwright/academicpages-${testInfo.project.name}.png`, fullPage: true });
  expect(failures).toEqual([]);
});

test("navigation, theme switch and published links work", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const navigationToggle = page.locator("#site-nav > button");
  if (await navigationToggle.isVisible()) await navigationToggle.click();
  await page.locator('#site-nav a[href$="/publications/"]').click();
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: "Publications", exact: true })).toBeVisible();
  await page.locator("#theme-toggle a").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator("#theme-toggle a").click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
  for (const pathname of [
    "/",
    "/publications/",
    "/projects/",
    "/cv/",
    "/blog/",
    "/teaching/",
    "/talks/",
    "/sitemap/",
    "/sitemap.xml",
    "/feed.xml",
    "/robots.txt",
    "/404.html",
  ]) {
    const response = await request.get(`${preview}${pathname}`);
    expect(response.status(), pathname).toBe(200);
  }
  const markup = await page.content();
  expect(markup).not.toContain("/al-folio/");
  expect(markup).not.toContain("/dinorober-demir.github.io/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}/publications/`);
});
