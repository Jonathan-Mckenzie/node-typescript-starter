import * as winston from 'winston';
import * as fs from 'fs';

const LOG_DIR = 'winston.logs';
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    // check if logs dir exists
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR);
    }
}

const format = winston.format.combine(
    winston.format.simple(),
    winston.format.colorize(),
);

// send everything to console
const debugLogger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
    ],
    format
});

// send everything to log files (no 'debug' only info and errors)
const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            dirname: LOG_DIR,
            filename: 'log',
            level: 'info',
        }),
        new winston.transports.File({
            dirname: LOG_DIR,
            filename: 'error',
            level: 'error',
        })
    ],
    format
});

export const logger = (isProduction) ? prodLogger : debugLogger;
