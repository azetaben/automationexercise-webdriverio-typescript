import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

When(/^I scroll down to footer$/, async () => {
    await pm.footerPage.scrollToFooter();
});

Then(/^'SUBSCRIPTION' is visible$/, async () => {
    const isVisible = await pm.footerPage.isSubscriptionHeaderVisible();
    expect(isVisible).to.be.true;
});

When(/^I enter email address "(.*)" in input and click arrow button$/, async (email: string) => {
    await pm.footerPage.enterSubscriptionEmail(email);
    await pm.footerPage.clickSubscribeButton();
});

Then(/^I should see the success message 'You have been successfully subscribed!'$/, async () => {
    const isVisible = await pm.footerPage.isSubscriptionSuccessVisible();
    expect(isVisible).to.be.true;
});
