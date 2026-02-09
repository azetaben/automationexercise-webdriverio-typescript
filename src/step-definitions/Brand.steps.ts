import {Then, When} from '@wdio/cucumber-framework';
import {expect} from 'chai';
import pm from "../pageobjects/PageManager";

Then('I should see Brands section visible on the sidebar', async () => {
    const isVisible = await pm.leftSidebarPage.isBrandsHeadingVisible();
    expect(isVisible).to.be.true;
});

When('I click the brand {string}', async (brand: string) => {
    await pm.leftSidebarPage.clickBrand(brand);
});

Then('I should see products for brand {string}', async (brand: string) => {
    const isVisible = await pm.productsPage.isAllProductsHeaderVisible();
    expect(isVisible).to.be.true;

    const headerText = await pm.productsPage.getFeaturesItemsHeadingText();
    expect(headerText).to.include(brand.toUpperCase());

    const count = await pm.productsPage.getProductCount();
    expect(count).to.be.greaterThan(0);
});
