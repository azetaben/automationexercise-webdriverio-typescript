import winston from "winston";
import path from "path";
import PathUtils from "../pathUtils";

// Ensure the logs directory exists
const logsDir = PathUtils.getLogsFolder();

// Format for console output with colors
const consoleFormat = winston.format.printf(({level, message, timestamp}) => {
    const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`);
    return `${timestamp} [${logLevel}]: ${message}`;
});

// Format for file output (without colors)
const fileFormat = winston.format.printf(({level, message, timestamp}) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
    transports: [
        // Console transport remains the same
        new winston.transports.Console({
            level: process.env.LOG_LEVEL || 'info',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                consoleFormat
            )
        }),
        // Add a file transport to log to a file
        new winston.transports.File({
            level: 'debug', // Log everything from debug level and up to the file
            filename: path.join(logsDir, 'test-run.log'),
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                fileFormat
            ),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        })
    ]
});

// Overwrite the stream method to integrate with other tools if needed
logger.stream = {
    // @ts-ignore
    write: (message) => {
        logger.info(message.trim());
    },
};

logger.on("error", error => {
    console.error("Unknown error in Winston logger:", error.message);
});

export default logger;
