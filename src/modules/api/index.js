import health from './health';
import posts from './posts';

const register = app => {
  app.use(health.prefix, health.routes);
  app.use(posts.prefix, posts.routes);
};

export default register;
