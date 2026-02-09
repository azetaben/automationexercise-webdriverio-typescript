import {clickWhenClickable, typeWhenDisplayed} from '../support/actions/elementActions.ts';
import Page from "pageobjects/Page.ts";


export class LoginSignupPage extends Page {
    // Login
    get loginEmail() {
        return $('input[data-qa="login-email"]');
    }

    get loginPassword() {
        return $('input[data-qa="login-password"]');
    }

    get loginButton() {
        return $('button[data-qa="login-button"]');
    }

    get loginFormHeader() {
        return $('div[class="login-form"] h2');
    }

    async isLoginFormDisplayed(): Promise<boolean> {
        return this.loginFormHeader.isDisplayed();
    }


    async login(email: string, password: string): Promise<void> {
        await typeWhenDisplayed(this.loginEmail, email);
        await typeWhenDisplayed(this.loginPassword, password);
        await clickWhenClickable(this.loginButton);
    }

    async validLogin(email: string, password: string): Promise<void> {
        await typeWhenDisplayed(this.loginEmail, email);
        await typeWhenDisplayed(this.loginPassword, password);
        await clickWhenClickable(this.loginButton);
    }

    async isLoginFormVisible() {
        return this.loginFormHeader.isDisplayed();
    }

}


