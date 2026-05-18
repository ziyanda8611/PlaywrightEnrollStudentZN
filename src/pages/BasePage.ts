import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        console.log(`Navigating to ${url}`);
        await this.page.goto(url);
    }

    async clickElement(locator: Locator, options?: { force?: boolean }) {
        console.log(`Clicking on element: ${locator}`);
        if (options?.force) {
            await locator.click({ force: true });
            return;
        }
        await locator.scrollIntoViewIfNeeded();
        await locator.click();
    }

    async enterText(locator: Locator, text: string) {
        console.log(`Entering text: "${text}" into element: ${locator}`);
        await locator.scrollIntoViewIfNeeded();
        await locator.fill(text);
    }

    async verifyElementVisible(locator: Locator) {
        console.log(`Verifying element is visible: ${locator}`);
        await expect(locator).toBeVisible();
    }
}
