import {Container} from 'typedi';
import {EnvironmentService} from './environment.service';

describe('basic environment smoke test', () => {
    it('should pass a smoke test', () => {
        const environment = Container.get(EnvironmentService);
        expect(environment).toBeTruthy();
        expect(environment.isProduction).toEqual((process.env.NODE_ENV || EnvironmentService.defaultEnvironment) === 'production');
        expect(environment.hostname).toEqual(process.env.HOSTNAME) || EnvironmentService.defaultHostname);
        expect(environment.port).toEqual(parseInt(process.env.PORT, 10) || EnvironmentService.defaultPort);
        expect(environment.logDir).toEqual(process.env.LOG_DIR || EnvironmentService.defaultLogDir);
    });
});

