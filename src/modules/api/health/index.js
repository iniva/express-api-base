import { Router } from 'express';

import wrapAsync from 'Middlewares/wrapAsync';
import HealthController from './controller';

const PREFIX = '/health';
const routes = Router(); // eslint-disable-line new-cap

routes
  .get('/', wrapAsync(HealthController.get));

export default {
  prefix: PREFIX,
  routes,
};
