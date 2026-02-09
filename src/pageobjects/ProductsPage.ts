import Page from "./Page";
import {browser} from "@wdio/globals";
import logger from "../support/utils/logger";

class ProductsPage extends Page {
    // Main Page Locators
    get allProductsHeader() {
        return $(".title.text-center");
    }

    get productList() {
        return $$(".features_items .product-image-wrapper");
    }

    // Modal Locators
    get modalContent() {
        return $("#cartModal");
    } // Updated selector to the modal container
    get productAddedMessage() {
        return $("div[id='cartModal'] p:nth-child(1)");
    }

    get continueShoppingButton() {
        return $(".modal-content .btn-success");
    } // More specific selector
    get viewCartLink() {
        return $("[class=\"text-center\"] a");
    } // Simpler, more robust selector by text
    get GoodMaterialIcon() {
        return $('#cartModal > div > div > div.modal-body > p:nth-child(2) > a')
    }

    get searchInput() {
        return $('#search_product');
    }

    get searchButton() {
        return $('#submit_search');
    }

    get searchedProductsHeader() {
        return $(".features_items h2.title.text-center");
    }

    // Product cards in listing / search results
    get productCards() {
        return $$('div.productinfo');
    }

    // “Add to cart” buttons may appear in card overlay; this is a pragmatic selector
    get addToCartButtons() {
        return $$('//a[contains(@class,"add-to-cart")]');
    }

    // --- Core Page Actions & Visibility ---

    get viewCartLinkInModal() {
        return this.viewCartLink;
    }

    async openProductsPage() {
        await this.open("/products");
        await this.waitForProductsToLoad();
    }

    async waitForProductsToLoad() {
        await this.waitForElement((await this.productList)[0]);
    }

    async isAllProductsHeaderVisible() {
        return await this.isElementDisplayed(this.allProductsHeader);
    }

    async getProductCount() {
        return (this.productList).length;
    }

    // --- Product Card Interactions (Dynamic) ---

    async isGoodMaterialIcon() {
        return await this.isElementDisplayed(this.GoodMaterialIcon);
    }

    /**
     * Clicks the "Add to cart" button for a given product name.
     * This method includes a hover action to make the button visible.
     * @param productName The name of the product to add.
     */
    async addProductToCartByName(productName: string) {
        const card = await this.findProductCardByName(productName);
        await card.scrollIntoView({block: 'center'});
        await card.moveTo();
        const addToCartBtn = card.$(".product-overlay a.add-to-cart");
        // Use the robust clickElement from base Page
        await this.clickElement(addToCartBtn);
        logger.info(`Added product to cart: ${productName}`);
    }

    /**
     * Clicks the "View Product" link for a given product name.
     * @param productName The name of the product to view.
     */
    async viewProductByName(productName: string) {
        const card = await this.findProductCardByName(productName);
        const viewProductBtn = card.$(".choose a");
        await this.clickElement(viewProductBtn);
    }

    async waitForAddToCartModal() {
        await this.waitForElement(this.modalContent);
    }

    // --- "Added to Cart" Modal Actions ---

    async isModalVisible() {
        return await this.isElementDisplayed(this.modalContent);
    }

    async getModalTitle() {
        return await this.getElementText(this.productAddedMessage);
    }

    async clickContinueShopping() {
        await this.clickElement(this.continueShoppingButton);
    }

    async clickViewCart() {
        // Wait for modal to be fully visible and stable
        await this.waitForAddToCartModal();
        await browser.pause(500); // Small pause for animation
        await this.viewCartLink.click();
    }

    /**
     * Adds multiple products to the cart by name.
     * @param productNames An array of product names to add.
     */
    async addMultipleProductsToCart(productNames: string[]) {
        for (const name of productNames) {
            await this.addProductToCartByName(name);
            await this.waitForAddToCartModal();
            await this.clickContinueShopping();
            // Add a small pause to prevent race conditions if needed
            await browser.pause(500);
        }
    }

    // --- Advanced / Helper Methods ---

    /**
     * Gets all product names currently visible on the page.
     * @returns An array of product name strings.
     */
    async getAllProductNames() {
        const names: string[] = [];
        for (const card of await this.productList) {
            const nameElement = card.$(".productinfo p");
            names.push(await nameElement.getText());
        }
        return names;
    }

