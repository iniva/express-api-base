import { Router } from 'express';

import HealthController from './controller';
import wrapAsync from 'Middlewares/wrapAsync';

const PREFIX = '/health';
const routes = Router(); // eslint-disable-line new-cap

routes
    .get('/', wrapAsync(HealthController.get));

export default {
    prefix: PREFIX,
    routes
};
