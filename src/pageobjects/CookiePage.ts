import Page from "./Page";
import {browser} from "@wdio/globals";
import logger from "../support/utils/logger/logger.ts";

class CookiePage extends Page {
    // Locators
    get consentButton() {
        return $("button[aria-label='Consent'] p[class='fc-button-label']");
    }

    get manageOptionButton() {
        return $("button[aria-label='Manage options'] p[class='fc-button-label']");
    }

    // Complex Logic for Consent Button
    async clickConsentButton() {
        const overlaySelector = "div.fc-dialog-overlay";
        const frameSelector = "iframe[id^='sp_message_iframe']";
        const buttonSelector = "button.fc-cta-consent[aria-label='Consent']";

        try {
            // Check if overlay or iframe exists
            const overlays = $$(overlaySelector);
            const frames = $$(frameSelector);

            if (await overlays.length === 0 && await frames.length === 0) {
                return;
            }

            if (await frames.length > 0) {
                // Switch to iframe
                const frame = $(frameSelector);
                await frame.waitForExist({timeout: 10000});
                await browser.switchToParentFrame();

                // Click button inside iframe
                const button = $(buttonSelector);
                await button.waitForClickable({timeout: 10000});
                await button.click();
                logger.info(`Consent button clicked in iframe`);


                // Switch back to default content
                await browser.switchToParentFrame();
            } else {
                // Fallback: button in main DOM
                const buttons = $$(buttonSelector);
                if (await buttons.length > 0) {
                    const button = $(buttonSelector);
                    await button.waitForClickable({timeout: 10000});
                    await button.click();
                    logger.info(`Consent button clicked in main content`);
                }
            }

            // Wait for overlay to disappear
            const overlay = $(overlaySelector);
            if (await overlay.isExisting()) {
                await overlay.waitForDisplayed({reverse: true, timeout: 3000});
            }

        } catch (error) {
            // Ignore errors as the banner might not be present or already handled
        } finally {
            // Ensure we are back to the main content
            try {
                await browser.switchToParentFrame();
            } catch (e) {
                // Ignore
            }
        }
    }

    async clickManageOptionButton() {
        await this.clickElement(this.manageOptionButton);
    }

    async getConsentButtonText() {
        return await this.getElementText(this.consentButton);
    }

    async getManageOptionButtonText() {
        return await this.getElementText(this.manageOptionButton);
    }

    async isConsentButtonDisplayed() {
        return await this.isElementDisplayed(this.consentButton);
    }

    async isManageOptionButtonDisplayed() {
        return await this.isElementDisplayed(this.manageOptionButton);
    }
}

export default new CookiePage();
