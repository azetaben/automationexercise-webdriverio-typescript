import Page from "./Page";
import logger from "../support/utils/logger";

class SearchPage extends Page {
    // --- Locators ---
    get searchInput() {
        return $("#search_product");
    }

    get searchButton() {
        return $("#submit_search");
    }

    get searchedProductsHeader() {
        return $(".features_items h2.title.text-center");
    }

    get productCards() {
        return $$(".features_items .product-image-wrapper");
    }

    // --- Core Search Actions ---

    /*    async searchForProduct(keyword: string) {
            await this.searchInput.setValue(keyword);
            await this.searchButton.click();
            await this.searchedProductsHeader.waitForDisplayed({ timeout: 15000 });
        }*/


    async searchForProduct(keyword: string) {
        await this.searchInput.waitForDisplayed({timeout: 20000});
        await this.searchInput.setValue(keyword);

        if (await this.searchButton.isExisting()) {
            await this.searchButton.click();
        } else {
            // fallback: press Enter if no explicit button
            await browser.keys('Enter');
        }
    }

    // --- Search Results Verification & Data Extraction ---

    async isSearchedProductsHeaderVisible(): Promise<boolean> {
        return this.searchedProductsHeader.isDisplayed();
    }

    async getSearchResultsCount(): Promise<number> {
        return (this.productCards).length;
    }

    async getAllSearchResultNames(): Promise<string[]> {
        const names: string[] = [];
        const cards = this.productCards;
        for (const card of cards) {
            const nameElement = card.$(".productinfo p");
            names.push(await nameElement.getText());
        }
        return names;
    }

    /**
     * Validates that AT LEAST ONE search result product name contains the given keyword.
     * This is a more realistic check for a search that returns non-exact matches.
     * @param keyword The keyword to check for.
     * @returns `true` if at least one result is valid, otherwise `false`.
     */
    async validateSearchResultsContain(keyword: string): Promise<boolean> {
        const names = await this.getAllSearchResultNames();
        if (names.length === 0) {
            logger.warn("No search results found to validate.");
            return false;
        }
        for (const name of names) {
            if (name.toLowerCase().includes(keyword.toLowerCase())) {
                logger.info(`Validation passed: Found keyword "${keyword}" in result "${name}".`);
                return true; // Found at least one match, so validation passes
            }
        }
        logger.error(`Search result validation failed. No results contained the keyword "${keyword}".`);
        return false;
    }

    // --- Actions on Search Results ---

    async addProductToCartByName(productName: string) {
        let productFound = false;
        for (const card of await this.productCards) {
            const nameElement = await card.$(".productinfo p");
            if ((await nameElement.getText()).trim().toLowerCase() === productName.toLowerCase()) {
                productFound = true;
                await card.scrollIntoView({block: 'center'});
                await card.moveTo();
                const addToCartBtn = await card.$(".product-overlay a.add-to-cart");
                await this.clickElement(addToCartBtn);
                logger.info(`Added search result product to cart: ${productName}`);
                break;
            }
        }
        if (!productFound) {
            throw new Error(`Product "${productName}" not found in search results.`);
        }
    }

    async addAllSearchResultsToCart() {
        const cards = await this.productCards;
        for (const card of cards) {
            await card.scrollIntoView({block: 'center'});
            await card.moveTo();
            const addToCartBtn = await card.$(".product-overlay a.add-to-cart");
            await this.clickElement(addToCartBtn);

            // Assuming a modal appears and needs to be closed
            const continueShoppingButton = await $(".modal-content .btn-success");
            await this.clickElement(continueShoppingButton);
            await browser.pause(500);
        }
        logger.info(`Added ${cards.length} products from search results to the cart.`);
    }
}

export default new SearchPage();
