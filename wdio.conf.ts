import {DriverFactory} from './src/support/utils/driver/DriverFactory';
import * as fs from 'fs';
import * as path from 'path';
import {exec} from 'child_process';
import allure from '@wdio/allure-reporter';

export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './src/features/**/*.feature'
    ],
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 10,
    capabilities: [
        DriverFactory.getCapabilities(process.env.BROWSER || 'chrome')
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.automationexercise.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'cucumber',

    //
    // ====================
    // Reporters
    // ====================
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false, // Let WDIO handle basic screenshots too
        useCucumberStepReporter: true,
    }]],

    //
    // ====================
    // Cucumber Options
    // ====================
    cucumberOpts: {
        require: [
            './src/step-definitions/**/*.ts',
            './src/support/hooks.ts'
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    //
    // =====
    // Hooks
    // =====
    onPrepare: function (config, capabilities) {
        const screenshotDir = './screenshots';
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir);
        }
        // Clean allure-results directory before a new run
        const allureResultsDir = './allure-results';
        if (fs.existsSync(allureResultsDir)) {
            fs.rmSync(allureResultsDir, {recursive: true, force: true});
        }
    },

    afterStep: async function (step, scenario, {error, passed}, context) {
        if (error) {
            // 1. Save to file system for easy access
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const filename = `ERROR_${timestamp}.png`;
            const filepath = path.join(process.cwd(), 'screenshots', filename);
            await browser.saveScreenshot(filepath);

            // 2. Attach to Allure report explicitly (optional, as disableWebdriverScreenshotsReporting: false usually handles this)
            // But this gives you control over the attachment name
            const screenshot = await browser.takeScreenshot();
            allure.addAttachment('Screenshot on failure', Buffer.from(screenshot, 'base64'), 'image/png');
        }
    },

    onComplete: function (exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report');
        const generation = exec('npm run allure:generate', (error, stdout, stderr) => {
            if (error) {
                console.error('Could not generate Allure report:', error);
                return;
            }
        });

        generation.on('close', (code) => {
            if (code === 0) {
                console.log('Allure report successfully generated');
                // Automatically open the report
                exec('npm run allure:open');
            } else {
                console.log('Allure report generation failed with code:', code);
            }
        });
    }
}
