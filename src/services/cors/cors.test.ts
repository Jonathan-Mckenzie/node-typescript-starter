import {CorsService} from './cors.service';
import {Container} from 'typedi';
import {EnvironmentService} from '../environment/environment.service';

describe('cors service testing', () => {
    it('should pass a basic smoke test', () => {
        const cors = new CorsService(Container.get(EnvironmentService));

        expect(cors).toBeTruthy();
        expect(typeof cors.buildSetCors()).toEqual('function');
        expect(typeof cors.buildSetOrigin()).toEqual('function');
    });
});
