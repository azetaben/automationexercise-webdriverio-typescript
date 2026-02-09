import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

When(/^I enter payment details: Name "(.*)", Card "(.*)", CVC "(.*)", Expiry "(.*)" "(.*)"$/, async (name, card, cvc, month, year) => {
    await pm.paymentPage.enterPaymentDetails(name, card, cvc, month, year);
});

When(/^I click 'Pay and Confirm Order' button$/, async () => {
    await pm.paymentPage.clickPayAndConfirmOrder();
});

Then(/^I should see the success message "(.*)"$/, async (message: string) => {
    // This could be on PaymentPage or PaymentDonePage depending on the flow
    if (message.toLowerCase().includes("order placed")) {
        const actualMessage = await pm.paymentDonePage.getOrderPlacedHeadingText();
        expect(actualMessage).to.equal(message);
    } else {
        const isVisible = await pm.paymentPage.isSuccessMessageVisible();
        expect(isVisible).to.be.true;
    }
});

When(/^I click 'Download Invoice' button$/, async () => {
    await pm.paymentDonePage.clickDownloadInvoice();
});

When(/^I click 'Continue' button$/, async () => {
    await pm.paymentDonePage.clickContinueButton();
});
When(/^I place the order with valid payment details$/, async () => {
    await pm.paymentPage.enterPaymentDetails("Bee John", "4200000000900000000", "123", "12", "2025")
    await pm.paymentPage.clickPayAndConfirmOrder();
});