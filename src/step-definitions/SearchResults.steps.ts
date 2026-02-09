import {Then} from '@wdio/cucumber-framework';
import {expect} from 'chai';
import pm from "../pageobjects/PageManager";

Then('SEARCHED PRODUCTS section should be visible', async () => {
    const isVisible = await pm.searchResultPage.isSearchedProductsHeaderVisible();
    expect(isVisible).to.be.true;
});

Then('All searched products should be visible', async () => {
    const count = await pm.searchResultPage.getSearchResultsCount();
    expect(count).to.be.greaterThan(0);
});

Then('I should see the searched products section', async () => {
    const isVisible = await pm.searchResultPage.isSearchedProductsHeaderVisible();
    expect(isVisible).to.be.true;
});

Then('all results should contain the keyword {string}', async (keyword: string) => {
    const isValid = await pm.searchResultPage.validateSearchResultsContain(keyword);
    expect(isValid).to.be.true;
});


Then('the search results count should be {int}', async (expected: number) => {
    const actual = await pm.searchResultPage.getSearchResultsCount();
    expect(actual).to.equal(expected);
});
