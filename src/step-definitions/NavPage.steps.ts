import {Then, When} from "@wdio/cucumber-framework";
import PageManager from "../pageobjects/PageManager";
import {expect} from "chai";

// Note: The generic "click on link" step is now in common.steps.ts

Then(/^I should see the "(.*)" link in the top navigation bar$/, async (linkText: string) => {
    const isVisible = await PageManager.topNavigationBarPage.isNavLinkVisible(linkText);
    expect(isVisible).to.be.true;
});

Then(/^I should see that I am logged in as "(.*)"$/, async (username: string) => {
    const loggedInText = await PageManager.topNavigationBarPage.getLoggedInAsText();
    expect(loggedInText).to.include(username);
});

When('I navigate to Login page', async function () {
    await PageManager.topNavigationBarPage.clickLoginOrSignupLink();
});

When('I tap on the Delete Account link', async function () {
    await PageManager.topNavigationBarPage.tapOnDeleteAccountLink();
});

Then(/^I should see "([^"]*)" at the top right menu$/, async function (loggedInText: string) {
    const actualText = await PageManager.topNavigationBarPage.getLoggedInAsText();
    expect(actualText).to.include(loggedInText);
});
When(/^I click on the Products link$/, async function () {
    await PageManager.topNavigationBarPage.clickProductLink();
});
When(/^I click on the "([^"]*)" link$/, async function (menuText: string) {
    await PageManager.topNavigationBarPage.clickMenuByText(menuText);

});