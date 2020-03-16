// @ts-ignore
import moment from 'moment';
// @ts-ignore
import momentDurationFormatSetup from 'moment-duration-format';
// @ts-ignore
momentDurationFormatSetup(moment);

export const TimeFormatter = {
    generateTimestamp: (units: number, value: string): string => {
        return moment.duration(units, value as any).format('h[hrs]:m[min]:s[secs]');
    },
};
