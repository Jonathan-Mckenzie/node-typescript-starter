import environment from './environment'; // keep this as first import on server.ts as it resolves environment
import request from 'supertest';
import app from './app';
import {Response} from 'supertest';

describe('App should be able to launch', () => {
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


