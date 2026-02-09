import {BrowserOptions} from "./BrowserOptions.ts";

export type BrowserType = 'chrome' | 'firefox' | 'edge';

export class DriverFactory {

    /**
     * Generates the capabilities object for the specified browser.
     * @param browserName The name of the browser ('chrome', 'firefox', 'edge').
     * @returns The capabilities object for WebdriverIO config.
     */
    public static getCapabilities(browserName: string = 'chrome') {
        const type = browserName.toLowerCase() as BrowserType;

        switch (type) {
            case 'chrome':
                return {
                    browserName: 'chrome',
                    ...BrowserOptions.getChromeOptions()
                };
            case 'firefox':
                return {
                    browserName: 'firefox',
                    ...BrowserOptions.getFirefoxOptions()
                };
            case 'edge':
                return {
                    browserName: 'MicrosoftEdge',
                    ...BrowserOptions.getEdgeOptions()
                };
            default:
                throw new Error(`Unsupported browser type: ${browserName}`);
        }
    }
}
