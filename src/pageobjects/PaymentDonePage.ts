import Page from "./Page";
import {clickWhenClickable} from "support/actions/elementActions.ts";

class PaymentDonePage extends Page {
    // Locators
    get orderPlacedHeading() {
        return $("h2[class='title text-center'] b");
    }

    get orderConfirmationMessage() {
        return $("#form > div > div > div > p");
    }

    get downloadInvoiceButton() {
        return $(".btn.btn-default.check_out");
    }

    get continueButton() {
        return $(".btn.btn-primary");
    }

    // Get Text Methods
    async getOrderPlacedHeadingText() {
        return await this.getElementText(this.orderPlacedHeading);
    }

    async getOrderConfirmationMessageText() {
        return await this.getElementText(this.orderConfirmationMessage);
    }

    // Visibility Methods
    async isOrderPlacedHeadingVisible() {
        return await this.isElementDisplayed(await this.orderPlacedHeading);
    }

    async isOrderConfirmationMessageVisible() {
        return await this.isElementDisplayed(this.orderConfirmationMessage);
    }

    async isDownloadInvoiceVisible() {
        return await this.isElementDisplayed(this.downloadInvoiceButton);
    }

    async isContinueButtonVisible() {
        return await this.isElementDisplayed(this.continueButton);
    }

    // Click Methods
    async clickDownloadInvoice() {
        await clickWhenClickable(this.downloadInvoiceButton);
    }

    async clickContinueButton() {
        await clickWhenClickable(this.continueButton);
    }

    // Aliases from Java class
    async isSuccessMessageDisplayed() {
        return await this.isOrderPlacedHeadingVisible();
    }

    async getSuccessMessage() {
        return await this.getOrderConfirmationMessageText();
    }
}

export default new PaymentDonePage();
