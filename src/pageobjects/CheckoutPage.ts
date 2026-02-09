import Page from "./Page";
import {clickWhenClickable} from "support/actions/elementActions.ts";

class CheckoutPage extends Page {
    // --- Locators ---

    // Headings
    get addressDetailsHeading() {
        return $("#cart_items > div > div:nth-child(2) > h2");
    }

    get reviewOrderHeading() {
        return $("#cart_items > div > div:nth-child(4) > h2");
    }

    get addressDetailsHeader() {
        return $('div:nth-child(4) h2:nth-child(1)');
    }

    get reviewOrderHeader() {
        return $('div:nth-child(4) h2:nth-child(1)');
    }

    get placeOrderButton() {
        return $('.btn.btn-default.check_out');
    }

    // Address Details - Delivery
    get deliveryAddressBox() {
        return $("#address_delivery");
    }

    get deliveryAddressTitle() {
        return $("#address_delivery .page-subheading");
    }

    get deliveryName() {
        return $("#address_delivery .address_firstname");
    }

    get deliveryCompany() {
        return $("#address_delivery .address_address1:nth-of-type(3)");
    } // Adjust index based on actual list items
    get deliveryAddress1() {
        return $("#address_delivery .address_address1:nth-of-type(4)");
    }

    get deliveryAddress2() {
        return $("#address_delivery .address_address1:nth-of-type(5)");
    }

    get deliveryCityStatePostcode() {
        return $("#address_delivery .address_city");
    }

    get deliveryCountry() {
        return $("#address_delivery .address_country_name");
    }

    get deliveryPhone() {
        return $("#address_delivery .address_phone");
    }

    // Address Details - Billing
    get billingAddressBox() {
        return $("#address_invoice");
    }

    get billingAddressTitle() {
        return $("#address_invoice .page-subheading");
    }

    get billingName() {
        return $("#address_invoice .address_firstname");
    }

    get billingCompany() {
        return $("#address_invoice .address_address1:nth-of-type(3)");
    }

    get billingAddress1() {
        return $("#address_invoice .address_address1:nth-of-type(4)");
    }

    get billingAddress2() {
        return $("#address_invoice .address_address1:nth-of-type(5)");
    }

    get billingCityStatePostcode() {
        return $("#address_invoice .address_city");
    }

    get billingCountry() {
        return $("#address_invoice .address_country_name");
    }

    get billingPhone() {
        return $("#address_invoice .address_phone");
    }

    // Order Review Table
    get cartInfoTable() {
        return $("#cart_info");
    }

    get productRows() {
        return $$("#cart_info tbody tr[id^='product-']");
    }

    get totalAmountRow() {
        return $("#cart_info tbody tr:last-child");
    }

    get totalAmount() {
        return $("#cart_info tbody tr:last-child .cart_total_price");
    }

    // Comment & Place Order
    get commentTextArea() {
        return $("textarea[name='message']");
    }

    get placeOrderBtn() {
        return $("a.btn.btn-default.check_out");
    }

    get nameOnCard() {
        return $('input[name="name_on_card"]');
    }

    get cardNumber() {
        return $('input[name="card_number"]');
    }

    get cvc() {
        return $('input[name="cvc"]');
    }

    get expiryMonth() {
        return $('input[name="expiry_month"]');
    }

    get expiryYear() {
        return $('input[name="expiry_year"]');
    }

    get payAndConfirmButton() {
        return $('#submit');
    }

    // Success
    get orderPlacedMessage() {
        return $('//p[contains(.,"Congratulations") or contains(.,"Your order has been placed")]');
    }

    // --- Methods ---

    // Address Getters
    async getDeliveryAddressText() {
        return await this.deliveryAddressBox.getText();
    }

    async getBillingAddressText() {
        return await this.billingAddressBox.getText();
    }

    async getDeliveryName() {
        return await this.deliveryName.getText();
    }

    async getBillingName() {
        return await this.billingName.getText();
    }

    // Order Review Methods
    async getProductRow(productName: string) {
        const rows = await this.productRows;
        for (const row of rows) {
            const nameElement = await row.$(".cart_description h4 a");
            const name = await nameElement.getText();
            if (name.trim() === productName) {
                return row;
            }
        }
        throw new Error(`Product '${productName}' not found in checkout review.`);
    }

    async getProductPrice(productName: string) {
        const row = await this.getProductRow(productName);
        return await row.$(".cart_price p").getText();
    }

    async getProductQuantity(productName: string) {
        const row = await this.getProductRow(productName);
        return await row.$(".cart_quantity button").getText();
    }

    async getProductTotal(productName: string) {
        const row = await this.getProductRow(productName);
        return await row.$(".cart_total .cart_total_price").getText();
    }

    async getTotalAmount() {
        return await this.totalAmount.getText();
    }

    // Action Methods
    async enterComment(comment: string) {
        await this.commentTextArea.setValue(comment);
    }

    async clickPlaceOrder() {
        await clickWhenClickable(this.placeOrderBtn);
    }

    async isCheckoutSectionsVisible(): Promise<boolean> {
        const a = await this.addressDetailsHeader.isDisplayed();
        const r = await this.reviewOrderHeader.isDisplayed();
        return a && r;
    }


    async placeOrder(comment: string = "Automated order") {
        if (await (this.commentTextArea).isExisting()) {
            await this.enterComment(comment);
        }
        await this.clickPlaceOrder();
    }

    async expectLoaded() {
        await expect(this.addressDetailsHeading).toBeDisplayed();
    }


    async expectAddressDetailsVisible() {
        await this.expectLoaded();
        await expect(this.deliveryAddressBox).toBeDisplayed();
        await expect(this.billingAddressBox).toBeDisplayed();

    }

    async expectOrderReviewVisible() {
        await this.expectLoaded();
        await expect(this.cartInfoTable).toBeDisplayed();
        await expect(this.totalAmountRow).toBeDisplayed();
        await expect(this.totalAmount).toBeDisplayed();

    }
}

export default new CheckoutPage();
