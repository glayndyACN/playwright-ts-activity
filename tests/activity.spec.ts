import { test, expect } from '@playwright/test';

test.describe('Multi-Form Interaction Activity', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Forms → Form Layouts page in the app
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('1. Locator syntax rules: fill "Jane Doe" and submit Inline form', async ({ page }) => {
    const inlineFormCard = page.locator('nb-card', { hasText: 'Inline form' });

    // Locate and fill the "Jane Doe" input by tag name and placeholder
    await inlineFormCard.locator('input[placeholder="Jane Doe"]').fill('Jane Doe');

    // Click the "SUBMIT" button in the Inline form (button text is "SUBMIT")
    await inlineFormCard.getByRole('button', { name: 'SUBMIT' }).click();
  });

  test('2. User-facing locators across multiple forms', async ({ page }) => {
    // Using the Grid form – use getByRole to fill Email and Password
    const usingGridCard = page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingGridCard.getByRole('textbox', { name: 'Email' }).fill('grid@example.com');
    await usingGridCard.getByRole('textbox', { name: 'Password' }).fill('grid-password');
    // Basic form – use getByLabel to check "Check me out"
    const basicFormCard = page.locator('nb-card', { hasText: 'Basic form' });
    await basicFormCard.getByLabel('Check me out').check({force:true});
    // Block form – use getByPlaceholder to fill First Name
    const blockFormCard = page.locator('nb-card', { hasText: 'Block form' });
    await blockFormCard.getByPlaceholder('First Name').fill('John');
    // Form without labels – click "SEND" using getByText
    const formWithoutLabelsCard = page.locator('nb-card', { hasText: 'Form without labels' });
    await formWithoutLabelsCard.getByText('SEND', { exact: false }).click();
  });

test('3. Locate child elements: radio and SIGN IN button', async ({ page }) => {
    // Within "Using the Grid" card, select the "Option 2" radio button
    const usingGridCard = page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingGridCard.getByLabel('Option 2').check({force: true});
    // Click the SIGN IN button inside the "Horizontal form" card
    const horizontalFormCard = page.locator('nb-card', { hasText: 'Horizontal form' });
    await horizontalFormCard.getByRole('button', { name: /sign in/i }).click();
  });

test('4. Locate parent elements with hasText and submit Basic form', async ({ page }) => {
    // Locate the card containing "Basic form" using hasText
    const basicFormCard = page.locator('nb-card', { hasText: 'Basic form' });
    // Within that card, fill Email address and Password, then click SUBMIT
    await basicFormCard.getByPlaceholder('Email').fill('basic@example.com');
    await basicFormCard.getByPlaceholder('Password').fill('basic-password');
    await basicFormCard.getByRole('button', { name: /submit/i }).click();
  });

test('5. Reuse locators for Basic form multiple submissions', async ({ page }) => {
    // Store the "Basic form" card and its inputs in variables
    const basicFormCard = page.locator('nb-card', { hasText: 'Basic form' });
    const emailInput = basicFormCard.getByPlaceholder('Email');
    const passwordInput = basicFormCard.getByPlaceholder('Password');
    const submitButton = basicFormCard.getByRole('button', { name: /submit/i });
    // First submission
    await emailInput.fill('first@example.com');
    await passwordInput.fill('first-password');
    await submitButton.click();
    // Second submission with different values, reusing the same locators
    await emailInput.fill('second@example.com');
    await passwordInput.fill('second-password');
    await submitButton.click();
  });
});
