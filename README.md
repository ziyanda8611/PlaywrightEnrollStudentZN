"# Playwright Student Enrollment Test Automation

This project contains automated tests for testing student enrollment functionality using Playwright with the Page Object Model (POM) design pattern.

## Project Structure

```
PlaywrightEnrollStudentZN/
├── pages/                  # Page Object Model classes
│   ├── BasePage.ts        # Base page class with common methods
│   ├── AdminLoginPage.ts  # Admin login page object
│   ├── AdminPanelPage.ts  # Admin panel page object
│   ├── EnrollmentsPage.ts # Enrollments management page object
│   ├── StudentLoginPage.ts # Student login page object
│   └── index.ts           # Export all pages
├── tests/                  # Test files
│   └── enrollStudent.spec.ts # Student enrollment test cases
├── data/                   # Test data and configuration
│   └── testData.ts        # Test data (credentials, URLs)
├── utils/                  # Utility functions (if needed)
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation

1. Navigate to the project directory:
   ```bash
   cd PlaywrightEnrollStudentZN
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

### Test Data
Update test credentials in [data/testData.ts](data/testData.ts):
```typescript
export const testData = {
  adminUser: {
    username: 'admin',
    password: '@12345678',
  },
  studentUser: {
    username: 'student',
    password: '@12345678',
  },
  applicationUrl: 'https://ndosisimplifiedautomation.vercel.app/',
};
```

### Browser Configuration
Update [playwright.config.ts](playwright.config.ts) to configure:
- Base URL
- Browser types (Chromium, Firefox, WebKit)
- Trace and screenshot settings
- Report type

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in UI mode
```bash
npm run test:ui
```

### View test report
```bash
npm run test:report
```

## Test Cases

### Happy Path Test: Enroll a Student to a Course
**Location**: [tests/enrollStudent.spec.ts](tests/enrollStudent.spec.ts)

**Steps**:
1. Login as admin account (username: admin, password: @12345678)
2. Navigate to admin panel
3. Click on Enrollments section
4. Enroll student account to a course (e.g., JavaScript Basics)
5. Logout and login as student
6. Verify student is enrolled in the course on their dashboard

**Expected Result**: Student successfully enrolled and can see the course in their dashboard

### Happy Path Test: Verify Enrolled Courses on Dashboard
**Location**: [tests/enrollStudent.spec.ts](tests/enrollStudent.spec.ts)

**Steps**:
1. Login as student account
2. Navigate to student dashboard
3. View enrolled courses

**Expected Result**: Dashboard displays enrolled courses

## Page Object Model Structure

### BasePage
Base class containing common methods used across all pages:
- `goto()` - Navigate to URL
- `click()` - Click element
- `fill()` - Fill input field
- `isVisible()` - Check if element is visible
- `waitForSelector()` - Wait for element to appear
- `selectOption()` - Select dropdown option

### AdminLoginPage
Handles admin login functionality:
- `navigateToLogin()` - Go to login page
- `login()` - Complete login process
- `isLoginPageVisible()` - Verify login page is displayed

### AdminPanelPage
Handles admin panel interactions:
- `isAdminPanelVisible()` - Verify admin panel loaded
- `navigateToEnrollments()` - Click to enrollments section
- `getPageTitle()` - Get current page title

### EnrollmentsPage
Handles enrollment management:
- `isEnrollmentsPageVisible()` - Verify page is loaded
- `clickEnrollButton()` - Click enroll button
- `selectStudent()` - Select student from dropdown
- `selectCourse()` - Select course from dropdown
- `submitEnrollment()` - Submit enrollment
- `enrollStudentToCourse()` - Complete enrollment flow
- `isEnrollmentSuccessful()` - Verify enrollment success

### StudentLoginPage
Handles student login and dashboard:
- `login()` - Student login process
- `isStudentDashboardVisible()` - Verify dashboard loaded
- `isEnrolledInCourse()` - Check if enrolled in specific course
- `getEnrolledCourses()` - Get list of enrolled courses

## Important Notes

1. **Course Names**: The test currently uses 'JavaScript Basics' as the course name. You may need to update this based on available courses in the application.

2. **Selectors**: The selectors in page objects use flexible locator strategies to adapt to different page layouts. You may need to adjust selectors based on actual application structure.

3. **Student Account**: Ensure a student account exists in the system before running enrollment tests.

4. **Happy Path Only**: These tests focus on the happy path (positive scenarios) with valid credentials and proper flow.

## Troubleshooting

### Tests fail with selector not found
- Inspect the application UI using Playwright Inspector (`npm run test:debug`)
- Update selectors in corresponding page objects
- Use more flexible selectors if the UI changes dynamically

### Login fails
- Verify credentials in testData.ts
- Check if the application URL is correct
- Ensure the login flow matches the page objects

### Enrollment fails
- Verify that students and courses exist in the application
- Check course name spelling in the test
- Inspect the enrollments page structure

## Next Steps

1. Update test data with actual student/admin accounts
2. Inspect the application to identify correct selectors for course names
3. Add more test cases (negative scenarios, edge cases)
4. Implement additional page objects for other features
5. Set up CI/CD integration for automated test runs

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Playwright Test Fixtures](https://playwright.dev/docs/api/class-test)" 
