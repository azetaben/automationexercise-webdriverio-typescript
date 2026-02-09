import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

When(/^I verify Subscription is visible in cart page$/, async () => {
    // Ensure we are on the cart page
    const isCartVisible = await pm.cartPage.isCartPageVisible();
    expect(isCartVisible).to.be.true;

    // Scroll to footer
    await pm.footerPage.scrollToFooter();
    const isVisible = await pm.footerPage.isSubscriptionHeaderVisible();
    expect(isVisible).to.be.true;
});

When(/^I enter email address in cart subscription input and click arrow button$/, async () => {
    const email = `test-${Date.now()}@example.com`;
    await pm.footerPage.enterSubscriptionEmail(email);
    await pm.footerPage.clickSubscribeButton();
});

Then(/^I should see the success message in cart page$/, async () => {
    const isVisible = await pm.footerPage.isSubscriptionSuccessVisible();
    expect(isVisible).to.be.true;
});
