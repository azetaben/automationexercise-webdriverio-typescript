# WebdriverIO Cucumber TypeScript Framework

This is a robust, industrial-standard test automation framework built with **WebdriverIO**, **Cucumber**, and *
*TypeScript**. It follows the **Page Object Model (POM)** design pattern and includes advanced features for logging,
reporting, accessibility testing, and performance metrics.

## 🚀 Key Features

* **Page Object Model (POM):** Centralized `PageManager` for clean, lazy-loaded access to page objects.
* **Robust Interactions:** Smart element interactions (`smartClick`) that automatically handle scrolling, waiting, and
  dismissing intrusive ads/overlays.
* **Cross-Browser Support:** Easy switching between Chrome, Firefox, and Edge via environment variables.
* **Advanced Logging:**
    * **Console:** Real-time colored logs.
    * **File:** Unique, timestamped log files generated for *each individual test scenario*.
* **Reporting:** Integrated **Allure Report** with automatic generation and opening after test runs. Screenshots are
  automatically attached on failure.
* **Accessibility Testing:** Integrated **Axe-core** for automated accessibility audits.
* **Performance Testing:** Utilities to measure page load times and capture Chrome DevTools Performance metrics.
* **Ad Blocking:** Browsers are configured with aggressive options to block ads, pop-ups, and notifications for stable
  execution.

## Prerequisites

* **Node.js:** v16 or higher
* **Java (JDK):** Required for generating Allure reports.

## 📦 Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running Tests

### Default Run (Chrome)

Runs all feature files using Google Chrome.

```bash
npm run wdio
```

### Run Specific Feature

To run a specific feature file:

```bash
npm run wdio -- --spec src/features/user_registration.feature
```

### Cross-Browser Testing

You can switch browsers using the `BROWSER` environment variable. Supported values: `chrome`, `firefox`, `edge`.

**Windows (Command Prompt):**

```bash
set BROWSER=firefox && npm run wdio
```

**Mac / Linux / Git Bash:**

```bash
BROWSER=edge npm run wdio
```

### Run & Generate Report (All-in-One)

This script runs the tests, generates the Allure report, and opens it automatically.

```bash
npm test
```

## 📂 Project Structure

```
src/
├── features/                   # Gherkin feature files (.feature)
│   ├── user_login.feature
│   ├── checkout_e2e.feature
│   └── ...
├── pageobjects/                # Page Object classes
│   ├── Page.ts                 # Base page with reusable methods
│   ├── PageManager.ts          # Central access point for pages
│   ├── HomePage.ts
│   └── ...
├── step-definitions/           # Step definitions (.ts)
│   ├── Auth.steps.ts
│   ├── cart.steps.ts
│   └── ...
└── support/
    ├── hooks.ts                # Cucumber hooks (Before/After scenario)
    └── utils/                  # Helper utilities
        ├── driver/             # Browser configuration & factory
        ├── actions/            # Reusable element actions
        ├── logger.ts           # Winston logger setup
        ├── LogManager.ts       # Per-scenario log management
        ├── accessibilityChecker.ts
        └── performanceUtils.ts
```

## 📊 Reporting & Logging

### Allure Report

After a run, reports are generated in the `allure-report` folder.
To manually generate and open the report:

```bash
npm run allure:generate
npm run allure:open
```

### Logs

Logs are stored in the `logs/` directory at the project root.

* A new log file is created for **every single scenario** executed.
* Format: `scenario_name_TIMESTAMP.log`

## 🛠️ Utilities Usage

### Accessibility Check

In your step definitions:

```typescript
import AccessibilityChecker from '../support/utils/accessibilityChecker';

// Check entire page
await AccessibilityChecker.checkAccessibility();

// Check specific element with specific rules
await AccessibilityChecker.checkAccessibility({
    context: await PageManager.homePage.header,
    tags: ['wcag2aa']
});
```

### Performance Check

```typescript
import PerformanceUtils from '../support/utils/performanceUtils';

// Measure page load time
const loadTime = await PerformanceUtils.measurePageLoadTime(url);
```
