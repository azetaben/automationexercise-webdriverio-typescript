import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

When(/^I click on 'Test Cases' button$/, async () => {
    await pm.topNavigationBarPage.clickNavLinkByText("Test Cases");
});

Then(/^I should be navigated to test cases page successfully$/, async () => {
    const isVisible = await pm.testCasesPage.isTestCasesHeaderVisible();
    expect(isVisible).to.be.true;
});
