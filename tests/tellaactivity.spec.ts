import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
});

test('Playwright Activity - Tella', async ({page}) => {
    await page.getByPlaceholder('Jane Doe').fill('Jane Doe');
    await page.locator('nb-card',{hasText:"Inline form"}).locator('button.appearance-filled:has-text("Submit")').click();

    const usingGridForm = page.locator('nb-card', {hasText: "Using the Grid"});
    await usingGridForm.getByRole('textbox',{name:"Email"}).fill('tellaqty@ediwow.com');
    await usingGridForm.getByRole('textbox',{name:"Password"}).fill('passwordkotowagmoisee');

    const basicFormCard = page.locator('nb-card',{hasText:"Basic form"});
    await basicFormCard.locator('nb-checkbox').click();

    const blockForm = page.locator('nb-card',{hasText:"Block form"});
    await blockForm.getByPlaceholder('First Name').fill('HiGDHowRU');

    await page.locator('nb-card',{hasText:"Form without labels"}).getByText('Send').click();

    await usingGridForm.getByRole('radio', { name: 'Option 2' }).click({force: true});
    await page.locator('nb-card',{hasText:"Horizontal form"}).getByRole('button',{name:"Sign in"}).click();

    await basicFormCard.getByRole('textbox',{name:"Email address"}).fill('gorgeousmarie@ibaka.com');
    await basicFormCard.getByRole('textbox',{name:"Password"}).fill('GDlangsakalam');
    await basicFormCard.getByRole('button',{name:"Submit"}).click();

    const basicForm = page.locator('nb-card',{hasText:"Basic form"});
    const emailField = basicForm.getByRole('textbox',{name:"Email address"});
    const passwordField = basicForm.getByRole('textbox',{name:"Password"});
    const submitBtn = basicForm.getByRole('button',{name:"Submit"});

    await emailField.fill('shavouge@jishas.com');
    await passwordField.fill('KahuluganMeaning');
    await submitBtn.click();
 
    await emailField.fill('rhicapear@bossto.com');
    await passwordField.fill('bosskotowagmoawayin');
    await submitBtn.click();
})