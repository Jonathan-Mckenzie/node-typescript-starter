import {TimeFormatter} from './time-format';

const { generateTimestamp } = TimeFormatter;

describe('time-format should generate the correct formats', () => {

    it('should be able to generate correct timestamps given a magnitude of milliseconds', () => {
        expect(generateTimestamp(1, 'milliseconds')).toEqual('0secs');
        expect(generateTimestamp(1000, 'milliseconds')).toEqual('1sec');
        expect(generateTimestamp(10 * 1000, 'milliseconds')).toEqual('10secs');
        expect(generateTimestamp(60 * 1000, 'milliseconds')).toEqual('1min:0secs');
        expect(generateTimestamp(60 * 60 * 1000, 'milliseconds')).toEqual('1hr:0mins:0secs');
        expect(generateTimestamp((12 * 60 * 60 * 1000) + (5 * 60 * 1000) + (30 * 1000), 'milliseconds')).toEqual('12hrs:5mins:30secs');
    });
});
