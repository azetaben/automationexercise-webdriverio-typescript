import {Then} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

Then(/^the delivery address should be:$/, async (table: any) => {
    const expectedAddress = table.raw().flat();
    const deliveryText = await pm.checkoutPage.getDeliveryAddressText();
    for (const line of expectedAddress) {
        expect(deliveryText).to.include(line);
    }
});

Then(/^the billing address should be:$/, async (table: any) => {
    const expectedAddress = table.raw().flat();
    const billingText = await pm.checkoutPage.getBillingAddressText();
    for (const line of expectedAddress) {
        expect(billingText).to.include(line);
    }
});

Then(/^the delivery address should be verified$/, async () => {
    // Generic verification step if specific address isn't provided
    const isVisible = await pm.checkoutPage.isDeliveryAddressVisible();
    expect(isVisible).to.be.true;
});

Then(/^the billing address should be verified$/, async () => {
    const isVisible = await pm.checkoutPage.isBillingAddressVisible();
    expect(isVisible).to.be.true;
});
