// @ts-ignore
import request from 'supertest';
import app from './app';
import {Response} from 'supertest';
import {Container} from 'typedi';
import {LoggerService} from './services/logger/logger.service';
import {EnvironmentService} from './services/environment/environment.service';


describe('App should be able to launch', () => {

    const logger = Container.get(LoggerService);
    const environment = Container.get(EnvironmentService);

    logger.info('Testing app: ', JSON.stringify(environment));

    it('should be able to spin up the app server without cors', async () => {
        const response: Response = await request(app(false))
            .get('/');

        expect(response.status).toEqual(200);
    });


    it('should fail on cors when using supertest', async () => {
        const response: Response = await request(app(true))
            .get('/');

        expect(response.status).toEqual(500);
        expect(response.text).toContain('not allowed by CORS');
    });
});

