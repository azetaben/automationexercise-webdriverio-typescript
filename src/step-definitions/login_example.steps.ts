import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";


When(/^I click on the "(.*)" link in the top navigation bar$/, async (linkText: string) => {
    // Use PageManager to access TopNavigationBarPage
    await pm.topNavigationBarPage.clickNavLinkByText(linkText);
});

/*When(/^I click on the "([^"]+)" link in the top navigation bar$/, async (linkText: string) => {
    await pm.topNavigationBarPage.clickTopNav(linkText);
});*/

When(/^I enter correct email "(.*)" and password "(.*)"$/, async (email: string, password: string) => {
    // Use PageManager to access AuthPage
    await pm.authPage.login(email, password);
});

When(/^I click 'Logout' button$/, async () => {
    // Use PageManager to access TopNavigationBarPage
    await pm.topNavigationBarPage.clickNavLinkByText("Logout");
});

// --- Then Steps ---

Then(/^I should be logged in as "(.*)"$/, async (username: string) => {
    // Use PageManager to access TopNavigationBarPage for verification
    const loggedInText = await pm.topNavigationBarPage.getLoggedInAsText();
    expect(loggedInText).to.include(username);
});

Then(/^I should see the "(.*)" link in the top navigation bar$/, async (linkText: string) => {
    // Use PageManager to access TopNavigationBarPage for verification
    const isVisible = await pm.topNavigationBarPage.isNavLinkVisible(linkText);
    expect(isVisible).to.be.true;
});
