import {browser} from "@wdio/globals";
import AxeBuilder from '@axe-core/webdriverio';
import logger from "./logger/logger";
import {AxeResults, NodeResult, Result} from 'axe-core';

// --- Configuration Interface ---
export interface AccessibilityScanOptions {
    context?: WebdriverIO.Element | string; // Element or selector string
    tags?: string[]; // e.g., ['wcag2a', 'wcag2aa']
    disableRules?: string[]; // e.g., ['color-contrast']
}

class AccessibilityChecker {

    /**
     * Analyzes the current page or a specific element for accessibility issues using axe-core.
     * Throws an error if any violations are found, causing the test to fail.
     * @param options Configuration for the accessibility scan.
     */
    public async checkAccessibility(options: AccessibilityScanOptions = {}) {
        logger.info("Starting AXE accessibility analysis...");

        try {
            const builder = new AxeBuilder({client: browser});

            // Apply context if provided
            if (options.context) {
                builder.include(options.context as any); // Cast to 'any' to satisfy the type, WDIO element works
            }

            // Apply tags if provided
            if (options.tags && options.tags.length > 0) {
                builder.withTags(options.tags);
            }

            // Disable rules if provided
            if (options.disableRules && options.disableRules.length > 0) {
                builder.disableRules(options.disableRules);
            }

            const results: AxeResults = await builder.analyze();

            if (results.violations.length > 0) {
                this.logViolations(results);
                throw new Error(`Found ${results.violations.length} accessibility violations. Check the logs for details.`);
            } else {
                logger.info("✅ AXE analysis completed with no accessibility violations.");
            }

        } catch (error) {
            logger.error("❌ AXE analysis failed to run or threw an error.", error);
            // Re-throw the error to ensure the test fails
            throw error;
        }
    }

    /**
     * Formats and logs the accessibility violations to the console.
     * @param results The results object from the axe-core analysis.
     */
    private logViolations(results: AxeResults) {
        logger.warn("==================================================");
        logger.warn(`ACCESSIBILITY VIOLATIONS FOUND`);
        logger.warn(`Page URL: ${results.url}`);
        logger.warn(`Timestamp: ${results.timestamp}`);
        logger.warn(`Axe Core Version: ${results.testEngine.version}`);
        logger.warn(`Total Violations: ${results.violations.length}`);
        logger.warn("--------------------------------------------------");

        results.violations.forEach((violation: Result, index: number) => {
            logger.warn(`\nViolation ${index + 1}: ${violation.id} (Impact: ${violation.impact?.toUpperCase()})`);
            logger.warn(`  Description: ${violation.description}`);
            logger.warn(`  Help: ${violation.help}`);
            logger.warn(`  Help URL: ${violation.helpUrl}`);
            logger.warn(`  Tags: ${violation.tags.join(', ')}`);

            if (violation.nodes.length > 0) {
                logger.warn(`  Affected Nodes (${violation.nodes.length}):`);
                violation.nodes.forEach((node: NodeResult, j: number) => {
                    logger.warn(`    Node ${j + 1}:`);
                    logger.warn(`      HTML: ${node.html}`);
                    logger.warn(`      Impact: ${node.impact}`);
                    // The failure summary provides a concise explanation of the issue for that specific node
                    if (node.failureSummary) {
                        logger.warn(`      Failure Summary: ${node.failureSummary.replace(/\s\s+/g, ' ')}`);
                    }
                });
            }
            logger.warn("--------------------------------------------------");
        });
    }
}

export default new AccessibilityChecker();
