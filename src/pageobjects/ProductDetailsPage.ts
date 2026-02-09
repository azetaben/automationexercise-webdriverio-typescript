import Page from "./Page";

class ProductDetailsPage extends Page {
    // Product Details Locators
    get productName() {
        return $(".product-details h2");
    }

    get productCategory() {
        return $(".product-details p");
    }

    get productPrice() {
        return $(".product-details span span");
    }

    get quantityInput() {
        return $("#quantity");
    }

    get addToCartButton() {
        return $("button.btn.btn-default.cart");
    }

    get availabilityText() {
        return $("//p/b[normalize-space()='Availability:']/parent::p");
    }

    get conditionText() {
        return $("//p/b[normalize-space()='Condition:']/parent::p");
    }

    get brandText() {
        return $("//p/b[normalize-space()='Brand:']/parent::p");
    }

    // Cart Modal Locators
    get cartModal() {
        return $("#cartModal");
    }

    get cartModalTitle() {
        return $("#cartModal .modal-title");
    }

    get continueShoppingButton() {
        return $("#cartModal .btn.btn-success.close-modal");
    }

    // Review Section Locators
    get reviewForm() {
        return $("#review-form");
    }

    get reviewName() {
        return $("#name");
    }

    get reviewEmail() {
        return $("#email");
    }

    get reviewText() {
        return $("#review");
    }

    get reviewSubmitButton() {
        return $("#button-review");
    }

    get reviewSuccessMessage() {
        return $("#review-section .alert-success span");
    }

    get writeYourReviewHeader() {
        return $("//a[text()='Write Your Review']");
    }

    // Product Details Methods
    async getProductName() {
        return await this.getElementText(await this.productName);
    }

    async getProductCategory() {
        return await this.getElementText(await this.productCategory);
    }

    async getProductPrice() {
        return await this.getElementText(await this.productPrice);
    }

    async isAvailabilityDisplayed() {
        return await this.isElementDisplayed(await this.availabilityText);
    }

    async isConditionDisplayed() {
        return await this.isElementDisplayed(await this.conditionText);
    }

    async isBrandDisplayed() {
        return await this.isElementDisplayed(await this.brandText);
    }

    // Quantity Handlers
    async clearAndSetQuantity(qty: number) {
        const input = await this.quantityInput;
        await this.waitForElement(input);
        await input.clearValue();
        await input.setValue(String(qty));
    }

    async increaseQuantityUsingArrow(times: number) {
        const input = await this.quantityInput;
        for (let i = 0; i < times; i++) {
            await input.keys('ArrowUp');
        }
    }

    async decreaseQuantityUsingArrow(times: number) {
        const input = await this.quantityInput;
        for (let i = 0; i < times; i++) {
            await input.keys('ArrowDown');
        }
    }

    // Add to Cart
    async addProductToCart(quantity: number = 1) {
        await this.clearAndSetQuantity(quantity);
        await this.clickElement(await this.addToCartButton);
    }

    // Cart Modal Actions
    async isCartModalDisplayed() {
        return await this.isElementDisplayed(await this.cartModal);
    }

    async getCartModalTitle() {
        return await this.getElementText(await this.cartModalTitle);
    }

    async clickContinueShopping() {
        await this.clickElement(await this.continueShoppingButton);
    }

    // Review Section Methods
    async isWriteYourReviewVisible() {
        return await this.isElementDisplayed(await this.writeYourReviewHeader);
    }

    async submitReview(name: string, email: string, text: string) {
        await this.setElementValue(await this.reviewName, name);
        await this.setElementValue(await this.reviewEmail, email);
        await this.setElementValue(await this.reviewText, text);
        await this.clickElement(await this.reviewSubmitButton);
    }

    async isReviewSuccessMessageVisible() {
        return await this.isElementDisplayed(await this.reviewSuccessMessage);
    }

    async getReviewSuccessMessage() {
        return await this.getElementText(await this.reviewSuccessMessage);
    }

    // General Visibility
    async isProductNameVisible() {
        return await this.isElementDisplayed(await this.productName);
    }
}

export default new ProductDetailsPage();
