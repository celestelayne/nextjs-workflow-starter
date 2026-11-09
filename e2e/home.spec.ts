import { expect, test } from "@playwright/test";

test("starter page shows the template name and workflow steps", async ({
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle("next-workflow-starter");
  await expect(
    page.getByRole("heading", { level: 1, name: "next-workflow-starter" }),
  ).toBeVisible();
  await expect(page.getByText("/create-slice")).toBeVisible();
});
