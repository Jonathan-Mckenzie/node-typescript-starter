import {EnvironmentService} from './services/environment/environment.service';
import app from './app';
import {Container} from 'typedi';
import {LoggerService} from './services/logger/logger.service';
import {TimeService} from './services/time/Time.service';

const environment = Container.get(EnvironmentService);
const logger = Container.get(LoggerService);
Container.get(TimeService); // ensure construction at boot time

app(true).listen(
    environment.port,
    environment.hostname,
    () => logger.info(`${environment.isProduction ? 'Production ' : ''}Server "${environment.hostname}" listening on port ${environment.port}`)
);

