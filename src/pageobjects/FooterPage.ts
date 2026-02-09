import Page from "./Page";
import logger from "../support/utils/logger/logger.ts";

class FooterPage extends Page {
    // Locators
    get subscriptionHeader() {
        return $("//h2[contains(text(), 'Subscription')]");
    }

    get emailInput() {
        return $("#susbscribe_email");
    }

    get subscribeButton() {
        return $("#subscribe");
    }

    get subscriptionSuccessMessage() {
        return $(".alert-success");
    }

    // Aliases/Duplicates from Java class
    get subscriptionTitle() {
        return this.subscriptionHeader;
    }

    get subscriptionEmailInput() {
        return this.emailInput;
    }

    get subscriptionArrowButton() {
        return this.subscribeButton;
    }

    // Action Methods
    async scrollToFooter() {
        await (await this.subscriptionHeader).scrollIntoView();
    }

    async isSubscriptionHeaderVisible() {
        return await this.isElementDisplayed(await this.subscriptionHeader);
    }

    async enterSubscriptionEmail(email: string) {
        await this.setElementValue(await this.emailInput, email);
    }

    async clickSubscribeButton() {
        await this.clickElement(await this.subscribeButton);
        logger.info("Subscribe button clicked");
    }

    async isSubscriptionSuccessVisible() {
        return await this.isElementDisplayed(await this.subscriptionSuccessMessage);
    }

    async getSubscriptionSuccessText() {
        return await this.getElementText(await this.subscriptionSuccessMessage);
    }

    async scrollToSubscription() {
        await (await this.subscriptionTitle).scrollIntoView();
    }

    async isSubscriptionTitleVisible() {
        return await this.isElementDisplayed(await this.subscriptionTitle);
    }

    async clickSubscribeArrow() {
        await this.clickSubscribeButton();
    }

    async isSubscriptionVisible() {
        const emailVisible = await this.isElementDisplayed(await this.subscriptionEmailInput);
        const buttonVisible = await this.isElementDisplayed(await this.subscriptionArrowButton);
        return emailVisible && buttonVisible;
    }
}

export default new FooterPage();
