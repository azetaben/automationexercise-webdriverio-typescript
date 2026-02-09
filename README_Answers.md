Automation Test Approach – Senior Test Engineer Overview

I designed and implemented an industrial-standard WebdriverIO, Cucumber, and TypeScript automation framework for automationexercise.com. As part of this work, I reviewed the application, identified the six most critical end-to-end user journeys, and then selected four priority journeys to automate first. These were supported by detailed test cases and example automation scripts to demonstrate both coverage and framework capability.

Application Overview

Automation Exercise is a demo e-commerce web application that contains all the core functionality you would expect from a retail platform. This includes:

User registration and authentication

Product catalogue browsing and search

Shopping cart management

Checkout and order placement

Supporting pages such as Test Cases, API Testing, and Contact Us

From a regression perspective, the platform closely mirrors real-world e-commerce behaviour, making it well suited for demonstrating a robust automation framework.

Six Key End-to-End User Journeys Identified

Following a review of the site, I identified the following six high-value user journeys, which collectively provide strong regression coverage:

Register a new user account
(Signup → Account Created → Logged in)

Login and Logout
(Existing user authentication and session handling)

Browse products and view product details
(Product listing → Product detail page)

Search for products
(Search input → Results validation)

Add products to cart and validate cart contents
(Add item(s) → Quantity and totals verification)

Checkout and place an order
(Cart → Checkout → Payment → Order confirmation)

The Contact Us journey is also valuable, however for an e-commerce platform it is typically lower priority than revenue-critical user flows.

Four Priority Journeys Automated (and Why)

From the six journeys above, I selected the following four to automate first, based on risk, business value, and regression impact:

1. Register User

Validates the full onboarding flow for a new customer.

Creates a unique user that can be reused in downstream tests.

Enables dependent journeys such as checkout, order history, and account deletion.

2. Login and Logout

Authentication is a gateway to most application features.

Frequently impacted by changes to security, cookies, or session handling.

High risk and high visibility if broken.

3. Search and Add to Cart

Covers the critical discovery-to-conversion flow.

Exercises multiple components: catalogue, search results, product cards, modals, and cart state.

4. Checkout and Place Order

The most business-critical journey on the site.

Touches the highest number of integrations and page transitions.

Typically the most expensive flow to fail in production.

These journeys align directly with the site’s main navigation and checkout process, ensuring meaningful regression coverage.

Automation Framework Design (Industrial Standard)
Technology Stack

The framework follows modern automation best practices and is suitable for CI/CD environments:

WebdriverIO – test runner and browser automation

Cucumber – BDD feature files for readability and collaboration

TypeScript (strict mode) – type safety and maintainability

Page Object Model – reusable, stable page abstractions

Allure Reporting – rich, CI-friendly test reports

dotenv – environment configuration (local / CI)

ESLint, Prettier, Husky, lint-staged – code quality gates

Parallel execution and retries – stable and scalable test runs

Optional Docker support – consistent execution environments

Repository Structure

The repository is structured for clarity, scalability, and maintainability:

Feature files grouped by domain (auth, shopping)

Step definitions aligned directly to features

Page Objects split into pages and reusable components

Centralised hooks, test data factories, and utilities

Environment-specific WDIO configurations for local and CI execution

This structure supports both small test suites and long-term growth.

Test Data Strategy

Dynamic test data is generated using factory methods, ensuring:

Unique users per test run

No dependency on shared state

Reliable parallel execution

Reduced flakiness in CI

Automated Journeys – Detailed Test Cases
Journey 1: Register User

Objective: Verify a new user can successfully register and is logged in.

Steps & Expected Results:

User navigates to the home page – page loads successfully.

User selects Signup / Login – login/signup page is displayed.

User enters name and a unique email – no validation errors occur.

User submits the signup form – account details page opens.

Mandatory fields are completed – form accepts valid data.

Account is created – Account Created confirmation is displayed.

User continues – user is logged in and visible in the header.

Journey 2: Login and Logout

Objective: Ensure an existing user can log in and log out reliably.

Steps & Expected Results:

User navigates to Signup / Login – login form is visible.

Valid credentials are entered – login succeeds.

Logged-in status is confirmed in the header.

User logs out – session ends and login page is displayed.

Journey 3: Search Product and Add to Cart

Objective: Validate product search and cart behaviour.

Steps & Expected Results:

User navigates to Products – product listing page is displayed.

User searches for a keyword – relevant search results appear.

User adds a product to the cart – confirmation modal appears.

User views the cart – product is present with correct quantity.

Journey 4: Checkout and Place Order

Objective: Validate the full end-to-end checkout flow.

Preconditions: User is logged in and has at least one item in the cart.

Steps & Expected Results:

Cart is opened – selected items are displayed.

User proceeds to checkout – address and order review are shown.

User places the order – payment page is displayed.

Payment details are entered – order confirmation is shown.

Why This Is “Industrial Standard”

This framework aligns with real-world CI automation expectations:

Robust selectors and maintainable Page Objects

Explicit waits only – no hard sleeps

Full test isolation and clean state management

Scalable parallel execution with controlled retries

Rich reporting and artefact capture on failure

CI-ready configuration with linting and formatting gates

Overall, the solution demonstrates practical, production-ready automation, suitable for long-term maintenance and continuous delivery environments.