    async getFeaturesItemsHeadingText() {
        return await this.getElementText(this.allProductsHeader);
    }

    async isAllProductsVisible(): Promise<boolean> {
        return await this.isElementDisplayed(this.allProductsHeader);
    }

    async allResultsContain(keyword: string): Promise<boolean> {
        const lower = keyword.toLowerCase();
        const cards = await this.productCards;
        if (await cards.length === 0) return false;

        for (const card of cards) {
            const text = (await card.getText()).toLowerCase();
            if (!text.includes(lower)) return false;
        }
        return true;
    }

    async continueShoppingFromModal(): Promise<void> {
        if (await this.isElementDisplayed(this.continueShoppingButton)) {
            await this.clickElement(this.continueShoppingButton);
        }
    }

    async viewCartFromModal(): Promise<void> {
        await this.clickViewCart();
    }

    async addFirstVisibleProductToCart(): Promise<void> {
        const buttons = await this.addToCartButtons;
        if (await buttons.length === 0) {
            throw new Error('No Add to cart buttons found for searched products');
        }

        // Use the first button found (usually the one in the product overlay or main card)
        // We need to be careful to pick the visible one.
        // The first one might be in the overlay which requires hover.
        // Let's try to find the first visible one or force hover on the first card.

        const firstCard = (this.productList)[0];
        await this.hoverOverProduct(firstCard);
        const btn = firstCard.$(".product-overlay a.add-to-cart");
        await this.clickElement(btn);
    }

    /**
     * Adds multiple products to cart from the current listing/search results.
     * - Adds up to `maxToAdd` products (or all if omitted).
     * - Handles the "Continue Shopping" modal after each add.
     */
    async addMultipleVisibleProductsToCart(maxToAdd?: number): Promise<number> {
        const buttons = this.addToCartButtons;
        if (await buttons.length === 0) throw new Error('No Add to cart buttons found');

        let added = 0;

        for (const btn of buttons) {
            // Stop if caller asked for a limit
            if (maxToAdd !== undefined && added >= maxToAdd) break;

            // Sometimes buttons exist but are not interactable (hidden/overlay)
            if (!(await btn.isDisplayed())) continue;

            // Hover is often required on AutomationExercise for overlay buttons
            await btn.scrollIntoView();
            await btn.moveTo();

            // Some "Add to cart" links may belong to header/footer or duplicates
            // Try/catch makes this robust without killing the loop on a flaky element
            try {
                await btn.click();
                added++;

                // modal opens each time → close it to continue adding
                await this.closeModalIfPresent();
            } catch {
                // ignore and continue to next clickable add-to-cart element
            }
        }

        if (added === 0) throw new Error('Failed to add any products to cart');

        return added;
    }

    async waitForCartModalOpen() {
        await this.modalContent.waitForExist({timeout: 20000});

        // Bootstrap modal open state
        await browser.waitUntil(
            async () => ((await this.modalContent.getAttribute('class')) || '').includes('show'),
            {
                timeout: 20000,
                interval: 200,
                timeoutMsg: 'Cart modal did not reach "show" state',
            }
        );

        await this.viewCartLink.waitForClickable({timeout: 20000});
    }

    async clickViewCartFromModal() {
        await this.waitForCartModalOpen();
        await this.viewCartLink.scrollIntoView();
        await this.viewCartLink.click();
    }

    /**
     * Finds a product card element by its visible name.
     * @param productName The name of the product to find.
     * @returns The `WebdriverIO.Element` for the product card.
     */
    private async findProductCardByName(productName: string) {
        for (const card of this.productList) {
            const nameElement = card.$(".productinfo p");
            if ((await nameElement.getText()).trim().toLowerCase() === productName.toLowerCase()) {
                return card;
            }
        }
        throw new Error(`Product not found: ${productName}`);
    }

    /**
     * Hovers over a product card to reveal the overlay.
     * @param productCard The product card element to hover over.
     */
    private async hoverOverProduct(productCard: ChainablePromiseElement) {
        await productCard.scrollIntoView({block: 'center'});
        await productCard.moveTo();
    }

    private async closeModalIfPresent(): Promise<void> {
        if (await this.isElementDisplayed(this.continueShoppingButton)) {
            await this.clickElement(this.continueShoppingButton);
        }
    }
}

export default new ProductsPage();
