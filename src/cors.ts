import {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import environment from './environment';
import removeHttpPrefix from './utilities/removeHttpPrefix';

const whitelistStr: string = Array.from(environment.whitelist).toString();
const generateCorsError = (origin: string): Error => {
    return new Error(`${origin} not allowed by CORS, allowed hosts: ${whitelistStr}`);
};

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    origin: (origin, callback) => {
        const originProcessed = removeHttpPrefix(origin);
        environment.whitelist.has(originProcessed)
            ? callback(null, true)
            : callback(generateCorsError(originProcessed));
    },
};

export const setOrigin = (req: Request, res: Response, next: NextFunction) => {
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
};

export const setCors = cors(corsOptions);


