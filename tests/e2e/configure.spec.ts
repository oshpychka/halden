import { expect, test } from "@playwright/test";

test("start from the home page, pick a residence and keep the configuration", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "2 beds" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("link", { name: /Show my residences/ }).click();
  await expect(page).toHaveURL(/\/build\?mode=guided&step=2&beds=2/);

  const next = page.getByRole("button", { name: /^Next/ });
  await expect(next).toBeDisabled();
  await page
    .getByRole("radiogroup", { name: "Matching residences" })
    .getByRole("radio", { name: /Residence 19B/ })
    .click();
  await next.click();

  await expect(
    page.getByRole("heading", { name: "Make it yours" }),
  ).toBeVisible();
  const price = page
    .getByText("Your price")
    .locator("xpath=following-sibling::p[1]");
  await expect(price).toHaveText("$1,550,000");
  await page.getByRole("switch", { name: /Home office/ }).click();
  await page.getByRole("radio", { name: /Walnut/ }).click();
  await expect(price).toHaveText("$1,622,960");
  await expect(page).toHaveURL(/unit=19b&o=office&f=walnut$/);

  await page.reload();
  await expect(
    page.getByRole("switch", { name: /Home office/ }),
  ).toHaveAttribute("aria-checked", "true");
  await expect(price).toHaveText("$1,622,960");

  await next.click();
  await expect(
    page.getByRole("heading", { name: "Your residence" }),
  ).toBeVisible();
  await expect(page.getByText("Home office, Walnut finish")).toBeVisible();
});

test("switch to designing an own layout", async ({ page }) => {
  await page.goto("/build");
  await page.getByRole("radio", { name: /Design my own layout/ }).click();
  await page.getByRole("radio", { name: /Large/ }).click();
  await page.getByRole("button", { name: /^Next/ }).click();
  await expect(
    page.getByRole("heading", { name: "Arrange the rooms" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Bedroom", exact: true }).click();
  await expect(page).toHaveURL(/mode=custom&step=2&p=the-key&r=/);
});
