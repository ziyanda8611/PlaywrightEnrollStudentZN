import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async waitForURL(url: string | RegExp) {
    await this.page.waitForURL(url);
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load') {
    await this.page.waitForLoadState(state);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async fillAndSubmit(selector: string, text: string) {
    await this.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async press(selector: string, key: string) {
    await this.page.press(selector, key);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async waitForNavigation() {
    await this.page.waitForNavigation();
  }
}
