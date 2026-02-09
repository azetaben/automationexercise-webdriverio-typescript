import {After, Before} from "@wdio/cucumber-framework";
import LogManager from "./utils/LogManager";
import logger from "support/utils/logger.ts";

// This hook runs before each and every scenario
Before(async function (scenario) {
    const scenarioName = scenario.pickle.name || "Unknown Scenario";
    LogManager.startScenario(scenarioName);
});

// This hook runs after each and every scenario
After(async function (scenario) {
    const status = scenario.result?.status;
    if (status !== 'PASSED') {
        logger.info(`Scenario failed with status: ${status}`);
    }
    LogManager.endScenario();
});
