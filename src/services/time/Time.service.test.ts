import Timeout = require('await-timeout');
import {Container} from 'typedi';
import {TimeService} from './Time.service';

describe('Time.service tests', () => {
    it('time service should be online and resolved from DI', async () => {
        const timeService = Container.get(TimeService);

        expect(timeService).toBeTruthy();

        await Timeout.set(100); // put some delay

        expect(timeService.getMilliSecondsOnline()).toBeGreaterThan(0);
    });
});
