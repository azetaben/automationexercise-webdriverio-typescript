import winston from "winston";
import path from "path";
import logger from "./logger";
import PathUtils from "./pathUtils";
import * as fs from 'fs';

/**
 * Manages the creation and removal of file-based log transports for individual scenarios.
 */
class LogManager {
    private fileTransport: typeof winston.transports.File | null = null;

    /**
     * Creates a unique log file for a scenario and adds it as a transport to the logger.
     * @param scenarioName The name of the scenario, used to create the log filename.
     */
    public startScenario(scenarioName: string) {
        try {
            // Sanitize the scenario name to be filesystem-friendly
            const sanitizedName = scenarioName.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 100); // Limit length
            const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
            const logFilename = `${sanitizedName}_${timestamp}.log`;

            const logsDir = PathUtils.getLogsFolder();

            // Ensure logs directory exists (redundant check for safety)
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir, {recursive: true});
            }

            // Define the format for the file
            const fileFormat = winston.format.printf(({level, message, timestamp: ts}) => {
                return `${ts} [${level.toUpperCase()}]: ${message}`;
            });

            // Create and add the new file transport
            this.fileTransport = new winston.transports.File({
                level: 'debug',
                filename: path.join(logsDir, logFilename),
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                    fileFormat
                ),
            });

            logger.add(this.fileTransport);
            logger.info(`--- SCENARIO START: ${scenarioName} ---`);
            logger.info(`Logging to file: ${logFilename}`);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`Failed to start scenario logging: ${errorMessage}`);
        }
    }

    /**
     * Removes the file transport from the logger, closing the log file for the completed scenario.
     */
    public endScenario() {
        try {
            if (this.fileTransport) {
                logger.info(`--- SCENARIO END ---`);
                logger.remove(this.fileTransport);
                // Close the stream to ensure file handle is released
                if ((this.fileTransport as any).close) {
                    (this.fileTransport as any).close();
                }
                this.fileTransport = null;
            }
        } catch (error) {
            console.error(`Failed to end scenario logging: ${error}`);
        }
    }
}

export default new LogManager();
