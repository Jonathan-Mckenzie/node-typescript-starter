import environment from './environment'; // keep this as first import on server.ts as it resolves environment
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import {setCors, setOrigin} from './cors';
import nocache from 'nocache';
import {logger} from './logger';
import {useExpressServer} from 'routing-controllers';
import {HelloController} from './controllers/hello-controller/HelloController';

export default (corsEnabled: boolean) => {
    const app = express();

    // pre-controller global middleware
    if (corsEnabled) {
        app.use(setOrigin);
        app.use(setCors);
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
        development: !environment.isProduction,
        controllers: [
            HelloController
        ]
    });

    return app;
};



