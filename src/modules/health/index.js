import { Router } from 'express';

import HealthController from './controller';

const PREFIX = '/health';
const routes = Router(); // eslint-disable-line new-cap

routes
    .get('/', HealthController.get);

export default {
    prefix: PREFIX,
    routes
};
