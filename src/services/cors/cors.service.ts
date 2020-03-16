import {EnvironmentService} from '../environment/environment.service';
import cors from 'cors';
import {Service} from 'typedi';
import removeHttpPrefix from '../../utilities/remove-http-prefix/removeHttpPrefix';
import {NextFunction, Request, Response} from 'express';

@Service()
export class CorsService {

    private readonly whitelistStr: string;
    private readonly corsOptions: cors.CorsOptions;

    constructor(private environment: EnvironmentService) {
        this.whitelistStr = Array.from(this.environment.whitelist).toString();

        this.corsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            origin: (origin, callback) => {
                const originProcessed = removeHttpPrefix(origin);
                this.environment.whitelist.has(originProcessed)
                    ? callback(null, true)
                    : callback(this.buildCorsError(originProcessed));
            },
        };
    }

    buildSetOrigin = () => {
        return (req: Request, res: Response, next: NextFunction) => {
            req.headers.origin = req.headers.origin || req.headers.host;
            next();
        };
    }

    buildSetCors = () => {
        return cors(this.corsOptions);
    }

    private buildCorsError = (origin: string): Error => {
        return new Error(`${origin} not allowed by CORS, allowed hosts: ${this.whitelistStr}`);
    }

}
