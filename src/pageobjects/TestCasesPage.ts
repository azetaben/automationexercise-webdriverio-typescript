import Page from "./Page";
import logger from "../support/utils/logger/logger.ts";

class TestCasesPage extends Page {
    // --- Locators ---
    get testCasesHeader() {
        return $("h2.title.text-center b");
    }

    get descriptionText() {
        return $("//h5/span[contains(text(),'Below is the list')]");
    }

    get testCasePanels() {
        return $$("div.panel-group .panel");
    }

    get allTestCaseLinks() {
        return $$("div.panel-group .panel-title a");
    }

    // --- Core Page Actions & Visibility ---

    /**
     * Opens the Test Cases page directly.
     */
    async openTestCasesPage() {
        await this.open("/test_cases");
        await this.waitForElement(await this.testCasesHeader);
    }

    /**
     * Checks if the main "Test Cases" header is visible.
     * @returns `true` if the header is displayed, otherwise `false`.
     */
    async isTestCasesHeaderVisible(): Promise<boolean> {
        return await this.isElementDisplayed(await this.testCasesHeader);
    }

    /**
     * Gets the text of the main "Test Cases" header.
     * @returns The header text string.
     */
    async getTestCasesHeaderText(): Promise<string> {
        return await this.getElementText(await this.testCasesHeader);
    }

    /**
     * Checks if the description text below the header is visible.
     * @returns `true` if the description is displayed, otherwise `false`.
     */
    async isDescriptionTextVisible(): Promise<boolean> {
        return await this.isElementDisplayed(await this.descriptionText);
    }

    /**
     * Gets the description text below the header.
     * @returns The description text string.
     */
    async getDescriptionText(): Promise<string> {
        return await this.getElementText(await this.descriptionText);
    }

    // --- Test Case List Interactions ---

    /**
     * Gets the total number of test case panels displayed on the page.
     * @returns The count of test cases.
     */
    async getTestCasesCount(): Promise<number> {
        return (await this.testCasePanels).length;
    }

    /**
     * Clicks on a test case link based on its visible text.
     * @param testCaseName The full, case-insensitive text of the test case link to click (e.g., "Test Case 1").
     */
    async clickTestCaseByName(testCaseName: string) {
        let linkFound = false;
        for (const link of await this.allTestCaseLinks) {
            const linkText = await link.getText();
            if (linkText.trim().toLowerCase() === testCaseName.toLowerCase()) {
                await this.clickElement(link);
                linkFound = true;
                logger.info(`Clicked on test case: ${testCaseName}`);
                break;
            }
        }
        if (!linkFound) {
            throw new Error(`Test Case link not found: ${testCaseName}`);
        }
    }

    /**
     * Gets the title text of a specific test case panel by its index.
     * @param index The zero-based index of the test case.
     * @returns The title text string.
     */
    async getTestCaseTitleByIndex(index: number): Promise<string> {
        const links = await this.allTestCaseLinks;
        if (index >= 0 && index < links.length) {
            return await links[index].getText();
        }
        throw new Error(`Invalid test case index: ${index}`);
    }

    /**
     * Checks if a test case link with the given text is visible on the page.
     * @param linkText The case-insensitive text of the link to find.
     * @returns `true` if a matching link is found and displayed, otherwise `false`.
     */
    async isTestCaseLinkVisible(linkText: string): Promise<boolean> {
        for (const link of await this.allTestCaseLinks) {
            const text = await link.getText();
            if (text.trim().toLowerCase() === linkText.toLowerCase()) {
                return await this.isElementDisplayed(link);
            }
        }
        return false;
    }
}

export default new TestCasesPage();
