import * as path from 'path';
import * as fs from 'fs';

/**
 * A utility class for managing file and directory paths within the project.
 * This provides a centralized and consistent way to access resources.
 */
class PathUtils {

    /**
     * Gets the root directory of the project.
     * @returns The absolute path to the project root.
     */
    public getProjectRoot(): string {
        return process.cwd();
    }

    // --- Base Project Paths ---

    /**
     * Gets the path to the main features directory.
     * @returns The absolute path to 'features'.
     */
    public getFeaturesRoot(): string {
        return path.join(this.getProjectRoot(), 'features');
    }

    /**
     * Gets the path to the main output directory for test results (e.g., 'allure-results').
     * @param folderName The name of the reports folder. Defaults to 'allure-results'.
     * @returns The absolute path to the reports folder.
     */
    public getReportsFolder(folderName = 'allure-results'): string {
        const folderPath = path.join(this.getProjectRoot(), folderName);
        this.ensureExists(folderPath);
        return folderPath;
    }

    // --- Runtime Output Folders ---
    // Note: In WebdriverIO, these are often configured in `wdio.conf.ts`
    // but can be centralized here for consistency.

    /**
     * Gets the path to the logs directory.
     * @returns The absolute path to the 'logs' folder.
     */
    public getLogsFolder(): string {
        const folderPath = path.join(this.getProjectRoot(), 'logs');
        this.ensureExists(folderPath);
        return folderPath;
    }

    /**
     * Gets the path to the screenshots directory.
     * @returns The absolute path to the 'screenshots' folder.
     */
    public getScreenshotsFolder(): string {
        const folderPath = path.join(this.getProjectRoot(), 'screenshots');
        this.ensureExists(folderPath);
        return folderPath;
    }

    /**
     * Gets the path to the main test data directory.
     * @returns The absolute path to 'features/testdata'.
     */
    public getTestDataRoot(): string {
        return path.join(this.getFeaturesRoot(), 'testdata');
    }

    // --- Test Data Paths ---

    /**
     * Gets the full path to a specific test data file.
     * @param folder The sub-folder within 'testdata' (e.g., 'json', 'csv').
     * @param fileName The name of the file (e.g., 'users.json').
     * @returns The absolute path to the test data file.
     */
    public getTestDataFile(folder: 'json' | 'csv' | 'yaml' | 'xml', fileName: string): string {
        return path.join(this.getTestDataRoot(), folder, fileName);
    }

    /**
     * Gets the full path to a specific feature file.
     * @param featureName The name of the feature file (e.g., 'login.feature').
     * @returns The absolute path to the feature file.
     */
    public getFeatureFile(featureName: string): string {
        return path.join(this.getFeaturesRoot(), featureName);
    }

    // --- Feature File Paths ---

    /**
     * Ensures that a directory exists, creating it recursively if it does not.
     * @param folderPath The path to the directory.
     */
    private ensureExists(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, {recursive: true});
        }
    }
}

export default new PathUtils();
