import { test } from '../src/fixtures/customFixtures';
import { testData } from '../src/data/testData';

test('Admin login succeeds', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(testData.adminUser.email, testData.adminUser.password);
});