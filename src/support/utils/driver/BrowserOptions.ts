export class BrowserOptions {

    public static getChromeOptions() {
        return {
            'goog:chromeOptions': {
                args: [
                    '--disable-infobars',
                    '--disable-gpu',
                    '--disable-notifications',
                    '--disable-popup-blocking',
                    '--disable-extensions', // Often prevents extension-based ads
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--remote-allow-origins=*',
                    // '--headless', // Uncomment to run in headless mode
                    '--window-size=1920,1080',
                    '--start-maximized',
                    '--ignore-ssl-errors',
                    '--ignore-certificate-errors',
                    '--disable-blink-features=AutomationControlled' // Helps avoid detection
                ],
                prefs: {
                    'credentials_enable_service': false,
                    'profile.password_manager_enabled': false,
                    'download.default_directory': process.cwd() + '/downloads',
                    'download.prompt_for_download': false,
                    'download.directory_upgrade': true,
                    'safebrowsing.enabled': true,
                    // Block notifications and popups
                    'profile.default_content_setting_values.notifications': 2, // 2 = Block
                    'profile.default_content_setting_values.popups': 2,
                    'profile.default_content_setting_values.geolocation': 2,
                    'profile.default_content_setting_values.media_stream_mic': 2,
                    'profile.default_content_setting_values.media_stream_camera': 2,
                    'profile.default_content_setting_values.automatic_downloads': 1, // Allow
                    'profile.managed_default_content_settings.images': 1, // Allow images (0 to block if you want speed)
                    // Attempt to block ads via content settings (limited effect without extension)
                    'profile.default_content_setting_values.ads': 2
                }
            }
        };
    }

    public static getFirefoxOptions() {
        return {
            'moz:firefoxOptions': {
                args: [
                    // '-headless', // Uncomment to run in headless mode
                    '--width=1920',
                    '--height=1080'
                ],
                prefs: {
                    // Disable notifications
                    'dom.webnotifications.enabled': false,
                    'dom.push.enabled': false,

                    // Block popups
                    'dom.disable_open_during_load': true,
                    'privacy.popups.policy': 1,

                    // Download settings
                    'browser.download.folderList': 2,
                    'browser.download.dir': process.cwd() + '/downloads',
                    'browser.helperApps.neverAsk.saveToDisk': 'application/pdf,application/octet-stream',
                    'pdfjs.disabled': true,

                    // Privacy & Ad Blocking (Tracking Protection)
                    'privacy.trackingprotection.enabled': true,
                    'privacy.trackingprotection.pbmode.enabled': true,
                    'privacy.donottrackheader.enabled': true,

                    // Disable other intrusive features
                    'geo.enabled': false,
                    'media.navigator.enabled': false,
                    'media.peerconnection.enabled': false,
                    'app.update.auto': false,
                    'app.update.enabled': false,
                    'browser.startup.homepage': 'about:blank'
                }
            }
        };
    }

    public static getEdgeOptions() {
        return {
            'ms:edgeOptions': {
                args: [
                    '--disable-infobars',
                    '--disable-gpu',
                    '--disable-notifications',
                    '--disable-popup-blocking',
                    '--disable-extensions',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--remote-allow-origins=*',
                    // '--headless', // Uncomment to run in headless mode
                    '--window-size=1920,1080',
                    '--start-maximized',
                    '--disable-blink-features=AutomationControlled'
                ],
                prefs: {
                    'credentials_enable_service': false,
                    'profile.password_manager_enabled': false,
                    'download.default_directory': process.cwd() + '/downloads',
                    'safebrowsing.enabled': true,
                    // Block notifications and popups
                    'profile.default_content_setting_values.notifications': 2,
                    'profile.default_content_setting_values.popups': 2,
                    'profile.default_content_setting_values.geolocation': 2,
                    'profile.default_content_setting_values.ads': 2
                }
            }
        };
    }
}
