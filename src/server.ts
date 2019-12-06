import environment from './environment';
import {logger} from './logger';

import app from './app';
app(true).listen(
    environment.port,
    environment.hostname,
    () => logger.info(`Server listening on port ${environment.port}`)
);

