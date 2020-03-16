import {Controller, Get, JsonController} from 'routing-controllers';
import {Container, Inject, Service} from 'typedi';
import {TimeService} from '../../services/time/Time.service';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import {TimeFormatter} from '../../utilities/time-format/time-format';

export interface IStatusResponse {
    status: string;
    uptime: string;
}

// @ts-ignore
momentDurationFormatSetup(moment);

@JsonController('/status')
export class StatusController {

    constructor(private timeService: TimeService = Container.get(TimeService)) {
    }

    @Get('/')
    status(): IStatusResponse {
        return {
            status: 'online',
            uptime: this.getUptime(),
        };
    }

    private getUptime(): string {
        return TimeFormatter.generateTimestamp(this.timeService.getMilliSecondsOnline(), 'milliseconds');
    }
}
