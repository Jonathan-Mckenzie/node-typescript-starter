// @ts-ignore
import request, {Response} from 'supertest';
import app from '../../app';
import {RootController} from './RootController';

describe('RootController Test', () => {
    it('should be able to GET on /', async () => {
        const response: Response = await request(app(false))
            .get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(RootController.Greeting);
    });
});
