import express from 'express';
import pino from 'express-pino-logger';

import Logger from 'Utils/logger';
import Config from './config';
// Middlewares
import globalMiddlewares from 'Middlewares/global';
import errorHandler from 'Middlewares/errorHandler';
import notFoundHandler from 'Middlewares/notFoundHandler';

// API Modules
import api from 'Modules/api';

// Express APP
const app = express();

const serverOptions = Config.get('server');
const log = Logger.create();
const pinoLogger = pino({ ...Config.get('logger') });

// Set App settings
for (const [option, value] of Object.entries(Config.get('app'))) {
    app.set(option, value);
}

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
