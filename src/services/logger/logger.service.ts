import {Service} from 'typedi';
import {EnvironmentService} from '../environment/environment.service';
import * as winston from 'winston';
import util from 'util';
import DailyRotateFile from 'winston-daily-rotate-file';


const buildLevelFilter = (levels: string[]) => {
    return levelFilter(new Set(levels));
};

const levelFilter = (levels: Set<string>) => winston.format((info, opts) => {
    return levels.has(info.level) ? info : false;
});

@Service()
export class LoggerService {

    static errorWarnDir = 'error-warn';
    static infoDebugDir = 'info-debug';

    private readonly customFormat;
    private readonly loggerFormat;
    private logger;

    constructor(private environment: EnvironmentService) {
        this.customFormat = winston.format.printf(({ level, message, timestamp, ...rest }) => {
            return `[${timestamp}] ${level} ${message}`;
        });

        this.loggerFormat = winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
                format: 'M-DD-YYYY hh:mm:ssA',
            }),
            this.customFormat
        );

        if (this.environment.isProduction) {
            this.buildFileLogger();
        } else {
            this.buildConsoleLogger();
        }
    }

    debug(...args) { this.logger.debug(args); }
    error(...args) { this.logger.error(args); }
    warn(...args) { this.logger.warn(args); }
    info(...args) { this.logger.info(args); }
    http(...args) { this.logger.http(args); }

    private buildFileLogger() {
        this.logger = winston.createLogger({
            transports: [
                new DailyRotateFile({
                    filename: `${this.environment.logDir}/${LoggerService.errorWarnDir}/%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '128m',
                    maxFiles: '14d',
                    level: 'warn',
                    json: true,
                    format: winston.format.combine(
                        buildLevelFilter(['error', 'warn'])(),
                        winston.format.timestamp(),
                        this.loggerFormat
                    )
                }),
                new DailyRotateFile({
                    filename: `${this.environment.logDir}/${LoggerService.infoDebugDir}/%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '128m',
                    maxFiles: '14d',
                    json: true,
                    level: 'info',
                    format: winston.format.combine(
                        buildLevelFilter(['info', 'debug'])(),
                        winston.format.timestamp(),
                        this.loggerFormat
                    )
                }),
            ],
        });

    }

    private buildConsoleLogger() {
        this.logger = winston.createLogger({
            level: 'silly',
            transports: [
                new winston.transports.Console(),
            ],
            format: this.loggerFormat,
        });
    }
}
