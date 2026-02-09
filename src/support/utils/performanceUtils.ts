import {browser} from "@wdio/globals";
import logger from "./logger/logger";

// --- Type Definitions for CDP Performance Metrics ---

/**
 * Represents a single performance metric returned by the Chrome DevTools Protocol.
 */
export interface PerformanceMetric {
    name: string;
    value: number;
}

/**
 * The structure of the response from the Performance.getMetrics command.
 */
interface GetMetricsResponse {
    metrics: PerformanceMetric[];
}

class PerformanceUtils {
    private lastCollectedMetrics: PerformanceMetric[] = [];

    /**
     * Measures the page load time using the browser's Performance Timing API.
     * This is more accurate than a simple start/end timestamp approach.
     * @param url The URL to navigate to and measure.
     * @returns The page load time in milliseconds.
     */
    public async measurePageLoadTime(url: string): Promise<number> {
        await browser.url(url);

        const timing = await browser.execute(() => {
            const perf = window.performance.timing;
            return {
                navigationStart: perf.navigationStart,
                loadEventEnd: perf.loadEventEnd
            };
        });

        if (timing.loadEventEnd === 0) {
            logger.warn("Performance timing 'loadEventEnd' was 0, which may indicate the page did not fully load or the timing API is not supported as expected.");
            return -1;
        }

        const loadTime = timing.loadEventEnd - timing.navigationStart;
        logger.info(`Measured page load time for ${url}: ${loadTime}ms`);
        return loadTime;
    }

    /**
     * Enables performance metric collection in the browser.
     */
    public async startPerformanceRecording(): Promise<void> {
        if (!this.isBrowserCompatible()) return;

        try {
            await browser.cdp('Performance', 'enable');
            logger.info("Performance metrics collection enabled.");
        } catch (error) {
            logger.error("Failed to enable performance metrics.", error);
        }
    }

    /**
     * Disables performance metric collection and retrieves the collected metrics.
     * @returns An array of collected performance metrics.
     */
    public async stopPerformanceRecordingAndGetMetrics(): Promise<PerformanceMetric[]> {
        if (!this.isBrowserCompatible()) {
            this.lastCollectedMetrics = [];
            return [];
        }

        try {
            const response = await browser.cdp('Performance', 'getMetrics') as GetMetricsResponse;
            this.lastCollectedMetrics = response.metrics || [];
            logger.info(`Collected ${this.lastCollectedMetrics.length} performance metrics.`);

            await browser.cdp('Performance', 'disable');
            logger.info("Performance metrics collection disabled.");

            return this.lastCollectedMetrics;
        } catch (error) {
            logger.error("Failed to get or disable performance metrics.", error);
            this.lastCollectedMetrics = [];
            return [];
        }
    }

    /**
     * A high-level method to collect performance metrics for a page load.
     * @param url The URL to navigate to.
     * @returns An array of collected performance metrics.
     */
    public async collectLoadPerformanceMetrics(url: string): Promise<PerformanceMetric[]> {
        if (!this.isBrowserCompatible()) return [];

        await this.startPerformanceRecording();
        await browser.url(url);
        // Allow some time for metrics to stabilize after load
        await browser.pause(3000);
        return await this.stopPerformanceRecordingAndGetMetrics();
    }

    /**
     * Extracts the value of a specific metric from a list of metrics.
     * @param metricName The name of the metric to find (e.g., 'Timestamp', 'LayoutDuration').
     * @param metrics An optional list of metrics to search. If not provided, the last collected metrics will be used.
     * @returns The metric's value, or `undefined` if not found.
     */
    public getMetricValue(metricName: string, metrics?: PerformanceMetric[]): number | undefined {
        const metricList = metrics || this.lastCollectedMetrics;
        const metric = metricList.find(m => m.name.toLowerCase() === metricName.toLowerCase());

        if (metric) {
            return metric.value;
        }

        logger.warn(`Metric "${metricName}" not found in the collected metrics.`);
        return undefined;
    }

    /**
     * Gets the most recently collected list of performance metrics.
     * @returns An unmodifiable copy of the last collected metrics.
     */
    public getLastCollectedMetrics(): readonly PerformanceMetric[] {
        return Object.freeze([...this.lastCollectedMetrics]);
    }

    /**
     * Checks if the current browser is Chromium-based and thus supports CDP performance commands.
     * @returns `true` if the browser is compatible, otherwise `false`.
     */
    private isBrowserCompatible(): boolean {
        const browserName = browser.capabilities.browserName?.toLowerCase();
        const isChrome = browserName?.includes('chrome');
        const isEdge = browserName?.includes('edge');

        if (!isChrome && !isEdge) {
            logger.warn(`Performance metrics are only available for Chromium-based browsers. Current browser: ${browserName}`);
            return false;
        }
        return true;
    }
}

export default new PerformanceUtils();
