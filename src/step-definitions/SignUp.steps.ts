import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";
import AuthPage from "../pageobjects/AuthPage"; // Import class to access static method

When(/^I enter name "(.*)" and email "(.*)"$/, async (name, email) => {
    let emailToUse = email;
    if (email.includes("unique")) {
        emailToUse = AuthPage.generateUniqueEmail();
    }
    await pm.authPage.startSignup(name, emailToUse);
});

When(/^I fill details: Title "(.*)", Password "(.*)", DOB "(.*)" "(.*)" "(.*)"$/, async (title, password, day, month, year) => {
    await pm.signupPage.fillSignupForm({
        title: title as 'Mr' | 'Mrs',
        password,
        day,
        month,
        year
    });
});

When(/^I select checkbox "(.*)"$/, async (checkbox: string) => {
    if (checkbox.toLowerCase().includes("newsletter")) {
        await pm.signupPage.setNewsletterCheckbox(true);
    } else if (checkbox.toLowerCase().includes("special offer")) {
        await pm.signupPage.setSpecialOffersCheckbox(true);
    }
});

When(/^I fill details: First name "(.*)", Last name "(.*)", Company "(.*)", Address "(.*)", Address2 "(.*)", Country "(.*)", State "(.*)", City "(.*)", Zipcode "(.*)", Mobile Number "(.*)"$/, async (firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber) => {
    await pm.signupPage.fillSignupForm({
        title: 'Mr', // Default, will be ignored if not called
        firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber
    });
});

When(/^I click 'Create Account' button$/, async () => {
    await pm.signupPage.clickCreateAccountButton();
});

Then(/^'ACCOUNT CREATED!' is visible$/, async () => {
    const isVisible = await pm.accountCreatedPage.isAccountCreatedMessageVisible();
    expect(isVisible).to.be.true;
});
