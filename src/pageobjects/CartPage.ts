import Page from "./Page";
import {clickWhenClickable} from "support/actions/elementActions.ts";
import logger from "../support/utils/logger/logger.ts";

class CartPage extends Page {
    // --- Main Locators ---
    get cartTableRows() {
        return $$('tr[id^="product-"]');
    }

    get saleBanner() {
        return $(".sale-banner");
    }

    get cartTable() {
        return $("#cart_info_table");
    }

    get productRows() {
        return $$("#cart_info_table tbody tr[id^='product-']");
    }

    get emptyCartMessage() {
        return $(".text-center");
    }

    get proceedToCheckoutButton() {
        return $(".btn.btn-default.check_out");
    }

    get registerLoginLink() {
        return $(".modal-content .modal-body a[href='/login']");
    }

    // --- Core Page Actions & Visibility ---

    async isCartPageVisible() {
        return await this.isElementDisplayed(this.cartTable);
    }

    async isEmptyCartMessageVisible() {
        return await this.isElementDisplayed(this.emptyCartMessage);
    }

    async getCartItemsCount(): Promise<number> {
        return (this.productRows).length;
    }

    async clickProceedToCheckout() {
        await clickWhenClickable(this.proceedToCheckoutButton);
    }

    async clickRegisterLogin() {
        await clickWhenClickable(this.registerLoginLink);
    }

    // --- Dynamic Row Interactions ---

    /**
     * Removes a product from the cart by its name.
     * @param productName The name of the product to remove.
     */
    async removeProductByName(productName: string) {
        const row = await this.getRowByProductName(productName);
        const deleteButton = row.$(".cart_quantity_delete");
        await clickWhenClickable(deleteButton);
        logger.info(`Removed product from cart: ${productName}`);
        // Add a wait for the element to be stale/removed
        await row.waitForExist({reverse: true});
    }

    /**
     * Checks if a product is visible in the cart.
     * @param productName The name of the product to check for.
     * @returns `true` if the product is found, otherwise `false`.
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            await this.getRowByProductName(productName);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getProductPrice(productName: string): Promise<string> {
        const row = await this.getRowByProductName(productName);
        return await row.$(".cart_price p").getText();
    }

    // --- Data Extraction from Rows ---

    async getProductQuantity(productName: string): Promise<string> {
        const row = await this.getRowByProductName(productName);
        return await row.$(".cart_quantity button").getText();
    }

    async getProductTotal(productName: string): Promise<string> {
        const row = await this.getRowByProductName(productName);
        return await row.$(".cart_total p.cart_total_price").getText();
    }

    async getAllProductNames(): Promise<string[]> {
        const names: string[] = [];
        for (const row of this.productRows) {
            const nameElement = row.$(".cart_description h4 a");
            names.push(await nameElement.getText());
        }
        return names;
    }

    async itemsCount(): Promise<number> {
        return (await this.cartTableRows).length;
    }

    /**
     * Validates that for each row, price * quantity equals the row total.
     * @returns `true` if all rows are calculated correctly, otherwise `false`.
     */
    async validateAllRowTotals(): Promise<boolean> {
        for (const row of this.productRows) {
            const priceText = await row.$(".cart_price p").getText();
            const quantityText = await row.$(".cart_quantity button").getText();
            const totalText = await row.$(".cart_total p.cart_total_price").getText();

            const price = this.parsePrice(priceText);
            const quantity = parseInt(quantityText);
            const expectedTotal = price * quantity;
            const actualTotal = this.parsePrice(totalText);

            if (expectedTotal !== actualTotal) {
                logger.error(`Cart row calculation mismatch. Price: ${price}, Qty: ${quantity}, Expected: ${expectedTotal}, Actual: ${actualTotal}`);
                return false;
            }
        }
        return true;
    }

    // --- Calculation and Validation Helpers ---

    /**
     * Computes the grand total by summing up all individual row totals.
     * @returns The calculated grand total as a number.
     */
    async computeGrandTotal(): Promise<number> {
        let sum = 0;
        for (const row of this.productRows) {
            const totalText = await row.$(".cart_total p.cart_total_price").getText();
            sum += this.parsePrice(totalText);
        }
        logger.info(`Computed cart grand total: ${sum}`);
        return sum;
    }

    async proceedToCheckout(): Promise<void> {
        await clickWhenClickable(this.proceedToCheckoutButton);
    }

    async isSaleBannerVisible(): Promise<void> {
        await this.saleBanner.isDisplayed();
    }

    /**
     * Finds a product row element by the visible product name.
     * @param productName The name of the product to find.
     * @returns The `WebdriverIO.Element` for the table row.
     */
    private async getRowByProductName(productName: string): Promise<WebdriverIO.Element> {
        for (const row of this.productRows) {
            const nameElement = row.$(".cart_description h4 a");
            if ((await nameElement.getText()).trim().toLowerCase() === productName.toLowerCase()) {
                return row;
            }
        }
        throw new Error(`Product "${productName}" not found in cart.`);
    }

    private parsePrice(text: string): number {
        return parseInt(text.replace(/Rs\.\s*/, "").trim());
    }


}

export default new CartPage();
