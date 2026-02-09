import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

// --- API Testing ---

When(/^I click on 'API Testing' button$/, async () => {
    await pm.topNavigationBarPage.clickNavLinkByText("API Testing");
});

Then(/^I should be navigated to API Testing page successfully$/, async () => {
    const url = await browser.getUrl();
    expect(url).to.include("api_list");
});

// --- Video Tutorials ---

When(/^I click on 'Video Tutorials' button$/, async () => {
    await pm.topNavigationBarPage.clickNavLinkByText("Video Tutorials");
});

Then(/^I should be navigated to video tutorials page successfully$/, async () => {
    const isVisible = await pm.videoTutorialPage.isPageHeaderVisible();
    expect(isVisible).to.be.true;
});
