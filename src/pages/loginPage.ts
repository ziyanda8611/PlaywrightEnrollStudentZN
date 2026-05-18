import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    get emailInput(): Locator {
        return this.page.locator('#login-email');
    }

    get passwordInput(): Locator {
        return this.page.locator('#login-password');
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.navigateTo('/');
        await this.page.evaluate(() => {
            const burger = document.querySelector('button.nav-burger');
            if (burger) (burger as HTMLElement).click();
        });
        await this.page.waitForTimeout(500);
        await this.page.evaluate(() => {
            const loginButton = Array.from(document.querySelectorAll('button.mobile-menu-item')).find(button => button.textContent?.includes('Login / Sign Up'));
            if (loginButton) (loginButton as HTMLElement).click();
        });
        await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    }

    async login(email: string, password: string) {
        await this.enterText(this.emailInput, email);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }
}
