import { expect, test } from "@playwright/test";

test("filters live in the URL and follow the back button", async ({
  page,
  isMobile,
}) => {
  await page.goto("/residences");
  if (isMobile) await page.getByRole("button", { name: "Filters" }).click();

  const count = page.getByText(/^\d+ residences?$/);
  const total = await count.textContent();

  await page.getByRole("button", { name: "2 bed", exact: true }).click();
  await expect(page).toHaveURL(/beds=2/);
  const twoBed = await count.textContent();
  expect(twoBed).not.toBe(total);

  await page.getByRole("button", { name: "Bay and skyline" }).click();
  await expect(page).toHaveURL(/beds=2&view=bay-skyline/);
  await expect(count).toHaveText("0 residences");
  await expect(
    page.getByText("No residences match these filters."),
  ).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/beds=2$/);
  await expect(count).toHaveText(twoBed!);

  await page.reload();
  await expect(count).toHaveText(twoBed!);
});
