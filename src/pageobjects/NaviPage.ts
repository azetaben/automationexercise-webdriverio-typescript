import Page from "./Page";
import logger from "../support/utils/logger";
import {clickWhenClickable} from "../support/actions/elementActions";

class NaviPage extends Page {
    get logoImage() {
        return $("div.logo a[href='/'] img");
    }

    get navLinks() {
        return $$("ul.nav.navbar-nav li a");
    }

    get loggedInAs() {
        return $('body');
    }

    // --- Specific Link Locators (for convenience) ---
    get homeLink() {
        return $("a[href='/']");
    }

    get productsLink() {
        return $("a[href='/products']");
    }

    get cartLink() {
        return $("a[href='/view_cart']");
    }

    get signupLoginLink() {
        return $("a[href='/login']");
    }

    get testCasesLink() {
        return $("a[href='/test_cases']");
    }

    get apiTestingLink() {
        return $("a[href='/api_list']");
    }

    get contactUsLink() {
        return $("a[href='/contact_us']");
    }

    // --- Logged-In State Locators ---
    get logoutLink() {
        return $("a[href='/logout']");
    }

    get deleteAccountLink() {
        return $("a[href='/delete_account']");
    }

    get loggedInAsText() {
        return $("li:nth-child(10) a:nth-child(1)");
    }

    get topMenu() {
        return $("ul.nav.navbar-nav");
    }

    // --- Main Navigation Locators ---
    topNavLink(text: string) {
        return $(`nav a

        =
        ${text}`);
    }


    // --- Core Actions ---

    async isLoggedInBannerVisible(): Promise<boolean> {
        return this.loggedInAs.isDisplayed();
    }

    async clickNavLinkByText(linkText: string) {
        // Try the robust loop method first
        try {
            const link = await this.getNavLinkByText(linkText);
            await link.click();
            logger.info(`Clicked navigation link: ${linkText}`);
        } catch (e) {
            // Fallback to the XPath method if loop fails
            await this.clickMenuByText(linkText);
        }
    }


    /**
     * Checks if a navigation link with the given text is visible.
     * @param linkText The text of the link to find.
     * @returns `true` if the link is displayed, otherwise `false`.
     */
    async isNavLinkVisible(linkText: string): Promise<boolean> {
        try {
            const link = await this.getNavLinkByText(linkText);
            return await link.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async isLoggedInAsVisible(): Promise<boolean> {
        const loggedInAs = $('ul[class=\'nav navbar-nav\'] li a b');
        return loggedInAs.isDisplayed();
    }

    /**
     * Optional: get the full displayed text (e.g. "Logged in as John")
     */
    async getLoggedInAsText(): Promise<string> {
        return await this.loggedInAsText.getText();

    }

    async deleteAccount() {
        await clickWhenClickable(this.deleteAccountLink);
    }

    async logout() {
        await clickWhenClickable(this.logoutLink);
    }

    async goToProducts() {
        await clickWhenClickable(this.productsLink);

    }

    async goToCart() {
        await clickWhenClickable(this.cartLink);

    }

    async clickLoginOrSignupLink() {
        await clickWhenClickable(this.signupLoginLink);

    }

    async clickMenuByText(menuText: string): Promise<void> {
        const normalized = menuText.trim();

        // Fixed XPath: .//a[contains(normalize-space(.), "Text")]
        const menuItem = this.topMenu.$(
            `.//a[contains(normalize-space(.), "${normalized}")]`
        );

        if (!(await menuItem.isExisting())) {
            throw new Error(`Top menu item not found: "${menuText}"`);
        }

        await menuItem.scrollIntoView();
        await clickWhenClickable(menuItem);
    }

    async tapOnDeleteAccountLink() {
        await clickWhenClickable(this.deleteAccountLink);
    }

    async clickProductLink() {
        await this.productsLink.click();

    }

    async clickTopNav(text: string) {
        const link = this.topNavLink(text);
        await link.waitForClickable({timeout: 20000});
        await link.click();
    }

    private async getNavLinkByText(linkText: string): Promise<WebdriverIO.Element> {
        const normalizedText = linkText.trim().toLowerCase();
        const links = await this.navLinks;
        for (const link of links) {
            const text = (await link.getText()).trim().toLowerCase();
            if (text === normalizedText) {
                return link;
            }
        }
        throw new Error(`Navigation link with text "${linkText}" not found.`);
    }

}

export default new NaviPage();
