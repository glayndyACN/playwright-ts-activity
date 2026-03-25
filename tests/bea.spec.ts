import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});

test('Playwright Activity - Bea', async ({ page }) => {
    // 1. Locator Syntax Rules
    await page.locator('input[placeholder="Jane Doe"]').fill('Jane Doe'); // Locate by tag and placeholder
    await page.locator('nb-card', { hasText: "Inline form" }).locator('button.appearance-filled:has-text("Submit")').click(); // Click SUBMIT by text and class

    // 2. User-Facing Locators
    const usingGridForm = page.locator('nb-card', { hasText: "Using the Grid" });
    await usingGridForm.getByRole('textbox', { name: "Email" }).fill('bea@accenture.com');
    await usingGridForm.getByRole('textbox', { name: "Password" }).fill('123456567');
    
    await page.locator('nb-card', { hasText: "Block form" }).getByPlaceholder('First Name').fill('Chai');
    await page.locator('nb-card', { hasText: "Form without labels" }).getByText('Send').click();

    // 3. Locating Child Elements
    await usingGridForm.getByRole('radio', { name: 'Option 2' }).click({ force: true });
    await page.locator('nb-card', { hasText: "Horizontal form" }).getByRole('button', { name: "Sign in" }).click();

    // 4. Locating Parent Elements & 5. Reuse Locators
    const basicFormCard = page.locator('nb-card', { hasText: "Basic form" });
    const emailField = basicFormCard.getByRole('textbox', { name: "Email address" });
    const passwordField = basicFormCard.getByRole('textbox', { name: "Password" });
    const submitBtn = basicFormCard.getByRole('button', { name: "Submit" });

    await emailField.fill('mark@tahimik.com');
    await passwordField.fill('143526@!');
    await submitBtn.click();

    await emailField.fill('asasafggfg@fed.com');
    await passwordField.fill('yusdsada12345!');
    await submitBtn.click();

    await emailField.fill('youtube@fb.com');
    await passwordField.fill('qwerty1234@');
    await submitBtn.click();
});