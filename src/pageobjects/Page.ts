import {browser} from "@wdio/globals";
import logger from "../support/utils/logger";

type ElementGetter = ChainablePromiseElement;

export default class Page {

    public async open(path: string) {
        await browser.url(path);
        await browser.maximizeWindow();
    }

    /**
     * Proactively dismisses potential ad iframes or popups that might block clicks.
     * This is a "best-effort" function to improve stability.
     */
    public async dismissAds() {
        try {
            // Find all iframes, especially those related to Google Ads
            const iframes = await $$("iframe[id*='google_ads_iframe'], iframe[id*='aswift']");
            if (await iframes.length > 0) {
                logger.info(`Found ${iframes.length} potential ad iframes. Attempting to hide...`);
                for (const frame of iframes) {
                    try {
                        if (await frame.isDisplayed()) {
                            await browser.execute((el) => {
                                el.style.display = 'none';
                                el.style.visibility = 'hidden';
                            }, frame);
                            logger.info(`Hid a potential ad iframe: ${frame.selector}`);
                        }
                    } catch (e) {
                        // Ignore errors if frame disappears during check
                    }
                }
            }
        } catch (error) {
            logger.warn(`Error during ad dismissal`);
        }
    }

    /**
     * A robust "smart click" that scrolls to an element, waits for it to be clickable,
     * and automatically handles click interception errors by dismissing ads.
     * @param element The element getter (e.g., `this.myButton`).
     */
    public async clickElement(element: ElementGetter) {
        try {
            await element.scrollIntoView({block: 'center'});
            await element.waitForClickable({
                timeout: 10000,
                timeoutMsg: `Element "${element.selector}" was not clickable`
            });
            await element.click();
        } catch (error: any) {
            if (error.message && error.message.includes('element click intercepted')) {
                logger.warn(`Click intercepted for: ${element.selector}. Dismissing ads and retrying.`);
                await this.dismissAds();
                await browser.pause(500); // Small pause for DOM to settle
                try {
                    await element.click(); // Retry standard click
                } catch (retryError) {
                    logger.warn(`Retry click failed. Fallback to JS click.`);
                    await browser.execute((el) => el.click(), await element);
                }
            } else {
                // If it's not an interception error, re-throw it
                throw error;
            }
        }
    }

    public async setElementValue(element: ElementGetter, value: string) {
        await element.scrollIntoView({block: 'center'});
        await element.waitForDisplayed({timeout: 10000});
        await element.setValue(value);
    }

    public async hoverOverElement(element: ElementGetter) {
        await element.scrollIntoView({block: 'center'});
        await element.moveTo();
    }

    public async getElementText(element: ElementGetter): Promise<string> {
        await element.waitForDisplayed({timeout: 10000});
        return element.getText();
    }


    public async isElementDisplayed(element: ElementGetter): Promise<boolean> {
        try {
            await element.waitForDisplayed({timeout: 3000});
            return true;
        } catch (error) {
            return false;
        }
    }

    public async waitForElement(element: ElementGetter, timeout: number = 10000) {
        await element.waitForDisplayed({timeout});
    }

    public async waitForElementToDisappear(element: ElementGetter, timeout: number = 10000) {
        await element.waitForDisplayed({reverse: true, timeout});
    }

    public async selectByVisibleText(element: ElementGetter, text: string) {
        await element.waitForDisplayed();
        await element.selectByVisibleText(text);
    }

    public async selectByValue(element: ElementGetter, value: string) {
        await element.waitForDisplayed();
        await element.selectByAttribute('value', value);
    }
}
