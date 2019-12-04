import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import {setCors, setOrigin} from './cors';
import nocache from 'nocache';
import * as bodyParser from 'body-parser';
import {logger} from './logger';
import * as controller from './controllers/controller';

dotenv.config(); // used to handle .env variables (should be executed as early as possible)
const app = express();

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
