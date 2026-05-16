import { test, expect } from '@playwright/test';
import {
  AdminLoginPage,
  AdminPanelPage,
  EnrollmentsPage,
  StudentLoginPage,
} from '../pages';
import { testData } from '../data/testData';

test.describe('Student Enrollment Tests', () => {
  test('Happy Path: Enroll a student to a course', async ({ page }) => {
    // Step 1: Login as admin
    const adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.login(testData.adminUser.email, testData.adminUser.password);

    // Verify admin is logged in (check for admin panel)
    const adminPanelPage = new AdminPanelPage(page);
    const isAdminPanelVisible = await adminPanelPage.isAdminPanelVisible();
    expect(isAdminPanelVisible).toBeTruthy();

    // Step 2: Navigate to Enrollments
    await adminPanelPage.navigateToEnrollments();

    // Step 3: Verify Enrollments page is visible
    const enrollmentsPage = new EnrollmentsPage(page);
    const isEnrollmentsPageVisible = await enrollmentsPage.isEnrollmentsPageVisible();
    expect(isEnrollmentsPageVisible).toBeTruthy();

    // Step 4: Enroll the first available course for the logged-in user
    await enrollmentsPage.enrollFirstAvailableCourse();

    // Verify enrollment was successful
    const isEnrollmentSuccessful = await enrollmentsPage.isEnrollmentSuccessful();
    expect(isEnrollmentSuccessful).toBeTruthy();

    // Step 5: Logout admin and login as student to verify enrollment
    // Navigate to logout (you may need to adjust this based on the application)
    await page.goto('/');

    // Login as student
    const studentLoginPage = new StudentLoginPage(page);
    await studentLoginPage.login(testData.studentUser.email, testData.studentUser.password);

    // Verify student dashboard is visible
    const isStudentDashboardVisible = await studentLoginPage.isStudentDashboardVisible();
    expect(isStudentDashboardVisible).toBeTruthy();

    // Verify the student is enrolled in the course
    const isEnrolledInCourse = await studentLoginPage.isEnrolledInCourse('JavaScript Basics');
    expect(isEnrolledInCourse).toBeTruthy();
  });

  test('Happy Path: Verify student can access courses after login', async ({ page }) => {
    // Login as student
    const studentLoginPage = new StudentLoginPage(page);
    await studentLoginPage.login(testData.studentUser.email, testData.studentUser.password);

    // Navigate to courses and ensure at least one enrollable course is visible
    await page.goto('/courses');
    await page.waitForLoadState('networkidle');
    const availableCourses = await page.locator('button:has-text("Enroll")').count();
    expect(availableCourses).toBeGreaterThan(0);
  });
});
