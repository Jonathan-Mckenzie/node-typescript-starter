import {Request, Response, NextFunction} from 'express';
import cors from 'cors';

const whitelist: Set<string> = new Set(
    // comma-separated host names
    (process.env.WHITELIST || '').split(
        ','
    ).map( (hostname) =>
        // removes http:// and https://
        hostname.replace(/^(http|https):\/\//gi, '')
    )
);

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    origin: (origin, callback) => {
        whitelist.has(origin.replace(/^(http|https):\/\//gi, ''))
            ? callback(null, true)
            : callback(new Error('Not allowed by CORS'));
    },
};

export const setOrigin = (req: Request, res: Response, next: NextFunction) => {
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
};

export const setCors = cors(corsOptions);


