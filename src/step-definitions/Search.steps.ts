import {Then, When} from '@wdio/cucumber-framework';
import {expect} from 'chai';
import PageManager from "../pageobjects/PageManager";

Then('SEARCHED PRODUCTS section should be visible', async () => {
    const isVisible = await PageManager.searchPage.isSearchedProductsHeaderVisible();
    expect(isVisible).to.be.true;
});

Then('All searched products should be visible', async () => {
    const count = await PageManager.searchPage.getSearchResultsCount();
    expect(count).to.be.greaterThan(0);
});

When('I search for {string}', async (keyword: string) => {
    await PageManager.searchPage.searchForProduct(keyword);
});

Then('I should see the searched products section', async () => {
    const isVisible = await PageManager.searchPage.isSearchedProductsHeaderVisible();
    expect(isVisible).to.be.true;
});

When('I add all searched items to the cart', async () => {
    await PageManager.searchPage.addAllSearchResultsToCart();
});

When('I add searched product {string} to cart', async (name: string) => {
    await PageManager.searchPage.addProductToCartByName(name);
});

Then('the search results count should be {int}', async (expected: number) => {
    const actual = await PageManager.searchPage.getSearchResultsCount();
    expect(actual).to.equal(expected);
});
