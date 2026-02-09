import Page from "./Page";
import logger from "../support/utils/logger/logger.ts";

class VideoTutorialPage extends Page {
    // --- Locators ---
    // Since the Java code was empty, a placeholder for the main header is added.
    // This should be updated with the actual locator from the page.
    get pageHeader() {
        return $("h1.title");
    } // Example locator

    // --- Core Page Actions & Visibility ---

    /**
     * Opens the Video Tutorials page directly.
     */
    async openVideoTutorialsPage() {
        // The URL path needs to be confirmed from the actual site.
        // This assumes a path like '/video_tutorials'.
        await this.open("/video_tutorials");
        await this.waitForElement(await this.pageHeader);
    }

    /**
     * Checks if the main page header is visible.
     * @returns `true` if the header is displayed, otherwise `false`.
     */
    async isPageHeaderVisible(): Promise<boolean> {
        try {
            return await this.isElementDisplayed(await this.pageHeader);
        } catch (error) {
            logger.error("Video Tutorials page header not found.");
            return false;
        }
    }

    /**
     * Gets the text of the main page header.
     * @returns The header text string.
     */
    async getPageHeaderText(): Promise<string> {
        return await this.getElementText(await this.pageHeader);
    }
}

export default new VideoTutorialPage();
