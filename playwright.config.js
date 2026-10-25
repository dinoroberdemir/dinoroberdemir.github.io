const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "test",
  use: {
    baseURL: "https://dinoroberdemir.github.io",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "python -m http.server 4173 --bind 127.0.0.1 --directory _site",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1366, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
