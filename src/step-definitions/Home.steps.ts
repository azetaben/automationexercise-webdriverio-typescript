import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

Then(/^I verify that home page is visible successfully$/, async () => {
    const isVisible = await pm.homePage.isHomePageDisplayed();
    expect(isVisible).to.be.true;
});

When(/^I scroll up page to top$/, async () => {
    await pm.homePage.scrollToTop();
});

When(/^I scroll down page to bottom$/, async () => {
    await pm.homePage.scrollToBottom();
});

Then(/^I should see the text "(.*)" on screen$/, async (text: string) => {
    const bodyText = await $("body").getText();
    expect(bodyText).to.include(text);
});
