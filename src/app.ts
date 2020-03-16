import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import nocache from 'nocache';
import {useExpressServer} from 'routing-controllers';
import {StatusController} from './controllers/status-controller/StatusController';
import {RootController} from './controllers/root-controller/RootController';
import {CorsService} from './services/cors/cors.service';
import {Container} from 'typedi';
import {EnvironmentService} from './services/environment/environment.service';
import {LoggerService} from './services/logger/logger.service';



export default (corsEnabled: boolean) => {
    const app = express();

    const cors = Container.get(CorsService);
    const environment = Container.get(EnvironmentService);
    const logger = Container.get(LoggerService);

    // pre-controller global middleware
    if (corsEnabled) {
        app.use(cors.buildSetOrigin());
        app.use(cors.buildSetCors());
    }
    app.use(nocache());
    app.use(
        morgan(
            ':method ":url" :status (:res[content-length] length) (:response-time ms)',
            {stream: {write: (text: string) => logger.info(text) } }
        )
    );

    useExpressServer(app, {
        cors: corsEnabled,
        development: !(environment.isProduction),
        controllers: [
            RootController,
            StatusController,
        ],
    });

    return app;
};



