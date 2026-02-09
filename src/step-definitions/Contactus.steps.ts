import {Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";

When(/^I enter name "(.*)", email "(.*)", subject "(.*)" and message "(.*)"$/, async (name, email, subject, message) => {
    await pm.contactUsPage.submitContactForm(name, email, subject, message);
});

When(/^I upload file "(.*)"$/, async (filePath: string) => {
    await pm.contactUsPage.uploadFile(filePath);
});

When(/^I click 'Submit' button$/, async () => {
    await pm.contactUsPage.clickSubmit();
});

When(/^I click 'OK' button$/, async () => {
    await pm.contactUsPage.acceptAlert();
});

Then(/^I should see the success message 'Success! Your details have been submitted successfully.'$/, async () => {
    const isVisible = await pm.contactUsPage.isSuccessMessageVisible();
    expect(isVisible).to.be.true;
});

When(/^I click 'Home' button$/, async () => {
    await pm.contactUsPage.clickHomeButton();
});
