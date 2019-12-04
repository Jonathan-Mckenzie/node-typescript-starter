import {Request, Response} from 'express';
import {logger} from '../logger';

export const hello = (req: Request, res: Response) => {

    // test the logger with this endpoint and this query params
    if (req.query.loggerLevel && req.query.loggerMessage) {
        logger.log(req.query.loggerLevel, req.query.loggerMessage);
    }

    return res.status(200).send('hello friend.');
};

