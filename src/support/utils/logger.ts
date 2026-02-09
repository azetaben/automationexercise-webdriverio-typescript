import winston from "winston";

// Format for console output with colors
const consoleFormat = winston.format.printf(({level, message, timestamp}) => {
    const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`);
    return `${timestamp} [${logLevel}]: ${message}`;
});

/**
 * This is the base logger instance. It is configured to always log to the console.
 * File transports will be added and removed dynamically by the LogManager.
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: process.env.LOG_LEVEL || 'info',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                consoleFormat
            )
        })
    ]
});

logger.on("error", error => {
    console.error("Unknown error in Winston logger:", error.message);
});


export default logger;
