import Page from "./Page";
import {clickWhenClickable} from "support/actions/elementActions.ts";

class ContactFormSuccessPage extends Page {
    // Locators
    get contactFormContainer() {
        return $("div.col-sm-8 > div.contact-form");
    }

    get noteContainer() {
        return $(".contact-form > div:nth-of-type(1)");
    }

    get noteBoldPart() {
        return $(".contact-form > div:nth-of-type(1) b");
    }

    get getInTouchHeading() {
        return $(".contact-form h2.title.text-center");
    }

    get successAlert() {
        return $(".contact-form .status.alert.alert-success");
    }

    get formSection() {
        return $("#form-section");
    }

    get homeButton() {
        return $("#form-section a.btn.btn-success");
    }

    get homeButtonIcon() {
        return $("#form-section a.btn.btn-success span i.fa.fa-angle-double-left");
    }

    get homeButtonTextSpan() {
        return $("#form-section a.btn.btn-success span");
    }

    // Get Text Methods
    async getNoteText() {
        return await this.getElementText(this.noteContainer);
    }

    async getNoteBoldText() {
        return await this.getElementText(this.noteBoldPart);
    }

    async getGetInTouchHeadingText() {
        return await this.getElementText(this.getInTouchHeading);
    }

    async getSuccessAlertText() {
        return await this.getElementText(this.successAlert);
    }

    async getHomeButtonText() {
        return await this.getElementText(this.homeButtonTextSpan);
    }

    // Visibility Methods
    async isContactFormContainerVisible() {
        return await this.isElementDisplayed(this.contactFormContainer);
    }

    async isNoteVisible() {
        return await this.isElementDisplayed(this.noteContainer);
    }

    async isGetInTouchHeadingVisible() {
        return await this.isElementDisplayed(this.getInTouchHeading);
    }

    async isSuccessAlertVisible() {
        return await this.isElementDisplayed(this.successAlert);
    }

    async isHomeButtonVisible() {
        return await this.isElementDisplayed(this.homeButton);
    }

    // Click Methods
    async clickHomeButton() {
        await clickWhenClickable(this.homeButton);
    }
}

export default new ContactFormSuccessPage();
