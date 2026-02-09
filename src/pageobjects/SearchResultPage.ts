import Page from "./Page";
import logger from "../support/utils/logger";

class SearchResultPage extends Page {
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

    get continueShoppingButton() {
        return $(".modal-content .modal-footer button");
    }

    get modalContent() {
        return $(".modal-content");
    }


    // --- Core Search Actions ---

    async enterSearchKeyword(keyword: string) {
        const input = await this.searchInput;
        await this.waitForElement(input);
        await input.clearValue();
        await this.setElementValue(input, keyword);
    }

    async clickSearchButton() {
        await this.clickElement(await this.searchButton);
    }

    async searchForProduct(keyword: string) {
        await this.enterSearchKeyword(keyword);
        await this.clickSearchButton();
        await this.waitForElement(await this.searchedProductsHeader);
    }

    // --- Search Results Verification & Data Extraction ---

    async isSearchedProductsHeaderVisible() {
        return await this.isElementDisplayed(await this.searchedProductsHeader);
    }

    async getSearchedProductsHeaderText() {
        return await this.getElementText(await this.searchedProductsHeader);
    }

    async getAllSearchResultNames(): Promise<string[]> {
        const names: string[] = [];
        const cards = await this.productCards; // Await the element array
        for (const card of cards) {
            const nameElement = await card.$(".productinfo p");
            names.push(await nameElement.getText());
        }
        return names;
    }

    async getSearchResultsCount(): Promise<number> {
        return (await this.productCards).length;
    }

    /**
     * Validates that AT LEAST ONE search result product name contains the given keyword.
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
                return true;
            }
        }
        logger.error(`Search result validation failed. No results contained the keyword "${keyword}".`);
        return false;
    }
}

export default new SearchResultPage();
