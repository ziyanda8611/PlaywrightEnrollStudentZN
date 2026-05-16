import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class StudentLoginPage extends BasePage {
  readonly landingLoginButton = 'button.user-pill';
  readonly usernameInput = 'input[name="loginEmail"]';
  readonly passwordInput = 'input[name="loginPassword"]';
  readonly loginButton = 'button:has-text("Login")';
  readonly dashboardContent = '[role="main"], main, .dashboard, .student-dashboard';
  readonly enrollmentsList = 'table, [role="table"], .enrollments-list, .courses-list';
  readonly courseCard = '.course-card, [role="article"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.page.goto('/');
    await this.waitForLoadState();

    const loginButton = this.page.locator(this.landingLoginButton).first();
    if (await loginButton.count() > 0) {
      await loginButton.click();
      await this.page.locator(this.usernameInput).waitFor({ state: 'visible', timeout: 10000 });
    }
  }

  async enterUsername(username: string) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.navigateToLogin();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await Promise.race([
      this.page.locator(this.usernameInput).waitFor({ state: 'hidden', timeout: 10000 }),
      this.page.waitForURL('**/*', { timeout: 10000 }),
    ]);
  }

  async isStudentDashboardVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardContent);
  }

  async isEnrolledInCourse(courseName: string): Promise<boolean> {
    try {
      const enrollmentsList = await this.page.locator(this.enrollmentsList).first();
      return await enrollmentsList.locator(`text="${courseName}"`).isVisible();
    } catch (e) {
      // Try to find course in course cards
      return await this.page.locator(`text="${courseName}"`).isVisible();
    }
  }

  async getEnrolledCourses(): Promise<string[]> {
    const courseElements = await this.page.locator(this.courseCard).all();
    const courses: string[] = [];
    
    for (const element of courseElements) {
      const text = await element.textContent();
      if (text) {
        courses.push(text.trim());
      }
    }
    
    return courses;
  }
}
