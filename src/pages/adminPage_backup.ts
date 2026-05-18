import { BasePage } from './BasePage';
import { Locator, expect } from '@playwright/test';

export class AdminPage extends BasePage {
    get adminPanelButton(): Locator {
        return this.page.locator('button:not(.mobile-menu-item):has-text("Admin Panel")');
    }

    get enrollmentsTab(): Locator {
        return this.page.locator('button:not(.mobile-menu-item):has-text("Enrollments")');
    }

    get addEnrollUserButton(): Locator {
        return this.page.locator('button:has-text("+ Enroll User")');
    }

    get emailInput(): Locator {
        return this.page.locator('input[name="email"]');
    }

    get statusSelect(): Locator {
        return this.page.locator('select[name="status"]');
    }

    get groupSelect(): Locator {
        return this.page.locator('select[name="groupId"]');
    }

    get enrollForm(): Locator {
        return this.page.locator('form:has(button[type="submit"]:has-text("Enroll User"))');
    }

    get courseSelect(): Locator {
        return this.page.locator('form:has(button[type="submit"]:has-text("Enroll User")) select[required]');
    }

    get courseOptions(): Locator {
        return this.courseSelect.locator('option');
    }

    get submitEnrollButton(): Locator {
        return this.page.locator('form:has(button[type="submit"]:has-text("Enroll User")) button[type="submit"]');
    }

    get profileButton(): Locator {
        return this.page.locator('button.user-pill, button:has-text("Nkosi"), button:has-text("Profile"), [role="button"]:has-text("Nkosi")').first();
    }

    get adminPanelMenuItem(): Locator {
        return this.page.locator('button.user-pill + .nav-dropdown button:has-text("Admin Panel")');
    }

    async openAdminPanel() {
        await this.profileButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.clickElement(this.profileButton, { force: true });
        await expect(this.adminPanelMenuItem).toBeVisible({ timeout: 10000 });
        await this.clickElement(this.adminPanelMenuItem, { force: true });
        await expect(this.page.getByText('🔐 Admin Dashboard')).toBeVisible({ timeout: 10000 });
    }

    async goToEnrollments() {
        await this.clickElement(this.enrollmentsTab, { force: true });
        await expect(this.page.getByText('Manage Enrollments')).toBeVisible({ timeout: 10000 });
    }

    async openEnrollModal() {
        await this.clickElement(this.addEnrollUserButton, { force: true });
        await expect(this.enrollForm).toBeVisible({ timeout: 10000 });
        await this.courseSelect.waitFor({ state: 'visible', timeout: 10000 });
    }

    async filterStudentByEmail(email: string) {
        await this.emailInput.fill(email);
        await this.emailInput.press('Enter');
        await this.page.waitForTimeout(1000);
    }

    async enrollStudent(course: string) {
        await this.enrollForm.waitFor({ state: 'visible', timeout: 10000 });
        await this.courseSelect.waitFor({ state: 'visible', timeout: 10000 });
        await this.courseSelect.scrollIntoViewIfNeeded();

        const courseOption = this.courseOptions.filter({ hasText: course }).first();
        if (await courseOption.count() === 0) {
            const availableCourses = (await this.courseOptions.allTextContents())
                .map(text => text.trim())
                .filter(Boolean);
            throw new Error(`Course "${course}" not found in enrollment dropdown. Available courses: ${availableCourses.join(', ')}`);
        }

        await this.courseSelect.selectOption({ label: course });

        await this.page.waitForSelector('form:has(button[type="submit"]:has-text("Enroll User")) button[type="submit"]', { state: 'visible', timeout: 10000 });
        await this.clickElement(this.submitEnrollButton, { force: true });
        await this.page.waitForTimeout(2000);
    }

    async verifyStudentEnrollment() {
        // After enrollment submission, the modal should close and we should be back to the enrollments table
        await expect(this.enrollForm).not.toBeVisible({ timeout: 10000 });
        await expect(this.addEnrollUserButton).toBeVisible({ timeout: 10000 });
    }
}
