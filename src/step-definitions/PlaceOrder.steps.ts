import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";

When(/^I click 'Place Order'$/, async () => {
    await pm.checkoutPage.clickPlaceOrder();
});

When(/^I enter description "(.*)" in comment text area$/, async (comment: string) => {
    await pm.checkoutPage.enterComment(comment);
});

Then(/^I should see the order confirmation$/, async () => {
    expect(await pm.orderConfirmationPage.isOrderConfirmationMessageText());
});