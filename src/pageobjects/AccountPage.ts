import Page from "pageobjects/Page.ts";

export class AccountPage extends Page {
    get accountDeletedHeader() {
        return $('b');
    }

    async isAccountDeletedVisible(): Promise<boolean> {
        return this.accountDeletedHeader.isDisplayed();
    }

    isAccountDeletedDisplayed = async () => {
        return this.accountDeletedHeader.isDisplayed();
    }
}
