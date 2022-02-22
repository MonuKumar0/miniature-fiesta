import express from 'express';
const { Router } = express;
import AuthController from './controllers/auth.controller.js';
import PostsController from './controllers/posts.controller.js';

import authenticate from './middleware/authenticate.js';

import errorHandler from './middleware/error-handler.js';
import accessControl from './middleware/access-control.js';

const routes = new Router();

routes.post('/auth/login', AuthController.login);
routes.get('/posts', authenticate, PostsController.search);
routes.post('/posts', accessControl('admin'), PostsController.create);
routes.delete('/posts/:id', authenticate, PostsController.populate, PostsController.delete);
routes.put('/posts/:id', accessControl('admin'), PostsController.update);


routes.use(errorHandler);

export default routes;
