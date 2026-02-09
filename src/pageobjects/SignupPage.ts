import Page from "./Page";
import {clickWhenClickable, typeWhenDisplayed} from '../support/actions/elementActions.ts';

import logger from "../support/utils/logger/logger.ts";

// Define an interface for the user data structure for type safety
interface SignupFormData {
    title: 'Mr' | 'Mrs';
    password?: string;
    day?: string;
    month?: string;
    year?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    address2?: string;
    country?: string;
    state?: string;
    city?: string;
    zipcode?: string;
    mobileNumber?: string;
    newsletter?: boolean;
    specialOffers?: boolean;
}

class SignUpPage extends Page {
    // --- Locators ---

    // Signup start
    get signupName() {
        return $('input[data-qa="signup-name"]');
    }

    get signupEmail() {
        return $('input[data-qa="signup-email"]');
    }

    get signupButton() {
        return $('button[data-qa="signup-button"]');
    }

    get signupHeader() {
        return $("div[class='login-form'] h2");
    }

    // Account Information
    get titleMrRadio() {
        return $("#id_gender1");
    }

    get titleMrsRadio() {
        return $("#id_gender2");
    }

    get nameInput() {
        return $("#name");
    } // This is often pre-filled and disabled
    get emailInput() {
        return $("#email");
    } // This is often pre-filled and disabled
    get passwordInput() {
        return $("#password");
    }

    get dayDropdown() {
        return $("#days");
    }

    get monthDropdown() {
        return $("#months");
    }

    get yearDropdown() {
        return $("#years");
    }

    get newsletterCheckbox() {
        return $("#newsletter");
    }

    get specialOfferCheckbox() {
        return $("#optin");
    }

    // Address Information
    get firstNameInput() {
        return $("#first_name");
    }

    get lastNameInput() {
        return $("#last_name");
    }

    get companyInput() {
        return $("#company");
    }

    get address1Input() {
        return $("#address1");
    }

    get address2Input() {
        return $("#address2");
    }

    get countryDropdown() {
        return $("#country");
    }

    get stateInput() {
        return $("#state");
    }

    get cityInput() {
        return $("#city");
    }

    get zipcodeInput() {
        return $("#zipcode");
    }

    get mobileInput() {
        return $("#mobile_number");
    }

    get createAccountButton() {
        return $("button[data-qa='create-account']");
    }

    // --- Core Actions & Visibility ---

    async isSignupPageLoaded() {
        return await this.signupHeader.isDisplayed();
    }

    async startSignup(name: string, email: string): Promise<void> {
        await typeWhenDisplayed(this.signupName, name);
        await typeWhenDisplayed(this.signupEmail, email);
        await clickWhenClickable(this.signupButton);
        await this.signupHeader.waitForDisplayed({timeout: 15000});
    }

    async getSignupHeaderText() {
        return await this.signupHeader.getText();
    }

    // --- Form Filling Helper Methods ---

    async selectTitle(title: 'Mr' | 'Mrs') {
        if (title.toLowerCase() === 'mr') {
            await this.titleMrRadio.click();
        } else {
            await this.titleMrsRadio.click();
        }
    }

    async enterPassword(password: string) {
        await this.passwordInput.setValue(password);
    }

    async selectDOB(day: string, month: string, year: string) {
        await (this.dayDropdown).selectByAttribute('value', day);
        await (this.monthDropdown).selectByVisibleText(month); // Month is often by text
        await (this.yearDropdown).selectByAttribute('value', year);
    }

    async setNewsletterCheckbox(check: boolean) {
        const element = this.newsletterCheckbox;
        if (await element.isSelected() !== check) {
            await clickWhenClickable(element);
        }
    }

    async setSpecialOffersCheckbox(check: boolean) {
        const element = this.specialOfferCheckbox;
        if (await element.isSelected() !== check) {
            //await this.clickElement(element);
            await clickWhenClickable(element);
        }
    }

    // --- High-Level Signup Form Method ---

    /**
     * Fills the entire signup form based on the provided data object.
     * Skips fields that are not provided in the data object.
     * @param data The user data for filling the form.
     */
    async fillSignupForm(data: SignupFormData) {
        logger.info("Starting to fill the signup form.");

        if (data.title) await this.selectTitle(data.title);
        if (data.password) await this.enterPassword(data.password);
        if (data.day && data.month && data.year) await this.selectDOB(data.day, data.month, data.year);

        if (data.newsletter !== undefined) await this.setNewsletterCheckbox(data.newsletter);
        if (data.specialOffers !== undefined) await this.setSpecialOffersCheckbox(data.specialOffers);

        if (data.firstName) await this.setElementValue(this.firstNameInput, data.firstName);
        if (data.lastName) await this.setElementValue(this.lastNameInput, data.lastName);
        if (data.company) await this.setElementValue(this.companyInput, data.company);
        if (data.address1) await this.setElementValue(this.address1Input, data.address1);
        if (data.address2) await this.setElementValue(this.address2Input, data.address2);
        if (data.country) await (this.countryDropdown).selectByVisibleText(data.country);
        if (data.state) await this.setElementValue(this.stateInput, data.state);
        if (data.city) await this.setElementValue(this.cityInput, data.city);
        if (data.zipcode) await this.setElementValue(this.zipcodeInput, data.zipcode);
        if (data.mobileNumber) await this.setElementValue(this.mobileInput, data.mobileNumber);

        logger.info("Signup form filled.");
    }

    async clickCreateAccountButton() {
        await clickWhenClickable(this.createAccountButton);
        logger.info("Clicked 'Create Account' button.");
    }

    async fillAccountInformation(data: {
        title: 'Mr' | 'Mrs';
        password: string;
        day: string;
        month: string;
        year: string;
        firstName: string;
        lastName: string;
        company: string;
        address1: string;
        address2: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobile: string;
    }): Promise<void> {
        if (data.title === 'Mr') await clickWhenClickable(this.titleMrRadio);
        else await clickWhenClickable(this.titleMrsRadio);

        await typeWhenDisplayed(this.passwordInput, data.password);

        await this.dayDropdown.selectByVisibleText(data.day);
        await this.monthDropdown.selectByVisibleText(data.month);
        await this.yearDropdown.selectByVisibleText(data.year);

        await typeWhenDisplayed(this.firstNameInput, data.firstName);
        await typeWhenDisplayed(this.lastNameInput, data.lastName);
        await typeWhenDisplayed(this.companyInput, data.company);
        await typeWhenDisplayed(this.address1Input, data.address1);
        await typeWhenDisplayed(this.address2Input, data.address2);

        await this.countryDropdown.selectByVisibleText(data.country);
        await typeWhenDisplayed(this.stateInput, data.state);
        await typeWhenDisplayed(this.cityInput, data.city);
        await typeWhenDisplayed(this.zipcodeInput, data.zipcode);
        await typeWhenDisplayed(this.mobileInput, data.mobile);
        await clickWhenClickable(this.createAccountButton);
    }

}

export default new SignUpPage();
