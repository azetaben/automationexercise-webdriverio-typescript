import pm from "pageobjects/PageManager.ts";
import {When} from "@wdio/cucumber-framework";

When('I add all searched items to the cart', async () => {
    await pm.searchPage.addAllSearchResultsToCart();
});

When('I add searched product {string} to cart', async (name: string) => {
    await pm.searchPage.addProductToCartByName(name);
});