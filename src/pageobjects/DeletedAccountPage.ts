import Page from "./Page";
import logger from "../support/utils/logger/logger.ts";
import {clickWhenClickable} from '../support/actions/elementActions.ts';


class DeletedAccountPage extends Page {
    // Locators
    get accountDeletedTitle() {
        return $("b");
    }

    get continueButton() {
        return $(".btn.btn-primary");
    }

    // Methods
    async getAccountDeletedHeadingText() {
        return await this.accountDeletedTitle.getText();
    }

    async isAccountDeletedVisible() {
        return await this.isElementDisplayed(this.accountDeletedTitle);
    }

    async clickContinueButton() {
        await this.continueButton.click();
        logger.info("Continue button clicked");
    }

    // Aliases/Duplicates from Java class
    async isAccountDeletedMessageVisible() {
        return await this.isAccountDeletedVisible();
    }

    async getAccountDeletedText() {
        return await this.getAccountDeletedHeadingText();
    }

    async getAccountDeletedTitleText() {
        return await this.getAccountDeletedHeadingText();
    }

    async getContinueButtonText() {
        return await this.getElementText(this.continueButton);
    }

    async tapOnContinueButton() {
        await clickWhenClickable(this.continueButton);
        logger.info("Continue button clicked");
    }
}

export default new DeletedAccountPage();
