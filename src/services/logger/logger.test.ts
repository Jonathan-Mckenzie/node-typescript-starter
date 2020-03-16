import {Container} from 'typedi';
import {EnvironmentService} from '../environment/environment.service';
import {LoggerService} from './logger.service';
const rimraf = require('rimraf');
const fs = require('fs');
const dateFormat = require('dateformat');

describe('basic logger test', () => {
    it('should perform logging to the console', () => {

        const env = new EnvironmentService();

        // force to development environment
        Container.set(EnvironmentService, {
            isProduction: false,
            hostname: env.hostname,
            port: env.port,
            whitelist: env.whitelist,
            logDir: env.logDir
        });

        const logger = new LoggerService(Container.get(EnvironmentService));

        expect(logger).toBeTruthy();


        const events = buildSpyEvents(logger);

        expect(events.error).toHaveBeenCalledTimes(0);
        expect(events.warn).toHaveBeenCalledTimes(0);
        expect(events.debug).toHaveBeenCalledTimes(0);
        expect(events.info).toHaveBeenCalledTimes(0);

        testLogMessages(logger);

        expect(events.error).toHaveBeenCalledTimes(1);
        expect(events.warn).toHaveBeenCalledTimes(2);
        expect(events.debug).toHaveBeenCalledTimes(3);
        expect(events.info).toHaveBeenCalledTimes(4);
    });

    it('should perform logging to a file', async () => {

        const env = new EnvironmentService();

        rimraf.sync(env.logDir);

        // force to development environment
        Container.set(EnvironmentService, {
            isProduction: true,
            hostname: env.hostname,
            port: env.port,
            whitelist: env.whitelist,
            logDir: env.logDir
        });

        const logger = new LoggerService(Container.get(EnvironmentService));
        const events = buildSpyEvents(logger);

        testLogMessages(logger);

        expect(events.error).toHaveBeenCalledTimes(1);
        expect(events.warn).toHaveBeenCalledTimes(2);
        expect(events.debug).toHaveBeenCalledTimes(3);
        expect(events.info).toHaveBeenCalledTimes(4);

        const now = new Date();

        const errorWarnLineCount = await fileLineCount(`${env.logDir}/${LoggerService.errorWarnDir}/${dateFormat(now, 'yyyy-mm-dd')}.log`);
        const infoDebugLineCount = await fileLineCount(`${env.logDir}/${LoggerService.infoDebugDir}/${dateFormat(now, 'yyyy-mm-dd')}.log`);

        expect(errorWarnLineCount).toEqual(3);
        expect(infoDebugLineCount).toEqual(4);

        rimraf.sync(env.logDir);
    });
});

const buildSpyEvents = (logger) => {
    return {
        error: jest.spyOn(logger, 'error'),
        warn: jest.spyOn(logger, 'warn'),
        debug: jest.spyOn(logger, 'debug'),
        info: jest.spyOn(logger, 'info'),
        http: jest.spyOn(logger, 'http'),
    };
};

const testLogMessages = (logger) => {
    logger.error('error 1');

    logger.warn('warn 1');
    logger.warn('warn 2');

    logger.debug('debug 1');
    logger.debug('debug 2');
    logger.debug('debug 3');

    logger.info('info 1');
    logger.info('info 2');
    logger.info('info 3');
    logger.info('info 4');

};

const fileLineCount = (filename: string): Promise<number> => {
    return new Promise( (resolve) => {
        let count = 0;
        fs.createReadStream(filename)
            .on('data', (chunk) => {
                count += chunk.filter( (piece) => piece === 10 ).length;
            })
            .on('end', () => {
                resolve(count);
            });
    });
};

