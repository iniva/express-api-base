import express from 'express';
import pino from 'express-pino-logger';
import bodyParser from 'body-parser';

// Middlewares
import globalMiddlewares from 'Middlewares/global';
import errorHandler from 'Middlewares/errorHandler';
import notFoundHandler from 'Middlewares/notFoundHandler';
// API Modules
import api from 'Modules/api';
import Config from './config';
import Logger from 'Utils/logger';

// Express APP
const app = express();

const serverOptions = Config.get('server');
const log = Logger.create();
const pinoLogger = pino({ ...Config.get('logger') });

// Set App settings
Object.entries(Config.get('app')).forEach(([option, value]) => {
  app.set(option, value);
});

// Set utilities to handle payloads
app.use(bodyParser.json());
// Uncomment below line if you intend to receive payloads with "application/x-www-form-urlencoded"
// app.use(bodyParser.urlencoded({ extended: true }));

// Set Logger
app.use(pinoLogger);

// Set Global Middlewares
app.use('/*', globalMiddlewares);

// Load API Modules
api(app);

// Set Global Not Found Handler Middleware
app.use(notFoundHandler);
// Set Global Error Handler Middleware
app.use(errorHandler);

// Start App
app.listen(serverOptions.port, serverOptions.host, () => {
  log(`${app.get('name')} ${app.get('version')} listening on port http://0.0.0.0:${serverOptions.port}`);
});
