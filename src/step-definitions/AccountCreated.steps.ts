import {Then, When} from "@wdio/cucumber-framework";
import PageManager from "../pageobjects/PageManager";
import {expect} from "chai";

// This step handles variations like "I click the Continue button" or "I tap on the continue button"
When(/I (?:click|tap) the Continue button/i, async () => {
    await PageManager.accountCreatedPage.clickContinueButton();
});

// This step handles verifying the button text before clicking
When('I tap on the {string} button', async (buttonText: string) => {
    const actualButtonText = await PageManager.accountCreatedPage.getContinueButtonText();
    expect(actualButtonText).to.include(buttonText);
    await PageManager.accountCreatedPage.clickContinueButton();
});

Then('the account should be created successfully', async () => {
    const isVisible = await PageManager.accountCreatedPage.isAccountCreatedMessageVisible();
    expect(isVisible, "The 'Account Created!' success message was not visible.").to.be.true;
});

// This step handles variations like "I should see 'ACCOUNT CREATED!' is displayed" or "is visible"
Then(/I should see {string} is (?:displayed|visible)/i, async (expectedText: string) => {
    const actualText = await PageManager.accountCreatedPage.getAccountCreatedHeadingText();
    expect(actualText.toLowerCase()).to.equal(expectedText.toLowerCase(), `Expected heading to be "${expectedText}" but found "${actualText}".`);
});

Then(/^I should see "([^"]*)" message$/, async function (accCreatedMsg: string) {
    const actualText = await PageManager.accountCreatedPage.getAccountCreatedHeadingText();
    expect(actualText.toLowerCase()).to.include(accCreatedMsg.toLowerCase());
});
