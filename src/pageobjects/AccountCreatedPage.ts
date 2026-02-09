import Page from "./Page";
import {clickWhenClickable} from "support/actions/elementActions.ts";

class AccountCreatedPage extends Page {
    // Locators
    get accountCreatedHeading() {
        return $("b");
    }

    get congratulationsMessage() {
        return $("div.col-sm-9.col-sm-offset-1 p:nth-of-type(1)");
    }

    get privilegesMessage() {
        return $("div.col-sm-9.col-sm-offset-1 p:nth-of-type(2)");
    }

    get continueButton() {
        return $("a.btn.btn-primary");
    }

    // Get Text Methods
    async getAccountCreatedHeadingText() {
        await this.waitForElement(this.accountCreatedHeading);
        return await (this.accountCreatedHeading).getText();
    }

    async getCongratulationsMessageText() {
        await this.waitForElement(this.congratulationsMessage);
        return await (this.congratulationsMessage).getText();
    }

    async getPrivilegesMessageText() {
        await this.waitForElement(await this.privilegesMessage);
        return await (await this.privilegesMessage).getText();
    }

    // Visibility Methods
    async isAccountCreatedHeadingVisible() {
        return await this.isElementDisplayed(this.accountCreatedHeading);
    }

    async isCongratulationsMessageVisible() {
        return await this.isElementDisplayed(this.congratulationsMessage);
    }

    async isPrivilegesMessageVisible() {
        return await this.isElementDisplayed(this.privilegesMessage);
    }

    async isContinueButtonVisible() {
        return await this.isElementDisplayed(this.continueButton);
    }

    async getContinueButtonText() {
        await this.waitForElement(this.continueButton);
        return await (this.continueButton).getText();
    }

    // Click Methods
    async clickContinueButton() {
        await clickWhenClickable(this.continueButton);
    }


    async isDisplayed() {
        await this.waitForElement(this.accountCreatedHeading);
        return await this.isAccountCreatedHeadingVisible();
    }


    async isAccountCreatedMessageVisible(): Promise<boolean> {
        return this.accountCreatedHeading.isDisplayed();
    }

    async isAccountCreatedVisible() {
        return this.accountCreatedHeading.isDisplayed();
    }

    async continueAfterCreate(): Promise<void> {
        await clickWhenClickable(this.continueButton);
    }
}

export default new AccountCreatedPage();
