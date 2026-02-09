import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";

// --- Checkout Process ---

When(/^I proceed to checkout$/, async () => {
    await pm.cartPage.clickProceedToCheckout();
});

Then(/^I should see address details and order review$/, async () => {
    await pm.checkoutPage.expectAddressDetailsVisible();
    await pm.checkoutPage.expectOrderReviewVisible();
});