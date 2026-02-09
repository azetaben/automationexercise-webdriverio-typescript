import Page from "./Page";

class OrderConfirmationPage extends Page {
    // Locators
    get orderPlacedHeading() {
        return $("h2[class='title text-center'] b");
    }

    get orderConfirmationMessage() {
        return $("#form > div > div > div > p");
    }

    // Get Text Methods
    async getOrderPlacedHeadingText() {
        return await this.getElementText(this.orderPlacedHeading);
    }

    async getOrderConfirmationMessageText() {
        return await this.getElementText(this.orderConfirmationMessage);
    }

    async isOrderConfirmationMessageText() {
        return await this.orderConfirmationMessage.isDisplayed();
    }

    async getSuccessMessage() {
        return await this.getOrderConfirmationMessageText();
    }
}

export default new OrderConfirmationPage();
