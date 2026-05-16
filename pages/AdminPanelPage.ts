import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPanelPage extends BasePage {
  readonly enrollmentsLink = 'button:has-text("Explore Courses"), text=Courses, a:has-text("Courses")';
  readonly enrollButton = 'button:has-text("Enroll")';

  constructor(page: Page) {
    super(page);
  }

  async isAdminPanelVisible(): Promise<boolean> {
    const url = this.page.url();
    const hasCourseButton = await this.page.locator(this.enrollButton).count() > 0;
    return url.includes('/courses') || url.includes('/dashboard') || hasCourseButton;
  }

  async navigateToEnrollments() {
    const enrollmentsLink = this.page.locator(this.enrollmentsLink).first();
    if (await enrollmentsLink.count() > 0 && await enrollmentsLink.isVisible()) {
      await enrollmentsLink.click();
      await this.waitForLoadState('networkidle');
      return;
    }

    await this.page.goto('/courses');
    await this.waitForLoadState('networkidle');
  }
}
