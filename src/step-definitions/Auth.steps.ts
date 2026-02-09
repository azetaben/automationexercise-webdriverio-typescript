import {Given, Then, When} from "@wdio/cucumber-framework";
import PageManager from "../pageobjects/PageManager";
import {expect} from "chai";

// --- Login ---

When(/^I enter correct email "(.*)" and password "(.*)"$/, async (email, password) => {
    await PageManager.authPage.login(email, password);
});

When(/^I enter incorrect email "(.*)" and password "(.*)"$/, async (email, password) => {
    await PageManager.authPage.login(email, password);
});

Then(/^I should see the error message "(.*)"$/, async (message: string) => {
    if (message.includes("email or password")) {
        const actual = await PageManager.authPage.getLoginErrorMessageText();
        expect(actual).to.equal(message);
    } else {
        const actual = await PageManager.authPage.getSignupErrorMessageText();
        expect(actual).to.equal(message);
    }
});

Then(/^I should be logged in as "(.*)"$/, async (username: string) => {
    const loggedInText = await PageManager.topNavigationBarPage.getLoggedInAsText();
    expect(loggedInText).to.include(username);
});

When(/^I click 'Logout' button$/, async () => {
    await PageManager.topNavigationBarPage.clickNavLinkByText("Logout");
});

// --- Delete Account ---

When(/^I click 'Delete Account' button$/, async () => {
    await PageManager.topNavigationBarPage.clickNavLinkByText("Delete Account");
});

Then(/^'ACCOUNT DELETED!' is visible$/, async () => {
    const isVisible = await PageManager.deletedAccountPage.isAccountDeletedVisible();
    expect(isVisible).to.be.true;
});

// --- Contact Us ---

When(/^I enter name "(.*)", email "(.*)", subject "(.*)" and message "(.*)"$/, async (name, email, subject, message) => {
    await PageManager.contactUsPage.submitContactForm(name, email, subject, message);
});

When(/^I upload file "(.*)"$/, async (filePath: string) => {
    await PageManager.contactUsPage.uploadFile(filePath);
});

When(/^I click 'Submit' button$/, async () => {
    await PageManager.contactUsPage.clickSubmit();
});

When(/^I click 'OK' button$/, async () => {
    await PageManager.contactUsPage.acceptAlert();
});

Then(/^I should see the success message 'Success! Your details have been submitted successfully.'$/, async () => {
    const isVisible = await PageManager.contactUsPage.isSuccessMessageVisible();
    expect(isVisible).to.be.true;
});

When(/^I click 'Home' button$/, async () => {
    await PageManager.contactUsPage.clickHomeButton();
});

// --- Additional Steps from your request ---

Given('I am on the home page', async () => {
    await PageManager.homePage.openHome();
});

// Fixed: Escaped the forward slash to prevent Cucumber expression error
When('I navigate to Signup \\/ Login', async () => {
    await PageManager.topNavigationBarPage.clickNavLinkByText('Signup / Login');
});

When('I sign up with a unique user', async () => {
    const name = `User${Date.now()}`;
    const email = name + "@example.com";
    const password = "password123";

    await PageManager.authPage.startSignup(name, email);

    // Fill with default data
    await PageManager.signupPage.fillSignupForm({
        title: 'Mr',
        password: password,
        day: '1',
        month: 'January',
        year: '2000',
        firstName: 'Test',
        lastName: 'User',
        company: 'TestCo',
        address1: '123 Test St',
        address2: 'Apt 1',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '1234567890'
    });

    await PageManager.signupPage.clickCreateAccountButton();
});

Then('I should see account created confirmation', async () => {
    const isVisible = await PageManager.accountCreatedPage.isAccountCreatedMessageVisible();
    expect(isVisible).to.be.true;
});

Then('I should be logged in as the created user', async () => {
    await PageManager.accountCreatedPage.clickContinueButton();
    const isVisible = await PageManager.topNavigationBarPage.isLoggedInBannerVisible();
    expect(isVisible).to.be.true;
});

When('I login with valid credentials', async () => {
    const email = process.env.AE_EMAIL || "webdriverio@aol.com";
    const password = process.env.AE_PASSWORD || "Password";
    await PageManager.authPage.login(email, password);
});

Then('I should be logged in', async () => {
    const isVisible = await PageManager.topNavigationBarPage.isLoggedInBannerVisible();
    expect(isVisible).to.be.true;
});

When('I logout', async () => {
    await PageManager.topNavigationBarPage.clickNavLinkByText("Logout");
});

Then('I should be on the login page', async () => {
    const isVisible = await PageManager.authPage.isLoginFormDisplayed();
    expect(isVisible).to.be.true;
});

When('I delete the account', async () => {
    await PageManager.topNavigationBarPage.clickNavLinkByText("Delete Account");
});

Then('I should see account deleted confirmation', async () => {
    const isVisible = await PageManager.deletedAccountPage.isAccountDeletedVisible();
    expect(isVisible).to.be.true;
});
