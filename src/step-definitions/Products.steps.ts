import {Given, Then, When} from "@wdio/cucumber-framework";
import pm from "../pageobjects/PageManager";
import {expect} from "chai";
import PageManager from "pageobjects/PageManager.ts";

// --- Navigation & Visibility ---

Given(/^I am on the All Products page$/, async () => {
    await pm.productsPage.openProductsPage();
    const isVisible = await pm.productsPage.isAllProductsHeaderVisible();
    expect(isVisible).to.be.true;
});

Then(/^the products list should be visible$/, async () => {
    const count = await pm.productsPage.getProductCount();
    expect(count).to.be.greaterThan(0);
});

// --- Product Details ---

When(/^I click on 'View Product' of first product$/, async () => {
    await pm.productsPage.viewProductByName("Blue Top");
});

Then(/^I should land on the product detail page$/, async () => {
    const isVisible = await pm.productDetailsPage.isProductNameVisible();
    expect(isVisible).to.be.true;
});

Then(/^the product details should be visible: Name, Category, Price, Availability, Condition, Brand$/, async () => {
    expect(await pm.productDetailsPage.isProductNameVisible()).to.be.true;
    expect(await pm.productDetailsPage.isAvailabilityDisplayed()).to.be.true;
    expect(await pm.productDetailsPage.isConditionDisplayed()).to.be.true;
    expect(await pm.productDetailsPage.isBrandDisplayed()).to.be.true;
});

// --- Search ---

When(/^I enter product name "(.*)" in search input and click search button$/, async (productName: string) => {
    await pm.searchPage.searchForProduct(productName);
});

Then(/^'Searched Products' is visible$/, async () => {
    const isVisible = await pm.searchPage.isSearchedProductsHeaderVisible();
    expect(isVisible).to.be.true;
});

Then(/^all the products related to search are visible$/, async () => {
    const count = await pm.searchResultPage.getSearchResultsCount();
    expect(count).to.be.greaterThan(0);
});

Then(/^verify all the products related to search contain "(.*)"$/, async (keyword: string) => {
    const isValid = await pm.searchResultPage.validateSearchResultsContain(keyword);
    expect(isValid).to.be.true;
});

/*When(/^I add those searched products to cart$/, async () => {
    await pm.searchPage.addAllSearchResultsToCart();
});*/

// --- Brands ---

When(/^I click on "(.*)" brand$/, async (brand: string) => {
    await pm.leftSidebarPage.clickBrand(brand);
});

Then(/^I should see that the "(.*)" brand page is displayed$/, async (brand: string) => {
    const isVisible = await pm.leftSidebarPage.isBrandHeaderVisible(brand);
    expect(isVisible).to.be.true;
});

// --- Reviews ---

When(/^I write a review with Name "(.*)", Email "(.*)", and Review "(.*)"$/, async (name, email, review) => {
    await pm.productDetailsPage.submitReview(name, email, review);
});

Then(/^I should see the success message 'Thank you for your review.'$/, async () => {
    const isVisible = await pm.productDetailsPage.isReviewSuccessMessageVisible();
    expect(isVisible).to.be.true;
});
When('I add the first searched product to the cart', async () => {
    await pm.productsPage.addFirstVisibleProductToCart();
    // Product add opens modal → go to cart
    //await pm.productsPage.viewCartFromModal();

    await PageManager.productsPage.clickViewCartFromModal();

});

When('I add all searched products to the cart', async () => {
    const added = await pm.productsPage.addMultipleVisibleProductsToCart();
    // @ts-ignore
    global.ctx.set('addedCount', added);

    // After adding many, go to cart via navbar OR open modal "View Cart" if last add left it open.
    // Best stable method: navigate to cart from top nav if you have it:
    await browser.url('/view_cart');
});

When('I add {int} products to the cart', async (count: number) => {
    await pm.topNavigationBarPage.goToProducts();
    expect(await pm.productsPage.isAllProductsVisible()).to.be.equal(true);

    const added = await pm.productsPage.addMultipleVisibleProductsToCart(count);
    // @ts-ignore
    global.ctx.set('addedCount', added);

    await pm.topNavigationBarPage.goToCart();
    expect(await pm.cartPage.itemsCount()).greaterThan(0);
});
