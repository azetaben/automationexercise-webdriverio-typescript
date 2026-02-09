import {When} from "@wdio/cucumber-framework";
import PageManager from "../pageobjects/PageManager";

// This step allows you to manually trigger ad dismissal in your feature files
// Example: And I dismiss any ads or popups
When(/^I dismiss any ads or popups$/, async () => {
    // We can call the method on any page object since it's inherited from the base Page class
    await PageManager.homePage.dismissAds();
});
