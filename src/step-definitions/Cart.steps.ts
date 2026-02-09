import {Then, When} from "@wdio/cucumber-framework";
import PageManager from "../pageobjects/PageManager";
import {expect} from "chai";

// --- Adding Products to Cart ---

When(/^I add the product "(.*)" to the cart$/, async (productName: string) => {
    await PageManager.productsPage.addProductToCartByName(productName);
});

When(/^I add the following products to the cart:$/, async (table: any) => {
    const products = table.raw().flat();
    await PageManager.productsPage.addMultipleProductsToCart(products);
});

When(/^I hover over the product "(.*)" and click 'Add to cart'$/, async (productName: string) => {
    await PageManager.productsPage.addProductToCartByName(productName);
});

// --- Cart Modal Interactions ---

When(/^I click 'Continue Shopping' button$/, async () => {
    await PageManager.productsPage.clickContinueShopping();
});

/*When(/^I click 'View Cart' link$/, async () => {
    await PageManager.productsPage.clickViewCart();
});*/

When(/^I click "([^"]+)" link$/, async (linkText: string) => {
    if (linkText.toLowerCase().includes('view cart')) {
        await PageManager.productsPage.clickViewCartFromModal();
    } else {
        throw new Error(`Unsupported link: ${linkText}`);
    }
});

// --- Cart Page Verifications ---

Then(/^the cart should contain the product "(.*)"$/, async (productName: string) => {
    const isInCart = await PageManager.cartPage.isProductInCart(productName);
    expect(isInCart).to.be.true;
});

Then(/^the cart should contain the following products:$/, async (table: any) => {
    const expectedProducts = table.raw().flat();
    const actualProducts = await PageManager.cartPage.getAllProductNames();
    expect(actualProducts).to.include.members(expectedProducts);
});

Then(/^the product "(.*)" should have price "(.*)", quantity "(.*)", and total "(.*)"$/, async (name: string, price: string, qty: string, total: string) => {
    const actualPrice = await PageManager.cartPage.getProductPrice(name);
    const actualQty = await PageManager.cartPage.getProductQuantity(name);
    const actualTotal = await PageManager.cartPage.getProductTotal(name);

    expect(actualPrice).to.equal(price);
    expect(actualQty).to.equal(qty);
    expect(actualTotal).to.equal(total);
});

Then('the cart should contain at least 1 item', async () => {
    const count = await PageManager.cartPage.getCartItemsCount();
    expect(count).to.be.greaterThan(0);
});

// --- Cart Page Actions ---

When(/^I remove the product "(.*)" from the cart$/, async (productName: string) => {
    await PageManager.cartPage.removeProductByName(productName);
});

Then(/^the cart should be empty$/, async () => {
    const count = await PageManager.cartPage.getCartItemsCount();
    expect(count).to.equal(0);
});
