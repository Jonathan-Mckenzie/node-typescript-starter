require('dotenv').config(); // used to handle .env file that are set into 'process.env'

import {Service} from 'typedi';
import {IEnvironment} from './environment.interface';
import removeHttpPrefix from '../../utilities/remove-http-prefix/removeHttpPrefix';


@Service()
export class EnvironmentService implements IEnvironment {

    static defaultEnvironment = 'development';
    static defaultHostname = 'localhost';
    static defaultPort = 8000;
    static defaultLogDir = 'winston.logs';

    private readonly _isProduction: boolean;
    private readonly _hostname: string;
    private readonly _port: number;
    private readonly _whitelist: Set<string>;
    private readonly _logDir: string;

    constructor() {
        this._isProduction = (process.env.NODE_ENV || EnvironmentService.defaultEnvironment) === 'production';
        this._hostname = (process.env.HOSTNAME || EnvironmentService.defaultHostname);
        this._port = (parseInt(process.env.PORT, 10) || EnvironmentService.defaultPort);
        this._whitelist = new Set(
            // comma-separated host names
            (process.env.WHITELIST || '').split(
                ','
            ).concat(
                `${this._hostname}:${this._port}` // add server host name
            ).filter( (host) =>
                !!(host)
            ).map( (host) =>
                removeHttpPrefix(host)
            ),
        );
        this._logDir = (process.env.LOG_DIR || EnvironmentService.defaultLogDir);
    }

    get isProduction(): boolean { return this._isProduction; }
    get hostname(): string { return this._hostname; }
    get port(): number { return this._port; }
    get whitelist(): Set<string> { return this._whitelist; }
    get logDir(): string { return this._logDir; }
}
