import {Given, Then, When} from "@wdio/cucumber-framework";
import {expect} from "chai";
import logger from "../support/utils/logger/logger.ts";
import pm from "../pageobjects/PageManager";

// --- Common Navigation ---

Given(/^I navigate to url "(.*)"$/, async (url: string) => {
    await browser.url(url);
    await browser.maximizeWindow();
    logger.info(`Navigated to URL: ${url}`);
    await pm.cookiePage.clickConsentButton();
});

// --- Cookie Consent ---

When(/^I tap on "Consent" to accept cookies$/, async () => {
    await pm.cookiePage.clickConsentButton();
});

// --- Top Navigation ---

When(/^I click on "(.*)" button$/, async (buttonName: string) => {
    await pm.topNavigationBarPage.clickNavLinkByText(buttonName);
});

Then(/^I should see the "(.*)" page$/, async (pageName: string) => {
    // Generic check based on page name
    if (pageName.toLowerCase().includes("login")) {
        expect(await pm.authPage.isLoginFormDisplayed()).to.be.true;
    } else if (pageName.toLowerCase().includes("cart")) {
        expect(await pm.cartPage.isCartPageVisible()).to.be.true;
    } else if (pageName.toLowerCase().includes("products")) {
        expect(await pm.productsPage.isAllProductsHeaderVisible()).to.be.true;
    }
});

// --- Scroll Actions ---

When(/^I scroll up page to top$/, async () => {
    await pm.homePage.scrollToTop();
});

When(/^I scroll down page to bottom$/, async () => {
    await pm.homePage.scrollToBottom();
});

Then(/^I should see the text "(.*)" on screen$/, async (text: string) => {
    // This is a very generic step. Ideally, we should check specific elements.
    // For now, we can check if the body text contains the string.
    const bodyText = await $("body").getText();
    expect(bodyText).to.include(text);
});


