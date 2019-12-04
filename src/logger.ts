import * as winston from 'winston';
import * as fs from 'fs';
import environment from './environment';
const util = require('util');

const myFormat = winston.format.printf(({ level, message, label, timestamp, ...rest }) => {
    // @ts-ignore - Type 'symbol' cannot be used as an index type
    const splat = rest[Symbol.for('splat')];
    const strArgs = splat ? splat.map((s) => util.formatWithOptions({ colors: true, depth: 10 }, s)).join(' ') : '';
    return `${timestamp}  ${level}  ${util.formatWithOptions({ colors: true, depth: 10}, message)} ${strArgs}`;
});

const loggerFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'YYYY-M-DD HH:mm:ss',
    }),
    myFormat
);


export let logger;
if (environment.isProduction) {
    // production => create logging dirs, logger logs to log/error files
    // check if logs dir exists
    if (!fs.existsSync(environment.logDir)) {
        fs.mkdirSync(environment.logDir);
    }
    logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                level: 'info',
                dirname: environment.logDir,
                filename: 'info.log',

            }),
            new winston.transports.File({
                level: 'error',
                dirname: environment.logDir,
                filename: 'error.log',
            })
        ],
        format: loggerFormat,
    });

} else {
    // development => log everything to the console
    logger = winston.createLogger({
        level: 'silly',
        transports: [
            new winston.transports.Console(),
        ],
        format: loggerFormat,
    });
}
