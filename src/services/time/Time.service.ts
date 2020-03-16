import {Service} from 'typedi';

@Service()
export class TimeService {

    private readonly _timeStart: Date;

    constructor() {
        this._timeStart = new Date();
    }

    get timeStart(): Date {
        return this._timeStart;
    }

    getMilliSecondsOnline(): number {
        const now = new Date();
        return Math.round( (now.getTime() - this.timeStart.getTime()) );
    }
}
