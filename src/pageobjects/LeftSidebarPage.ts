import Page from "./Page";
import {clickWhenClickable} from "support/actions/elementActions.ts";

class LeftSidebarPage extends Page {
    // --- Locators (CSS) ---

    // Category Section
    // Note: CSS cannot select by text. We select the element and will verify text in methods if needed.
    // Assuming this is the first h2 in the left sidebar or unique enough.
    get categoryHeading() {
        return $(".left-sidebar h2");
    }

    get womenCategory() {
        return $("a[href='#Women']");
    }

    get menCategory() {
        return $("a[href='#Men']");
    }

    get kidsCategory() {
        return $("a[href='#Kids']");
    }

    // Brands Section
    get brandsHeading() {
        return $(".brands_products h2");
    }

    // Get all brand links to filter by text later
    get brandsList() {
        return $$(".brands-name ul li a");
    }

    // --- Visibility Checks ---

    async isCategoryHeadingVisible() {
        return await this.isElementDisplayed(this.categoryHeading);
    }

    async getCategoryHeadingText() {
        return await this.getElementText(this.categoryHeading);
    }

    async isBrandsHeadingVisible() {
        return await this.isElementDisplayed(this.brandsHeading);
    }

    async getBrandsHeadingText() {
        return await this.getElementText(this.brandsHeading);
    }

    // --- Main Category Click Methods ---

    async clickWomenCategory() {
        await clickWhenClickable(this.womenCategory);
    }

    async clickMenCategory() {
        await clickWhenClickable(this.menCategory);
    }

    async clickKidsCategory() {
        await clickWhenClickable(this.kidsCategory);
    }

    async expandCategory(category: string) {
        switch (category.toLowerCase()) {
            case "women":
                await this.clickWomenCategory();
                break;
            case "men":
                await this.clickMenCategory();
                break;
            case "kids":
                await this.clickKidsCategory();
                break;
            default:
                throw new Error(`Invalid category: ${category}`);
        }
    }

    // --- SubCategory Interaction ---

    /**
     * Clicks a subcategory link under a specific main category using CSS and text filtering.
     * @param mainCategoryId The ID of the main category (e.g., 'Women', 'Men', 'Kids').
     * @param optionText The visible text of the subcategory link (e.g., 'Dress', 'Tops').
     */
    async clickSubCategory(mainCategoryId: string, optionText: string) {
        // CSS: Select all links inside the specific category panel body
        const links = await $$(`#${mainCategoryId} .panel-body ul li a`);

        let found = false;
        for (const link of links) {
            const text = await link.getText();
            if (text.trim().includes(optionText)) {
                await this.clickElement(link);
                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error(`Subcategory '${optionText}' not found under '${mainCategoryId}'`);
        }
    }

    // Convenience Wrappers
    async clickWomenSubCategory(optionText: string) {
        await this.clickWomenCategory();
        await this.clickSubCategory("Women", optionText);
    }

    async clickMenSubCategory(optionText: string) {
        await this.clickMenCategory();
        await this.clickSubCategory("Men", optionText);
    }

    async clickKidsSubCategory(optionText: string) {
        await this.clickKidsCategory();
        await this.clickSubCategory("Kids", optionText);
    }

    // --- Brand Interaction ---

    /**
     * Clicks a brand link by its name using CSS and text filtering.
     * @param brandName The name of the brand (e.g., 'Polo', 'H&M').
     */
    async clickBrand(brandName: string) {
        const links = await this.brandsList;

        let found = false;
        for (const link of links) {
            const text = await link.getText();
            // Brand text often includes count like "Polo (6)", so we check if it includes the name
            if (text.includes(brandName)) {
                await this.clickElement(link);
                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error(`Brand '${brandName}' not found.`);
        }
    }

    async isBrandHeaderVisible(brand: string) {
        const links = this.brandsList;
        for (const link of links) {
            const text = await link.getText();
            if (text.includes(brand)) {
                const isBrandVisible = await link.isDisplayed();
                const isHeaderVisible = await this.isBrandsHeadingVisible();
                return isBrandVisible && isHeaderVisible;
            }
        }
        return false;
    }
}

export default new LeftSidebarPage();
