import { defineConfig, devices } from "@playwright/test";

// A dedicated port so E2E runs never collide with `npm run dev` on 3000.
const port = Number(process.env.E2E_PORT ?? 3100);
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Test against the production build, as recommended by the Next.js docs.
  webServer: {
    // CI builds in a prior step, so only start the server there.
    command: process.env.CI
      ? `npm run start -- --port ${port}`
      : `npm run build && npm run start -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
