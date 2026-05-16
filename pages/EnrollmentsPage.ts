import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EnrollmentsPage extends BasePage {
  readonly enrollButton = 'button:has-text("Enroll")';
  readonly successMessage = 'text=Payment ready, text=Payment Ready';

  constructor(page: Page) {
    super(page);
  }

  async isEnrollmentsPageVisible(): Promise<boolean> {
    await this.waitForLoadState('networkidle');
    return (await this.page.locator(this.enrollButton).count()) > 0;
  }

  async enrollFirstAvailableCourse() {
    const button = this.page.locator(this.enrollButton).first();
    await button.click();
    await this.waitForLoadState('networkidle');
  }

  async isEnrollmentSuccessful(): Promise<boolean> {
    try {
      return await this.page.locator(this.successMessage).isVisible();
    } catch (e) {
      return false;
    }
  }
}
