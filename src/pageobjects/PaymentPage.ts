import Page from "./Page";
import * as fs from 'fs/promises';
import * as path from 'path';
import logger from "../support/utils/logger/logger.ts";
import {clickWhenClickable, typeWhenDisplayed} from "support/actions/elementActions.ts";

class PaymentPage extends Page {
    // Locators

    get paymentHeading() {
        return $("h2.heading");
    }

    get nameOnCardInput() {
        return $("[name='name_on_card']");
    }

    get cardNumberInput() {
        return $("[name='card_number']");
    }

    get cvcInput() {
        return $("[name='cvc']");
    }

    get expiryMonthInput() {
        return $("[name='expiry_month']");
    }

    get expiryYearInput() {
        return $("[name='expiry_year']");
    }

    get payAndConfirmOrderButton() {
        return $("#submit");
    }

    get successMessage() {
        return $("#success_message .alert-success");
    }

    // Text & Visibility Methods
    async getPaymentHeadingText() {
        return await this.getElementText(this.paymentHeading);
    }

    async isPaymentHeadingVisible() {
        return await this.isElementDisplayed(await this.paymentHeading);
    }

    async isSuccessMessageVisible() {
        return await this.isElementDisplayed(await this.successMessage);
    }

    // Form Filling Methods
    async enterNameOnCard(name: string) {
        const element = await this.nameOnCardInput;
        await element.clearValue();
        await element.setValue(name);
    }

    async enterCardNumber(number: string) {
        const element = this.cardNumberInput;
        await element.clearValue();
        await element.setValue(number);
    }

    async enterCVC(cvc: string) {
        const element = this.cvcInput;
        await element.clearValue();
        await element.setValue(cvc);
    }

    async enterExpiryMonth(month: string) {
        const element = this.expiryMonthInput;
        await element.clearValue();
        await element.setValue(month);
    }

    async enterExpiryYear(year: string) {
        const element = this.expiryYearInput;
        await element.clearValue();
        await element.setValue(year);
    }

    // Click Methods
    async clickPayAndConfirmOrder() {
        const button = this.payAndConfirmOrderButton;
        await button.scrollIntoView();
        await clickWhenClickable(button);
    }

    // High-Level Action Methods
    async enterPaymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
        await this.enterNameOnCard(nameOnCard);
        await this.enterCardNumber(cardNumber);
        await this.enterCVC(cvc);
        await this.enterExpiryMonth(expiryMonth);
        await this.enterExpiryYear(expiryYear);
    }

    async pay(data: {
        nameOnCard: string;
        cardNumber: string;
        cvc: string;
        expiryMonth: string;
        expiryYear: string;
    }): Promise<void> {
        await typeWhenDisplayed(this.nameOnCardInput, data.nameOnCard);
        await typeWhenDisplayed(this.cardNumberInput, data.cardNumber);
        await typeWhenDisplayed(this.cvcInput, data.cvc);
        await typeWhenDisplayed(this.expiryMonthInput, data.expiryMonth);
        await typeWhenDisplayed(this.expiryYearInput, data.expiryYear);
        await clickWhenClickable(this.payAndConfirmOrderButton);
    }

    async isOrderPlacedVisible(): Promise<boolean> {
        return this.successMessage.isDisplayed();
    }

    async submitPaymentForm(name: string, cardNumber: string, cvc: string, month: string, year: string) {
        await this.enterPaymentDetails(name, cardNumber, cvc, month, year);
        await this.clickPayAndConfirmOrder();
    }

    /**
     * Fills and submits the payment form using data from a JSON file.
     * Note: Data handling logic like this is often kept in step definitions or helperUtilities utilities
     * rather than page objects, but is included here to match the Java example.
     * @param jsonFilePath - Path to the JSON file relative to the project root.
     */
    async submitPaymentFormFromJson(jsonFilePath: string) {
        try {
            const resolvedPath = path.resolve(process.cwd(), jsonFilePath);
            const fileContent = await fs.readFile(resolvedPath, 'utf-8');
            const data = JSON.parse(fileContent);

            await this.submitPaymentForm(
                data.name_on_card,
                data.card_number,
                data.cvc,
                data.expiry_month,
                data.expiry_year
            );
        } catch (error) {
            logger.error(`Failed to read or process JSON for payment form: ${error}`);
            throw new Error(`Failed to read or process JSON for payment form: ${error}`);
        }
    }
}

export default new PaymentPage();
