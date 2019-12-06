require('dotenv').config(); // used to handle .env file that are set into 'process.env'
import removeHttpPrefix from './utilities/removeHttpPrefix';

interface IEnvironment {
    isProduction: boolean;
    hostname: string;
    port: number;
    whitelist: Set<string>;
    logDir: string;
}

const hostname =  (process.env.HOSTNAME || 'localhost');
const port = (parseInt(process.env.PORT, 10) || 8080);

const environment: IEnvironment = {
    isProduction: (process.env.NODE_ENV || 'development') === 'production',
    hostname,
    port,
    whitelist: new Set(
        // comma-separated host names
        (process.env.WHITELIST || '').split(
            ','
        ).concat(
            `${hostname}:${port}` // add server host name
        ).filter( (host) =>
            !!(host)
        ).map( (host) =>
            removeHttpPrefix(host)
        ),
    ),
    logDir: (process.env.LOG_DIR || 'winston.logs'),
};

export default environment;
