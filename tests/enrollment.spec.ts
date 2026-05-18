import { test } from '../src/fixtures/customFixtures';
import { testData } from '../src/data/testData';

const enrollmentConfig = { courseName: 'My Dummy Course' };

const { adminUser, studentUser } = testData;

test.describe('Playwright Assessment - Enrol a student to a course', () => {
    test('admin enrolls a student and the student validates the course', async ({ page, loginPage, adminPage, studentPage }) => {
        await loginPage.goto();
        await loginPage.login(adminUser.email, adminUser.password);

        await adminPage.openAdminPanel();
        await adminPage.goToEnrollments();
        await adminPage.openEnrollModal();
        await adminPage.filterStudentByEmail(adminUser.email, 'nonadmin@gmail.com');
        await adminPage.enrollStudent(enrollmentConfig.courseName);
        await adminPage.verifyStudentEnrollment();

        page.once('dialog', dialog => dialog.accept());
        await page.locator('button', { hasText: 'Logout' }).first().click();

        await loginPage.goto();
        await loginPage.login(studentUser.email, studentUser.password);
        await studentPage.verifyCourseEnrolled(enrollmentConfig.courseName);
    });
});