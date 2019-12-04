import environment from './environment'; // keep this as first import on server.ts as it resolves environment
import express from 'express';
import morgan from 'morgan';
import {setCors, setOrigin} from './cors';
import nocache from 'nocache';
import * as bodyParser from 'body-parser';
import {logger} from './logger';
import * as controller from './controllers/controller';

const app = express();

app.use(setOrigin);
app.use(setCors);
app.use(
    morgan(
        ':method ":url" :status (:res[content-length] length) (:response-time ms)',
        {stream: {write: (text: string) => logger.info(text) } }
    )
);

// support json in body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// api definitions
// prevent our api from being cached
app.use(nocache());

app.get('/', controller.hello);

app.listen(
    environment.port,
    environment.hostname,
    () => logger.info(`Server listening on port ${environment.port}`)
);
