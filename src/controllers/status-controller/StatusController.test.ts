// @ts-ignore
import request, {Response} from 'supertest';
// @ts-ignore
import Timeout from 'await-timeout';
import app from '../../app';
import {IStatusResponse} from './StatusController';


describe('StatusController API test', () => {

    const appInstance = app(false);

    it('should return online status', async () => {
        const response: Response = await request(appInstance)
            .get('/status');
        const statusResponse: IStatusResponse = response.body;
        expect(response.status).toEqual(200);
        expect(statusResponse.status).toEqual('online');
    });

    it('should return an uptime of greater than 0 seconds', async () => {
        await Timeout.set(1000); // wait for service to be online for at least 1 second

        const response: Response = await request(appInstance)
            .get('/status');

        const statusResponse: IStatusResponse = response.body;

        expect(response.status).toEqual(200);
        expect(statusResponse.uptime !== '0secs').toBeTruthy();
    });
});
