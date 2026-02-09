import {When} from '@wdio/cucumber-framework';
import {expect} from 'chai';
import pm from "../pageobjects/PageManager";

When('I verify that categories are visible on the left sidebar', async () => {
    const isVisible = await pm.leftSidebarPage.isCategoryHeadingVisible();
    expect(isVisible).to.be.true;
});

When('I click the {string} category', async (category: string) => {
    await pm.leftSidebarPage.expandCategory(category);
});

When('I click the {string} subcategory under {string}', async (subCategory: string, mainCategory: string) => {
    switch (mainCategory.toLowerCase()) {
        case 'women':
            await pm.leftSidebarPage.clickWomenSubCategory(subCategory);
            break;
        case 'men':
            await pm.leftSidebarPage.clickMenSubCategory(subCategory);
            break;
        case 'kids':
            await pm.leftSidebarPage.clickKidsSubCategory(subCategory);
            break;
        default:
            throw new Error(`Unknown main category: ${mainCategory}`);
    }
});
