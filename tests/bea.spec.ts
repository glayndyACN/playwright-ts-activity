import { test, expect } from '@playwright/test';

test.only('Playwright Activity - Bea', async ({ page }) => {
  await page.goto('http://localhost:4200/');


  await page.locator('input[placeholder="Jane Doe"]').fill('Jane Doe');
  await page.locator('button.appearance-filled').click();


  const forms = page.locator('form');

  const usingTheGridForm = forms.nth(1);
  await usingTheGridForm.locator('input').nth(0).fill('bea@example.com');
  await usingTheGridForm.locator('input').nth(1).fill('Password123');

  const basicFormCard = forms.nth(2);
  await basicFormCard.locator('input[type="checkbox"]').check();

  const blockForm = forms.nth(3);
  await blockForm.getByPlaceholder('First Name').fill('Bea');

  await forms.nth(4).getByText('Send').click();

  
  await usingTheGridForm.locator('input[type="radio"]').nth(1).check();
  await forms.nth(5).getByRole('button', { name: 'Sign in' }).click();

  
  await basicFormCard.locator('input').nth(0).fill('bea1@email.com');
  await basicFormCard.locator('input').nth(1).fill('Pass1234');
  await basicFormCard.getByRole('button', { name: 'Submit' }).click();

  // 5. Reuse Locators
  const emailField = basicFormCard.locator('input').nth(0);
  const passwordField = basicFormCard.locator('input').nth(1);
  const submitButton = basicFormCard.getByRole('button', { name: 'Submit' });

  await emailField.fill('bea2@email.com');
  await passwordField.fill('SecondPass123');
  await submitButton.click();

  await emailField.fill('bea3@email.com');
  await passwordField.fill('ThirdPass123');
  await submitButton.click();
});