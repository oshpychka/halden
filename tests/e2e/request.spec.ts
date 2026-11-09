import { expect, test } from "@playwright/test";

test("request form validates and confirms", async ({ page }) => {
  await page.goto("/#request");
  const form = page.locator("#request form");
  const submit = form.getByRole("button", { name: "Request a presentation" });

  await submit.click();
  await expect(form.getByText("Enter your full name.")).toBeVisible();
  await expect(
    form.getByText("Enter a 10-digit US phone number."),
  ).toBeVisible();
  await expect(
    form.getByText("Please agree so we can contact you."),
  ).toBeVisible();
  await expect(form.getByLabel("Full name")).toBeFocused();

  await form.getByLabel("Full name").fill("Maya Lindgren");
  await form.getByLabel("Phone").fill("3055550187");
  await expect(form.getByLabel("Phone")).toHaveValue("(305) 555-0187");
  await form.getByLabel("Email").fill("maya@example.com");
  await form.getByText("I agree to be contacted").click();
  await submit.click();

  await expect(page.getByText("Thank you, Maya.")).toBeVisible();
});
