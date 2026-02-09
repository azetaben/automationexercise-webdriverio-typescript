import {browser} from "@wdio/globals";
import logger from "../utils/logger";

// --- Reusable Element Actions ---

/**
 * Waits for an element to be visible and then returns its text.
 * @param el The WebdriverIO element.
 * @returns The text content of the element.
 */
export async function getTextWhenVisible(el: WebdriverIO.Element): Promise<string> {
    await el.waitForDisplayed({timeout: 15000});
    await dismissAds();
    logger.info(`Waiting for element to be visible: ${el.selector}`);
    return el.getText();
}

/**
 * Waits for an element to no longer be displayed on the page.
 * Useful for spinners, success toasts, or confirming an item was deleted.
 * @param el The WebdriverIO element.
 */
export async function waitForElementToDisappear(el: WebdriverIO.Element): Promise<void> {
    await el.waitForDisplayed({reverse: true, timeout: 15000, timeoutMsg: `Element ${el.selector} did not disappear`});
}

/**
 * Selects an option from a <select> dropdown by its visible text.
 * @param el The <select> element.
 * @param text The visible text of the option to select.
 */
export async function selectDropdownByText(el: WebdriverIO.Element, text: string): Promise<void> {
    await el.waitForDisplayed({timeout: 15000});
    await el.selectByVisibleText(text);
}

/**
 * Hovers the mouse cursor over a given element.
 * @param el The WebdriverIO element to hover over.
 */
export async function hoverOver(el: WebdriverIO.Element): Promise<void> {
    await el.waitForDisplayed({timeout: 15000});
    await el.moveTo();
}

/**
 * A non-blocking check to see if an element is currently displayed.
 * Returns false immediately if the element is not found or not visible.
 * @param el The WebdriverIO element.
 * @returns `true` if the element is displayed, otherwise `false`.
 */
export async function isElementDisplayed(el: WebdriverIO.Element): Promise<boolean> {
    try {
        await dismissAds();
        // Use a very short timeout because this is a check, not a wait.
        return await el.waitForDisplayed({timeout: 1000});
    } catch {
        return false;
    }
}

/**
 * Waits for an element to exist and then retrieves the value of a specific attribute.
 * @param el The WebdriverIO element.
 * @param attributeName The name of the attribute (e.g., 'href', 'class', 'data-qa').
 * @returns The value of the attribute as a string.
 */
export async function getAttributeWhenExists(el: WebdriverIO.Element, attributeName: string): Promise<string> {
    await el.waitForExist({timeout: 15000});
    const attribute = await el.getAttribute(attributeName);
    return attribute ?? ''; // Return empty string if attribute is null
}

export async function clickWhenClickable(el: ChainablePromiseElement): Promise<void> {
    //await dismissAds();
    await el.waitForClickable({timeout: 15000});
    await el.click();
}

export async function typeWhenDisplayed(el: ChainablePromiseElement, value: string): Promise<void> {
    await dismissAds();
    await el.waitForDisplayed({timeout: 15000});
    await el.setValue(value);
}

export async function waitForUrlContains(partial: string): Promise<void> {
    await browser.waitUntil(async () => (await browser.getUrl()).includes(partial), {
        timeout: 15000,
        timeoutMsg: `Expected URL to contain '${partial}'`
    });
}


/**
 * Scrolls the page until the element is in view.
 * @param el The WebdriverIO element to scroll to.
 */
export async function scrollToElement(el: WebdriverIO.Element): Promise<void> {
    await dismissAds();
    await el.waitForExist({timeout: 15000});
    await el.scrollIntoView({block: 'center', inline: 'center'});
}

/**
 * Switches the browser context to a given iframe.
 * @param frameEl The iframe element to switch to.
 */
export async function switchToFrame(frameEl: WebdriverIO.Element): Promise<void> {
    await frameEl.waitForExist({timeout: 15000});
    await browser.switchToFrame(frameEl);
    logger.info(`Switched to iframe: ${frameEl.selector}`);
}

/**
 * Switches the browser context back to the default top-level page.
 */
export async function switchToDefaultContent(): Promise<void> {
    await browser.switchToParentFrame(); // In WDIO, this switches to the top-level context
    logger.info("Switched back to default content.");
}

/**
 * A robust click that scrolls, waits for the element to be clickable,
 * and includes a JS-click fallback for intercepted elements (e.g., by ads).
 * @param el The WebdriverIO element to click.
 */
export async function smartClick(el: WebdriverIO.Element): Promise<void> {
    try {
        await dismissAds();
        await el.waitForClickable({timeout: 15000});
        await el.scrollIntoView({block: 'center'});
        await el.click();
    } catch (error) {
        logger.warn(`Standard click failed for: ${el.selector}. Retrying with JS click.`);
        await browser.execute("arguments[0].click();", el);
    }
}

/**
 * Dismisses potential ad iframes or popups that might block clicks.
 * Iterates through iframes and hides them if they meet certain criteria.
 */
export async function dismissAds(): Promise<void> {
    try {
        const iframes = $$("iframe");
        if (await iframes.length > 0) {
            logger.info(`Found ${iframes.length} iframes. Checking for ads...`);
            for (const frame of iframes) {
                try {
                    const isDisplayed = await frame.isDisplayed();
                    if (isDisplayed) {
                        // Heuristic: Ads are often in iframes with specific IDs or classes,
                        // or simply large overlays. Here we hide any displayed iframe as a brute-force
                        // measure for this specific site which is known for ads.
                        await browser.execute((el) => {
                            el.style.display = 'none';
                            el.style.visibility = 'hidden';
                        }, frame);
                        logger.info("Hidden a potential ad iframe.");
                    }
                } catch (e) {
                    // Ignore stale element errors if frame disappears
                }
            }
        }
    } catch (error) {
        logger.warn(`Error dismissing ads`);
    }
}
