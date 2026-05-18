import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class StudentPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async verifyCourseEnrolled(courseName: string) {
        await expect(this.page.getByText(courseName)).toBeVisible({ timeout: 10000 });
    }
}
