import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

When(/^I click 'Delete Account' button$/, async () => {
    await pm.topNavigationBarPage.clickNavLinkByText("Delete Account");
});

Then(/^"([^"]*)" is visible$/, async () => {
    const isVisible = await pm.deletedAccountPage.isAccountDeletedVisible();
    expect(isVisible).to.be.true;
});
When(/^I can see "([^"]*)" message$/, async function (deletedMsg: string) {
    const actualText = await pm.deletedAccountPage.getAccountDeletedHeadingText();
    expect(actualText).to.include(deletedMsg);

});
When(/^I click on the Delete Account link$/, async function () {
    await pm.topNavigationBarPage.deleteAccount();

});