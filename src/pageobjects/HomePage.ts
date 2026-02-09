import Page from "./Page";
import {browser} from "@wdio/globals";

class HomePage extends Page {
    // Existing Locators

    get productsLink() {
        return $("a[href='/products']");
    }

    get signupLoginLink() {
        return $("a[href='/login']");
    }

    get cartLink() {
        return $("a[href='/view_cart']");
    }

    // New Locators from Java Code
    get recommendedItemsHeader() {
        return $("div[class='recommended_items'] h2[class='title text-center']");
    }

    get recommendedNames() {
        return $$("#recommended-item-carousel .item.active .productinfo p");
    }

    get recommendedAddButtons() {
        return $$("#recommended-item-carousel .item.active .add-to-cart");
    }

    get viewCartModalLink() {
        return $("#cartModal a u");
    }

    get subscriptionHeading() {
        return $("h2.title.text-center");
    }

    get scrollUpArrow() {
        return $("#scrollUp");
    }

    get homeMainBanner() {
        return $("div.item.active h2");
    }

    get fullFledgedTitle() {
        return $$("//h2[contains(text(),'Full-Fledged practice website for Automation Engineers')]");
    }

    get subscriptionTitle() {
        return $("div[class='single-widget'] h2");
    }

    get homePageSlider() {
        return $("div.carousel-inner");
    }

    // Existing Methods

    get homeSlider() {
        return $('#slider-carousel');
    }

    async goToProducts() {
        await (this.productsLink).click();
    }

    async goToLogin() {
        await (this.signupLoginLink).click();
    }

    async goToCart() {
        await (this.cartLink).click();
    }

    // New Methods from Java Code
    async isHomePageDisplayed() {
        return await this.isElementDisplayed(this.homePageSlider);
    }

    async isRecommendedItemsHeaderVisible() {
        return await this.isElementDisplayed(this.recommendedItemsHeader);
    }

    async getRecommendedProductNameByIndex(index: number) {
        const names = this.recommendedNames;
        if (names[index]) {
            return await names[index].getText();
        }
        return "";
    }

    async clickAddRecommendedItemToCartByIndex(index: number) {
        const buttons = this.recommendedAddButtons;
        if (buttons[index]) {
            await this.clickElement(buttons[index]);
        }
    }

    async clickCartModalLink() {
        await this.clickElement(await this.viewCartModalLink);
    }

    async getHomeBannerText() {
        await this.waitForElement(await this.homeMainBanner);
        return await this.getElementText(await this.homeMainBanner);
    }

    async clickScrollUpArrow() {
        await this.clickElement(await this.scrollUpArrow);
    }

    async isHomePageVisible() {
        const titles = await this.fullFledgedTitle;
        if (await titles.length > 0) {
            return await this.isElementDisplayed(titles[0]);
        }
        return false;
    }

    async isSubscriptionVisible() {
        await this.waitForElement(await this.subscriptionTitle);
        return await this.isElementDisplayed(await this.subscriptionTitle);
    }

    async scrollToBottom() {
        await browser.execute("window.scrollTo(0, document.body.scrollHeight)");
    }

    async scrollToTop() {
        await browser.execute("window.scrollTo(0, 0)");
    }

    async getHomepageTitleText() {
        const titles = await this.fullFledgedTitle;
        if (await titles.length > 0) {
            return await titles[0].getText();
        }
        return "";
    }

    async isHomeBannerVisible() {
        await this.waitForElement(await this.homeMainBanner);
        return await this.isElementDisplayed(await this.homeMainBanner);
    }

    async clickScrollUpButton() {
        await this.clickScrollUpArrow();
    }

    async isTopBannerVisible() {
        return await this.isHomeBannerVisible();
    }

    async manualScrollToTop() {
        await this.scrollToTop();
    }
}

export default new HomePage();
