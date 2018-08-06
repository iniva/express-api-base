import express from 'express';

import Logger from 'Utils/logger';
import Config from './config';
// Global Middlewares
import globalMiddlewares from 'Middlewares/global';
// API Modules
import health from 'Modules/health';

const log = Logger.create();
const app = express();
const options = Config.get('server');

// Init App settings
const settings = Config.get('app');

for (const [setting, value] of Object.entries(settings)) {
    app.set(setting, value);
}

// Set Global Middlewares
app.use('/*', globalMiddlewares);

// Load API Modules
app.use(health.prefix, health.routes);

// Start App
app.listen(options.port, options.host, () => {
    log(`${app.get('name')} ${app.get('version')} listening on port http://0.0.0.0:${options.port}`);
});
