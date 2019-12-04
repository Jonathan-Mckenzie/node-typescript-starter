// used to handle .env variables
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import {setCors, setOrigin} from './cors';
import nocache from 'nocache';
import * as bodyParser from 'body-parser';
import {logger} from './logger';
import * as controller from './controllers/controller';

app.use(setOrigin);
app.use(setCors);
app.use(morgan('common', {stream: {write: (text: string) => logger.info(text) } }));

// support json in body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// api definitions
// prevent our api from being cached
app.use(nocache());

app.get('/', controller.hello);

app.listen(process.env.SERVER_PORT, () => logger.info(`Server listening on port ${process.env.SERVER_PORT}`));
