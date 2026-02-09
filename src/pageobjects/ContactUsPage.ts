import Page from "./Page";
import {browser} from "@wdio/globals";

class ContactUsPage extends Page {
    // Locators
    get getInTouchHeader() {
        return $("h2.title.text-center");
    }

    get nameInput() {
        return $("input[data-qa='name']");
    }

    get emailInput() {
        return $("input[data-qa='email']");
    }

    get subjectInput() {
        return $("input[data-qa='subject']");
    }

    get messageTextarea() {
        return $("textarea[data-qa='message']");
    }

    get uploadFileInput() {
        return $("input[type='file']");
    }

    get submitButton() {
        return $("input[data-qa='submit-button']");
    }

    get successMessage() {
        return $("div.status.alert.alert-success");
    }

    get homeButton() {
        return $("#form-section a.btn.btn-success");
    }

    get contactUsTitle() {
        return $("#contact-page .bg h2.title.text-center");
    }

    get getInTouchTitle() {
        return $(".contact-form h2.title.text-center");
    }

    get noteBold() {
        return $(".contact-form > div b");
    }

    get noteFullText() {
        return $(".contact-form > div");
    }

    get statusAlert() {
        return $(".status.alert.alert-success");
    }

    get contactForm() {
        return $("#contact-us-form");
    }

    get feedbackTitle() {
        return $(".contact-info h2.title.text-center");
    }

    get feedbackAddressBlock() {
        return $(".contact-info address");
    }

    get feedbackParagraph1() {
        return $(".contact-info address p:nth-of-type(1)");
    }

    get feedbackParagraph2() {
        return $(".contact-info address p:nth-of-type(2)");
    }

    get feedbackParagraph3() {
        return $(".contact-info address p:nth-of-type(3)");
    }

    get feedbackParagraph4() {
        return $(".contact-info address p:nth-of-type(4)");
    }

    get feedbackEmailLink() {
        return $(".contact-info address a[href^='mailto:']");
    }

    // Title & Text Getters / Visibility
    async getContactUsTitleText() {
        return await this.getElementText(await this.contactUsTitle);
    }

    async isContactUsTitleVisible() {
        return await this.isElementDisplayed(await this.contactUsTitle);
    }

    async getGetInTouchTitleText() {
        return await this.getElementText(await this.getInTouchTitle);
    }

    async isGetInTouchTitleVisible() {
        return await this.isElementDisplayed(await this.getInTouchTitle);
    }

    async getNoteText() {
        return await this.getElementText(await this.noteFullText);
    }

    async isNoteVisible() {
        return await this.isElementDisplayed(await this.noteFullText);
    }

    async isStatusAlertVisible() {
        return await this.isElementDisplayed(await this.statusAlert);
    }

    async getStatusAlertText() {
        return await this.getElementText(await this.statusAlert);
    }

    async getFeedbackTitleText() {
        return await this.getElementText(await this.feedbackTitle);
    }

    async isFeedbackTitleVisible() {
        return await this.isElementDisplayed(await this.feedbackTitle);
    }

    async getFeedbackBlockText() {
        return await this.getElementText(await this.feedbackAddressBlock);
    }

    async getFeedbackParagraph1Text() {
        return await this.getElementText(await this.feedbackParagraph1);
    }

    async getFeedbackParagraph2Text() {
        return await this.getElementText(await this.feedbackParagraph2);
    }

    async getFeedbackParagraph3Text() {
        return await this.getElementText(await this.feedbackParagraph3);
    }

    async getFeedbackParagraph4Text() {
        return await this.getElementText(await this.feedbackParagraph4);
    }

    async getFeedbackEmailText() {
        return await this.getElementText(await this.feedbackEmailLink);
    }

    // Form Field Visibility / Interactions
    async isNameFieldVisible() {
        return await this.isElementDisplayed(await this.nameInput);
    }

    async isEmailFieldVisible() {
        return await this.isElementDisplayed(await this.emailInput);
    }

    async isSubjectFieldVisible() {
        return await this.isElementDisplayed(await this.subjectInput);
    }

    async isMessageFieldVisible() {
        return await this.isElementDisplayed(await this.messageTextarea);
    }

    async isFileUploadVisible() {
        return await this.isElementDisplayed(await this.uploadFileInput);
    }

    async isSubmitButtonVisible() {
        return await this.isElementDisplayed(await this.submitButton);
    }

    async enterName(name: string) {
        await this.setElementValue(await this.nameInput, name);
    }

    async enterEmail(email: string) {
        await this.setElementValue(await this.emailInput, email);
    }

    async enterSubject(subject: string) {
        await this.setElementValue(await this.subjectInput, subject);
    }

    async enterMessage(message: string) {
        await this.setElementValue(await this.messageTextarea, message);
    }

    async uploadFile(absoluteFilePath: string) {
        // WebdriverIO handles file uploads differently than Selenium
        // We usually need to use browser.uploadFile to get the remote path
        // but for local execution, setValue often works if the input is visible.
        // However, standard practice is:
        // const remoteFilePath = await browser.uploadFile(absoluteFilePath);
        // await (await this.uploadFileInput).setValue(remoteFilePath);

        // Since I cannot assume the environment (local vs grid), I'll stick to setValue for now
        // but ideally, we should use browser.uploadFile if running on a grid.
        // Given the context is likely local or simple grid:
        await (await this.uploadFileInput).setValue(absoluteFilePath);
    }

    async clickSubmit() {
        await this.clickElement(await this.submitButton);
    }

    // High-Level Action: Submit Contact Form
    async submitContactForm(name: string, email: string, subject: string, message: string) {
        await this.enterName(name);
        await this.enterEmail(email);
        await this.enterSubject(subject);
        await this.enterMessage(message);
        await this.clickSubmit();
    }

    async submitContactFormWithFile(name: string, email: string, subject: string, message: string, filePath: string) {
        await this.enterName(name);
        await this.enterEmail(email);
        await this.enterSubject(subject);
        await this.enterMessage(message);
        if (filePath) {
            await this.uploadFile(filePath);
        }
        await this.clickSubmit();
    }

    // Alert Handling Methods
    async acceptAlert() {
        if (await browser.isAlertOpen()) {
            await browser.acceptAlert();
        }
    }

    async getAlertText() {
        if (await browser.isAlertOpen()) {
            return await browser.getAlertText();
        }
        return "";
    }

    async verifyAlertMessage(expectedMessage: string) {
        const actualText = await this.getAlertText();
        return actualText === expectedMessage;
    }

    // Page Actions
    async isGetInTouchVisible() {
        return await this.isElementDisplayed(await this.getInTouchHeader);
    }

    async isSuccessMessageVisible() {
        return await this.isElementDisplayed(await this.successMessage);
    }

    async getSuccessMessageText() {
        return await this.getElementText(await this.successMessage);
    }

    async clickHomeButton() {
        await this.clickElement(await this.homeButton);
    }
}

export default new ContactUsPage();
