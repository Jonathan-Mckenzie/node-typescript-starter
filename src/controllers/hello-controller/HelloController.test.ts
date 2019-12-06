import request, {Response} from 'supertest';
import app from '../../app';

describe('HelloController API test', () => {

    it('should be able to GET on /', async () => {
        const response: Response = await request(app(false))
            .get('/');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual('hello friend.');
    });

    it('should be able to GET on /:name', async () => {
        const name = 'edison';
        const response: Response = await request(app(false))
            .get(`/${name}`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(`Hello, ${name}. What is your mood?`);
    });

    it('should be able to GET on /:name?mood=testy', async () => {
        const name = 'edison';
        const mood = 'testy';
        const response: Response = await request(app(false))
            .get(`/${name}?mood=${mood}`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(`Your name is ${name}. And you are feeling ${mood}`);
    });

    it('should be able to PUT on /:name', async () => {
        const name = 'edison';
        const data = { suh: 'dude' };
        const response: Response = await request(app(false))
            .put(`/${name}`)
            .send(data);
        expect(response.status).toEqual(200);
        expect(response.body.success).toEqual(true);
        expect(response.body.method).toEqual('put');
        expect(response.body.data.suh).toEqual(data.suh);
    });

    it('should be able to POST on /', async () => {
        const data = { suh: 'dude' };
        const response: Response = await request(app(false))
            .post(`/`)
            .send(data);
        expect(response.status).toEqual(200);
        expect(response.body.success).toEqual(true);
        expect(response.body.method).toEqual('post');
        expect(response.body.data.suh).toEqual(data.suh);
    });

    it('should be able to DELETE on /:id', async () => {
        const id = '123';
        const response: Response = await request(app(false))
            .delete(`/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body.success).toEqual(true);
        expect(response.body.message).toEqual(`Successfully deleted ${id}`);
    });

});
