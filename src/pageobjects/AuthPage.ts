import Page from "./Page";
import logger from "../support/utils/logger";
import {clickWhenClickable} from "../support/actions/elementActions";

class AuthPage extends Page {

    // Login section
    get loginEmail() {
        return $("[data-qa='login-email'], input[name='email']");
    }

    get loginPassword() {
        return $("[data-qa='login-password'], input[name='password']");
    }

    // Header state
    get loggedInAs() {
        return $("body");
    }

    get logoutLink() {
        return $("a[href='/logout']");
    }

    // Locators
    get loginHeading() {
        return $("div[class='login-form'] h2");
    }

    get signupName() {
        return $("[data-qa='signup-name']");
    }

    get signupEmail() {
        return $("input[data-qa='signup-email']");
    }

    get signupButton() {
        return $("button[data-qa='signup-button']");
    }

    get loginForm() {
        return $(".login-form");
    }

    get signUpForm() {
        return $(".signup-form");
    }

    get newUserSignupHeader() {
        return $("div[class='signup-form'] h2");
    }

    get loginEmailField() {
        return $("[data-qa='login-email']");
    }

    get loginPasswordField() {
        return $("[data-qa='login-password']");
    }

    get loginButton() {
        return $("button[data-qa='login-button']");
    }

    get loggedInUserProfile() {
        return $("li:nth-child(10) a:nth-child(1)");
    }

    get signupHeading() {
        return $("div[class='signup-form'] h2");
    }

    get or() {
        return $(".or");
    }

    get loginErrorMessage() {
        return $("[style='color: red;']");
    }

    get signupErrorMessage() {
        return $("[style='color: red;']");
    }

    /**
     * Generates a unique email address for testing.
     * @returns A string like "unique1698405000000@test.com"
     */
    static generateUniqueEmail(): string {
        return `unique${Date.now()}@test.com`;
    }

    // Methods
    async openAuth() {
        await this.open("/login");
        await this.waitForElement(this.newUserSignupHeader);
    }

    async clearAllLoginFields() {
        await (await this.loginEmailField).clearValue();
        await (await this.loginPasswordField).clearValue();
    }

    async clearAllNewUserSignupFields() {
        await (await this.signupName).clearValue();
        await (await this.signupEmail).clearValue();
    }

    // Login Form Get Text + Visibility
    async isLoginHeadingDisplayed() {
        return await this.isElementDisplayed(this.loginHeading);
    }

    async getLoginHeaderText() {
        return await this.getElementText(this.loginHeading);
    }

    async isLoginEmailFieldVisible() {
        return await this.isElementDisplayed(this.loginEmailField);
    }

    async isLoginPasswordFieldVisible() {
        return await this.isElementDisplayed(this.loginPasswordField);
    }

    async isLoginButtonVisible() {
        return await this.isElementDisplayed(this.loginButton);
    }

    // Signup Form Get Text + Visibility
    async isOrVisible() {
        return await this.isElementDisplayed(this.or);
    }

    async isSignupHeadingVisible() {
        return await this.isElementDisplayed(this.signupHeading);
    }

    async getSignupHeaderText() {
        return await this.getElementText(this.signupHeading);
    }

    async isSignupNameVisible() {
        return await this.isElementDisplayed(this.signupName);
    }

    async isSignupEmailVisible() {
        return await this.isElementDisplayed(this.signupEmail);
    }

    async isSignupButtonVisible() {
        return await this.isElementDisplayed(this.signupButton);
    }

    // Login Action Methods
    async enterLoginEmail(email: string) {
        await this.setElementValue(this.loginEmailField, email);
        logger.info("Text entered in the field: " + email);
    }

    async enterLoginPassword(password: string) {
        await this.setElementValue(this.loginPasswordField, password);
        logger.info("Text entered in the field: " + password);
    }

    async clickLoginButton() {
        await clickWhenClickable(await this.loginButton);
    }

    async login(email: string, password: string) {
        await this.clearAllLoginFields();
        await this.enterLoginEmail(email);
        await this.enterLoginPassword(password);
        await this.clickLoginButton();
    }

    async isLoginErrorMessageVisible() {
        return await this.isElementDisplayed(this.loginErrorMessage);
    }

    async getLoginErrorMessageText() {
        return await this.getElementText(this.loginErrorMessage);
    }

    // Signup Action Methods
    async enterSignupName(name: string) {
        await this.setElementValue(this.signupName, name);
    }

    async enterSignupEmail(email: string) {
        await this.setElementValue(this.signupEmail, email);
    }

    async clickSignupButton() {
        await clickWhenClickable(await this.signupButton);
        logger.info("Element is clicked");
    }

    async startSignup(name: string, email: string) {
        await this.waitForElement(this.signupEmail);
        await this.clearAllNewUserSignupFields();
        await this.enterSignupName(name);
        await this.enterSignupEmail(email);
        await this.clickSignupButton();
    }

    async isLoginFormDisplayed() {
        return await this.isElementDisplayed(this.loginForm);
    }

    async isSignUpFormDisplayed() {
        return await this.isElementDisplayed(this.signUpForm);
    }

    async getSignupErrorMessageText() {
        return await this.getElementText(this.signupErrorMessage);
    }

    async isSignupErrorMessageVisible() {
        return await this.isElementDisplayed(this.signupErrorMessage);
    }

    async getLoginConfirmationMessage() {
        if (await (await this.loggedInUserProfile).isExisting()) {
            return await this.getElementText(this.loggedInUserProfile);
        }
        if (await (await this.loginErrorMessage).isExisting()) {
            return await this.getElementText(this.loginErrorMessage);
        }
        throw new Error("No login confirmation message found on the page.");
    }

    async isLoginFormVisible() {
        return await this.isElementDisplayed(this.loginForm);
    }

    async isSignupFormVisible() {
        return await this.isElementDisplayed(this.signUpForm);
    }
}

export default new AuthPage();
