import {Given, Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";


When(/^I enter correct email "(.*)" and password "(.*)"$/, async (email, password) => {
    await pm.authPage.login(email, password);
});

When(/^I enter incorrect email "(.*)" and password "(.*)"$/, async (email, password) => {
    await pm.authPage.login(email, password);
});

Then(/^I should see the error message "(.*)"$/, async (message: string) => {
    if (message.includes("email or password")) {
        const actual = await pm.authPage.getLoginErrorMessageText();
        expect(actual).to.equal(message);
    } else {
        const actual = await pm.authPage.getSignupErrorMessageText();
        expect(actual).to.equal(message);
    }
});

Then(/^I should be logged in as "(.*)"$/, async (username: string) => {
    const loggedInText = await pm.topNavigationBarPage.getLoggedInAsText();
    expect(loggedInText).to.include(username);
});

When(/^I click 'Logout' button$/, async () => {
    await pm.topNavigationBarPage.clickNavLinkByText("Logout");
});

Given('I login in login page', async () => {
    // @ts-ignore
    const email = process.env.AE_EMAIL ?? (global.ctx?.has('userEmail') ? global.ctx.get<string>('userEmail') : '');
    // @ts-ignore
    const password = process.env.AE_PASSWORD ?? (global.ctx?.has('userPassword') ? global.ctx.get<string>('userPassword') : '');

    if (!email || !password) {
        throw new Error(
            'Missing credentials. Set AE_EMAIL/AE_PASSWORD in .env OR run the signup scenario earlier in the same test run.'
        );
    }

    expect(await pm.authPage.isLoginFormVisible()).to.be.equal(true);
    await pm.authPage.login(email, password);

    expect(await pm.topNavigationBarPage.isLoggedInBannerVisible()).to.be.equal(true);
});