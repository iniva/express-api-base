import { Router } from 'express';

import PostsController from './controller';
import wrapAsync from 'Middlewares/wrapAsync';

const PREFIX = '/posts';
const routes = Router(); // eslint-disable-line new-cap

routes
    .get('/', wrapAsync(PostsController.list))
    .post('/', wrapAsync(PostsController.create));

export default {
    prefix: PREFIX,
    routes
};
