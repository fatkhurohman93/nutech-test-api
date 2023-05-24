import { Router } from 'express';
import Auth from '@routers/auth.router';
import User from '@routers/user.router';
import Product from './routers/product.router';

export default () => {
  const app = Router();

  Auth(app);
  User(app);
  Product(app);

  return app;
};
