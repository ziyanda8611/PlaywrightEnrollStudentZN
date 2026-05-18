import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { AdminPage } from '../pages/adminPage';
import { StudentPage } from '../pages/studentPage';

type CustomFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    adminPage: AdminPage;
    studentPage: StudentPage;
};

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page));
    },

    studentPage: async ({ page }, use) => {
        await use(new StudentPage(page));
    }
});

export { expect } from '@playwright/test';
