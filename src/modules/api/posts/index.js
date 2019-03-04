import { Router } from 'express';

import wrapAsync from 'Middlewares/wrapAsync';
import PostsController from './controller';

const PREFIX = '/posts';
const routes = Router(); // eslint-disable-line new-cap

routes
  .get('/', wrapAsync(PostsController.list))
  .post('/', wrapAsync(PostsController.create));

export default {
  prefix: PREFIX,
  routes,
};
